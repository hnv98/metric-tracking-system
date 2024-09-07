# Metric Tracking System

## Introduction

The Metric Tracking System is an application for managing metrics, allowing users to add and track data such as distance and temperature.

## Requirements

- **Docker:** Ensure Docker is installed on your system.
- **Docker Compose:** Docker Compose is needed to manage Docker services.

## Installation

### 1. Clone Repository

Clone your repository to your local machine:

```bash
git clone https://github.com/hnv98/metric-tracking-system.git
```
### 2. Configure Environment Variables

Create a `.env` file in the root directory of the project and fill in the following configuration:

```env
PORT=3000
DATABASE_USERNAME=admin
DATABASE_PASSWORD=admin
DATABASE_PORT=27017
DATABASE_HOST=metrics_mongodb
DATABASE_NAME=metrics
DATABASE_URI=mongodb://${DATABASE_USERNAME}:${DATABASE_PASSWORD}@metrics_mongodb:27017
```
### 3. Start the Application

Use Docker Compose to build the Docker containers for the application:

```bash
docker-compose --env-file .env up 
```
This command will start the services defined in the docker-compose.yml file, including:
metrics_api_dev: API service.
metrics_mongodb: MongoDB.


### 4. Check API Documentation

You can access your API documentation via Swagger UI at: [http://localhost:3000/api](http://localhost:3000/api)


