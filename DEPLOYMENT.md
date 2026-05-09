# ToDoMaster Deployment Guide

This guide covers deploying the ToDoMaster application using Docker and various cloud platforms.

## 📋 Prerequisites

- Docker and Docker Compose installed
- Database credentials (Supabase PostgreSQL)
- Cloud platform account (Render, Railway, Heroku, etc.)

## 🐳 Docker Deployment

### Local Development with Docker Compose

1. **Create `.env` file** (copy from `.env.example`):
```bash
cp .env.example .env
```

2. **Update environment variables** in `.env`:
```env
DATABASE_PASSWORD=your_actual_password
```

3. **Build and run**:
```bash
docker-compose up --build
```

4. **Access the application**:
- Frontend: http://localhost:80
- Backend API: http://localhost:8080
- Health Check: http://localhost:8080/actuator/health

### Individual Container Deployment

#### Backend Only
```bash
docker build -f Dockerfile.backend -t todomaster-backend .
docker run -p 8080:8080 \
  -e SPRING_PROFILES_ACTIVE=prod \
  -e DATABASE_PASSWORD=your_password \
  todomaster-backend
```

#### Frontend Only
```bash
cd frontend
docker build -t todomaster-frontend .
docker run -p 80:80 todomaster-frontend
```

## ☁️ Cloud Platform Deployment

### Render

1. **Connect your GitHub repository** to Render

2. **Create a Blueprint** using `render.yaml`:
   - Render will automatically detect the `render.yaml` file
   - It will create both backend and frontend services

3. **Set environment variables**:
   - `DATABASE_PASSWORD` (secret)

4. **Deploy**:
   - Push to main branch
   - Render will automatically build and deploy

### Railway

1. **Install Railway CLI**:
```bash
npm i -g @railway/cli
```

2. **Login and initialize**:
```bash
railway login
railway init
```

3. **Deploy**:
```bash
railway up
```

4. **Set environment variables** in Railway dashboard:
   - `DATABASE_PASSWORD`
   - `SPRING_PROFILES_ACTIVE=prod`

### Heroku

1. **Install Heroku CLI** and login:
```bash
heroku login
```

2. **Create apps**:
```bash
heroku create todomaster-backend
heroku create todomaster-frontend
```

3. **Set buildpack for backend**:
```bash
heroku buildpacks:set heroku/java -a todomaster-backend
```

4. **Deploy backend**:
```bash
git subtree push --prefix . heroku main
```

5. **Set environment variables**:
```bash
heroku config:set DATABASE_PASSWORD=your_password -a todomaster-backend
heroku config:set SPRING_PROFILES_ACTIVE=prod -a todomaster-backend
```

## 🔧 Configuration

### Environment Variables

| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| `DATABASE_URL` | PostgreSQL connection URL | Yes | - |
| `DATABASE_USERNAME` | Database username | Yes | - |
| `DATABASE_PASSWORD` | Database password | Yes | - |
| `SPRING_PROFILES_ACTIVE` | Spring profile (prod/dev) | No | prod |
| `JAVA_OPTS` | JVM options | No | -Xmx512m -Xms256m |
| `REACT_APP_API_URL` | Backend API URL for frontend | No | http://localhost:8080 |

### Database Setup

The application uses Supabase PostgreSQL. Ensure:
1. Database is accessible from your deployment platform
2. Connection pooling is enabled
3. SSL is configured if required

### Health Checks

- **Backend**: `GET /actuator/health`
- **Frontend**: `GET /` (returns 200 if nginx is running)

## 🚀 Deployment Checklist

- [ ] Update `.env` with production values
- [ ] Set `DATABASE_PASSWORD` as secret/environment variable
- [ ] Configure CORS origins in `SecurityConfig.java`
- [ ] Update API URLs in frontend if needed
- [ ] Test health check endpoints
- [ ] Enable HTTPS/SSL
- [ ] Configure domain names
- [ ] Set up monitoring and logging
- [ ] Configure backup strategy for database

## 🔍 Troubleshooting

### Build Fails

**Issue**: "No such file or directory: Dockerfile"
- **Solution**: Ensure you're in the project root directory

**Issue**: Maven build fails
- **Solution**: Check Java version (requires Java 17)
- Run: `./mvnw clean install` locally first

### Runtime Issues

**Issue**: Database connection fails
- **Solution**: Verify `DATABASE_PASSWORD` is set correctly
- Check database URL and credentials
- Ensure database allows connections from deployment IP

**Issue**: Frontend can't reach backend
- **Solution**: Update `REACT_APP_API_URL` to backend URL
- Check CORS configuration in `SecurityConfig.java`

### Container Issues

**Issue**: Container exits immediately
- **Solution**: Check logs: `docker logs <container_id>`
- Verify environment variables are set

## 📊 Monitoring

### Logs

**Docker Compose**:
```bash
docker-compose logs -f
```

**Individual Container**:
```bash
docker logs -f <container_name>
```

### Metrics

Access Spring Boot Actuator endpoints:
- `/actuator/health` - Health status
- `/actuator/info` - Application info

## 🔐 Security Notes

1. **Never commit** `.env` file or credentials
2. Use **secrets management** for sensitive data
3. Enable **HTTPS** in production
4. Configure **firewall rules** appropriately
5. Regularly **update dependencies**
6. Use **strong database passwords**

## 📝 Additional Resources

- [Docker Documentation](https://docs.docker.com/)
- [Render Documentation](https://render.com/docs)
- [Spring Boot Docker Guide](https://spring.io/guides/gs/spring-boot-docker/)
- [React Deployment Guide](https://create-react-app.dev/docs/deployment/)
