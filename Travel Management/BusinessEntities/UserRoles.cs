using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Travel_Management.BusinessEntities
{
    public class UserRoles
    {

        public String Empid { get; set; }

        public Boolean empAdd { get; set; }
        public Boolean empEdit { get; set; }
        public Boolean empDelete { get; set; }
        public Boolean empPrint { get; set; }
        public Boolean empView { get; set; }

        public Boolean managerAdd { get; set; }
        public Boolean managerEdit { get; set; }
        public Boolean managerDelete { get; set; }
        public Boolean managerPrint { get; set; }
        public Boolean managerView { get; set; }


        public Boolean TravelAdd { get; set; }
        public Boolean TravelEdit { get; set; }
        public Boolean TravelDelete { get; set; }
        public Boolean TravelPrint { get; set; }
        public Boolean TravelView { get; set; }



        public Boolean ReportAdd { get; set; }
        public Boolean ReportEdit { get; set; }
        public Boolean ReportDelete { get; set; }
        public Boolean ReportPrint { get; set; }
        public Boolean ReportView { get; set; }



        public Boolean rolesAdd { get; set; }
        public Boolean rolesEdit { get; set; }
        public Boolean rolesDelete { get; set; }
        public Boolean rolesPrint { get; set; }
        public Boolean rolesView { get; set; }

    }
}