using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace StudentCourses.Services.ViewHellper
{
    public interface IViewHellper
    {
        //Task<string> RenderViewToStringAsync<TModel>(string viewName, TModel model);
        //Task<string> RenderViewToStringAsync<TModel>(IServiceProvider requestServices, string viewName, TModel model);
        //Task<string> RenderToStringAsync(string viewName, object model);
        //string RenderRazorViewToString(string viewName, object model);
        //Task<string> RenderPartialToStringAsync<TModel>(string partialName, TModel model);
        Task<string> RenderViewToStringAsync(string viewName, object model);
    }
}
