package at.fhv.dto;

import java.util.List;

public record MavenPackagesResponseDto(PaginationInfoDto paginationInfo, List<MavenPackageDto> mavenPackages) {
}
