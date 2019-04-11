using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Travel_Management.BusinessEntities
{
    public class Employee
    {
        public string id { get; set; }
        public String EmpId { get; set; }

        public String FirstName { get; set; }
        public String LastName { get; set; }

        public String Email { get; set; }
        public String Password { get; set; }

        public String Phone { get; set; }
        public String Department { get; set; }
        public String Type { get; set; }
        public String DOJ { get; set; }

        public String ApproverManagerId { get; set; }

        public String OTP { get; set; }
    }
}