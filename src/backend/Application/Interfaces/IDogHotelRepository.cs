using backend.Domain.Entities;

namespace backend.Application.Interfaces;

public interface IDogHotelRepository
{
    Task<List<DogHotel>> GetAllAsync();
    Task<DogHotel?> GetByIdAsync(string id);
    Task AddAsync(DogHotel hotel);
    Task UpdateAsync(DogHotel hotel);
    Task DeleteAsync(string id);
}