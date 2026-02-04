using GeoJSON.Net.Geometry;

namespace backend.Contracts;

public class DogHotelDto
{
    public required string Id { get; init; }
    public required string Name { get; init; }
    public string? Address { get; init; }
    public Point? Location { get; init; }
    public string? Description { get; init; }
}
