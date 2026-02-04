using Microsoft.AspNetCore.Mvc;
using backend.Application.Interfaces;
using backend.Contracts;
using GeoJSON.Net.Feature;
using GeoJSON.Net.Geometry;
using NuGet.Protocol;

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
    }
}
