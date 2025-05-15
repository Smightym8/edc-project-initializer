package at.fhv.controller;

import at.fhv.dto.ProblemDetailsDto;
import jakarta.ws.rs.ProcessingException;
import jakarta.ws.rs.core.Context;
import jakarta.ws.rs.core.Response;
import jakarta.ws.rs.core.UriInfo;
import org.jboss.logging.Logger;
import org.jboss.resteasy.reactive.RestResponse;
import org.jboss.resteasy.reactive.server.ServerExceptionMapper;

@SuppressWarnings("unused")
public class ExceptionMappers {
    private static final Logger LOGGER = Logger.getLogger(ExceptionMappers.class);

    @ServerExceptionMapper
    public RestResponse<ProblemDetailsDto> mapException(Exception e, @Context UriInfo uriInfo) {
        LOGGER.error(e);
        ProblemDetailsDto problem = new ProblemDetailsDto(
                "https://datatracker.ietf.org/doc/html/rfc9110#section-15.6.1",
                "Internal Server Error",
                Response.Status.INTERNAL_SERVER_ERROR.getStatusCode(),
                e.getMessage(),
                uriInfo.getRequestUri().toString());
        return RestResponse.ResponseBuilder
                .create(Response.Status.INTERNAL_SERVER_ERROR, problem)
                .build();
    }

    @ServerExceptionMapper
    public RestResponse<ProblemDetailsDto> mapException(ProcessingException e, @Context UriInfo uriInfo) {
        LOGGER.error(e);
        ProblemDetailsDto problem = new ProblemDetailsDto(
                "https://datatracker.ietf.org/doc/html/rfc9110#section-15.5.1",
                "Gateway Timeout",
                Response.Status.GATEWAY_TIMEOUT.getStatusCode(),
                e.getMessage(),
                uriInfo.getRequestUri().toString());
        return RestResponse.ResponseBuilder
                .create(Response.Status.GATEWAY_TIMEOUT, problem)
                .build();
    }

    @ServerExceptionMapper
    public RestResponse<ProblemDetailsDto> mapException(IllegalArgumentException e, @Context UriInfo uriInfo) {
        LOGGER.error(e);
        ProblemDetailsDto problem = new ProblemDetailsDto(
                "https://datatracker.ietf.org/doc/html/rfc9110#section-15.5.1",
                "Bad Request",
                Response.Status.BAD_REQUEST.getStatusCode(),
                e.getMessage(),
                uriInfo.getRequestUri().toString());
        return RestResponse.ResponseBuilder
                .create(Response.Status.BAD_REQUEST, problem)
                .build();
    }
}
