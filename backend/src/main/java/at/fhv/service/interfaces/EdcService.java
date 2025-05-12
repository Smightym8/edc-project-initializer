package at.fhv.service.interfaces;

import at.fhv.dto.MavenPackageDto;
import com.fasterxml.jackson.core.JsonProcessingException;

import java.util.List;

public interface EdcService {
    List<MavenPackageDto> getEdcMavenPackagesForVersion(String version) throws JsonProcessingException;
}
