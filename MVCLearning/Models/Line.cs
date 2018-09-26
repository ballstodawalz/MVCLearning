using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MVCLearning.Models
{
    public class Line
    {
        public string id { get; set; }
        public DateTime scheduled { get; set; }
        public string status { get; set; }
        public competitors competitors { get; set; }
        public consensus consensus { get; set; }
    }
}