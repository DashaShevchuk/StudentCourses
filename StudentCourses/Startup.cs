using StudentCourses.Data.EfContext;
using StudentCourses.Data.Entities.AppUeser;
using StudentCourses.Services;
using StudentCourses.Data.SeedData;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using System;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.HttpOverrides;
using Microsoft.OpenApi.Models;
using System.Collections.Generic;
using System.Reflection;
using System.IO;
using Microsoft.Extensions.FileProviders;
using Microsoft.AspNetCore.SpaServices.ReactDevelopmentServer;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Hosting;
using Newtonsoft.Json.Serialization;
using Microsoft.AspNetCore.Mvc;
using StudentCourses.Data.Interfaces;
using StudentCourses.Data.Repositories;

namespace StudentCourses
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddControllers();
            services.AddCors();

            services.AddDbContext<EfDbContext>(options =>
            options.UseSqlServer(
                Configuration.GetConnectionString("StudentCoursesDataBase")));

            services.AddIdentity<DbUser, DbRole>(options => options.Stores.MaxLengthForKeys = 128)
                .AddEntityFrameworkStores<EfDbContext>()
                .AddDefaultTokenProviders();

            services.AddTransient<IJwtTokenService, JwtTokenService>();

            var signingKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Configuration.GetValue<string>("SecretPhrase")));

            services.Configure<IdentityOptions>(options =>
            {
                // Default Password settings.
                options.Password.RequireNonAlphanumeric = false;
                options.Password.RequiredUniqueChars = 0;
                options.User.RequireUniqueEmail = true;
                //options.Tokens.
            });

            services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            }).AddJwtBearer(cfg =>
            {
                cfg.RequireHttpsMetadata = false;
                cfg.SaveToken = true;
                cfg.TokenValidationParameters = new TokenValidationParameters()
                {
                    IssuerSigningKey = signingKey,
                    ValidateAudience = false,
                    ValidateIssuer = false,
                    ValidateLifetime = true,
                    ValidateIssuerSigningKey = true,
                    // set ClockSkew is zero
                    ClockSkew = TimeSpan.Zero
                };
            });

            services.AddTransient<IUser, UserRepository>();

            //services.AddSwaggerGen(c =>
            //{
            //    c.SwaggerDoc("v1", new OpenApiInfo
            //    {
            //        Version = "v1",
            //        Title = "StudnetCourses API",
            //        Description = "A project  ASP.NET Core Web API",
            //        TermsOfService = new Uri("https://example.com/terms"),
            //        Contact = new OpenApiContact
            //        {
            //            Name = "Team EJournal",
            //            Email = string.Empty,
            //        },

            //    });
            //    c.AddSecurityDefinition("Bearer",
            //        new OpenApiSecurityScheme
            //        {
            //            Description = "JWT Authorization header using the Bearer scheme.",
            //            Type = SecuritySchemeType.Http,
            //            Scheme = "bearer"
            //        });
            //    c.AddSecurityRequirement(new OpenApiSecurityRequirement{
            //        {
            //            new OpenApiSecurityScheme{
            //                Reference = new OpenApiReference{
            //                    Id = "Bearer",
            //                    Type = ReferenceType.SecurityScheme
            //                }
            //            },new List<string>()
            //        }
            //    });
            //    var xmlFile = $"{Assembly.GetExecutingAssembly().GetName().Name}.xml";
            //    var xmlPath = Path.Combine(AppContext.BaseDirectory, xmlFile);
            //    if (File.Exists(xmlPath))
            //    {
            //        c.IncludeXmlComments(xmlPath);
            //    }
            //});

            services.AddControllersWithViews();


            //services.AddSession();

            // In production, the React files will be served from this directory
            services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = "ClientApp/build";
            });
            services.AddMvc(options => options.EnableEndpointRouting = false).AddNewtonsoftJson(options =>
            {
                options.SerializerSettings.ContractResolver = new DefaultContractResolver();
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            //app.UseSwagger();
            //app.UseSwaggerUI(c =>
            //{
            //    c.SwaggerEndpoint("/swagger/v1/swagger.json", "My API V1");
            //});

            app.UseCors(
               builder => builder.AllowAnyHeader().AllowAnyMethod().AllowAnyOrigin());

            app.UseForwardedHeaders(new ForwardedHeadersOptions
            {
                ForwardedHeaders = ForwardedHeaders.XForwardedFor | ForwardedHeaders.XForwardedProto
            });

            app.UseAuthentication();

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Error");
            }



            app.UseAuthentication();
            app.UseRouting();
            app.UseAuthorization();
            app.UseStaticFiles();
            app.UseSpaStaticFiles();
            app.UseHttpsRedirection();


            app.UseMvc(endpoints =>
            {
                endpoints.MapRoute(
                    name: "default",
                    template: "{controller}/{action=Index}/{id?}");
            });

            app.UseSpa(spa =>
            {
                spa.Options.SourcePath = "ClientApp";

                if (env.IsDevelopment())
                {
                    spa.UseReactDevelopmentServer(npmScript: "start");
                }
            });
           //Seed.SeedData(app.ApplicationServices, env, this.Configuration).Wait();
        }
    }
}