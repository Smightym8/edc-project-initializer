import {useCallback, useState} from "react";
import type {MavenPackageResponseDTO} from "../api/models/maven-packages-response-dto.ts";
import {getEDCMavenPackages} from "../api/api.ts";

const useEdcMavenPackages = (selectedVersion: string, page: number, pageSize: number) => {
    const [mavenPackagesResponse, setMavenPackagesResponse] = useState<MavenPackageResponseDTO | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const fetchMavenPackages = useCallback(() => {
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
    }, [page, pageSize, selectedVersion]);

    return {mavenPackagesResponse, error, isLoading, fetchMavenPackages};
};

export default useEdcMavenPackages;