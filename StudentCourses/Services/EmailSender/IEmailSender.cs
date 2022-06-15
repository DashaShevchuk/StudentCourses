using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace StudentCourses.Services.EmailSender
{
    public interface IEmailSender
    {
        void SendEmail(string userEmail, string subject, string text);
    }
}
