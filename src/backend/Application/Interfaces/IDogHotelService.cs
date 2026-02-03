
using backend.Domain.GeoJson;

namespace backend.Application.Interfaces;

public interface IDogHotelService
{
    GeoJsonFeatureCollection GetAllHotels();
    GeoJsonFeature? GetHotelById(string id);
}
