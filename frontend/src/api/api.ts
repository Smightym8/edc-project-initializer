import type {ReleaseDTO} from "./models/release-dto.ts";
import type {MavenPackageResponseDTO} from "./models/maven-packages-response-dto.ts";
import type {ProblemDetailsDTO} from "./models/problem-details-dto.ts";
import type {ProjectCreateDTO} from "./models/project-create-dto.ts";

const API_BASE_URL = 'http://localhost:8080/api/v1';

export const getEDCVersions = async (): Promise<ReleaseDTO[]> => {
    const response = await fetch(`${API_BASE_URL}/edc/releases`);

    if (!response.ok) {
        const errorData = await response.json() as ProblemDetailsDTO;
        throw new Error(errorData.detail);
    }

    return await response.json();
}

export const getEDCMavenPackages = async (version: string, page: number, pageSize: number): Promise<MavenPackageResponseDTO> => {
    const trimmedVersion = version.replace(/^v/, '');
    const response = await fetch(`${API_BASE_URL}/edc/packages?version=${trimmedVersion}&page=${page}&pageSize=${pageSize}`);

    if (!response.ok) {
        const errorData = await response.json() as ProblemDetailsDTO;
        throw new Error(errorData.detail);
    }

    return await response.json();
}

export const generateProject = async (projectCreateDto : ProjectCreateDTO): Promise<Blob> => {
    const response = await fetch(`${API_BASE_URL}/edc/generate-project`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(projectCreateDto),
    });

    if (!response.ok) {
        const errorData = await response.json() as ProblemDetailsDTO;
        throw new Error(errorData.detail);
    }

    return await response.blob();
}