import type {ReleaseDTO} from "./models/release-dto.ts";

const API_BASE_URL = 'http://localhost:8080/api/v1';

export const getEDCVersions = async (): Promise<ReleaseDTO[]> => {
    const response = await fetch(`${API_BASE_URL}/edc/releases`);
    return await response.json();
}