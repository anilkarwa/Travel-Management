using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Travel_Management.BusinessEntities
{
    public class Countries
    {
        public long id { get; set; }
        public String CountryName { get; set; }

        public String StateName { get; set; }

        public String CityName { get; set; }
    }
}