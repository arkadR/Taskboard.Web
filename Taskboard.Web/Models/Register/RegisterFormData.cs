using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace Taskboard.Web.Models.Register
{
  public class RegisterFormData
  {
    [Required]
//    [RegularExpression(@"[\S]+[@][\S]+[.][\S]", ErrorMessage = "Invalid email address")]
    [EmailAddress(ErrorMessage = "Invalid email address")]
    public string Email { get; set; }

    [Required]
    [MinLength(3)]
    public string Username { get; set; }

    [Required]
    [MinLength(8)]
    public string Password { get; set; }

    [Display(Name = "Reenter password")]
    [Required]
    [Compare("Password", ErrorMessage = "Passwords do not match")]
    public string PasswordReenter { get; set; }
  }
}
