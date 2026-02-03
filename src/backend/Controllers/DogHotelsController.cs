using Microsoft.AspNetCore.Mvc;
using backend.Application.Interfaces;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class DogHotelsController(IDogHotelService dogHotelService) : ControllerBase
    {
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var hotels = await dogHotelService.GetAllHotels();
            return Ok(hotels);
        }
        
        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(string id)
        {
            var hotel = await dogHotelService.GetHotelById(id);
            if (hotel == null)
            {
                return NotFound();
            }
            return Ok(hotel);
        }
    }
}
