package at.fhv.controller;

import at.fhv.dto.EdcReleaseDto;
import at.fhv.dto.MavenPackagesResponseDto;
import at.fhv.dto.ProjectCreateDto;
import at.fhv.service.interfaces.EdcService;
import at.fhv.service.interfaces.ProjectGeneratorService;
import com.fasterxml.jackson.core.JsonProcessingException;
import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.QueryParam;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import org.jboss.resteasy.reactive.RestResponse;

import java.io.IOException;
import java.net.URISyntaxException;
import java.util.List;

@Path("/edc")
public class EdcResource {
    private final EdcService edcService;
    private final ProjectGeneratorService projectGeneratorService;

    public EdcResource(EdcService edcService, ProjectGeneratorService projectGeneratorService) {
        this.edcService = edcService;
        this.projectGeneratorService = projectGeneratorService;
    }

    @GET
    @Path("/releases")
    public RestResponse<List<EdcReleaseDto>> getAllEdcReleases() {
        var releases = edcService.getAllEdcReleases();

        return RestResponse.ok(releases);
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

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_OCTET_STREAM)
    @Path("/generate-project")
    public Response generateEdcProject(ProjectCreateDto projectCreateDto) throws IOException, URISyntaxException {
        var zipBytes = projectGeneratorService.generateProject(projectCreateDto);

        return Response.ok(zipBytes)
                .header("Content-Disposition", "attachment; filename=\"" + projectCreateDto.projectName() + ".zip\"")
                .build();
    }
}
