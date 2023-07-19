

namespace boat_app_back.Services.BoatService
{
    public interface IBoatService
    {
        Task<List<Boat>> GetAllBoats();
        Task<Boat>? GetBoat(int id);
        Task<ServiceResponse<bool>> AddBoat(Boat boat);
        Task<ServiceResponse<bool>> UpdateBoat(Boat boat);
        Task<ServiceResponse<bool>> DeleteBoat(int id);
    }
}
