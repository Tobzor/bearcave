namespace backend.Domain.GeoJson;

public class GeoJsonPoint: GeoJsonGeometry
{
    public readonly string Type = "Point";
    public double[] Coordinates { get; set; } = new double[2]; // [longitude, latitude]
    
    public double Longitude
    {
        get => Coordinates[0];
        set => Coordinates[0] = value;
    }
    
    public double Latitude
    {
        get => Coordinates[1];
        set => Coordinates[1] = value;
    }
}