using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data.SqlClient;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Web;
using System.Web.Services;
using Travel_Management.BusinessEntities;

namespace Travel_Management
{
    /// <summary>
    /// Summary description for WebService
    /// </summary>
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
     [System.Web.Script.Services.ScriptService]
    public class WebService : System.Web.Services.WebService
    {
        string connectionString = ConfigurationManager.ConnectionStrings["DBConStr"].ConnectionString;

        [WebMethod]
        public string HelloWorld()
        {
            return "Hello World";
        }

        [WebMethod]
        public List<Countries> getCountriesList (String q)
        {

            List<Countries> countryList = new List<Countries>();

            SqlConnection connection = new SqlConnection(connectionString);
            // Read CURID and customerCode from database
            SqlCommand readcommand = new SqlCommand("select * from countries where name like '%" + q + "%' ", connection);
            connection.Open();
            SqlDataReader rdr = readcommand.ExecuteReader();
            while(rdr.Read())
            {
                var countryData = new Countries();
                countryData.id = rdr.GetInt64(0);
                countryData.CountryName = rdr.GetString(2);
                countryData.StateName = "";
                countryData.CityName = "";
                countryList.Add(countryData);
            }

            connection.Close();

            return countryList;
        }

        [WebMethod]

        public List<Countries> getStateList(String q, string cid)
        {
            var stateList = new List<Countries>();

            SqlConnection connection = new SqlConnection(connectionString);
            // Read CURID and customerCode from database
            SqlCommand readcommand = new SqlCommand("select * from states where name like '%" + q + "%' and country_id= '"+cid+"' ", connection);
            connection.Open();
            SqlDataReader rdr = readcommand.ExecuteReader();
            while (rdr.Read())
            {
                var countryData = new Countries();
                countryData.id = rdr.GetInt64(0);
                countryData.CountryName = "";
                countryData.StateName = rdr.GetString(1);
                countryData.CityName = "";
                stateList.Add(countryData);
            }

            connection.Close();

            return stateList;

        }


        [WebMethod]

        public List<Countries> getCityList(String q, string sid)
        {
            var cityList = new List<Countries>();

            SqlConnection connection = new SqlConnection(connectionString);
            // Read CURID and customerCode from database
            SqlCommand readcommand = new SqlCommand("select * from cities where name like '%" + q + "%' and state_id= '" + sid + "' ", connection);
            connection.Open();
            SqlDataReader rdr = readcommand.ExecuteReader();
            while (rdr.Read())
            {
                var countryData = new Countries();
                countryData.id = rdr.GetInt64(0);
                countryData.CountryName = "";
                countryData.StateName = "";
                countryData.CityName = rdr.GetString(1);
                cityList.Add(countryData);
            }

            connection.Close();

            return cityList;

        }

        [WebMethod]

        public Employee authenticateUser(Employee employee)
        {
            var empData = new Employee();

            SqlConnection connection = new SqlConnection(connectionString);
            // Read CURID and customerCode from database
            SqlCommand readcommand = new SqlCommand("select e.* from MstEmp as e  where e.Email='" + employee.Email + "' and e.Password='" + employee.Password + "' and Enabled='Y' ", connection);
            connection.Open();
            SqlDataReader rdr = readcommand.ExecuteReader();
            if (rdr.Read())
            {
                empData.EmpId = rdr.GetString(0);
                empData.FirstName = rdr.GetString(1);
                empData.LastName = rdr.GetString(2);
                empData.Email = rdr.GetString(3);
                empData.Password = rdr.GetString(4);
                empData.Phone = rdr.GetString(5);
                empData.Department = rdr.GetString(6);
                empData.Type = rdr.GetString(7);
            }

            connection.Close();

            return empData;
        }

        [WebMethod]
        public String saveNewTravelRequest(TravelRequest travelRequest)
        {
            string valid = "false";
            DateTime today = DateTime.Now;
            String ManagerName = "";
            String ManagerEmail = "";
            String ManagerPhone = "";
            String MailBody = "";
            int newTravelId = 0;
            SqlConnection connection = new SqlConnection(connectionString);
            SqlCommand command = connection.CreateCommand();
            try
            {
                connection.Open();
                command.CommandText = ("insert into TrnTravelRequest values('"+travelRequest.FirstName+ "','"+travelRequest.LastName+ "','"+travelRequest.Email+ "','"+travelRequest.Phone+ "','"+travelRequest.Department+ "','"+travelRequest.TravellingFromCountry+ "', '"+travelRequest.TravellingFromState+"'," +
                    " '"+travelRequest.TravellingFromCity+ "','"+travelRequest.TravellingToCountry+ "','"+travelRequest.TravellingToState+ "','"+travelRequest.TravellingToCity+ "','"+travelRequest.TravelDate+ "','"+travelRequest.ReturnDate+ "','"+travelRequest.NoOfDays+ "','"+travelRequest.TravelReason+ "','Pending','','" + today + "','" + travelRequest.EmpId+"','"+travelRequest.ApproverManagerId + "') SELECT SCOPE_IDENTITY()");
                 newTravelId = Convert.ToInt32(command.ExecuteScalar());

                valid = "true";
            }
            catch(Exception ex)
            {
                valid = "false" + ex;
            }
            finally
            {
                connection.Close();
            }

            // save data for escalation 

            try
            {
                connection.Open();
                command.CommandText = ("insert into TrnEscalation values('" + today + "',1," + newTravelId + ", '" + travelRequest.EmpId + "')");
                command.ExecuteNonQuery();

                valid = "true";
            }
            catch (Exception ex)
            {
                valid = "false" + ex;
            }
            finally
            {
                connection.Close();
            }

            /* Get Manager Id for sending Travel Mail */
            SqlCommand readcommand = new SqlCommand("select * from MstEmp where EmpId='"+travelRequest.ApproverManagerId+"' ", connection);
            connection.Open();
            SqlDataReader rdr = readcommand.ExecuteReader();
            if (rdr.Read())
            {
                ManagerName = rdr.GetString(1) + " " + rdr.GetString(2);
                ManagerEmail = rdr.GetString(3);
                ManagerPhone = rdr.GetString(5);
                
            }

            connection.Close();

            MailBody = travelRequestEmailTemplate(travelRequest.FirstName + " " + travelRequest.LastName, ManagerName, travelRequest.TravellingFromCountry + "," + travelRequest.TravellingFromState + "," + travelRequest.TravellingFromCity, travelRequest.TravellingToCountry + "," + travelRequest.TravellingToState + "," + travelRequest.TravellingToCity, travelRequest.NoOfDays.ToString(), travelRequest.TravelReason, travelRequest.TravelDate,travelRequest.ReturnDate);


           // sendSMS(false, ManagerPhone, "New travel request posted by Employee -'"+travelRequest.FirstName+"' '"+travelRequest.LastName + "' "); 
            sendMail("High", ManagerEmail, "New Travel Request",MailBody, "", "", true, true);


            return valid;
        }

        [WebMethod]
        public List<Employee> searchEmployeeByName(string q)
        {
            var empList = new List<Employee>();

            SqlConnection connection = new SqlConnection(connectionString);
            // Read CURID and customerCode from database
            SqlCommand readcommand = new SqlCommand("select * from MstEmp where FirstName like '%" + q + "%' or LastName like '%" + q + "%' ", connection);
            connection.Open();
            SqlDataReader rdr = readcommand.ExecuteReader();
            while (rdr.Read())
            {
                var empData = new Employee();
                empData.id = rdr.GetString(0);
                empData.EmpId = rdr.GetString(0);
                empData.FirstName = rdr.GetString(1);
                empData.LastName = rdr.GetString(2);
                empData.Email = rdr.GetString(3);
                empData.Password = rdr.GetString(4);
                empData.Phone = rdr.GetString(5);
                empData.Department = rdr.GetString(6);
                empData.Type = rdr.GetString(7);
                empList.Add(empData);
            }

            connection.Close();

            return empList;
        }

