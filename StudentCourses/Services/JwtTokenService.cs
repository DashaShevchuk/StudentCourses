using StudentCourses.Data.Entities.AppUeser;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using StudentCourses.Data.EfContext;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace StudentCourses.Services
{
    public interface IJwtTokenService
    {
        string CreateToken(DbUser user);
    }
    public class JwtTokenService : IJwtTokenService
    {
        private readonly UserManager<DbUser> _userManager;
        public JwtTokenService(UserManager<DbUser> userManager)
        {
            _userManager = userManager;
        }
        public string CreateToken(DbUser user)
        {
            var roles = _userManager.GetRolesAsync(user).Result;
            roles = roles.OrderBy(x => x).ToList();
            //var image = user.BaseProfile.Image;

            //if (image == null)
            //{
            //    image = _configuration.GetValue<string>("DefaultImage");
            //}
            List<Claim> claims = new List<Claim>()
            {
                new Claim("id",user.Id),
                new Claim("name",user.Name+" "+user.Surname+" "+user.LastName)
                //new Claim("image",image)
            };
            foreach (var el in roles)
            {
                claims.Add(new Claim("roles", el));
            }

            //var now = DateTime.UtcNow;
            var signinKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("hello-kitty-secret-key"));
            var signinCredentials = new SigningCredentials(signinKey, SecurityAlgorithms.HmacSha256);

            var jwt = new JwtSecurityToken(
                signingCredentials: signinCredentials,
                expires: DateTime.Now.AddDays(1),
                claims: claims
                );
            return new JwtSecurityTokenHandler().WriteToken(jwt);
        }
    }
}
