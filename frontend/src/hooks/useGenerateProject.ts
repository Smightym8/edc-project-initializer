import {generateProject} from "../api/api.ts";
import type {ProjectCreateDTO} from "../api/models/project-create-dto.ts";
import {useState} from "react";

const useGenerateProject = () => {
    const [error, setError] = useState<string | null>(null);
    const [isGeneratingProject, setIsGeneratingProject] = useState<boolean>(false);

    const createProject = (projectCreateDto: ProjectCreateDTO) => {
        setIsGeneratingProject(true);

        generateProject(projectCreateDto)
            .then((blob: Blob) => {
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `${projectCreateDto.projectName}.zip`;
                document.body.appendChild(a);
                a.click();
                a.remove();
                window.URL.revokeObjectURL(url);
            })
            .catch((error: Error) => {
                setError(error.message);
                console.error(error);
            })
            .finally(() => {
                setIsGeneratingProject(false)
            });
    }

    return {isGeneratingProject, error, createProject};
}

export default useGenerateProject;