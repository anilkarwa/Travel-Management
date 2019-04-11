using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Travel_Management.BusinessEntities
{
    public class TravelReimbursement
    {
        public long TravelId { get; set; }
        public String[] expenseDate { get; set; }
    }
}