        [WebMethod]
        public List<Employee> getAllEmployeeList()
        {
            var empList = new List<Employee>();

            SqlConnection connection = new SqlConnection(connectionString);
            // Read CURID and customerCode from database
            SqlCommand readcommand = new SqlCommand("select * from MstEmp where Enabled = 'Y'", connection);
            connection.Open();
            SqlDataReader rdr = readcommand.ExecuteReader();
            while (rdr.Read())
            {
                var empData = new Employee();
                empData.id = rdr.GetString(0);
                empData.EmpId = rdr.GetString(0);
                empData.FirstName = rdr.GetString(1);
                empData.LastName = rdr.GetString(2);
                empData.Email = rdr.GetString(3);
                empData.Password = rdr.GetString(4);
                empData.Phone = rdr.GetString(5);
                empData.Department = rdr.GetString(6);
                empData.Type = rdr.GetString(7);
                empData.DOJ = rdr.GetDateTime(8).ToString("dd/MM/yyyy");
                empList.Add(empData);
            }

            connection.Close();

            return empList;
        }

        [WebMethod]
        public Employee searchEmployeeById(Employee employee)
        {
            var empData = new Employee();

            SqlConnection connection = new SqlConnection(connectionString);
            // Read CURID and customerCode from database
            SqlCommand readcommand = new SqlCommand("select * from MstEmp where EmpId ='"+employee.EmpId+"'  ", connection);
            connection.Open();
            SqlDataReader rdr = readcommand.ExecuteReader();
            while (rdr.Read())
            {
                empData.id = rdr.GetString(0);
                empData.EmpId = rdr.GetString(0);
                empData.FirstName = rdr.GetString(1);
                empData.LastName = rdr.GetString(2);
                empData.Email = rdr.GetString(3);
                empData.Password = rdr.GetString(4);
                empData.Phone = rdr.GetString(5);
                empData.Department = rdr.GetString(6);
                empData.Type = rdr.GetString(7);
            }

            connection.Close();

            return empData;
        }

        [WebMethod]
        public String updateEmployee(Employee employee)
        {
            string valid = "false";
            SqlConnection connection = new SqlConnection(connectionString);
            SqlCommand command = connection.CreateCommand();
            try
            {
                connection.Open();
                command.CommandText = ("update MstEmp set FirstName='"+employee.FirstName+"', LastName='"+employee.LastName+"', Email='"+employee.Email+"',Phone='"+employee.Phone+"', Department= '"+employee.Department+"',Type = '"+employee.Type+"' where EmpId='"+employee.EmpId+"'  ");
                command.ExecuteNonQuery();

                valid = "true";
            }
            catch (Exception ex)
            {
                valid = "false" + ex;
            }
            finally
            {
                connection.Close();
            }

            return valid;
        }

        [WebMethod]
        public String deleteEmployee(Employee employee)
        {
            string valid = "false";
            SqlConnection connection = new SqlConnection(connectionString);
            SqlCommand command = connection.CreateCommand();
            try
            {
                connection.Open();
                command.CommandText = ("update MstEmp set Enabled='N' where EmpId='" + employee.EmpId + "'  ");
                command.ExecuteNonQuery();

                valid = "true";
            }
            catch (Exception ex)
            {
                valid = "false" + ex;
            }
            finally
            {
                connection.Close();
            }

            return valid;
        }


        [WebMethod]
        public Employee getEmployeeManager(Employee employee)
        {
            var empData = new Employee();

            SqlConnection connection = new SqlConnection(connectionString);
            // Read CURID and customerCode from database
            SqlCommand readcommand = new SqlCommand("select ManagerId1 from MstManagerMapping where EmpId= '"+employee.EmpId+"' ", connection);
            connection.Open();
            SqlDataReader rdr = readcommand.ExecuteReader();
            while (rdr.Read())
            {
                empData.ApproverManagerId = rdr.GetString(0);
            }

            connection.Close();

            return empData;
        }

        [WebMethod]

        public ManagerMapping getManagerMapping(ManagerMapping mapping)
        {
            var mappingData = new ManagerMapping();
            SqlConnection connection = new SqlConnection(connectionString);
            // Read CURID and customerCode from database
            SqlCommand readcommand = new SqlCommand("select * from MstManagerMapping where EmpId ='" + mapping.EmpId + "'  ", connection);
            connection.Open();
            SqlDataReader rdr = readcommand.ExecuteReader();
            if (rdr.Read())
            {
                mappingData.MappingId = rdr.GetInt64(0);
                mappingData.ManagerId1 = rdr.GetString(2);
                mappingData.ManagerId2 = rdr.GetString(3);
                mappingData.ManagerId3 = rdr.GetString(4);
                mappingData.ManagerId4 = rdr.GetString(5);
                mappingData.ManagerId5 = rdr.GetString(6);
                mappingData.ManagerName1 = rdr.GetString(7);
                mappingData.ManagerName2 = rdr.GetString(8);
                mappingData.ManagerName3 = rdr.GetString(9);
                mappingData.ManagerName4 = rdr.GetString(10);
                mappingData.ManagerName5 = rdr.GetString(11);
                mappingData.EmpId = rdr.GetString(1);

                
            }

            connection.Close();

            return mappingData;

        }

        [WebMethod]

        public List<ManagerMapping> getManagerMappingList()
        {
            var mappinList = new List<ManagerMapping>();
            SqlConnection connection = new SqlConnection(connectionString);
            // Read CURID and customerCode from database
            SqlCommand readcommand = new SqlCommand("select m.*, e.FirstName,e.LastName from MstManagerMapping as m , MstEmp as e where m.Empid = e.EmpId ", connection);
            connection.Open();
            SqlDataReader rdr = readcommand.ExecuteReader();
            while (rdr.Read())
            {
                var mappingData = new ManagerMapping();
                mappingData.MappingId = rdr.GetInt64(0);
                mappingData.ManagerId1 = rdr.GetString(2);
                mappingData.ManagerId2 = rdr.GetString(3);
                mappingData.ManagerId3 = rdr.GetString(4);
                mappingData.ManagerId4 = rdr.GetString(5);
                mappingData.ManagerId5 = rdr.GetString(6);
                mappingData.ManagerName1 = rdr.GetString(7);
                mappingData.ManagerName2 = rdr.GetString(8);
                mappingData.ManagerName3 = rdr.GetString(9);
                mappingData.ManagerName4 = rdr.GetString(10);
                mappingData.ManagerName5 = rdr.GetString(11);
                mappingData.EmpId = rdr.GetString(1);
                mappingData.FirstName = rdr.GetString(12);
                mappingData.LastName = rdr.GetString(13);
                mappinList.Add(mappingData);


            }

            connection.Close();

            return mappinList;

        }

        [WebMethod]
        public String saveManagerMapping(ManagerMapping mapping)
        {
            string valid = "false";
            SqlConnection connection = new SqlConnection(connectionString);
            SqlCommand command = connection.CreateCommand();
            try
            {
                connection.Open();
                command.CommandText = ("insert into MstManagerMapping values('"+mapping.EmpId+ "','"+mapping.ManagerId1+ "','"+mapping.ManagerId2+ "','"+mapping.ManagerId3+ "', '"+mapping.ManagerId4+ "','"+mapping.ManagerId5+"'," +
                    " '"+mapping.ManagerName1+ "','" + mapping.ManagerName2 + "','" + mapping.ManagerName3 + "','" + mapping.ManagerName4 + "','" + mapping.ManagerName5 + "' ) ");
                command.ExecuteNonQuery();

                valid = "true";
            }
            catch (Exception ex)
            {
                valid = "false" + ex;
            }
            finally
            {
                connection.Close();
            }

            return valid;
        }

