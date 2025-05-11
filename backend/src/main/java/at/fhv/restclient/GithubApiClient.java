package at.fhv.restclient;

import at.fhv.dto.EdcReleaseDto;
import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;
import org.eclipse.microprofile.rest.client.inject.RegisterRestClient;
import org.jboss.resteasy.reactive.RestResponse;

import java.util.List;

@Path("repos/eclipse-edc/Connector/releases")
@RegisterRestClient(configKey = "github-api")
public interface GithubApiClient {
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    RestResponse<List<EdcReleaseDto>> getAllEdcReleases();
}
