package at.fhv.restclient;

import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.QueryParam;
import jakarta.ws.rs.core.MediaType;
import org.eclipse.microprofile.rest.client.inject.RegisterRestClient;
import org.jboss.resteasy.reactive.RestResponse;

@Path("select")
@RegisterRestClient(configKey = "maven-central-api")
public interface MavenCentralApiClient {
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    RestResponse<String> getMavenPackagesForVersion(
            @QueryParam("q") String query,
            @QueryParam("start") int start,
            @QueryParam("rows") int rows,
            @QueryParam("wt") String wt);
}
