using boat_app_back.Models;
using Microsoft.AspNetCore.Mvc;

namespace boat_app_back.Services.BoatService
{
    public class BoatService : IBoatService
    {
        private readonly DataContext _context;

        public BoatService(DataContext context)
        {
            _context = context;
        }
        public async Task<ServiceResponse<bool>> AddBoat(Boat boat)
        {
            try
            {
                await _context.AddAsync(boat);
                await _context.SaveChangesAsync();
                return new ServiceResponse<bool> { Data = true , Success = true , Message = "new boat saved successfully." };
            }
            catch (Exception err)
            {
                return new ServiceResponse<bool> { Data = true, Success = true, Message = err.Message };
            }
        }

        public async Task<ServiceResponse<bool>> DeleteBoat(int id)
        {
            var boat = await _context.Boats.FindAsync(id);
            if (boat == null)
                return new ServiceResponse<bool> { Data = false, Success = false, Message = "sorry but this boat is not exist." };

            _context.Boats.Remove(boat);
            await _context.SaveChangesAsync();
            return new ServiceResponse<bool> { Data = true, Success = true, Message = "this boat has successfully deleted." };
        }

        public async Task<List<Boat>> GetAllBoats()
        {
            var boats = await _context.Boats.OrderByDescending(s=>s.Id).ToListAsync();
            return boats;
        }

        public async Task<Boat>? GetBoat(int id)
        {
            var boat = await _context.Boats.FindAsync(id);
            if (boat == null)
                return null;
            return boat;
        }

        public async Task<ServiceResponse<bool>> UpdateBoat(Boat boat)
        {
            var dbBoat = await _context.Boats.FindAsync(boat.Id);
            if (dbBoat == null)
                return null;

            dbBoat.Name = boat.Name;
            dbBoat.Description = boat.Description;
            dbBoat.ImageUrl = boat.ImageUrl;
            await _context.SaveChangesAsync();
            return new ServiceResponse<bool> { Data = true, Success = true, Message = "The boat saved successfully." };
        }
    }
}
