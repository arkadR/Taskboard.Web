using System.Collections.Generic;
using Taskboard.Web.Models.Taskboard;

namespace Taskboard.Web.DataAccess
{
  internal class TaskboardDataAccessMock : ITaskboardDataAccess
  {
    public ICollection<Project> GetProjects() =>
      new List<Project>
      {
        new Project { Name = "Project1", Id = 1},
        new Project { Name = "Project2", Id = 2},
        new Project { Name = "Project3", Id = 3}
      };

    public ICollection<UserStory> GetUserStories()
    {
      return new List<UserStory>
      {
        new UserStory
        {
          Id = 1,
          ProjectId = 1,
          Title = "Some User Story 1",
          Tasks = new List<Task>
          {
            new Task {Id = 1, ParentId = 1, Title = "Task1", State = TaskState.ToDo},
            new Task {Id = 2, ParentId = 1, Title = "Task2", State = TaskState.ToDo},
            new Task {Id = 3, ParentId = 1, Title = "Task3", State = TaskState.InProgress},
            new Task {Id = 4, ParentId = 1, Title = "Task4", State = TaskState.Done},
          }
        }
      };
    }
  }
}
