using Microsoft.EntityFrameworkCore;
using backend.Application.Interfaces;
using backend.Domain.Entities;
using backend.Infrastructure.Persistence;

namespace backend.Infrastructure.Repository;

public class DogHotelRepository: IDogHotelRepository
{
    private readonly DogHotelsDb _db;

    public DogHotelRepository(DogHotelsDb db) => _db = db;
    
    public async Task<List<DogHotel>> GetAllAsync()
    {
        return await _db.DogHotels
            .AsNoTracking()
            .ToListAsync();
    }

    public async Task<DogHotel?> GetByIdAsync(string id)
    {
        return await _db.DogHotels.AsNoTracking().FirstOrDefaultAsync(x => x.Id == id);
    }

    public async Task AddAsync(DogHotel hotel)
    {
        _db.DogHotels.Add(hotel);
        await _db.SaveChangesAsync();
    }

    public async Task UpdateAsync(DogHotel hotel)
    {
        _db.DogHotels.Update(hotel);
        await _db.SaveChangesAsync();
    }

    public async Task DeleteAsync(string id)
    {
        var entity = await _db.DogHotels.FindAsync(id);
        if (entity is null) return;
        _db.DogHotels.Remove(entity);
        await _db.SaveChangesAsync();
    }
}
