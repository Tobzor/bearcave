using Scalar.AspNetCore;
using GeoJSON.Net.Geometry;
using Microsoft.EntityFrameworkCore;
using backend.Application.Interfaces;
using backend.Application.Services;
using backend.Domain.Entities;
using backend.Infrastructure.Persistence;
using backend.Infrastructure.Repository;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();
builder.Services.AddControllers().AddNewtonsoftJson();
builder.Services.AddEndpointsApiExplorer();

// Cors handling
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowSpecificOrigins", policy =>
    {
        // Need to whitelist these in azure server to only enforce requests from these
        policy.WithOrigins("http://localhost:5173", "https://tobzor.dev") 
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
                new()
                {
                    Id = Guid.NewGuid().ToString(),
                    Name = "Paws Palace",
                    Address = "Bark Street 12, Stockholm",
                    Description = "Modern dog hotel with large play areas.",
                    Location = new Point(new Position(59.3293, 18.0686))
                },
                new()
                {
                    Id = Guid.NewGuid().ToString(),
                    Name = "Happy Tails Inn",
                    Address = "Tail Avenue 5, Gothenburg",
                    Description = "Cozy rooms and daily walks by the river.",
                    Location =  new Point(new Position(57.7089,11.9746))
                },
                new()
                {
                    Id = Guid.NewGuid().ToString(),
                    Name = "Bark & Stay",
                    Address = "Woof Road 7, Malmo",
                    Description = "Affordable stays with supervised play.",
                    Location =  new Point(new Position(55.6050, 13.0038))
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
