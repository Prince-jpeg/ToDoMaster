# 🚀 ToDoMaster Deployment Setup

This document explains the deployment configuration for the ToDoMaster project.

## 📦 What's Included

### Docker Configuration
- **`Dockerfile`** - Multi-stage build for full-stack deployment
- **`Dockerfile.backend`** - Standalone backend (Spring Boot) container
- **`frontend/Dockerfile`** - Standalone frontend (React + Nginx) container
- **`docker-compose.yml`** - Local development orchestration
- **`.dockerignore`** - Excludes unnecessary files from Docker builds

### Configuration Files
- **`render.yaml`** - Render.com deployment blueprint
- **`.env.example`** - Environment variables template
- **`src/main/resources/application-prod.properties`** - Production Spring Boot configuration
- **`.github/workflows/deploy.yml`** - CI/CD pipeline

### Scripts
- **`start.sh`** - Quick start script for Linux/Mac
- **`start.bat`** - Quick start script for Windows

### Documentation
- **`DEPLOYMENT.md`** - Comprehensive deployment guide

## 🎯 Quick Start

### Option 1: Docker Compose (Recommended for Local)

1. **Setup environment**:
```bash
cp .env.example .env
# Edit .env and add your DATABASE_PASSWORD
```

2. **Start everything**:
```bash
# Linux/Mac
./start.sh

# Windows
start.bat

# Or manually
docker-compose up --build
```

3. **Access**:
- Frontend: http://localhost:80
- Backend: http://localhost:8080
- Health: http://localhost:8080/actuator/health

## ☁️ Cloud Deployment (Render)

The application is configured to deploy on Render using the `render.yaml` blueprint.

### Environment Variables Required

Set these in your Render dashboard:

| Variable | Value | Type |
|----------|-------|------|
| `DATABASE_PASSWORD` | Your Supabase password | Secret |

All other variables have defaults in `render.yaml`.

### Deployment Process

1. **Push to GitHub** - Render auto-deploys from `main` branch
2. **Set Secrets** - Add `DATABASE_PASSWORD` in Render dashboard
3. **Deploy** - Render builds using `Dockerfile.backend`

## 🏗️ Architecture

The project uses **Vertical Slicing Architecture**:

```
backend/
├── features/
│   ├── authentication/     # Auth feature slice
│   ├── profile/           # Profile feature slice
│   └── user/              # Shared user domain
└── infrastructure/
    └── security/          # Cross-cutting concerns
```

## 🔧 Configuration

### Production Settings

The application uses `application-prod.properties` in production with:
- Environment-based database configuration
- Connection pooling (HikariCP)
- Compression enabled
- Health check endpoints at `/actuator/health`
- Optimized logging

### Maven Build

The `pom.xml` is configured to use:
- Source: `backend/main/java`
- Resources: `backend/main/resources`
- Tests: `backend/test/java`

## 🐛 Troubleshooting

### ClassNotFoundException: com.todomaster.backend.Application

**Cause**: Maven can't find the Application class

**Solution**: Ensure `pom.xml` has correct source directories:
```xml
<build>
    <sourceDirectory>backend/main/java</sourceDirectory>
    <testSourceDirectory>backend/test/java</testSourceDirectory>
    <resources>
        <resource>
            <directory>backend/main/resources</directory>
        </resource>
    </resources>
</build>
```

### Build Fails in Docker

**Cause**: Dockerfile can't find source files

**Solution**: The `Dockerfile.backend` copies all files with `COPY . .` to support the backend structure.

### Database Connection Fails

**Cause**: Missing or incorrect `DATABASE_PASSWORD`

**Solution**: 
1. Check environment variable is set in Render
2. Verify Supabase connection pooler is accessible
3. Check `application-prod.properties` for correct URL

## 📚 Additional Resources

- [Full Deployment Guide](./DEPLOYMENT.md)
- [Docker Documentation](https://docs.docker.com/)
- [Render Documentation](https://render.com/docs)

## 🆘 Getting Help

If you encounter issues:

1. Check logs in Render dashboard
2. Verify environment variables are set
3. Review [DEPLOYMENT.md](./DEPLOYMENT.md)
4. Test locally with Docker first

---

**Happy Deploying! 🚀**
