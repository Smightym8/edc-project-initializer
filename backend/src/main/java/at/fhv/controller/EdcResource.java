package at.fhv.controller;

import at.fhv.dto.EdcReleaseDto;
import at.fhv.restclient.GithubApiClient;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import org.eclipse.microprofile.rest.client.inject.RestClient;
import org.jboss.resteasy.reactive.RestResponse;

import java.util.List;

@Path("/edc")
public class EdcResource {
    @RestClient
    GithubApiClient githubApiClient;

    @GET
    @Path("/releases")
    public RestResponse<List<EdcReleaseDto>> getAllEdcReleases() {
        return githubApiClient.getAllEdcReleases();
    }
}
