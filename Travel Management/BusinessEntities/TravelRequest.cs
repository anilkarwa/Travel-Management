using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Travel_Management.BusinessEntities
{
    public class TravelRequest
    {

        public long id { get; set; }
        public long TravelId { get; set; }
        public String EmpId { get; set; }
        public String FirstName { get; set; }
        public String LastName { get; set; }

        public String Email { get; set; }
        public String Phone { get; set; }

        public string Department { get; set; }
        public String TravellingFromCountry { get; set; }
        public String TravellingFromState { get; set; }
        public String TravellingFromCity { get; set; }
        public String TravellingToCountry { get; set; }
        public String TravellingToState { get; set; }
        public String TravellingToCity { get; set; }
        public String TravelDate { get; set; }
        public String ReturnDate { get; set; }
        public int NoOfDays { get; set; }
        public String TravelReason { get; set; }
        public String AppliedDate { get; set; }
        public String Status { get; set; }
        public String ApproverManagerId { get; set; }
        public String RejectReason { get; set; }

    }
}