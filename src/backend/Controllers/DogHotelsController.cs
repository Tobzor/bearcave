using Microsoft.AspNetCore.Mvc;
using backend.Application.Interfaces;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class DogHotelsController(IDogHotelService dogHotelService) : ControllerBase
    {
        [HttpGet]
        public IActionResult GetAll()
        {
            var hotels = dogHotelService.GetAllHotels();
            return Ok(hotels);
        }
        
        [HttpGet("{id}")]
        public IActionResult GetById(string id)
        {
            var hotel = dogHotelService.GetHotelById(id);
            if (hotel == null)
            {
                return NotFound();
            }
            return Ok(hotel);
        }
    }
}
