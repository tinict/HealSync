# Synchronize
## Obstacle
    - Xung đột dữ liệu
    - Lỗi truyền thông
    - Thiếu đồng bộ hóa và logic

## RabbitMQ
- Producer send message to Consumner receive message

## Best practices
# Example:
    project_root/
    │
    ├── controllers/
    │   ├── userController.js
    │   └── courseController.js
    │
    ├── services/
    │   ├── userService.js
    │   └── courseService.js
    │
    ├── rabbitmq/
    │   ├── producer.js
    │   ├── consumer.js
    │   ├── utils/
    │   │   ├── rabbitmqConfig.js
    │   │   └── rabbitmqUtils.js
    │   └── index.js
    │
    ├── config/
    │   ├── db.js
    │   └── index.js
    │
    ├── logs/
    │
    ├── tests/
    │
    ├── package.json
    └── README.md


## Redis
## Docker
    CLI: docker run -d --name redis -p 6379:6379 redis
    CLI: docker run -d --name redis-stack-server -p 6379:6379 redis/redis-stack-server:latest
    CLI: su 
## Setup Environment Redis
    CLI: npm i redis
## Setup config ZealSync 

## REDIS Pub/sub
    - Pub: Là có nghĩa nơi xử lý các messages khi có sự thay đổi về từ một database nào đó có tác động hoặc mối quan hệ lên database khác, ngay lập tức pub sẽ nhận được tín hiệu có sự thay đổi của database nào đó thi gửi đi 1 massage đến channel.

    - Channel: Channel là tiếp nhận message của pub gửi đến. Có nhiệm vụ tiếp nhận message gửi đến và phân loại db đó có thuộc db nào và gửi tiến hiệu và data đến db đó tức sub sẽ nơi đăng ký của db đó.

    - Sub: Sub có nhiệm vụ nơi chịu trách nhiệu đăng ký hay ghi nhanh chó các db 1 sub tương ứng với 1 db trong mô hình microservice. Khi có tín hiệu liền lấy data update vào csdl.

### Example
    Description: Có 2 cơ sở dữ liệu đó là Account và Doctor.
    Khi 1 người dùng đăng ký 1 Account bất kỳ thì pub sẽ nhận được tín hiệu đang có người tạo tài khoản. Khi tài khoản tạo thành ngay lập tức pub chuyển đi 1 tín hiệu gồm message và data thông tin bác sĩ đó có thể id hoặc mã định danh đến channel. Sau đó channel gửi tín hiệu và db đến sub đã đăng ký sub phân đúng db có người đăng ký ngay lập tức tạo 1 profile doctor ngay lập tức với tín hiệu đó là sub phân biệt được CRUD để thực đúng method và đưa dữ liệu vào db theo đúng mục đích.

## STRUCTURE

# Publisher
Set Port: 8000

# Subcriber
Set Port: 8001
