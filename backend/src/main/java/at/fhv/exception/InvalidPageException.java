package at.fhv.exception;

public class InvalidPageException extends IllegalArgumentException {
    public InvalidPageException(int page) {
        super("Page '" + page + "' is not valid");
    }
}
