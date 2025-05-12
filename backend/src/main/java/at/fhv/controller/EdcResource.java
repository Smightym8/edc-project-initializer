package at.fhv.controller;

import at.fhv.dto.EdcReleaseDto;
import at.fhv.dto.MavenPackageDto;
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
    public RestResponse<List<MavenPackageDto>> getEdcMavenPackagesForVersion(@QueryParam("version") String version) throws JsonProcessingException {
        var packages = edcService.getEdcMavenPackagesForVersion(version);

        return RestResponse.ok(packages);
    }
}
