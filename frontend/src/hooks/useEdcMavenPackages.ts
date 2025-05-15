import {useState} from "react";
import type {MavenPackageResponseDTO} from "../api/models/maven-packages-response-dto.ts";
import {getEDCMavenPackages} from "../api/api.ts";

const useEdcMavenPackages = () => {
    const [mavenPackagesResponse, setMavenPackagesResponse] = useState<MavenPackageResponseDTO | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const fetchMavenPackages = (selectedVersion: string, page: number, pageSize: number) => {
        getEDCMavenPackages(selectedVersion, page, pageSize)
            .then((response) => {
                setMavenPackagesResponse(response);
            })
            .catch((error: Error) => {
                console.error(error);
                setError(error.message);
            })
            .finally(() => {
                setIsLoading(false)
            });
    };

    return {mavenPackagesResponse, error, isLoading, fetchMavenPackages};
};

export default useEdcMavenPackages;