package at.fhv;

import jakarta.ws.rs.ApplicationPath;
import jakarta.ws.rs.core.Application;
import org.eclipse.microprofile.openapi.annotations.OpenAPIDefinition;
import org.eclipse.microprofile.openapi.annotations.info.Info;

@OpenAPIDefinition(
        info = @Info(
                title = "EDC Project Initializer API",
                version = "1.0.0"
        )
)
@ApplicationPath("/api/v1")
public class EdcProjectInitializerApplication extends Application {
}
