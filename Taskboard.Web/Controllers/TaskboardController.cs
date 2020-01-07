using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Taskboard.Web.DataAccess;
using Taskboard.Web.Models.Taskboard;

namespace Taskboard.Web.Controllers
{
  public class TaskboardController : Controller
  {
    private readonly ILogger<HomeController> _logger;
    private readonly ITaskboardDataAccess _taskboardDataAccess;

    public TaskboardController(ILogger<HomeController> logger, ITaskboardDataAccess taskboardDataAccess)
    {
      _logger = logger;
      _taskboardDataAccess = taskboardDataAccess;
    }

    //    public IActionResult Index() => View();

    //    [HttpGet]
    public IActionResult Index()
    {
      var projects = _taskboardDataAccess.GetProjects().ToList();
      var userStories = _taskboardDataAccess.GetUserStories().ToList();

      var viewModel = new TaskboardViewModel { Projects = projects, UserStories = userStories };
      return View(viewModel);
    }

    public IActionResult Notes()
    {
      return View();
    }

    public IActionResult Messages()
    {
      return View();
    }

    public IActionResult GitHistory()
    {
      return View();
    }
  }
}