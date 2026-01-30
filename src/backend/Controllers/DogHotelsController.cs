using Microsoft.AspNetCore.Mvc;
using backend.Services;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class DogHotelsController : ControllerBase
    {
        private readonly IDogHotelService _dogHotelService;

        public DogHotelsController(IDogHotelService dogHotelService)
        {
            _dogHotelService = dogHotelService;
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            var hotels = _dogHotelService.GetAllHotels();
            return Ok(hotels);
        }
    }
}
