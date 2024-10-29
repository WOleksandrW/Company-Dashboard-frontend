# Company-Dashboard-frontend

Planned technologies:
- TypeScript
- React
- React Query
- Axios
- Docker

## Docker

### Create Image

You can build a Docker image with a default port or specify a custom port at build time:

```bash
docker build . -t NAME  # Build with default port (5137)
docker build . --build-arg PORT=8080 -t NAME  # Build with a custom port (8080)
```

### Run Container

When running the container, you can either use the port defined during the build or override it with a new one:

```bash
docker run -p 5137:5137 NAME # Run container with default or pre-configured port
docker run -e PORT=8080 -p 8080:8080 NAME  # Override port during runtime
```
