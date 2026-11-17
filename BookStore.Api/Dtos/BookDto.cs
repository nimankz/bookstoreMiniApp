namespace BookStore.Api.Dtos;

public record BookDto
(
    int Id,
    string Name,
    string AuthorName,
    decimal Price,
    DateOnly ReleaseDate,
    string Genre
);
    
