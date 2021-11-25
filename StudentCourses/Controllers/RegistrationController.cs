using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using StudentCourses.Data.Entities.AppUeser;
using StudentCourses.Data.Interfaces;
using StudentCourses.Data.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace StudentCourses.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    public class RegistrationController : ControllerBase
    {
        private readonly IUser users;
        public RegistrationController(UserManager<DbUser> userManager, IUser Users)
        {
            users = Users;
        }
        [HttpPost("register")]
        [AllowAnonymous]
        public async Task<IActionResult> Registration([FromBody] RegistrationModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest("Invalid data");
            }
            if (model.Password == model.PasswordConfirm)
            {
                bool registrationResult = await users.RegistrUserAsync(model);

                if (registrationResult == true)
                {
                    return Ok();
                }
                else
                {
                    return BadRequest("User dont added");
                }
            }
            else
            {
                return BadRequest("Passwords do not match");
            }
        }
    }
}
