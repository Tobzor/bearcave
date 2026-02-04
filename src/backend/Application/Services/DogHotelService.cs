using backend.Application.Interfaces;
using backend.Domain.Entities;
using GeoJSON.Net.Feature;

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
    }
