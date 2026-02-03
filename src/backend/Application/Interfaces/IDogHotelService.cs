
using backend.Domain.GeoJson;

namespace backend.Application.Interfaces;

public interface IDogHotelService
{
    Task<GeoJsonFeatureCollection> GetAllHotels();
    Task<GeoJsonFeature?> GetHotelById(string id);
}
