using backend.Application.Interfaces;
using backend.Contracts;
using backend.Domain.Entities;

namespace backend.Application.Services;

    public class DogHotelService(IDogHotelRepository repo) : IDogHotelService
    {
        public async Task<List<DogHotel>> GetAllHotels()
        {
            return await repo.GetAllAsync();;
        }

        public async Task<DogHotel?> GetHotelById(string id)
        {
            throw new NotImplementedException();
        }

        public async Task<DogHotel> CreateHotel(DogHotelDto hotel)
        {
            throw new NotImplementedException();
        }

        public async Task<List<DogHotel>> CreateHotels(List<DogHotelDto> hotels)
        {
            throw new NotImplementedException();
        }
    }
