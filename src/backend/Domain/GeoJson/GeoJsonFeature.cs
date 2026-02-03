namespace backend.Domain.GeoJson;

public class GeoJsonFeature
{
    public string Id { get; set; }
    public string Type { get; set; } = "Feature";
    public GeoJsonGeometry Geometry { get; set; }
    public object Properties { get; set; }
}