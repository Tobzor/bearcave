using System.Text.Json.Serialization;
using GeoJSON.Text.Geometry;

namespace backend.Contracts;

public class DogHotelDto
{
    public required string Id { get; set; }
    
    public required string Name { get; set; }
    
    public string? Address { get; set; }

    public Point? Location { get; set; }
    
    public string? Description { get; set; }
}
