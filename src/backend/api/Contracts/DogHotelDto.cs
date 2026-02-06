using GeoJSON.Net.Geometry;
using Newtonsoft.Json;

namespace backend.Contracts;

public class DogHotelDto
{
    [JsonProperty(PropertyName = "id")]
    public required string Id { get; init; }
    
    [JsonProperty(PropertyName = "name")]
    public required string Name { get; init; }
    
    [JsonProperty(PropertyName = "address")]
    public string? Address { get; init; }
    
    [JsonProperty(PropertyName = "location")]
    public Point? Location { get; init; }
    
    [JsonProperty(PropertyName = "description")]
    public string? Description { get; init; }
}
