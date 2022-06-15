using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.WebUtilities;
using StudentCourses.Data.EfContext;
using StudentCourses.Data.Entities.AppUeser;
using StudentCourses.Data.Interfaces.UserInterfaces;
using StudentCourses.Data.Models;
using StudentCourses.Services.EmailSender;
using StudentCourses.Services.ViewHellper;
using System.Collections.Generic;
using System.Net;
using System.Threading.Tasks;

namespace StudentCourses.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    public class RegistrationController : ControllerBase
    {
        private readonly IUserService userService;
        public RegistrationController(IUserService UserService)
        {
            userService = UserService;
        }

        [HttpPost("register")]
        [AllowAnonymous]
        public async Task<IActionResult> Registration([FromBody] RegistrationModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            HttpStatusCode registrationResult = await userService.RegistrUser(model);
            //тут надсилати емейл, створити метод який приймає той токен з ссилкі і конфіримить емейл користувача 

            return StatusCode((int)registrationResult);
        }

        [HttpGet("{token}")]
        public async Task<IActionResult> ConfirmEmail(string token)
        {
            HttpStatusCode confirmationEmailResult = await userService.ConfirmationEmail(token);

            return StatusCode((int)confirmationEmailResult);
        }
    }
}
