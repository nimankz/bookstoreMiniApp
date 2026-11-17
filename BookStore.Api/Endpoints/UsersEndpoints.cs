using System;
using BookStore.Api.Dtos;
namespace BookStore.Api.Endpoints;

public class UsersEndpoints
{
    private record UserAccount(
        string UserNaame,
        string Password,
        string Role
    );


    private static readonly List<UserAccount> users = 
    [
        new("user", "1234", "user"),
        new("admin", "1234", "admin")

    ];


    public static string? ValidateCredebtials(
        string userName,
        string password
    )
    {
        var user = users.FirstOrDefault(u =>
        u.UserNaame == userName && u.Password == password);

        return user?.Role;
    }
}
