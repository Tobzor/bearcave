using backend.Domain.GeoJson;

namespace backend.Domain.Entities;

public class DogHotel
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string Address { get; set; }
    public GeoJsonPoint Geometry { get; set; }
    public string Description { get; set; }
}
