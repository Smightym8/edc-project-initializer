import {useEffect, useState} from "react";
import {getEDCVersions} from "../api/api.ts";
import type {ReleaseDTO} from "../api/models/release-dto.ts";

const useEdcVersions = () => {
    const [edcVersions, setEdcVersions] = useState<ReleaseDTO[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        fetchEdcVersions();
    }, []);

    const fetchEdcVersions = () => {
        getEDCVersions()
            .then((versions) => {
                setEdcVersions(versions);
            })
            .catch((error: Error) => {
                console.error(error);
                setError(error.message);
            })
            .finally(() => {
                setIsLoading(false)
            });
    };

    return {edcVersions, error, isLoading};
};

export default useEdcVersions;