using System.Collections.Generic;
using System.Linq;
using backend.Application.Interfaces;
using backend.Contracts;
using backend.Domain.Entities;
using backend.Domain.GeoJson;

namespace backend.Application.Services;

    public class DogHotelService(IDogHotelRepository repo) : IDogHotelService
    {
        public async Task<GeoJsonFeatureCollection> GetAllHotels()
        {
            var hotels = await repo.GetAllAsync();
            return new GeoJsonFeatureCollection
            {
                Features = hotels.Select(h => new GeoJsonFeature
                {
                    Geometry = h.Geometry,
                    Properties = new DogHotelDto()
                    {
                        Id = h.Id,
                        Name = h.Name,
                        Address = h.Address,
                        Geometry = h.Geometry,
                        Description = h.Description
                    }
                }).ToList()
            };
        }

        public async Task<GeoJsonFeature?> GetHotelById(string id)
        {
            throw new NotImplementedException();
        }
    }
