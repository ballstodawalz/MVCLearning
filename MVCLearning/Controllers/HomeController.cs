using MVCLearning.Models;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Web;
using System.Web.Mvc;
using System.Web.Script.Serialization;

namespace MVCLearning.Controllers
{
    public class HomeController : Controller
    {
        private static readonly HttpClient client = new HttpClient();

        // GET: Home
        public ViewResult Index()
        {
            return View();
        }


        public async System.Threading.Tasks.Task<JsonResult> GetSportsDataAsync()
        {
            int gameWeek = GetGameWeek();
            var responseString = await client.GetStringAsync($"https://api.sportradar.us/ncaafb-t1/2018/REG/{gameWeek}/schedule.json?api_key=tmgx6wjpu45uzjn732ke4swx");
            return Json(responseString, JsonRequestBehavior.AllowGet);

        }

        public async System.Threading.Tasks.Task<JsonResult> GetTeams()
        {
            var responseString = await client.GetStringAsync("http://api.sportradar.us/ncaafb-t1/teams/FBS/hierarchy.json?api_key=tmgx6wjpu45uzjn732ke4swx");
            return Json(responseString, JsonRequestBehavior.AllowGet);

        }

        public int GetGameWeek()
        {
            if (245 > DateTime.Now.DayOfYear && DateTime.Now.DayOfYear > 237)
            {
                return 1;
            }
            else if (252 > DateTime.Now.DayOfYear && DateTime.Now.DayOfYear > 245)
            {
                return 2;
            }
            else if (259 > DateTime.Now.DayOfYear && DateTime.Now.DayOfYear > 252)
            {
                return 3;
            }
            else if (266 > DateTime.Now.DayOfYear && DateTime.Now.DayOfYear > 259)
            {
                return 4;
            }
            else if (273 > DateTime.Now.DayOfYear && DateTime.Now.DayOfYear > 266)
            {
                return 5;
            }
            else if (280 > DateTime.Now.DayOfYear && DateTime.Now.DayOfYear > 273)
            {
                return 6;
            }
            else if (287 > DateTime.Now.DayOfYear && DateTime.Now.DayOfYear > 280)
            {
                return 7;
            }
            else if (294 > DateTime.Now.DayOfYear && DateTime.Now.DayOfYear > 287)
            {
                return 8;
            }
            else if (301 > DateTime.Now.DayOfYear && DateTime.Now.DayOfYear > 294)
            {
                return 9;
            }
            else if (308 > DateTime.Now.DayOfYear && DateTime.Now.DayOfYear > 301)
            {
                return 10;
            }
            else if (315 > DateTime.Now.DayOfYear && DateTime.Now.DayOfYear > 308)
            {
                return 11;
            }
            else if (322 > DateTime.Now.DayOfYear && DateTime.Now.DayOfYear > 315)
            {
                return 12;
            }
            else if (329 > DateTime.Now.DayOfYear && DateTime.Now.DayOfYear > 322)
            {
                return 13;
            }
            else if (336 > DateTime.Now.DayOfYear && DateTime.Now.DayOfYear > 329)
            {
                return 14;
            }
            else if (343 > DateTime.Now.DayOfYear && DateTime.Now.DayOfYear > 336)
            {
                return 15;
            }
            else if (350 > DateTime.Now.DayOfYear && DateTime.Now.DayOfYear > 343)
            {
                return 16;
            }
            else if (357 > DateTime.Now.DayOfYear && DateTime.Now.DayOfYear > 350)
            {
                return 17;
            }
            else if (364 > DateTime.Now.DayOfYear && DateTime.Now.DayOfYear > 357)
            {
                return 18;
            }
            else if (6 > DateTime.Now.DayOfYear && DateTime.Now.DayOfYear > 364)
            {
                return 19;
            }
            else if (13 > DateTime.Now.DayOfYear && DateTime.Now.DayOfYear > 6)
            {
                return 20;
            }
            else
            {
                return 21;
            }


        }
    }
}