namespace backend.Models.GeoJson
{
    public class GeoJsonFeatureCollection
    {
        public string Type { get; set; } = "FeatureCollection";
        public IEnumerable<GeoJsonFeature> Features { get; set; } = new List<GeoJsonFeature>();
    }
    
    public class GeoJsonFeature
    {
        public string Id { get; set; }
        public string Type { get; set; } = "Feature";
        public GeoJsonGeometry Geometry { get; set; }
        public object Properties { get; set; }
    }

    public class GeoJsonGeometry
    {
        public string Type { get; set; }
        public object Coordinates { get; set; }
    }
    
    public class GeoJsonPoint: GeoJsonGeometry
    {
        public string Type { get; set; } = "Point";
        public double[] Coordinates { get; set; } = new double[2]; // [longitude, latitude]
    }
}
