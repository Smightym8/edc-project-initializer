package at.fhv.service.implementations;

import at.fhv.dto.MavenPackageDto;
import at.fhv.dto.MavenPackagesResponseDto;
import at.fhv.dto.PaginationInfoDto;
import at.fhv.exception.InvalidPageException;
import at.fhv.exception.InvalidPageSizeException;
import at.fhv.restclient.MavenCentralApiClient;
import at.fhv.service.interfaces.EdcService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.enterprise.context.ApplicationScoped;
import org.eclipse.microprofile.rest.client.inject.RestClient;
import org.jboss.resteasy.reactive.RestResponse;

import java.util.ArrayList;
import java.util.List;

@ApplicationScoped
public class EdcServiceImpl implements EdcService {
    @RestClient
    MavenCentralApiClient mavenCentralApiClient;

    @Override
    public MavenPackagesResponseDto getEdcMavenPackagesForVersion(String version, int page, int pageSize) throws JsonProcessingException {
        String query = "g:org.eclipse.edc AND v:" + version;

        if (pageSize < 0) {
            throw new InvalidPageSizeException(pageSize);
        } else if (pageSize == 0) {
            pageSize = 20;
        }

        if (page <= 0) {
            throw new InvalidPageException(page);
        }

        int start = (page - 1) * pageSize;

        RestResponse<String> response = mavenCentralApiClient.getMavenPackagesForVersion(query, start, pageSize, "json");
        var mavenPackages = parseMavenPackages(response.getEntity());
        var totalPages = calculateTotalPages(response.getEntity());
        var paginationInfo = new PaginationInfoDto(totalPages, page);

        return new MavenPackagesResponseDto(paginationInfo, mavenPackages);
    }

    private List<MavenPackageDto> parseMavenPackages(String json) throws JsonProcessingException {
        List<MavenPackageDto> packages = new ArrayList<>();
        ObjectMapper mapper = new ObjectMapper();

        JsonNode root = mapper.readTree(json);
        JsonNode response = root.path("response");

        JsonNode docs = response.path("docs");

        for (JsonNode doc : docs) {
            String id = doc.path("id").asText();
            String artifactId = doc.path("a").asText();
            packages.add(new MavenPackageDto(id, artifactId));
        }

        return packages;
    }

    private int calculateTotalPages(String json) throws JsonProcessingException {
        ObjectMapper mapper = new ObjectMapper();

        JsonNode root = mapper.readTree(json);
        JsonNode response = root.path("response");
        int numFound = response.path("numFound").asInt();

        JsonNode responseHeader = root.path("responseHeader");
        JsonNode params = responseHeader.path("params");
        int returnedRows = params.path("rows").asInt();

        return numFound / returnedRows + 1;
    }
}
