using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Taskboard.Web.Models.Taskboard
{
  public class Task
  {
    public int Id { get; set; }
    public string Title { get; set; }
    public int ParentId { get; set; }
    public TaskState State { get; set; }
  }

  public enum TaskState
  {
    ToDo = 0,
    InProgress = 1,
    Done = 2
  }
}


