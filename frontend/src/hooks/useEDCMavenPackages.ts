import {useEffect, useState} from "react";
import type {MavenPackageResponseDTO} from "../api/models/maven-packages-response-dto.ts";
import {getEDCMavenPackages} from "../api/api.ts";

const useEDCMavenPackages = () => {
    const [mavenPackagesResponse, setMavenPackagesResponse] = useState<MavenPackageResponseDTO | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        fetchMavenPackages();
    }, []);

    const fetchMavenPackages = () => {
        getEDCMavenPackages('v0.12.0', 1, 20)
            .then((response) => {
                setMavenPackagesResponse(response);
            })
            .catch((error) => {
                console.error(error);
                setError(error);
            })
            .finally(() => {
                setIsLoading(false)
            });
    };

    return {mavenPackagesResponse, error, isLoading};
};

export default useEDCMavenPackages;