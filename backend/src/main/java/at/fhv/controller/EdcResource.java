package at.fhv.controller;

import at.fhv.dto.EdcReleaseDto;
import at.fhv.dto.MavenPackagesResponseDto;
import at.fhv.restclient.GithubApiClient;
import at.fhv.service.interfaces.EdcService;
import com.fasterxml.jackson.core.JsonProcessingException;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.QueryParam;
import org.eclipse.microprofile.rest.client.inject.RestClient;
import org.jboss.resteasy.reactive.RestResponse;

import java.util.List;

@Path("/edc")
public class EdcResource {
    @RestClient
    GithubApiClient githubApiClient;

    private final EdcService edcService;

    public EdcResource(EdcService edcService) {
        this.edcService = edcService;
    }

    @GET
    @Path("/releases")
    public RestResponse<List<EdcReleaseDto>> getAllEdcReleases() {
        return githubApiClient.getAllEdcReleases();
    }

    @GET
    @Path("/packages")
    public RestResponse<MavenPackagesResponseDto> getEdcMavenPackagesForVersion(
            @QueryParam("version") String version,
            @QueryParam("page") int page,
            @QueryParam("pageSize") int pageSize) throws JsonProcessingException {
        var responseDto = edcService.getEdcMavenPackagesForVersion(version, page, pageSize);

        return RestResponse.ok(responseDto);
    }
}
