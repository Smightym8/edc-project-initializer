package at.fhv.service.implementations;

import at.fhv.dto.EdcReleaseDto;
import at.fhv.dto.MavenPackageDto;
import at.fhv.dto.MavenPackagesResponseDto;
import at.fhv.dto.PaginationInfoDto;
import at.fhv.exception.InvalidPageException;
import at.fhv.exception.InvalidPageSizeException;
import at.fhv.restclient.GithubApiClient;
import at.fhv.restclient.MavenCentralApiClient;
import at.fhv.service.interfaces.EdcService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.enterprise.context.ApplicationScoped;
import org.eclipse.microprofile.rest.client.inject.RestClient;

import java.util.ArrayList;
import java.util.List;

@ApplicationScoped
public class EdcServiceImpl implements EdcService {
    @RestClient
    GithubApiClient githubApiClient;

    @RestClient
    MavenCentralApiClient mavenCentralApiClient;

    public static final int DEFAULT_PAGE_SIZE = 20;
    public static final String JSON_FORMAT = "json";
    public static final String QUERY_PREFIX = "g:org.eclipse.edc AND v:";

    @Override
    public List<EdcReleaseDto> getAllEdcReleases() {
        return githubApiClient.getAllEdcReleases();
    }

    @Override
    public MavenPackagesResponseDto getEdcMavenPackagesForVersion(String version, int page, int pageSize) throws JsonProcessingException {
        String query = QUERY_PREFIX + version;

        if (pageSize < 0) {
            throw new InvalidPageSizeException(pageSize);
        } else if (pageSize == 0) {
            pageSize = DEFAULT_PAGE_SIZE;
        }

        if (page <= 0) {
            throw new InvalidPageException(page);
        }

        int start = (page - 1) * pageSize;

        String response = mavenCentralApiClient.getMavenPackagesForVersion(query, start, pageSize, JSON_FORMAT);
        var mavenPackages = parseMavenPackages(response);
        var totalPages = calculateTotalPages(response);
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
