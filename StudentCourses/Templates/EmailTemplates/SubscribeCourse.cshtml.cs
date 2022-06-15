using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace StudentCourses.Templates.EmailTemplates
{
    public class SubscribeTemplateModel : PageModel
    {
        public string UserName { get; set; }
        public string CourseName { get; set; }
        public string ShortDescription { get; set; }
        public void OnGet()
        {
        }
    }
}
