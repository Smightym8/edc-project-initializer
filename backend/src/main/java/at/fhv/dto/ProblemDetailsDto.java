package at.fhv.dto;

public record ProblemDetailsDto(String type, String title, int status, String detail, String instance) {
}
