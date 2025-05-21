# EDC Project Initializer

EDC Project Initializer is a tool inspired by [Spring Initializr](https://start.spring.io/), designed to simplify the process of setting up Eclipse Dataspace Components (EDC) projects. 
This project is part of my Master Thesis and aims to provide a setup that can be used to create any EDC component.

## Features
- **EDC Version selection:** Users can select an EDC version.
- **Maven Package selection:** Based on the selected EDC version, users can choose from available Maven packages.
- **Project Configuration:**
    - **Artifact ID/Project Name:** Users can enter the desired artifact ID or project name.
    - **Group ID:** Users can specify a group ID for their project.
- **Project Generation:** Upon entering all required information, users can generate a complete EDC project setup with a runtime folder, selected dependencies, and an included multi-stage Dockerfile for platform-independent builds.

## Getting Started
### Prerequisites
- **Docker:** Ensure that Docker is installed on your system.
- **Java JDK 21**: If the local Docker development setup isn't used, Java JDK 21 is required.
- **Node Version 22.15**: If the local Docker development setup isn't used, Node version 22.15 is needed.

### Running the Application
1. **Clone the repository**
    ```
    git clone https://github.com/Smightym8/edc-project-initializer.git
    cd edc-project-initializer
    ```

2. **Start the Backend and Frontend Services:** Use Docker Compose to start both backend and frontend services.
    ```
    docker compose -f docker-compose.yml up -d
    ```

### Development Setup
For development purposes, a separate Docker Compose setup is provided.

1. **Start the Development Services:**
    ```
    docker compose up --watch
    ```

## Usage
1. **Access the Application**:
   - Open your web browser and navigate to [`http://localhost:80`](http://localhost:80).

2. **Configure your Project**:
   - Select the desired EDC version.
   - Choose the Maven packages based on the selected version.
   - Enter the artifact ID / project name.
   - Enter the group ID.

3. **Generate the Project**:
   - Click the "Generate Project" button to create your EDC project setup.

4. **Download and use the generated Project**:
   - The generated project will include a runtime folder with the specified artifact ID / project name, selected dependencies, and an included multi-stage Dockerfile.
   - You can now build and run your project using Docker as per your requirements.