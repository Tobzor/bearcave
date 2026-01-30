using backend.Models;
using backend.Models.GeoJson;

namespace backend.Models
{
    public class DogHotel
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Address { get; set; }
        public GeoJsonPoint Geometry { get; set; }
        public string Description { get; set; }
    }
}
