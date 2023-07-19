namespace boat_app_back.Services.AuthService
{
    public interface IAuthService
    {
        Task<ServiceResponse<Guid>> Register(User user, string password);
        Task<bool> UserExists(string email);
        Task<ServiceResponse<string>> Login(string email, string password);
        Guid GetUserId();
        string GetUserEmail();
        Task<User> GetUserByEmail(string email);
        Task<ServiceResponse<bool>> IsTokenExpired(string tokenString);
    }
}
