using System.Collections.Generic;
using System.Linq;
using backend.Application.Interfaces;
using backend.Contracts;
using backend.Domain.Entities;
using backend.Domain.GeoJson;

namespace backend.Application.Services;

    public class DogHotelService : IDogHotelService
    {
        private static readonly List<DogHotel> Hotels = new()
        {
            new DogHotel
            {
                Id = 1,
                Name = "Paws Palace",
                Address = "123 Bark St",
                Geometry = new GeoJsonPoint() { Coordinates = new[] { -74.0060, 40.7128 } },
                Description = "Luxury dog hotel in the city center."
            },
            new DogHotel
            {
                Id = 2,
                Name = "Canine Comforts",
                Address = "456 Woof Ave",
                Geometry = new GeoJsonPoint { Coordinates = new[] { -74.0050, 40.7138 } },
                Description = "Spacious rooms and daily walks."
            }
        };

        public GeoJsonFeatureCollection GetAllHotels()
        {
            return new GeoJsonFeatureCollection
            {
                Features = Hotels.Select(h => new GeoJsonFeature
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
                })
            };
        }

        public GeoJsonFeature? GetHotelById(string id)
        {
            throw new NotImplementedException();
        }
    }
