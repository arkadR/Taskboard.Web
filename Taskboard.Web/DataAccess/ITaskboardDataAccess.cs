using System.Collections.Generic;
using Taskboard.Web.Models.Taskboard;

namespace Taskboard.Web.DataAccess
{
  public interface ITaskboardDataAccess
  {
    ICollection<Project> GetProjects();
    ICollection<UserStory> GetUserStories();
  }
}
