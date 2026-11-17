using BookStore.Api.Endpoints;

var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

app.MapBookEndpoints();

app.MapGet("/", () => "Hello World!");

app.Run();
