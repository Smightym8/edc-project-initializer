package at.fhv.restclient;

import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.QueryParam;
import jakarta.ws.rs.core.MediaType;
import org.eclipse.microprofile.rest.client.inject.RegisterRestClient;

@Path("select")
@RegisterRestClient(configKey = "maven-central-api")
public interface MavenCentralApiClient {
    @GET
    @Consumes(MediaType.APPLICATION_JSON)
    String getMavenPackagesForVersion(
            @QueryParam("q") String query,
            @QueryParam("start") int start,
            @QueryParam("rows") int rows,
            @QueryParam("wt") String wt);
}
