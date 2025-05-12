package at.fhv.service.interfaces;

import at.fhv.dto.MavenPackagesResponseDto;
import com.fasterxml.jackson.core.JsonProcessingException;


public interface EdcService {
    MavenPackagesResponseDto getEdcMavenPackagesForVersion(String version, int page, int pageSize) throws JsonProcessingException;
}