        [WebMethod]
        public String deleteManagerMapping(ManagerMapping mapping)
        {
            string valid = "false";
            SqlConnection connection = new SqlConnection(connectionString);
            SqlCommand command = connection.CreateCommand();
            try
            {
                connection.Open();
                command.CommandText = ("delete from MstManagerMapping where MappingId='"+mapping.MappingId+"' ");
                command.ExecuteNonQuery();

                valid = "true";
            }
            catch (Exception ex)
            {
                valid = "false" + ex;
            }
            finally
            {
                connection.Close();
            }

            return valid;
        }

        [WebMethod]
        public string updateMangerMapping(ManagerMapping mapping)
        {
            string valid = "false";
            SqlConnection connection = new SqlConnection(connectionString);
            SqlCommand command = connection.CreateCommand();
            try
            {
                connection.Open();
                command.CommandText = ("update MstManagerMapping set ManagerId1='"+mapping.ManagerId1+ "',ManagerId2='" + mapping.ManagerId2+ "',ManagerId3='" + mapping.ManagerId3+ "',ManagerId4='" + mapping.ManagerId4+ "',ManagerId5='" + mapping.ManagerId5+ "'," +
                    " ManagerName1 ='"+mapping.ManagerName1+ "',ManagerName2 ='" + mapping.ManagerName2 + "',ManagerName3 ='" + mapping.ManagerName3 + "',ManagerName4 ='" + mapping.ManagerName4 + "',ManagerName5 ='" + mapping.ManagerName5 + "' where MappingId='" + mapping.MappingId+"'  ");
                command.ExecuteNonQuery();

                valid = "true";
            }
            catch (Exception ex)
            {
                valid = "false" + ex;
            }
            finally
            {
                connection.Close();
            }

            return valid;
        }

        [WebMethod]
        public List<TravelRequest> loadTravelRequestStatus(TravelRequest travelRequest)
        {
            var travelStatusList = new List<TravelRequest>();
            SqlConnection connection = new SqlConnection(connectionString);
            // Read CURID and customerCode from database
            SqlCommand readcommand = new SqlCommand("select * from TrnTravelRequest where EmpId='"+travelRequest.EmpId+"'",connection);
            connection.Open();
            SqlDataReader rdr = readcommand.ExecuteReader();
            while (rdr.Read())
            {
                var travelRequstData = new TravelRequest();
                travelRequstData.FirstName = rdr.GetString(1);
                travelRequstData.LastName = rdr.GetString(2);
                travelRequstData.TravellingFromCountry = rdr.GetString(6);
                travelRequstData.TravellingFromState = rdr.GetString(7);
                travelRequstData.TravellingFromCity = rdr.GetString(8);
                travelRequstData.TravellingToCountry = rdr.GetString(9);
                travelRequstData.TravellingToState = rdr.GetString(10);
                travelRequstData.TravellingToCity = rdr.GetString(11);
                travelRequstData.TravelDate = rdr.GetDateTime(12).ToString("dd/MM/yyyy");
                travelRequstData.ReturnDate = rdr.GetDateTime(13).ToString("dd/MM/yyyy");
                travelRequstData.TravelReason = rdr.GetString(15);
                travelRequstData.Status = rdr.GetString(16);
                travelRequstData.AppliedDate = rdr.GetDateTime(18).ToString("dd/MM/yyyy");
                travelStatusList.Add(travelRequstData);
            }

            connection.Close();

            return travelStatusList;

        }

        [WebMethod]
        public List<TravelRequest> loadTravelRequestApprovalByManagerId(TravelRequest travelRequest)
        {
            var travelStatusList = new List<TravelRequest>();
            SqlConnection connection = new SqlConnection(connectionString);
            // Read CURID and customerCode from database
            SqlCommand readcommand = new SqlCommand("select * from TrnTravelRequest where ApproverManagerId='" + travelRequest.ApproverManagerId + "' and Status='Pending'", connection);
            connection.Open();
            SqlDataReader rdr = readcommand.ExecuteReader();
            while (rdr.Read())
            {
                var travelRequstData = new TravelRequest();
                travelRequstData.TravelId = rdr.GetInt64(0);
                travelRequstData.FirstName = rdr.GetString(1);
                travelRequstData.LastName = rdr.GetString(2);
                travelRequstData.TravellingFromCountry = rdr.GetString(6);
                travelRequstData.TravellingFromState = rdr.GetString(7);
                travelRequstData.TravellingFromCity = rdr.GetString(8);
                travelRequstData.TravellingToCountry = rdr.GetString(9);
                travelRequstData.TravellingToState = rdr.GetString(10);
                travelRequstData.TravellingToCity = rdr.GetString(11);
                travelRequstData.TravelDate = rdr.GetDateTime(12).ToString("dd/MM/yyyy");
                travelRequstData.ReturnDate = rdr.GetDateTime(13).ToString("dd/MM/yyyy");
                travelRequstData.TravelReason = rdr.GetString(15);
                travelRequstData.Status = rdr.GetString(16);
                travelRequstData.AppliedDate = rdr.GetDateTime(18).ToString("dd/MM/yyyy");
                travelRequstData.NoOfDays = rdr.GetInt32(14);
                travelStatusList.Add(travelRequstData);
            }

            connection.Close();

            return travelStatusList;

        }

        [WebMethod]
        public String approveTravelRequest(TravelRequest travelRequest)
        {
            string valid = "false";
            string empFullName = "";
            string empEmail = "";
            string MailBody = "";
            SqlConnection connection = new SqlConnection(connectionString);
            SqlCommand command = connection.CreateCommand();
            try
            {
                connection.Open();
                command.CommandText = ("update TrnTravelRequest set Status='Approved' where TravelId='"+travelRequest.TravelId+"' ");
                command.ExecuteNonQuery();

                valid = "true";
            }
            catch (Exception ex)
            {
                valid = "false" + ex;
            }
            finally
            {
                connection.Close();
            }

            if (valid == "true")
            {
                /* Get Manager Id for sending Travel Mail */
                SqlCommand readcommand = new SqlCommand("select EmpFirstName, EmpLastName, Email from TrnTravelRequest  where TravelId ='" + travelRequest.TravelId + "' ", connection);
                connection.Open();
                SqlDataReader rdr = readcommand.ExecuteReader();
                if (rdr.Read())
                {
                    empFullName = rdr.GetString(0) + " " + rdr.GetString(1);
                    empEmail = rdr.GetString(2);

                }

                connection.Close();

                MailBody = "Hello <b>" + empFullName + "</b>,<br> Your travel request <b>TR NO. : "+ travelRequest.TravelId+ "</b> has been approved by your manager.<br/><br/>Thank you <br/>S M Guru<br/>Phone : +91 9448760810<br/>Email : softvent@gmail.com";


                // sendSMS(false, ManagerPhone, "New travel request posted by Employee -'"+travelRequest.FirstName+"' '"+travelRequest.LastName + "' "); 
                sendMail("High", empEmail, "Travel Request Approved", MailBody, "", "", true, true);
            }


            return valid;
        }

