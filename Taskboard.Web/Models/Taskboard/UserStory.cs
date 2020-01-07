using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Taskboard.Web.Models.Taskboard
{
  public class UserStory
  {
    public int Id { get; set; }
    public string Title { get; set; }
    public int ProjectId { get; set; }
    public IReadOnlyCollection<Task> Tasks { get; set; }
  }
}
