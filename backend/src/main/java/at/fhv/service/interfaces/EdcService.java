package at.fhv.service.interfaces;

import at.fhv.dto.EdcReleaseDto;
import at.fhv.dto.MavenPackagesResponseDto;
import com.fasterxml.jackson.core.JsonProcessingException;

import java.util.List;


public interface EdcService {
    List<EdcReleaseDto> getAllEdcReleases();

    MavenPackagesResponseDto getEdcMavenPackagesForVersion(String version, int page, int pageSize) throws JsonProcessingException;
}
