using System;
using BookStore.Api.Dtos;
using BookStore.Api.Services;

namespace BookStore.Api.Endpoints;

public static class AuthEndpoints
{
    public static void MapAuthEndpoints(this IEndpointRouteBuilder app)
    {
        app.MapPost("/login", (
            LoginRequestDto request,
            TokenService tokenservice) =>
        {
            var role = UsersEndpoints.ValidateCredebtials(
                request.UserName,
                request.Password
            );

            if (role is null)
            {
                return Results.Unauthorized();
            }

            var token = tokenservice.CreateToken(
                request.UserName,
                role
            );
            return Results.Ok(new LoginResponseDto(token));
        });
    }

}
