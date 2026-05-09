# Multi-stage Dockerfile for full-stack application

# Stage 1: Build Backend
FROM maven:3.9-eclipse-temurin-17 AS backend-build
WORKDIR /app/backend

# Copy backend source
COPY pom.xml .
COPY . .

# Build backend
RUN mvn clean package -DskipTests

# Stage 2: Build Frontend
FROM node:18-alpine AS frontend-build
WORKDIR /app/frontend

# Copy frontend source
COPY frontend/package*.json ./
RUN npm ci

COPY frontend/ ./
RUN npm run build

# Stage 3: Runtime
FROM eclipse-temurin:17-jre-alpine
WORKDIR /app

# Copy backend jar
COPY --from=backend-build /app/backend/target/*.jar app.jar

# Copy frontend build
COPY --from=frontend-build /app/frontend/build /app/static

# Expose port
EXPOSE 8080

# Set environment variables
ENV SPRING_PROFILES_ACTIVE=prod

# Run application
ENTRYPOINT ["java", "-jar", "app.jar"]
