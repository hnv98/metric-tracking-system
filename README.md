# Metric Tracking System

## Giới Thiệu

Metric Tracking System là một ứng dụng quản lý số liệu giúp người dùng thêm  và theo dõi các số liệu như khoảng cách và nhiệt độ.

## Yêu Cầu

- **Docker:** Đảm bảo rằng Docker đã được cài đặt trên hệ thống của bạn.
- **Docker Compose:** Cần Docker Compose để quản lý các dịch vụ Docker.

## Cài Đặt

### 1. Clone Repository

Clone repository của bạn về máy local:

```bash
git clone https://github.com/hnv98/metric-tracking-system.git
```
### 2. Cấu Hình Biến Môi Trường

Tạo file `.env` trong thư mục gốc của dự án và điền thông tin cấu hình sau:

```env
PORT=3000
DATABASE_USERNAME=admin
DATABASE_PASSWORD=admin
DATABASE_PORT=27017
DATABASE_HOST=metrics_mongodb
DATABASE_NAME=metrics
DATABASE_URI=mongodb://${DATABASE_USERNAME}:${DATABASE_PASSWORD}@metrics_mongodb:27017
```
### 3. Khởi Động Ứng Dụng

Sử dụng Docker Compose để xây dựng các container Docker cho ứng dụng:

```bash
docker-compose --env-file .env up 
```
Lệnh này sẽ khởi động các dịch vụ được định nghĩa trong file docker-compose.yml, bao gồm:
metrics_api_dev: Api-service.
metrics_mongodb: MongoDB.

### 4. Kiểm Tra Tài Liệu API

Tài liệu API của bạn có thể được truy cập qua Swagger UI tại: [http://localhost:3000/api](http://localhost:3000/api)


