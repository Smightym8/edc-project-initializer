package at.fhv.controller;

import jakarta.ws.rs.WebApplicationException;
import jakarta.ws.rs.core.Response;
import org.jboss.logging.Logger;
import org.jboss.resteasy.reactive.RestResponse;
import org.jboss.resteasy.reactive.server.ServerExceptionMapper;

public class ExceptionMappers {
    private static final Logger LOGGER = Logger.getLogger(ExceptionMappers.class);

    @ServerExceptionMapper
    public RestResponse<String> mapException(WebApplicationException e) {
        LOGGER.error("Error", e);
        RestResponse.Status status = RestResponse.Status.fromStatusCode(e.getResponse().getStatus());
        String errorMessage = e.getMessage();
        return RestResponse.ResponseBuilder
                .create(status, errorMessage)
                .build();
    }

    @ServerExceptionMapper
    public RestResponse<String> mapException(Exception e) {
        LOGGER.error("Error", e);
        return RestResponse.ResponseBuilder
                .create(Response.Status.INTERNAL_SERVER_ERROR, "Internal Server Error")
                .build();
    }
}
