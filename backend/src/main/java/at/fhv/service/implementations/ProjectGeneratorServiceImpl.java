package at.fhv.service.implementations;

import at.fhv.dto.InvalidParamDto;
import at.fhv.dto.ProjectCreateDto;
import at.fhv.exception.ValidationException;
import at.fhv.service.interfaces.ProjectGeneratorService;
import io.quarkus.qute.Location;
import io.quarkus.qute.Template;
import jakarta.enterprise.context.ApplicationScoped;

import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.io.UncheckedIOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.zip.ZipEntry;
import java.util.zip.ZipOutputStream;

@ApplicationScoped
public class ProjectGeneratorServiceImpl implements ProjectGeneratorService {
    @Location("settings.gradle.kts.qute")
    Template settingsGradleTemplate;

    @Location("gradle.properties.qute")
    Template gradlePropertiesTemplate;

    @Location("build.gradle.kts.qute")
    Template buildGradleTemplate;

    @Location("dockerignore.qute")
    Template dockerignoreTemplate;

    @Location("Dockerfile.qute")
    Template dockerfileTemplate;

    private static final String PROJECT_TEMPLATE_DIRECTORY = "/edc-project-template";
    private static final String SETTING_GRADLE_FILE_NAME = "settings.gradle.kts";
    private static final String GRADLE_PROPERTIES_FILE_NAME = "gradle.properties";
    private static final String BUILD_GRADLE_FILE_NAME = "build.gradle.kts";
    private static final String DOCKER_IGNORE_FILE_NAME = ".dockerignore";
    private static final String DOCKERFILE_FILE_NAME = "Dockerfile";

    @Override
    public byte[] generateProject(ProjectCreateDto projectCreateDto) throws IOException {
        validateProjectCreateDto(projectCreateDto);

        ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();

        try (ZipOutputStream zipOut = new ZipOutputStream(byteArrayOutputStream)) {
            File fileToZip = new File(PROJECT_TEMPLATE_DIRECTORY);
            File[] children = fileToZip.listFiles();
            for (File childFile : children) {
                zipDirectoryFromFileSystem(childFile, childFile.getName(), zipOut);
            }

            addTemplateToZip(settingsGradleTemplate, SETTING_GRADLE_FILE_NAME, projectCreateDto, zipOut);
            addTemplateToZip(gradlePropertiesTemplate, GRADLE_PROPERTIES_FILE_NAME, projectCreateDto, zipOut);
            addTemplateToZip(buildGradleTemplate, Paths.get(projectCreateDto.projectName(), BUILD_GRADLE_FILE_NAME).toString(), projectCreateDto, zipOut);
            addTemplateToZip(dockerignoreTemplate, DOCKER_IGNORE_FILE_NAME, projectCreateDto, zipOut);
            addTemplateToZip(dockerfileTemplate, Paths.get(projectCreateDto.projectName(), "src", "main", "docker", DOCKERFILE_FILE_NAME).toString(), projectCreateDto, zipOut);
        }

        return byteArrayOutputStream.toByteArray();
    }

    private static void validateProjectCreateDto(ProjectCreateDto projectCreateDto) {
        List<InvalidParamDto> invalidParameters = new ArrayList<>();

        if (projectCreateDto.projectName().isBlank()) {
            invalidParameters.add(new InvalidParamDto("projectName", "Project name is required"));
        }

        if (projectCreateDto.groupId().isBlank()) {
            invalidParameters.add(new InvalidParamDto("groupId", "Group id is required"));
        }

        if (projectCreateDto.dependencies() == null || projectCreateDto.dependencies().isEmpty()) {
            invalidParameters.add(new InvalidParamDto("dependencies", "Dependencies are required"));
        }

        if (!invalidParameters.isEmpty()) {
            throw new ValidationException(invalidParameters);
        }
    }

    private void zipDirectoryFromFileSystem(File fileToZip, String fileName, ZipOutputStream zipOut) {
        if (fileToZip.isHidden()) {
            return;
        }

        try {
            if (fileToZip.isDirectory()) {
                if (!fileName.endsWith("/")) {
                    fileName += "/";
                }

                zipOut.putNextEntry(new ZipEntry(fileName));
                zipOut.closeEntry();

                for (File child : Objects.requireNonNull(fileToZip.listFiles())) {
                    zipDirectoryFromFileSystem(child, fileName + child.getName(), zipOut);
                }
            } else {
                zipOut.putNextEntry(new ZipEntry(fileName));

                try (InputStream fis = Files.newInputStream(fileToZip.toPath())) {
                    byte[] buffer = new byte[1024];
                    int length;
                    while ((length = fis.read(buffer)) >= 0) {
                        zipOut.write(buffer, 0, length);
                    }
                }

                zipOut.closeEntry();
            }
        } catch (IOException e) {
            throw new UncheckedIOException(e);
        }
    }

    private void addTemplateToZip(Template template, String path, ProjectCreateDto projectCreateDto, ZipOutputStream zipOut) {
        try {
            String renderedContent = template.data(projectCreateDto).render();

            ZipEntry entry = new ZipEntry(path);
            zipOut.putNextEntry(entry);
            zipOut.write(renderedContent.getBytes());
            zipOut.closeEntry();
        } catch (IOException e) {
            throw new UncheckedIOException(e);
        }
    }
}