        [WebMethod]
        public String rejectTravelRequest(TravelRequest travelRequest)
        {
            string valid = "false";
            string empFullName = "";
            string empEmail = "";
            string MailBody = "";
            string rejectReason = "";
            SqlConnection connection = new SqlConnection(connectionString);
            SqlCommand command = connection.CreateCommand();
            try
            {
                connection.Open();
                command.CommandText = ("update TrnTravelRequest set Status='Rejected',RejectReason='"+travelRequest.RejectReason + "' where TravelId='" + travelRequest.TravelId + "' ");
                command.ExecuteNonQuery();

                valid = "true";
            }
            catch (Exception ex)
            {
                valid = "false" + ex;
            }
            finally
            {
                connection.Close();
            }

            if (valid == "true")
            {
                /* Get Manager Id for sending Travel Mail */
                SqlCommand readcommand = new SqlCommand("select EmpFirstName, EmpLastName, Email,RejectReason from TrnTravelRequest  where TravelId ='" + travelRequest.TravelId + "' ", connection);
                connection.Open();
                SqlDataReader rdr = readcommand.ExecuteReader();
                if (rdr.Read())
                {
                    empFullName = rdr.GetString(0) + " " + rdr.GetString(1);
                    empEmail = rdr.GetString(2);
                    rejectReason = rdr.GetString(3);

                }

                connection.Close();

                MailBody = "Hello <b>" + empFullName + "</b>,<br/> Your travel request <b>TR NO. :" + travelRequest.TravelId + "</b> has been rejected  by your manager.<br/><b>Reason: </b>"+rejectReason+".<br/><br/><br/>Thank you <br/>S M Guru<br/>Phone : +91 9448760810<br/>Email : softvent@gmail.com";


                // sendSMS(false, ManagerPhone, "New travel request posted by Employee -'"+travelRequest.FirstName+"' '"+travelRequest.LastName + "' "); 
                sendMail("High", empEmail, "Travel Request Rejected", MailBody, "", "", true, true);
            }


            return valid;
        }

        [WebMethod]
        public TravelRequest loadEditTravelDetails(TravelRequest travelRequest)
        {
            var travelRequstData = new TravelRequest();
            SqlConnection connection = new SqlConnection(connectionString);
            // Read CURID and customerCode from database
            SqlCommand readcommand = new SqlCommand("select * from TrnTravelRequest where TravelId='"+travelRequest.TravelId+"' and Status='Pending'", connection);
            connection.Open();
            SqlDataReader rdr = readcommand.ExecuteReader();
            while (rdr.Read())
            {
                
                travelRequstData.TravelId = rdr.GetInt64(0);
                travelRequstData.FirstName = rdr.GetString(1);
                travelRequstData.LastName = rdr.GetString(2);
                travelRequstData.Email = rdr.GetString(3);
                travelRequstData.Phone = rdr.GetString(4);
                travelRequstData.Department = rdr.GetString(5);
                travelRequstData.TravellingFromCountry = rdr.GetString(6);
                travelRequstData.TravellingFromState = rdr.GetString(7);
                travelRequstData.TravellingFromCity = rdr.GetString(8);
                travelRequstData.TravellingToCountry = rdr.GetString(9);
                travelRequstData.TravellingToState = rdr.GetString(10);
                travelRequstData.TravellingToCity = rdr.GetString(11);
                travelRequstData.TravelDate = rdr.GetDateTime(12).ToString("dd/MM/yyyy");
                travelRequstData.ReturnDate = rdr.GetDateTime(13).ToString("dd/MM/yyyy");
                travelRequstData.TravelReason = rdr.GetString(15);
                travelRequstData.Status = rdr.GetString(16);
                travelRequstData.AppliedDate = rdr.GetDateTime(18).ToString("dd/MM/yyyy");
                travelRequstData.NoOfDays = rdr.GetInt32(14);
                
            }

            connection.Close();

            return travelRequstData;
        }

        [WebMethod]
        public String updateTravelRequest(TravelRequest travelRequest)
        {
            string valid = "false";
            SqlConnection connection = new SqlConnection(connectionString);
            SqlCommand command = connection.CreateCommand();
            try
            {
                connection.Open();
                command.CommandText = ("update TrnTravelRequest set TravelDate='"+travelRequest.TravelDate+"',ReturnDate='"+travelRequest.ReturnDate+"',NoOfDays='"+travelRequest.NoOfDays+"', TravelReason='"+travelRequest.TravelReason+"'  where TravelId='" + travelRequest.TravelId + "' ");
                command.ExecuteNonQuery();

                valid = "true";
            }
            catch (Exception ex)
            {
                valid = "false" + ex;
            }
            finally
            {
                connection.Close();
            }

            return valid;
        }

        [WebMethod]
        public List<TravelRequest> TravelReportList()
        {
            var travelStatusList = new List<TravelRequest>();
            SqlConnection connection = new SqlConnection(connectionString);
            // Read CURID and customerCode from database
            SqlCommand readcommand = new SqlCommand("select * from TrnTravelRequest order by Date desc", connection);
            connection.Open();
            SqlDataReader rdr = readcommand.ExecuteReader();
            while (rdr.Read())
            {
                var travelRequstData = new TravelRequest();
                travelRequstData.TravelId = rdr.GetInt64(0);
                travelRequstData.FirstName = rdr.GetString(1);
                travelRequstData.LastName = rdr.GetString(2);
                travelRequstData.TravellingFromCountry = rdr.GetString(6);
                travelRequstData.TravellingFromState = rdr.GetString(7);
                travelRequstData.TravellingFromCity = rdr.GetString(8);
                travelRequstData.TravellingToCountry = rdr.GetString(9);
                travelRequstData.TravellingToState = rdr.GetString(10);
                travelRequstData.TravellingToCity = rdr.GetString(11);
                travelRequstData.TravelDate = rdr.GetDateTime(12).ToString("dd/MM/yyyy");
                travelRequstData.ReturnDate = rdr.GetDateTime(13).ToString("dd/MM/yyyy");
                travelRequstData.TravelReason = rdr.GetString(15);
                travelRequstData.Status = rdr.GetString(16);
                travelRequstData.AppliedDate = rdr.GetDateTime(18).ToString("dd/MM/yyyy");
                travelStatusList.Add(travelRequstData);
            }

            connection.Close();

            return travelStatusList;

        }

        [WebMethod]
        public String approveReimbursementRequest(ReimbursementStatusEntities rbStatus)
        {
            string valid = "false";
            string empFullName = "";
            string empEmail = "";
            string MailBody = "";
            string travelId = "";
            SqlConnection connection = new SqlConnection(connectionString);
            SqlCommand command = connection.CreateCommand();
            try
            {
                connection.Open();
                command.CommandText = ("update TrnReimbursement set Status='Approved' where ReimbursementId='"+rbStatus.ReimbursementId+"'  ");
                command.ExecuteNonQuery();

                valid = "true";
            }
            catch (Exception ex)
            {
                valid = "false" + ex;
            }
            finally
            {
                connection.Close();
            }

            if (valid == "true")
            {
                /* Get Manager Id for sending Travel Mail */
                SqlCommand readcommand = new SqlCommand("select EmpFirstName, EmpLastName,Email,TravelId  from TrnTravelRequest as t where t.TravelId = (select r.TravelId from TrnReimbursement as r where r.ReimbursementId = '" + rbStatus.ReimbursementId + "')", connection);
                connection.Open();
                SqlDataReader rdr = readcommand.ExecuteReader();
                if (rdr.Read())
                {
                    empFullName = rdr.GetString(0) + " " + rdr.GetString(1);
                    empEmail = rdr.GetString(2);
                    travelId = rdr.GetInt64(3).ToString();
                }

                connection.Close();

                MailBody = "Hello <b>" + empFullName + "</b>,<br/> Your reimbursement request <b>TR NO. :" + travelId + "</b> has been approved  by your manager.<br/><br/>Thank you <br/>S M Guru<br/>Phone : +91 9448760810<br/>Email : softvent@gmail.com";


                // sendSMS(false, ManagerPhone, "New travel request posted by Employee -'"+travelRequest.FirstName+"' '"+travelRequest.LastName + "' "); 
                sendMail("High", empEmail, "Travel Reimbursement Approved", MailBody, "", "", true, true);
            }


            return valid;
        }

