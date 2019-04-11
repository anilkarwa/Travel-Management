using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Travel_Management.BusinessEntities
{
    public class ManagerMapping
    {

        public long MappingId { get; set; }
        public string EmpId { get; set; }
        public string ManagerId1 { get; set; }
        public string ManagerId2 { get; set; }
        public string ManagerId3 { get; set; }
        public string ManagerId4 { get; set; }
        public string ManagerId5 { get; set; }

        public string ManagerName1 { get; set; }
        public string ManagerName2 { get; set; }
        public string ManagerName3 { get; set; }
        public string ManagerName4 { get; set; }
        public string ManagerName5 { get; set; }

        public string FirstName { get; set; }
        public string LastName { get; set; }
    }
}