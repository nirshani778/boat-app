using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.WebUtilities;
using System.Security.Claims;
using System.Text;

namespace boat_app_back.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly DataContext _context;
        private readonly IAuthService _authService;

        public AuthController(DataContext context, IAuthService authService)
        {
            _context = context;
            _authService = authService;
        }

        [HttpPost("register/{email}/{password}")]
        public async Task<ActionResult<ServiceResponse<Guid>>> Register(string email, string password)
        {
            var response = await _authService.Register(new User
            {
                Email = email
            }, password);

            if (!response.Success)
            {
                return BadRequest(response);
            }
            return Ok(response);
        }

        [HttpPost("login/{email}/{password}")]
        public async Task<ActionResult<ServiceResponse<string>>> Login(string email, string password)
        {
            var response = await _authService.Login(email, password);
            if (!response.Success)
            {
                return BadRequest(response);
            }
            return Ok(response);
        }

        [HttpGet("token-expired/{tokenString}")]
        public async Task<ActionResult<ServiceResponse<bool>>> IsTokenExpired(string tokenString)
        {
            var response = await _authService.IsTokenExpired(tokenString);

            return Ok(response);
        }
    }
}
