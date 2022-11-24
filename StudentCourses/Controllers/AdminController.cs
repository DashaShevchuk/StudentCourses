using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using StudentCourses.Data.Interfaces.CoursesInterfaces;
using StudentCourses.Data.Interfaces.UserInterfaces;
using StudentCourses.Data.Models;
using StudentCourses.Hallpers;
using System;
using System.Linq;
using System.Net;
using System.Threading.Tasks;

namespace StudentCourses.Controllers
{
    [Authorize(Roles = "Admin")]
    [ApiController]
    [Produces("application/json")]
    [Route("api/[controller]")]
    public class AdminController : ControllerBase
    {
        private readonly IUserService userService;
        private readonly ICourseService courseService;

        public AdminController(IUserService UserService, ICourseService CourseService)
        {
            userService = UserService;
            courseService = CourseService;
        }

        [HttpPost]
        [Route("get/users")]
        public async Task<IActionResult> GetUsers([FromBody] UsersPageModel model)
        {
            var users = await userService.GetUsers(model);

            return Ok(users);
        }

        [HttpDelete]
        [Route("delete/user/{userId}")]
        public async Task<IActionResult> DeleteUser(string userId)
        {
            HttpStatusCode deleteUserResult = await userService.DeleteUser(userId);

            return StatusCode((int)deleteUserResult);
        }

        [HttpPost]
        [Route("edit/user/{userId}")]
        public async Task<IActionResult> EditUser([FromBody] EditUserModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            HttpStatusCode updateUserResult = await userService.EditUser(model);

            return StatusCode((int)updateUserResult);
        }

        [HttpPost]
        [Route("add/course")]
        public IActionResult AddCourse([FromForm] AddCourseModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            HttpStatusCode addCourseResult = courseService.AddCourse(model);

            return StatusCode((int)addCourseResult);
        }

        [HttpGet]
        [Route("get/courses")]
        public IActionResult GetCourses([FromBody] CoursesPageModel model)
        {
            //var claims = User.Claims;
            //var userId = claims.FirstOrDefault().Value;

            var courses = courseService.GetCourses(model);
            if (courses == null)
            {
                return BadRequest();
            }

            return Ok(courses);
        }

        [HttpDelete]
        [Route("delete/course/{courseId}")]
        public IActionResult DeleteCourse(int courseId)
        {
            HttpStatusCode deleteCourseResult = courseService.DeleteCourse(courseId);

            return StatusCode((int)deleteCourseResult);
        }

        [HttpPost]
        [Route("edit/course/{courseId}")]
        public IActionResult EditCourse([FromBody]EditCourseModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            HttpStatusCode editCourseResult = courseService.EditCourse(model);

            return StatusCode((int)editCourseResult);
        }

        [HttpPost("change-course-image")]
        public IActionResult ChangeImage([FromForm] ChangeImage model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            HttpStatusCode changeImageResult = courseService.ChangeImage(model);

            return StatusCode((int)(changeImageResult));
        }

        [HttpGet]
        [Route("get/usercourses")]
        public IActionResult GetUserCourses(string userId)
        {
            var courses = courseService.GetUserCourses(userId);
            if (courses == null)
            {
                return BadRequest();
            }

            return Ok(courses);
        }
    }
}


