namespace backend.Domain.GeoJson;

public class GeoJsonPoint: GeoJsonGeometry
{
    public string Type { get; set; } = "Point";
    public double[] Coordinates { get; set; } = new double[2]; // [longitude, latitude]
}