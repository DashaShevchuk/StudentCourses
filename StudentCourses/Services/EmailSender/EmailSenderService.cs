

using System;
using System.Net;
using System.Net.Mail;
using System.Text;

namespace StudentCourses.Services.EmailSender
{
    public class EmailSenderService : IEmailSender
    {
        public void SendEmail(string userEmail, string subject, string text)
        {
            MailMessage msg = new MailMessage();

            msg.From = new MailAddress("student.courses00@gmail.com");
            msg.To.Add(userEmail);
            msg.Subject = subject;
            msg.IsBodyHtml = true;
            msg.Body = text;


            using (SmtpClient client = new SmtpClient())
            {
                client.EnableSsl = true;
                client.UseDefaultCredentials = false;
                client.Credentials = new NetworkCredential("student.courses00@gmail.com", "Qwerty-1");
                client.Host = "smtp.gmail.com";
                client.Port = 587;fix
                client.DeliveryMethod = SmtpDeliveryMethod.Network;

                try
                {
                    client.Send(msg);
                }
                catch(Exception ex)
                {

                }
            }
        }
    }
}
