using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Taskboard.Web.Models.Register;

namespace Taskboard.Web.Controllers
{
  public class LoginController : Controller
  {
    public IActionResult Index()
    {
      return View();
    }

    [HttpPost]
    public IActionResult Index(LoginFormData data)
    {
      if (ModelState.IsValid)
      {
        return RedirectToPage("Taskboard");
      }
      return View(data);
    }

  }
}