using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Travel_Management.BusinessEntities
{
    public class TravelExpense
    {
        public long ExpenseId { get; set; }
        public String ExpenseType { get; set; }
        public String Amount { get; set; }
        public String Description { get; set; }
        public String ExpenseImage { get; set; }
        public String ReimbursementId {get; set;}


    }
}