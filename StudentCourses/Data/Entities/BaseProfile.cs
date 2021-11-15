using FurnitureStore.Data.Entities.AppUeser;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace StudentCourses.Data.Entities
{
    public class BaseProfile
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public string Surname { get; set; }
        public string LastName { get; set; }
        public string Image { get; set; }
        //public DbUser DbUser { get; set; }
    }
}
