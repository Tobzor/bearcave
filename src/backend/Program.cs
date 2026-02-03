using Scalar.AspNetCore;

using backend.Application.Interfaces;
using backend.Application.Services;
using backend.Domain.Entities;
using backend.Domain.GeoJson;
using backend.Infrastructure.Persistence;
using backend.Infrastructure.Repository;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();

// Cors handling
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowSpecificOrigins", policy =>
    {
        // Need to whitelist these in azure server to only enforce requests from these
        policy.WithOrigins("localhost:5173", "tobzor.dev") 
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});


#region Dependency Injection

// In-memory database setup
builder.Services.AddDbContext<DogHotelsDb>(opt =>
{
    opt.UseInMemoryDatabase("DogHotelList")
        .UseSeeding((context, _) =>
        {
            
            var mockHotels = new List<DogHotel>
            {
                new DogHotel
                {
                    Id = Guid.NewGuid().ToString(),
                    Name = "Paws Palace",
                    Address = "Bark Street 12, Stockholm",
                    Description = "Modern dog hotel with large play areas.",
                    Geometry = new GeoJsonPoint{Longitude = 18.0686, Latitude = 59.3293}
                },
                new DogHotel
                {
                    Id = Guid.NewGuid().ToString(),
                    Name = "Happy Tails Inn",
                    Address = "Tail Avenue 5, Gothenburg",
                    Description = "Cozy rooms and daily walks by the river.",
                    Geometry =  new GeoJsonPoint{Longitude = 11.9746, Latitude = 57.7089}
                },
                new DogHotel
                {
                    Id = Guid.NewGuid().ToString(),
                    Name = "Bark & Stay",
                    Address = "Woof Road 7, Malmo",
                    Description = "Affordable stays with supervised play.",
                    Geometry =  new GeoJsonPoint{Longitude = 13.0038, Latitude = 55.6050}
                }
        };
            context.Set<DogHotel>().AddRange(mockHotels);
            context.SaveChanges();
        });
});
builder.Services.AddDatabaseDeveloperPageExceptionFilter();

builder.Services.AddScoped<IDogHotelRepository, DogHotelRepository>();
builder.Services.AddScoped<IDogHotelService, DogHotelService>();

#endregion

var app = builder.Build();

// Seed the in-memory database
using(var serviceScope = app.Services.CreateAsyncScope())
using (var dbContext = serviceScope.ServiceProvider.GetRequiredService<DogHotelsDb>())
{
    if (!dbContext.DogHotels.Any())
    {
        dbContext.Database.EnsureCreated();
    }
}

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
    app.MapScalarApiReference();
}

app.UseHttpsRedirection();
app.MapControllers();

// Enable cors policy
app.UseCors("AllowSpecificOrigins");

app.Run();
