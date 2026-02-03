using backend.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace backend.Infrastructure.Persistence;

public class DogHotelsDb : DbContext
{
    public DogHotelsDb(DbContextOptions<DogHotelsDb> options)
        : base(options)
    { }
    
    public DbSet<DogHotel> DogHotels => Set<DogHotel>();
    
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<DogHotel>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Name).IsRequired().HasMaxLength(200);
            entity.Property(e => e.Address).IsRequired().HasMaxLength(300);

            entity.OwnsOne(e => e.Geometry, geo =>
            {
                geo.Property(g => g.Longitude).HasColumnName("Longitude");
                geo.Property(g => g.Latitude).HasColumnName("Latitude");
            });
        });
    }
}
