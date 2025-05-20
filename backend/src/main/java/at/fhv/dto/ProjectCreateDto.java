package at.fhv.dto;

import java.util.List;

public record ProjectCreateDto(String projectName, String groupId, List<MavenPackageDto> dependencies) {
}
