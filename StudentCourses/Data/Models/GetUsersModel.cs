using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace StudentCourses.Data.Models
{
    public class GetUsersModel
    {
        public List<UsersModel> Users { get; set; }

        public int TotalCount { get; set; }
    }
}
