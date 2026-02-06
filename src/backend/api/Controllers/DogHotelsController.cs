using GeoJSON.Text.Feature;
using Microsoft.AspNetCore.Mvc;
using backend.Application.Interfaces;
using backend.Contracts;

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
            
            // Map DogHotel entities to DogHotelDto
            var hotelFeatures = hotels.Select(hotel => 
                new Feature(hotel.Location, new DogHotelDto
                {
                    Id = hotel.Id,
                    Name = hotel.Name,
                    Address = hotel.Address,
                    Description = hotel.Description,
                    Location = hotel.Location,
                })).ToList();

            var featureCollection = new FeatureCollection(hotelFeatures);
            
            return Ok(featureCollection);
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
        
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] DogHotelDto hotelDto)
        {

            if (!ModelState.IsValid)
            {
                return ValidationProblem(ModelState);
            }
            
            var createdHotel = await dogHotelService.CreateHotel(hotelDto);
            return CreatedAtAction(nameof(GetById), new { id = createdHotel.Id }, createdHotel);
        }

        [HttpPost("batch")]
        public async Task<IActionResult> CreateMany([FromBody] List<DogHotelDto> hotelDtos)
        {
            if (hotelDtos.Count == 0)
                return BadRequest("No hotels provided.");

            if (!ModelState.IsValid)
            {
                return ValidationProblem(ModelState);
            }

            var createdHotels = await dogHotelService.CreateHotels(hotelDtos);
            // Map created hotels to dtos
            var createdHotelDtos = createdHotels.Select(hotel => new DogHotelDto
            {
                Id = hotel.Id,
                Name = hotel.Name,
                Address = hotel.Address,
                Description = hotel.Description,
                Location = hotel.Location,
            }).ToList();
            // Return created items and their ids
            var ids = createdHotelDtos.Select(h => h.Id).ToArray();
            return Created($"api/[controller]/batch", new { count = ids.Length, ids, items = createdHotelDtos });
        }
    }
}
