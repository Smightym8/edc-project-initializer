package at.fhv.exception;

import at.fhv.dto.InvalidParamDto;

import java.util.List;

public class ValidationException extends RuntimeException {
    private final List<InvalidParamDto> invalidParams;

    public ValidationException(List<InvalidParamDto> invalidParams) {
        super("One or more validation errors occurred.");
        this.invalidParams = invalidParams;
    }

    public List<InvalidParamDto> getInvalidParams() {
        return invalidParams;
    }
}
