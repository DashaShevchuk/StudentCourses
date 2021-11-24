using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using StudentCourses.Data.Entities.AppUeser;
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
        private readonly UserManager<DbUser> _userManager;
        public RegistrationController(UserManager<DbUser> userManager)
        {
            _userManager = userManager;
        }
        [HttpPost("register")]
        [AllowAnonymous]
        public async Task<IActionResult> Registration([FromBody] RegistrationModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest("Input all data");
            }
            if (model.Password == model.PasswordConfirm)
            {
                DbUser user = new DbUser
                {
                    Name = model.Name,
                    LastName = model.LastName,
                    UserName = model.Name,
                    Email = model.Email,
                    PhoneNumber = model.PhoneNumber,
                    DateOfBirth = model.DateOfBirth
                };
                var res = await _userManager.CreateAsync(user, model.Password);
                if (!res.Succeeded)
                {
                    return BadRequest("Error with adding user");
                }
                res = await _userManager.AddToRoleAsync(user, "User");
                if (!res.Succeeded)
                {
                    return BadRequest("Error with addig role to user");
                }
                return Ok("User added successfully");
            }
            else
            {
                return BadRequest("Passwords do not match");
            }
        }
    }
}
