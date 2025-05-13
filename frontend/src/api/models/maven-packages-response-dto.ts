import type {PaginationInfoDTO} from "./pagination-info-dto.ts";
import type {MavenPackageDTO} from "./maven-package-dto.ts";

export interface MavenPackageResponseDTO {
    'paginationInfo': PaginationInfoDTO
    'mavenPackages': MavenPackageDTO[]
}