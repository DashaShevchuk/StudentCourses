using Microsoft.AspNetCore.Identity;
using StudentCourses.Data.EfContext;
using StudentCourses.Data.Entities.AppUeser;
using StudentCourses.Data.Interfaces;
using StudentCourses.Data.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace StudentCourses.Data.Repositories
{
    public class UserRepository : IUser
    {
        private readonly UserManager<DbUser> _userManager;
        private readonly EfDbContext _context;

        public UserRepository(EfDbContext context, UserManager<DbUser> userManager)
        {
            _context = context;
            _userManager = userManager;
        }

        public IEnumerable<DbUser> GetUser()
        {
            return _context.Users;
        }

        public async Task<bool> RegistrUserAsync(RegistrationModel model)
        {
            try
            {
                var user = new DbUser
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
                    return false;
                }
                res = await _userManager.AddToRoleAsync(user, "User");
                if (!res.Succeeded)
                {
                    return false;
                }

                return true;
            }
            catch (Exception ex)
            {
                return false;
            }
        }
    }
}
