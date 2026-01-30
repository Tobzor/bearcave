using backend.Models.GeoJson;

namespace backend.Services
{
    public interface IDogHotelService
    {
        GeoJsonFeatureCollection GetAllHotels();
    }
}
