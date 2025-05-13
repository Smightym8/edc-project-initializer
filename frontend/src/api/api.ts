import type {ReleaseDTO} from "./models/release-dto.ts";
import type {MavenPackageResponseDTO} from "./models/maven-packages-response-dto.ts";

const API_BASE_URL = 'http://localhost:8080/api/v1';

export const getEDCVersions = async (): Promise<ReleaseDTO[]> => {
    const response = await fetch(`${API_BASE_URL}/edc/releases`);
    return await response.json();
}

export const getEDCMavenPackages = async (version: string, page: number, pageSize: number): Promise<MavenPackageResponseDTO> => {
    const trimmedVersion = version.replace(/^v/, '');

    const response = await fetch(`${API_BASE_URL}/edc/packages?version=${trimmedVersion}&page=${page}&pageSize=${pageSize}`);
    return await response.json();
}