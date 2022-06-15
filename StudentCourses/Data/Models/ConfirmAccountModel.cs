using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace StudentCourses.Data.Models
{
    public class ConfirmAccountModel
    {
        public string UserName { get; set; }
        public string ConfirmationLink { get; set; }
    }
}
