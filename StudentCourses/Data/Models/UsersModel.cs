using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace StudentCourses.Data.Models
{
    public class UsersModel
    {
        public string Id { get; set; }
        
        public string Name { get; set; }
        
        public string LastName { get; set; }
        
        public string TextDateOfBirth { get; set; }
        
        public DateTime DateOfBirth { get; set; }
        
        public string Email { get; set; }
        
        public string PhoneNumber { get; set; }

        public IEnumerable<GetCoursesModel> UserCourses { get; set; }
    }
}
