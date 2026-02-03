namespace backend.Domain.GeoJson;

public class GeoJsonFeatureCollection
{
    public string Type { get; set; } = "FeatureCollection";
    public IEnumerable<GeoJsonFeature> Features { get; set; } = new List<GeoJsonFeature>();
}