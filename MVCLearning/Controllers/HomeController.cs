using MVCLearning.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Web;
using System.Web.Mvc;

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
            var responseString = await client.GetStringAsync("https://api.sportradar.us/ncaafb-t1/2018/REG/2/schedule.json?api_key=tmgx6wjpu45uzjn732ke4swx");
            return Json(responseString,JsonRequestBehavior.AllowGet);

    }
}
}