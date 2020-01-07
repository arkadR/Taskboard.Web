using Microsoft.AspNetCore.Mvc;
using Taskboard.Web.Models.Register;

namespace Taskboard.Web.Controllers
{
  public class RegisterController : Controller
  {
    public IActionResult Index()
    {
      return View();
    }

    [HttpPost]
    public IActionResult Index(RegisterFormData data)
    {
      if (!ModelState.IsValid)
      {
        return View(data);
      }
      //TODO[AR]: Logic
      return RedirectToPage("Taskboard");
    }
  }
}