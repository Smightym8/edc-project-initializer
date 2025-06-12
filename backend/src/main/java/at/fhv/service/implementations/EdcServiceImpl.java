package at.fhv.service.implementations;

import at.fhv.dto.EdcReleaseDto;
import at.fhv.dto.InvalidParamDto;
import at.fhv.dto.MavenPackageDto;
import at.fhv.dto.MavenPackagesResponseDto;
import at.fhv.dto.PaginationInfoDto;
import at.fhv.exception.ValidationException;
import at.fhv.restclient.GithubApiClient;
import at.fhv.restclient.MavenCentralApiClient;
import at.fhv.service.interfaces.EdcService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.quarkus.cache.CacheResult;
import jakarta.enterprise.context.ApplicationScoped;
import org.eclipse.microprofile.rest.client.inject.RestClient;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;

@ApplicationScoped
public class EdcServiceImpl implements EdcService {
    @RestClient
    GithubApiClient githubApiClient;

    @RestClient
    MavenCentralApiClient mavenCentralApiClient;

    public static final String JSON_FORMAT = "json";
    public static final String QUERY_PREFIX = "g:org.eclipse.edc AND v:";

    @CacheResult(cacheName = "edc-releases-cache")
    @Override
    public List<EdcReleaseDto> getAllEdcReleases() {
        return githubApiClient.getAllEdcReleases();
    }

    @CacheResult(cacheName = "maven-packages-cache")
    @Override
    public MavenPackagesResponseDto getEdcMavenPackagesForVersion(String version, int page, int pageSize) throws JsonProcessingException {
        validate(version, page, pageSize);

        String query = QUERY_PREFIX + version;
        int start = (page - 1) * pageSize;

        String response = mavenCentralApiClient.getMavenPackagesForVersion(query, start, pageSize, JSON_FORMAT);
        var mavenPackages = parseMavenPackages(response);
        mavenPackages.sort(Comparator.comparing(MavenPackageDto::name));

        var totalPages = calculateTotalPages(response);
        var paginationInfo = new PaginationInfoDto(totalPages, page);

        return new MavenPackagesResponseDto(paginationInfo, mavenPackages);
    }

    private static void validate(String version, int page, int pageSize) {
        List<InvalidParamDto> invalidParameters = new ArrayList<>();

        if (version == null || version.isBlank()) {
            invalidParameters.add(new InvalidParamDto("version", "version is required."));
        }

        if (pageSize <= 0) {
            invalidParameters.add(new InvalidParamDto("pageSize", "pageSize needs to be greater than 0."));
        }

        if (page <= 0) {
            invalidParameters.add(new InvalidParamDto("page", "page needs to be greater than 0."));
        }

        if (!invalidParameters.isEmpty()) {
            throw new ValidationException(invalidParameters);
        }
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
            String version = doc.path("v").asText();
            packages.add(new MavenPackageDto(id, artifactId, version));
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