        [WebMethod]
        public String rejectReimbursementRequest(ReimbursementStatusEntities rbStatus)
        {
            string valid = "false";
            string empFullName = "";
            string empEmail = "";
            string MailBody = "";
            string travelId = "";
            SqlConnection connection = new SqlConnection(connectionString);
            SqlCommand command = connection.CreateCommand();
            try
            {
                connection.Open();
                command.CommandText = ("update TrnReimbursement set Status='Rejected', RejectReason='"+rbStatus.RejectReason+"' where ReimbursementId='" + rbStatus.ReimbursementId + "'  ");
                command.ExecuteNonQuery();

                valid = "true";
            }
            catch (Exception ex)
            {
                valid = "false" + ex;
            }
            finally
            {
                connection.Close();
            }

            if (valid == "true")
            {
                /* Get Manager Id for sending Travel Mail */
                SqlCommand readcommand = new SqlCommand("select EmpFirstName, EmpLastName,Email,TravelId  from TrnTravelRequest as t where t.TravelId = (select r.TravelId from TrnReimbursement as r where r.ReimbursementId = '" + rbStatus.ReimbursementId + "')", connection);
                connection.Open();
                SqlDataReader rdr = readcommand.ExecuteReader();
                if (rdr.Read())
                {
                    empFullName = rdr.GetString(0) + " " + rdr.GetString(1);
                    empEmail = rdr.GetString(2);
                    travelId = rdr.GetInt64(3).ToString();
                }

                connection.Close();

                MailBody = "Hello <b>" + empFullName + "</b>,<br/> Your reimbursement request <b>TR NO. :" + travelId + "</b> has been rejected  by your manager.<br/><b>Reason : </b> "+ rbStatus.RejectReason + ". <br/><br/>Thank you <br/>S M Guru<br/>Phone : +91 9448760810<br/>Email : softvent@gmail.com";


                // sendSMS(false, ManagerPhone, "New travel request posted by Employee -'"+travelRequest.FirstName+"' '"+travelRequest.LastName + "' "); 
                sendMail("High", empEmail, "Travel Reimbursement Rejected", MailBody, "", "", true, true);
            }

            return valid;
        }

        [WebMethod]
        public String saveNewEmployee(Employee employee)
        {
            string valid = "false";
            int empid = 0;
            SqlConnection connection = new SqlConnection(connectionString);
            // Read CURID and customerCode from database
            SqlCommand readcommand = new SqlCommand("select Top 1 * from MstEmp order by  EmpId desc", connection);
            connection.Open();
            SqlDataReader rdr = readcommand.ExecuteReader();
            if (rdr.Read())
            {

                empid = int.Parse(rdr.GetString(0));

            }

            connection.Close();
            empid = empid + 1;
            SqlCommand command = connection.CreateCommand();
            try
            {
                connection.Open();
                command.CommandText = ("insert into MstEmp values('"+ empid + "','"+employee.FirstName+ "','"+employee.LastName+ "','"+employee.Email+ "','123456','"+employee.Phone+ "','"+employee.Department+ "','"+employee.Type+ "','"+employee.DOJ+"','Y')");
                command.ExecuteNonQuery();

                valid = "true";
            }
            catch (Exception ex)
            {
                valid = "false" + ex;
            }
            finally
            {
                connection.Close();
            }

            return valid;
        }

        [WebMethod]
        public String saveNewReimbursementRequest()
        {
            string valid = "false";
            string TravelId = HttpContext.Current.Request.Form.Get("TravelId");
            string EmpId = HttpContext.Current.Request.Form.Get("EmpId");
            int count = int.Parse(HttpContext.Current.Request.Form.Get("count"));
            long reimbursementId = 0;
            long totalAmount = 0;
            DateTime today = DateTime.Now;

            for (int i=1; i <= count; i++)
            {
                HttpPostedFile expenseimg = HttpContext.Current.Request.Files["expenseImageData" + i];
                if (expenseimg != null && expenseimg.ContentLength > 0)
                {
                    var filename= Path.GetFileName(expenseimg.FileName);
                    expenseimg.SaveAs(Server.MapPath(Path.Combine("~/Uploads/Expense", filename)));
                }
            }

            SqlConnection connection = new SqlConnection(connectionString);
            // Read CURID and customerCode from database
            SqlCommand readcommand = new SqlCommand("select Top 1 * from TrnReimbursement order by  ReimbursementId desc", connection);
            connection.Open();
            SqlDataReader rdr = readcommand.ExecuteReader();
            if (rdr.Read())
            {

                reimbursementId = rdr.GetInt64(0);
                reimbursementId = reimbursementId + 1;
            }

            connection.Close();



            SqlCommand command = connection.CreateCommand();
            for (int i = 1; i <= count; i++)
            {
                totalAmount += long.Parse(HttpContext.Current.Request.Form.Get("expenseAmount" + i));

                try
                {
                    connection.Open();
                    command.CommandText = ("insert into TrnTravelExpenses values('"+ HttpContext.Current.Request.Form.Get("expenseName"+i) + "','" + HttpContext.Current.Request.Form.Get("expenseAmount" + i) + "','" + HttpContext.Current.Request.Form.Get("expenseDescription" + i) + "','" + HttpContext.Current.Request.Form.Get("expenseImage" + i) + "','"+EmpId+"','"+TravelId+"','"+ reimbursementId + "') ");
                    command.ExecuteNonQuery();
                    valid = "true";
                }
                finally
                {
                    connection.Close();
                }
            }


            try
            {
                connection.Open();
                command.CommandText = ("insert into TrnReimbursement values('"+reimbursementId+"','"+today+"','"+totalAmount+"','Pending','"+EmpId+"','"+ TravelId + "','') ");
                command.ExecuteNonQuery();
                valid = "true";
            }
            finally
            {
                connection.Close();
            }

           


            return valid;

        }

        [WebMethod]
        public List<ReimbursementStatusEntities> getReimbursementStatusList(ReimbursementStatusEntities reimbursementStatus)
        {
            var reimbursementStatusList = new List<ReimbursementStatusEntities>();

            SqlConnection connection = new SqlConnection(connectionString);
            // Read CURID and customerCode from database
            SqlCommand readcommand = new SqlCommand("select r.*,e.FirstName,e.LastName from TrnReimbursement as r, MstEmp as e where r.EmpId='"+ reimbursementStatus.EmpId+"' and r.EmpId = e.EmpId order by SubmiteDate desc ", connection);
            connection.Open();
            SqlDataReader rdr = readcommand.ExecuteReader();
            while (rdr.Read())
            {
                var reimbursementStatusData = new ReimbursementStatusEntities();
                reimbursementStatusData.ReimbursementId = rdr.GetInt64(0).ToString();
                reimbursementStatusData.SubmittedDate = rdr.GetDateTime(1).ToString("dd/MM/yyyy");
                reimbursementStatusData.Amount = rdr.GetDecimal(2);
                reimbursementStatusData.Status = rdr.GetString(3);
                reimbursementStatusData.FirstName = rdr.GetString(7);
                reimbursementStatusData.LastName = rdr.GetString(8);
                reimbursementStatusList.Add(reimbursementStatusData);
                

            }

            connection.Close();

            return reimbursementStatusList;
        }

