using System;
using System.Collections.Generic;

namespace Taskboard.Web.Models.Taskboard
{
  public class TaskboardViewModel
  {
    public List<Project> Projects { get; set; }
    public List<UserStory> UserStories { get; set; }
  }
}
