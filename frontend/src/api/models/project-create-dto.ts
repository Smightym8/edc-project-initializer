import type {MavenPackageDTO} from "./maven-package-dto.ts";

export interface ProjectCreateDTO {
    'projectName': string;
    'groupId': string;
    'dependencies': MavenPackageDTO[];
}