        [WebMethod]
        public List<TravelRequest> searchTravelDetails(string q, string empid)
        {
            var travelStatusList = new List<TravelRequest>();
            SqlConnection connection = new SqlConnection(connectionString);
            // Read CURID and customerCode from database
            SqlCommand readcommand = new SqlCommand("select * from TrnTravelRequest where EmpId='" + empid + "' and (TravellingFromCountry like '%"+q+"%' or TravellingFromState like '%"+q+"%' or TravellingFromCity like '%"+q+"%' or TravellingToCountry like" +
                " '%"+q+"%' or TravellingToState like '%"+q+"%' or TravellingToCity like '%"+q+"%' or TravelDate like '%"+q+"%' or ReturnDate like '%"+q+"%') and Status='Approved'  " , connection);
            connection.Open();
            SqlDataReader rdr = readcommand.ExecuteReader();
            while (rdr.Read())
            {
                var travelRequstData = new TravelRequest();
                travelRequstData.id = rdr.GetInt64(0);
                travelRequstData.TravelId = rdr.GetInt64(0);
                travelRequstData.FirstName = rdr.GetString(1);
                travelRequstData.LastName = rdr.GetString(2);
                travelRequstData.TravellingFromCountry = rdr.GetString(6);
                travelRequstData.TravellingFromState = rdr.GetString(7);
                travelRequstData.TravellingFromCity = rdr.GetString(8);
                travelRequstData.TravellingToCountry = rdr.GetString(9);
                travelRequstData.TravellingToState = rdr.GetString(10);
                travelRequstData.TravellingToCity = rdr.GetString(11);
                travelRequstData.TravelDate = rdr.GetDateTime(12).ToString("dd/MM/yyyy");
                travelRequstData.ReturnDate = rdr.GetDateTime(13).ToString("dd/MM/yyyy");
                travelRequstData.TravelReason = rdr.GetString(15);
                travelRequstData.Status = rdr.GetString(16);
                travelRequstData.AppliedDate = rdr.GetDateTime(18).ToString("dd/MM/yyyy");
                travelStatusList.Add(travelRequstData);
            }

            connection.Close();

            return travelStatusList;
        }

        [WebMethod]
        public List<ReimbursementStatusEntities> getAppliedReimbursementList()
        {
            var reimbursementStatusList = new List<ReimbursementStatusEntities>();

            SqlConnection connection = new SqlConnection(connectionString);
            // Read CURID and customerCode from database
            SqlCommand readcommand = new SqlCommand("select r.*,e.FirstName,e.LastName from TrnReimbursement as r, MstEmp as e where  r.EmpId = e.EmpId  and Status='Pending' order by SubmiteDate ", connection);
            connection.Open();
            SqlDataReader rdr = readcommand.ExecuteReader();
            while (rdr.Read())
            {
                var reimbursementStatusData = new ReimbursementStatusEntities();
                reimbursementStatusData.ReimbursementId = rdr.GetInt64(0).ToString();
                reimbursementStatusData.SubmittedDate = rdr.GetDateTime(1).ToString("dd/MM/yyyy");
                reimbursementStatusData.Amount = rdr.GetDecimal(2);
                reimbursementStatusData.Status = rdr.GetString(3);
                reimbursementStatusData.TravelId = rdr.GetInt64(5);
                reimbursementStatusData.RejectReason = rdr.GetString(6);
                reimbursementStatusData.FirstName = rdr.GetString(7);
                reimbursementStatusData.LastName = rdr.GetString(8);
                reimbursementStatusList.Add(reimbursementStatusData);


            }

            connection.Close();

            return reimbursementStatusList;
        }

        [WebMethod]
        public List<TravelExpense> getTravelExpenseDetails(TravelExpense travelExpense)
        {
            var expenseList = new List<TravelExpense>();

            SqlConnection connection = new SqlConnection(connectionString);
            // Read CURID and customerCode from database
            SqlCommand readcommand = new SqlCommand("select * from TrnTravelExpenses where ReimbursementId='"+travelExpense.ReimbursementId+"' ", connection);
            connection.Open();
            SqlDataReader rdr = readcommand.ExecuteReader();
            while (rdr.Read())
            {

                var expenseData = new TravelExpense();

                expenseData.ExpenseType = rdr.GetString(1);
                expenseData.Description = rdr.GetString(3);
                expenseData.Amount = rdr.GetString(2);
                expenseData.ExpenseImage = rdr.GetString(4);
                expenseList.Add(expenseData);

            }

            connection.Close();

            return expenseList;
        }

        [WebMethod]
        public String sendSMS(Boolean IsOTP, string sentTo, string smsContent)
        {

            var smsUrl = "";
            var smsUsername = "";
            var smsPassword = "";
            var smsSenderId = "";
            string smsSendStatus = "";
            string numbers = "1234567890";

            string characters = numbers;

            int length = 5;
            string otp = string.Empty;

            if (IsOTP)
            {
                for (int i = 0; i < length; i++)
                {
                    string character = string.Empty;
                    do
                    {
                        int index = new Random().Next(0, characters.Length);
                        character = characters.ToCharArray()[index].ToString();
                    } while (otp.IndexOf(character) != -1);
                    otp += character;
                }
                smsContent = otp + "  is your OTP for Travel Management, please do not share with any other person.";
            }

            SqlConnection connection = new SqlConnection(connectionString);
            // Read CURID and customerCode from database
            SqlCommand readcommand2 = new SqlCommand("select * from MstSMSGateway ", connection);
            connection.Open();
            SqlDataReader rdr2 = readcommand2.ExecuteReader();
            if (rdr2.Read())
            {
                smsUrl = rdr2.GetString(0);
                smsUsername = rdr2.GetString(1);
                smsPassword = rdr2.GetString(2);
                smsSenderId = rdr2.GetString(3);

            }

            connection.Close();


            try
            {

                string strUrl = smsUrl + "username=" + smsUsername + "&password=" + smsPassword + "&to=91" + sentTo + "&text=" + smsContent + "&from=" + smsSenderId;
                // Create a request object  
                WebRequest request = HttpWebRequest.Create(strUrl);
                // Get the response back  
                HttpWebResponse response = (HttpWebResponse)request.GetResponse();
                Stream s = (Stream)response.GetResponseStream();
                StreamReader readStream = new StreamReader(s);
                string dataString = readStream.ReadToEnd();
                response.Close();
                s.Close();
                readStream.Close();
                smsSendStatus = "SMS Sent Successfully";

            }
            catch (Exception ex)
            {
                smsSendStatus = " Error Sending SMS--> " + ex;
            }

            connection.Close();

            return smsSendStatus;
        }




        [WebMethod]
        public string sendMail(string mailPriority,string mTo,string subject, string mailcontent, string mCC, string mBCC,Boolean IsenableSsl,Boolean BodyHtml)
        {
            SqlConnection connection = new SqlConnection(connectionString);
            string mailSentStatus = "";

            Boolean enableSsl = IsenableSsl;
            Boolean IsBodyHtml = BodyHtml;


            // email settings

            string smtpUsername = "", smtpPassword = "", smtpPort = "", smtClient = "", senderEmailId = "";
            SqlCommand readcommand2 = new SqlCommand("select * from EmailSetting ", connection);
            connection.Open();
            SqlDataReader rdr2 = readcommand2.ExecuteReader();
            while (rdr2.Read())
            {
                smtClient = rdr2.GetString(0);
                smtpUsername = rdr2.GetString(1);
                smtpPassword = rdr2.GetString(2);
                smtpPort = rdr2.GetString(3);
                senderEmailId = rdr2.GetString(4);

            }

            connection.Close();
           

            MailMessage mailMsg = new MailMessage();
            mailMsg.Subject = subject;
            //  mailMsg.Body = data[8];
            mailMsg.Body = mailcontent;
            mailMsg.From = new MailAddress(senderEmailId);

            if (mailPriority.Equals("High"))
            {
                mailMsg.Priority = MailPriority.High;
            }
            else
            {
                mailMsg.Priority = MailPriority.Normal;
            }

           

            if (!String.IsNullOrEmpty(mTo))
            {
                String[] to = mTo.Split(';');
                for (int i = 0; i < to.Length; i++)
                    if (!String.IsNullOrEmpty(to[i]))
                        mailMsg.To.Add(new MailAddress(to[i]));
            }

            if (!String.IsNullOrEmpty(mBCC))
            {
                String[] arrBCC = mBCC.Split(';');
                for (int i = 0; i < arrBCC.Length; i++)
                    if (!String.IsNullOrEmpty(arrBCC[i]))
                        mailMsg.Bcc.Add(new MailAddress(arrBCC[i]));
            }

            if (!String.IsNullOrEmpty(mCC))
            {
                String[] arrBCC = mCC.Split(';');
                for (int i = 0; i < arrBCC.Length; i++)
                    if (!String.IsNullOrEmpty(arrBCC[i]))
                        mailMsg.Bcc.Add(new MailAddress(arrBCC[i]));
            }

            mailMsg.IsBodyHtml = IsBodyHtml;
            try
            {

                SmtpClient smtpClient = new SmtpClient(smtClient);
                NetworkCredential networkCredential = new NetworkCredential();
                networkCredential.UserName = smtpUsername;
                networkCredential.Password = smtpPassword;
                smtpClient.Credentials = networkCredential;
                smtpClient.Port = Convert.ToInt32(smtpPort);


                smtpClient.EnableSsl = enableSsl;

                smtpClient.DeliveryMethod = SmtpDeliveryMethod.Network;

                smtpClient.Send(mailMsg);
                mailSentStatus = "Mail Send Successfully";

            }
            catch (SmtpException ex)
            {
                mailSentStatus="Error Sending Mail" + ex;
            }

            return mailSentStatus;
        }

