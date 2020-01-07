using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Taskboard.Web.Models.Register
{
  public class LoginFormData
  {
    [Required(ErrorMessage = "Please enter the username"), MinLength(3)]
    [DataType(DataType.Text)]
    public string Username { get; set; }

    [Required(ErrorMessage = "Please enter the password"), MinLength(8)]
    public string Password { get; set; }
  }
}
