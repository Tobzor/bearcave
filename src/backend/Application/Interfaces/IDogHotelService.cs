
using backend.Domain.Entities;

namespace backend.Application.Interfaces;

public interface IDogHotelService
{
    Task<List<DogHotel>> GetAllHotels();
    Task<DogHotel?> GetHotelById(string id);
}