        [WebMethod] 
        public Employee checkEmployeeByPhone(Employee employee)
        {
            var empData = new Employee();
            var smsUrl = "";
            var smsUsername = "";
            var smsPassword = "";
            var smsSenderId = "";

            string numbers = "1234567890";

            string characters = numbers;

            int length = 5;
            string otp = string.Empty;
            for (int i = 0; i < length; i++)
            {
                string character = string.Empty;
                do
                {
                    int index = new Random().Next(0, characters.Length);
                    character = characters.ToCharArray()[index].ToString();
                } while (otp.IndexOf(character) != -1);
                otp += character;
            }
            empData.OTP = otp;

            SqlConnection connection = new SqlConnection(connectionString);
            // Read CURID and customerCode from database
            SqlCommand readcommand2 = new SqlCommand("select * from MstSMSGateway ", connection);
            connection.Open();
            SqlDataReader rdr2 = readcommand2.ExecuteReader();
            if (rdr2.Read())
            {
                smsUrl = rdr2.GetString(0);
                smsUsername = rdr2.GetString(1);
                smsPassword = rdr2.GetString(2);
                smsSenderId = rdr2.GetString(3);

            }

            connection.Close();

            // Read CURID and customerCode from database
            SqlCommand readcommand = new SqlCommand("select * from MstEmp where Phone='"+employee.Phone+"' and Enabled='Y' ", connection);
            connection.Open();
            SqlDataReader rdr = readcommand.ExecuteReader();
            if (rdr.Read())
            {
                empData.EmpId = rdr.GetString(0);
                empData.FirstName = rdr.GetString(1);
                empData.LastName = rdr.GetString(2);
                string strUrl = smsUrl + "username=" + smsUsername + "&password=" + smsPassword + "&to=91" + rdr.GetString(5) + "&text=" + empData.OTP + " is your OTP for changing password, smguru.&from=" + smsSenderId;
                // Create a request object  
                WebRequest request = HttpWebRequest.Create(strUrl);
                // Get the response back  
                HttpWebResponse response = (HttpWebResponse)request.GetResponse();
                Stream s = (Stream)response.GetResponseStream();
                StreamReader readStream = new StreamReader(s);
                string dataString = readStream.ReadToEnd();
                response.Close();
                s.Close();
                readStream.Close();

            }

            connection.Close();

            return empData;
        }

        [WebMethod]
        public String changeEmployeePassword(Employee employee)
        {
            string valid = "false";
            SqlConnection connection = new SqlConnection(connectionString);
            SqlCommand command = connection.CreateCommand();
            try
            {
                connection.Open();
                command.CommandText = ("update MstEmp set Password='" + employee.Password + "' where EmpId='" + employee.EmpId + "'  ");
                command.ExecuteNonQuery();

                valid = "true";
            }
            catch (Exception ex)
            {
                valid = "false" + ex;
            }
            finally
            {
                connection.Close();
            }

            return valid;
        }

        [WebMethod]
        public String saveUserRoles(UserRoles userRoles)
        {
            string valid = "false";

            SqlConnection connection = new SqlConnection(connectionString);
            SqlCommand command = connection.CreateCommand();

            // physotherapist

            try
            {
                connection.Open();
                command.CommandText = ("insert into MstUserRoles(category,addrights,editrights,deleterights,printrights,viewrights,Empid) values('Employee', '" + userRoles.empAdd + "','" + userRoles.empEdit + "','" + userRoles.empDelete + "','" + userRoles.empPrint + "','" + userRoles.empView + "','" + userRoles.Empid + "' )");
                command.ExecuteNonQuery();
                valid = "true";
            }
            catch( Exception)
            {
                valid = "false";
            }
            finally
            {
                connection.Close();
            }


            try
            {
                connection.Open();
                command.CommandText = ("insert into MstUserRoles(category,addrights,editrights,deleterights,printrights,viewrights,Empid) values('Manager', '" + userRoles.managerAdd + "','" + userRoles.managerEdit + "','" + userRoles.managerDelete + "','" + userRoles.managerPrint + "','" + userRoles.managerView + "','" + userRoles.Empid + "' )");
                command.ExecuteNonQuery();
                valid = "true";
            }
            catch (Exception)
            {
                valid = "false";
            }
            finally
            {
                connection.Close();
            }

            try
            {
                connection.Open();
                command.CommandText = ("insert into MstUserRoles(category,addrights,editrights,deleterights,printrights,viewrights,Empid) values('Travel', '" + userRoles.TravelAdd + "','" + userRoles.TravelEdit + "','" + userRoles.TravelDelete + "','" + userRoles.TravelPrint + "','" + userRoles.TravelView + "','" + userRoles.Empid + "' )");
                command.ExecuteNonQuery();
                valid = "true";
            }
            catch (Exception)
            {
                valid = "false";
            }
            finally
            {
                connection.Close();
            }

            try
            {
                connection.Open();
                command.CommandText = ("insert into MstUserRoles(category,addrights,editrights,deleterights,printrights,viewrights,Empid) values('Report', '" + userRoles.ReportAdd + "','" + userRoles.ReportEdit + "','" + userRoles.ReportDelete + "','" + userRoles.ReportPrint + "','" + userRoles.ReportView + "','" + userRoles.Empid + "' )");
                command.ExecuteNonQuery();
                valid = "true";
            }
            catch (Exception)
            {
                valid = "false";
            }
            finally
            {
                connection.Close();
            }

            try
            {
                connection.Open();
                command.CommandText = ("insert into MstUserRoles(category,addrights,editrights,deleterights,printrights,viewrights,Empid) values('Roles_Setting', '" + userRoles.rolesAdd + "','" + userRoles.rolesEdit + "','" + userRoles.rolesDelete + "','" + userRoles.rolesPrint + "','" + userRoles.rolesView + "','" + userRoles.Empid + "' )");
                command.ExecuteNonQuery();
                valid = "true";
            }
            catch (Exception)
            {
                valid = "false";
            }
            finally
            {
                connection.Close();
            }

            return valid;
        }

