package at.fhv.service.interfaces;

import at.fhv.dto.ProjectCreateDto;

import java.io.IOException;
import java.net.URISyntaxException;

public interface ProjectGeneratorService {
    byte[] generateProject(ProjectCreateDto projectCreateDto) throws IOException, URISyntaxException;
}
