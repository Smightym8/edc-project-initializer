package at.fhv.restclient;

import at.fhv.dto.EdcReleaseDto;
import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.core.MediaType;
import org.eclipse.microprofile.rest.client.inject.RegisterRestClient;

import java.util.List;

@Path("repos/eclipse-edc/Connector/releases")
@RegisterRestClient(configKey = "github-api")
public interface GithubApiClient {
    @GET
    @Consumes(MediaType.APPLICATION_JSON)
    List<EdcReleaseDto> getAllEdcReleases();
}
