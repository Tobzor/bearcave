using backend.Domain.GeoJson;

namespace backend.Contracts;

public class DogHotelDto
{
    public string Id { get; set; }
    public string Name { get; set; }
    public string Address { get; set; }
    public GeoJsonPoint Geometry { get; set; }
    public string Description { get; set; }
}
