using System.Security.Claims;
using System.Text;
using BookStore.Api.Endpoints;
using BookStore.Api.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddSingleton<TokenService>();

builder.Services
    .AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        var key = builder.Configuration["Jwt:Key"]
            ?? throw new InvalidOperationException("JWT key is missing.");

        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidIssuer = builder.Configuration["Jwt:Issuer"],

            ValidateAudience = true,
            ValidAudience = builder.Configuration["Jwt:Audience"],

            ValidateLifetime = true,

            ValidateIssuerSigningKey = true,
            IssuerSigningKey = new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes(key)
            ),

            RoleClaimType = ClaimTypes.Role,
            NameClaimType = ClaimTypes.Name,

            ClockSkew = TimeSpan.Zero
        };
    });


builder.Services.AddAuthorization();


var app = builder.Build();


app.UseAuthentication();
app.UseAuthorization();


app.MapBookEndpoints();
app.MapAuthEndpoints();

app.MapGet("/", () => "Hello World!");

app.MapGet("/me", (ClaimsPrincipal user) =>
{
    return Results.Ok(new
    {
        UserName = user.Identity?.Name,
        Role = user.FindFirst(ClaimTypes.Role)?.Value
    });
})
.RequireAuthorization();


app.Run();
