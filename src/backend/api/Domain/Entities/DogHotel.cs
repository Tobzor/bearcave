using System.ComponentModel.DataAnnotations;
using GeoJSON.Text.Geometry;

namespace backend.Domain.Entities;

public class DogHotel
{
    [MaxLength(40)]
    public required string Id { get; set; }
    public required string Name { get; set; }
    public string? Address { get; set; }
    public Point? Location { get; set; } = null;
    [MaxLength(500)]
    public string? Description { get; set; }
}
