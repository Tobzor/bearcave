using GeoJSON.Net.Geometry;
using Microsoft.EntityFrameworkCore;
using backend.Domain.Entities;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Newtonsoft.Json;
using JsonSerializer = System.Text.Json.JsonSerializer;

namespace backend.Infrastructure.Persistence;

public class DogHotelsDb : DbContext
{
    public DogHotelsDb(DbContextOptions<DogHotelsDb> options)
        : base(options)
    { }
    
    public DbSet<DogHotel> DogHotels => Set<DogHotel>();
    
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        var pointConverter = new ValueConverter<Point?, string>(
            v => JsonConvert.SerializeObject(v),
            v => JsonConvert.DeserializeObject<Point>(v));

        modelBuilder.Entity<DogHotel>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Name).IsRequired().HasMaxLength(200);
            entity.Property(e => e.Address).IsRequired().HasMaxLength(300);
            entity.Property(e => e.Location)
                .HasConversion(pointConverter)
                .HasColumnType("json");
        });
    }
}
