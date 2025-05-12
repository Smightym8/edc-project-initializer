package at.fhv.exception;

public class InvalidPageSizeException extends IllegalArgumentException {
    public InvalidPageSizeException(int pageSize) {
        super("Page size '" + pageSize + "' is not valid");
    }
}
