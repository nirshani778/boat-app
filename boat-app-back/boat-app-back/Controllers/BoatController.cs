using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using boat_app_back.Models;
using System.Net;
using boat_app_back.Services.BoatService;

namespace boat_app_back.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BoatController : ControllerBase
    {
        private readonly IBoatService _boatService;

        public BoatController(IBoatService boatService)
        {
            _boatService = boatService;
        }

        [HttpGet]
        public async Task<ActionResult<List<Boat>>> GetAllBoats()
        {
            var result = await _boatService.GetAllBoats();
            return Ok(result);
            //return Ok("test");
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Boat>> GetBoat(int id)
        {
            var result = await _boatService.GetBoat(id);
            if (result == null)
                return NotFound("sorry but this boat is not exist.");

            return Ok(result);
        }

        [HttpPost]
        public async Task<ActionResult<ServiceResponse<bool>>> AddBoat([FromBody]Boat boat)
        {
            var result = await _boatService.AddBoat(boat);
            return Ok(result);
        }

        [HttpPut]
        public async Task<ActionResult<ServiceResponse<bool>>> UpdateBoat([FromBody] Boat boat)
        {
            var result = await _boatService.UpdateBoat(boat);
            if (result == null)
                return NotFound(new ServiceResponse<bool> { Data = false, Success = false, Message = "sorry but the boat didn't saved." });

            return Ok(result);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<ServiceResponse<bool>>> DeleteBoat(int id)
        {
            var result = await _boatService.DeleteBoat(id);
            if (result.Success == false)
                return NotFound(result);

            return Ok(result);
        }

    }
}
