using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using StudentCourses.Data.Interfaces.CoursesInterfaces;
using StudentCourses.Data.Interfaces.UserInterfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;

namespace StudentCourses.Controllers
{
    [Authorize(Roles = "User")]
    [ApiController]
    [Produces("application/json")]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        private readonly ICourseService courseService;
        private readonly IUserService userService;

        public UserController(ICourseService CourseService, IUserService UserService)
        {
            courseService = CourseService;
            userService = UserService;
        }

        [HttpGet]
        [Route("get/allcourses")]
        public IActionResult GetAllCourses()
        {
            var courses = courseService.GetCourses();
            if (courses == null)
            {
                return BadRequest();
            }

            return Ok(courses);
        }

        [HttpPost]
        [Route("subscribe-course/{courseId}")]
        public async Task<IActionResult> SubscribeCourse(int courseId)
        {
            HttpStatusCode subscribeCourseResult = await userService.SubscribeCourse(courseId);

            return StatusCode((int)subscribeCourseResult);
        }

        [HttpPost]
        [Route("unsubscribe-course/{courseId}")]
        public IActionResult UnsubscribeCourse(int courseId)
        {
            HttpStatusCode unsubscribeCourseResult = userService.UnsubscribeCourse(courseId);

            return StatusCode((int)unsubscribeCourseResult);
        }

        [HttpGet]
        [Route("get/mycourses")]
        public IActionResult GetMyCourses()
        {
            var claims = User.Claims;
            var userId = claims.FirstOrDefault().Value;

            var courses = courseService.GetUserCourses(userId);
            if (courses == null)
            {
                return BadRequest();
            }

            return Ok(courses);
        }
    }
}
