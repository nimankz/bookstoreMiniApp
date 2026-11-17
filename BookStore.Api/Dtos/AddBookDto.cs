namespace BookStore.Api.Dtos;

public record AddBookDto
(
    string Name,
    string AuthorName,
    decimal Price,
    DateOnly ReleaseDate,
    string Genre
);
