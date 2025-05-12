package at.fhv.service.implementations;

import at.fhv.dto.MavenPackageDto;
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
    public List<MavenPackageDto> getEdcMavenPackagesForVersion(String version) throws JsonProcessingException {
        String query = "g:org.eclipse.edc AND v:" + version;

        RestResponse<String> response = mavenCentralApiClient.getMavenPackagesForVersion(query, 0, 20, "json");

        return parseMavenPackages(response.getEntity());
    }

    private List<MavenPackageDto> parseMavenPackages(String json) throws JsonProcessingException {
        List<MavenPackageDto> packages = new ArrayList<>();
        ObjectMapper mapper = new ObjectMapper();

        JsonNode root = mapper.readTree(json);
        JsonNode docs = root.path("response").path("docs");

        for (JsonNode doc : docs) {
            String id = doc.path("id").asText();
            String artifactId = doc.path("a").asText();
            packages.add(new MavenPackageDto(id, artifactId));
        }

        return packages;
    }
}
