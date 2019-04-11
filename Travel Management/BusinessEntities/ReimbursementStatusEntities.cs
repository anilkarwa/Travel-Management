using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Travel_Management.BusinessEntities
{
    public class ReimbursementStatusEntities
    {

        public String ReimbursementId { get; set; }
        public String SubmittedDate { get; set; }
        public Decimal Amount { get; set; }
        public String Status { get; set; }

        public String EmpId { get; set; }

        public String FirstName { get; set; }
        public String LastName { get; set; }

        public long TravelId { get; set; }
        public String RejectReason { get; set; }

    }
}