package at.fhv.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.Collections;
import java.util.List;

public class ProblemDetailsDto {
    private final String type;
    private final String title;
    private final int status;
    private final String detail;
    private final String instance;
    @JsonProperty("invalid-params")
    private final List<InvalidParamDto> invalidParams;

    public ProblemDetailsDto(String type, String title, int status, String detail, String instance, List<InvalidParamDto> invalidParams) {
        this.type = type;
        this.title = title;
        this.status = status;
        this.detail = detail;
        this.instance = instance;
        this.invalidParams = invalidParams;
    }

    public ProblemDetailsDto(String type, String title, int status, String detail, String instance) {
        this(type, title, status, detail, instance, Collections.emptyList());
    }

    @SuppressWarnings("unused")
    public String getType() {
        return type;
    }

    @SuppressWarnings("unused")
    public String getTitle() {
        return title;
    }

    @SuppressWarnings("unused")
    public int getStatus() {
        return status;
    }

    @SuppressWarnings("unused")
    public String getDetail() {
        return detail;
    }

    @SuppressWarnings("unused")
    public String getInstance() {
        return instance;
    }

    @SuppressWarnings("unused")
    public List<InvalidParamDto> getInvalidParams() {
        return invalidParams;
    }
}