        [WebMethod]
        public String updateUserRoles(UserRoles userRoles)
        {
            string valid = "false";


            SqlConnection connection = new SqlConnection(connectionString);
            //Employee
            try
            {

                connection.Open();
                SqlCommand command = new SqlCommand(" update MstUserRoles set addrights='" + userRoles.empAdd + "', deleterights='" + userRoles.empDelete + "',viewrights='" + userRoles.empView + "', editrights='" + userRoles.empEdit + "',printrights='" + userRoles.empPrint + "' where category ='Employee' and Empid='" + userRoles.Empid + "' ", connection);
                command.ExecuteNonQuery();

            }
            finally
            {
                connection.Close();
            }

            // Manager
            try
            {

                connection.Open();
                SqlCommand command = new SqlCommand(" update MstUserRoles set addrights='" + userRoles.managerAdd + "', deleterights='" + userRoles.managerDelete + "',viewrights='" + userRoles.managerView + "', editrights='" + userRoles.managerEdit + "',printrights='" + userRoles.managerPrint + "' where category ='Manager' and Empid='" + userRoles.Empid + "' ", connection);
                command.ExecuteNonQuery();

            }
            finally
            {
                connection.Close();
            }

            //Travel
            try
            {

                connection.Open();
                SqlCommand command = new SqlCommand(" update MstUserRoles set addrights='" + userRoles.TravelAdd + "', deleterights='" + userRoles.TravelDelete + "',viewrights='" + userRoles.TravelView + "', editrights='" + userRoles.TravelEdit + "',printrights='" + userRoles.TravelPrint + "' where category ='Travel' and Empid='" + userRoles.Empid + "' ", connection);
                command.ExecuteNonQuery();

            }
            finally
            {
                connection.Close();
            }


            //Reports
            try
            {

                connection.Open();
                SqlCommand command = new SqlCommand(" update MstUserRoles set addrights='" + userRoles.ReportAdd + "', deleterights='" + userRoles.ReportDelete + "',viewrights='" + userRoles.ReportView + "', editrights='" + userRoles.ReportEdit + "',printrights='" + userRoles.ReportPrint + "' where category ='Report' and Empid='" + userRoles.Empid + "' ", connection);
                command.ExecuteNonQuery();

            }
            finally
            {
                connection.Close();
            }

            //Roles
            try
            {

                connection.Open();
                SqlCommand command = new SqlCommand(" update MstUserRoles set addrights='" + userRoles.rolesAdd + "', deleterights='" + userRoles.rolesDelete + "',viewrights='" + userRoles.rolesView + "', editrights='" + userRoles.rolesEdit + "',printrights='" + userRoles.rolesPrint + "' where category ='Roles_Setting' and Empid='" + userRoles.Empid + "' ", connection);
                command.ExecuteNonQuery();

            }
            finally
            {
                connection.Close();
            }

            


            return valid;

        }


        [WebMethod]
        public List<UserRoles> getUserSettingsById(UserRoles setting)
        {
            var userList = new List<UserRoles>();

            SqlConnection connection = new SqlConnection(connectionString);
            // Read CURID and customerCode from database
            SqlCommand readcommand = new SqlCommand("select * from MstUserRoles where Empid='" + setting.Empid + "' order by id asc ", connection);
            connection.Open();
            SqlDataReader rdr = readcommand.ExecuteReader();
            while (rdr.Read())
            {
                var userdata = new UserRoles();

                if (rdr.GetString(1) == "Employee")
                {
                    userdata.empAdd = rdr.GetBoolean(2);
                    userdata.empEdit = rdr.GetBoolean(3);
                    userdata.empDelete = rdr.GetBoolean(4);
                    userdata.empPrint = rdr.GetBoolean(5);
                    userdata.empView = rdr.GetBoolean(6);

                    userList.Add(userdata);
                }
                if (rdr.GetString(1) == "Manager")
                {
                    userdata.managerAdd = rdr.GetBoolean(2);
                    userdata.managerEdit = rdr.GetBoolean(3);
                    userdata.managerDelete = rdr.GetBoolean(4);
                    userdata.managerPrint = rdr.GetBoolean(5);
                    userdata.managerView = rdr.GetBoolean(6);
                    userList.Add(userdata);
                }
                if (rdr.GetString(1) == "Travel")
                {
                    userdata.TravelAdd = rdr.GetBoolean(2);
                    userdata.TravelEdit = rdr.GetBoolean(3);
                    userdata.TravelDelete = rdr.GetBoolean(4);
                    userdata.TravelPrint = rdr.GetBoolean(5);
                    userdata.TravelView = rdr.GetBoolean(6);
                    userList.Add(userdata);
                }
                if (rdr.GetString(1) == "Report")
                {
                    userdata.ReportAdd = rdr.GetBoolean(2);
                    userdata.ReportEdit = rdr.GetBoolean(3);
                    userdata.ReportDelete = rdr.GetBoolean(4);
                    userdata.ReportPrint = rdr.GetBoolean(5);
                    userdata.ReportView = rdr.GetBoolean(6);
                    userList.Add(userdata);
                }
                if (rdr.GetString(1) == "Roles_Setting")
                {
                    userdata.rolesAdd = rdr.GetBoolean(2);
                    userdata.rolesEdit = rdr.GetBoolean(3);
                    userdata.rolesDelete = rdr.GetBoolean(4);
                    userdata.rolesPrint = rdr.GetBoolean(5);
                    userdata.rolesView = rdr.GetBoolean(6);
                    userList.Add(userdata);
                }
               
            }

            connection.Close();

            return userList;
        }


        public String travelRequestEmailTemplate(string empName, string empManagerName, string travelOrigin, string travelDestination, string noOfDays, string reason, string travelDate, string returnDate)
        {
            String template = "<html><head><style>div.container{justify-content: center;padding: 2%;background-color : #f2f4f4;margin-left: 100px;margin-right: 100px;}" +
                                "p.personTitle{font-size: 18px;text-align: center;font-weight: 200px;margin-bottom: 3%;}" +
                                "p.message{font-size: 16px;text-align: center;font-weight: 200px;margin-bottom: 3%;}" +
                                "table{width: 100%;padding-bottom:  5%;}table thead{border-radius: 4px;background-color:   #48c9b0 ;}" +
                                "table thead > tr{width : 105%;font-size : 14px;font-weight: 400;text-align: center;}" +
                                "table thead  tr > th{padding: 5px;}table tbody > tr{font-size : 12px;font-weight: 400;text-align: center;}</style></head><body> " +
                                "<div class='container'><p class='personTitle'>Hello, <b>"+empManagerName+"</b></p>" +
                                "<p class='message'>Travel request has been raised by : <b> "+empName+"</b>, please find the travel details below: </p>" +
                                    "<table>" +
                                        "<thead>" +
                                        "<tr>" +
                                        "<th>Employee Name</th>" +
                                        "<th>Origin</th>" +
                                        "<th>Destination</th>" +
                                        "<th>Travel Date</th>"+
                                        "<th>Return Date</th>"+
                                        "<th>No. of Days</th>" +
                                        "<th>Reason</th>" +
                                        "</tr>" +
                                        "</thead>" +
                                       "<tbody>" +
                                        "<td>"+empName+"</td>" +
                                        "<td>"+travelOrigin+"</td>" +
                                        "<td>"+travelDestination+"</td>" +
                                        "<td>"+travelDate+"</td>"+
                                        "<td>"+returnDate+"</td>"+
                                        "<td>"+noOfDays+"</td>" +
                                        "<td>"+reason+"</td>" +
                                       "</tbody>" +
                                    "</table>" +
                                    "<br/><br/><h6><i><b>Note*: This is an auto-generated mail from system, kindly do not reply.</b></i></h6><br/><br/>Thank you <br/>S M Guru<br/>Phone : +91 9448760810<br/>Email : softvent@gmail.com" +
                                "</div></body></html>";
            return template;
        }

    }
}
