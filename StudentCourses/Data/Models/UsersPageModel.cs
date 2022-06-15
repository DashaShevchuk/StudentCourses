using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace StudentCourses.Data.Models
{
    public class UsersPageModel
    {
        public int Page { get; set; }
        public int PageSize { get; set; }
        public string SortOrder { get; set; }
        public string ColumnKey { get; set; }
        public string SearchString { get; set; }
    }
}
