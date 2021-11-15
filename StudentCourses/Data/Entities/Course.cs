using FurnitureStore.Data.Entities.AppUeser;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace StudentCourses.Data.Entities
{
    public class Course
    {
        public int Id { get; set; }
        public string TimeCommitment { get; set; }
        public string Pace { get; set; }
        public string CourseLanguage { get; set; }
        public string VideoTranscript { get; set; }
        public string Platform { get; set; }
        public DateTime DateStart { get; set; }
        public DateTime DeteFinish { get; set; }
        public float Price { get; set; }
        public int CountListeners { get; set; }
        public string IsOnline { get; set; }
        public string Description { get; set; }
        public string Image { get; set; }
        public virtual ICollection <DbUser> Users { get; set; }
        public Duration Duration { get; set; }
        public Dificalty Dificalty { get; set; }
        public Subject Subject { get; set; }
    }
}
