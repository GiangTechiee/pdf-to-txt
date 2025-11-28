# 50 câu hỏi trắc nghiệm Docker (từ dễ đến khó)

> Mỗi câu chỉ có một đáp án đúng. Đáp án nằm ngay dưới từng câu.

---

## Phần 1 – Cơ bản về Docker

### Câu 1

Docker là gì?
A. Platform để containerize applications
B. Virtual machine
C. Programming language
D. Database

**Đáp án: A**

---

### Câu 2

Container khác Virtual Machine ở chỗ?
A. Container share OS kernel, VM có OS riêng
B. Giống nhau hoàn toàn
C. VM nhẹ hơn
D. Container có OS riêng

**Đáp án: A**

---

### Câu 3

Docker Image là gì?
A. Template read-only để tạo containers
B. Running container
C. Virtual machine image
D. Backup file

**Đáp án: A**

---

### Câu 4

Docker Container là gì?
A. Running instance của image
B. Template
C. Virtual machine
D. Image file

**Đáp án: A**

---

### Câu 5

Lệnh xem Docker version?
A. `docker --version` hoặc `docker version`
B. `docker -v`
C. `docker info`
D. `docker status`

**Đáp án: A**

---

### Câu 6

Lệnh pull image từ Docker Hub?
A. `docker pull image:tag`
B. `docker download image:tag`
C. `docker get image:tag`
D. `docker fetch image:tag`

**Đáp án: A**

---

### Câu 7

Lệnh xem danh sách images?
A. `docker images` hoặc `docker image ls`
B. `docker list images`
C. `docker show images`
D. `docker get images`

**Đáp án: A**

---

### Câu 8

Lệnh xem danh sách containers đang chạy?
A. `docker ps`
B. `docker list`
C. `docker containers`
D. `docker show`

**Đáp án: A**

---

### Câu 9

Lệnh xem tất cả containers (cả stopped)?
A. `docker ps -a`
B. `docker ps --all`
C. `docker container ls -a`
D. Cả A, B và C đều đúng

**Đáp án: D**

---

### Câu 10

Lệnh chạy container từ image?
A. `docker run image:tag`
B. `docker start image:tag`
C. `docker create image:tag`
D. `docker execute image:tag`

**Đáp án: A**

---

## Phần 2 – Docker Commands

### Câu 11

Chạy container ở background (detached mode)?
A. `docker run -d image`
B. `docker run -b image`
C. `docker run --background image`
D. `docker run -bg image`

**Đáp án: A**

---

### Câu 12

Chạy container với interactive terminal?
A. `docker run -it image`
B. `docker run -i image`
C. `docker run -t image`
D. `docker run --terminal image`

**Đáp án: A**

---

### Câu 13

Map port từ host sang container?
A. `docker run -p host_port:container_port image`
B. `docker run -port host:container image`
C. `docker run --port host:container image`
D. `docker run -P image`

**Đáp án: A**

---

### Câu 14

Đặt tên cho container?
A. `docker run --name container_name image`
B. `docker run -n container_name image`
C. `docker run --title container_name image`
D. `docker run -name container_name image`

**Đáp án: A**

---

### Câu 15

Lệnh stop container?
A. `docker stop container_id`
B. `docker kill container_id`
C. `docker pause container_id`
D. `docker halt container_id`

**Đáp án: A**

---

### Câu 16

Lệnh start container đã stopped?
A. `docker start container_id`
B. `docker run container_id`
C. `docker resume container_id`
D. `docker continue container_id`

**Đáp án: A**

---

### Câu 17

Lệnh restart container?
A. `docker restart container_id`
B. `docker reboot container_id`
C. `docker reload container_id`
D. `docker refresh container_id`

**Đáp án: A**

---

### Câu 18

Lệnh xóa container?
A. `docker rm container_id`
B. `docker delete container_id`
C. `docker remove container_id`
D. `docker drop container_id`

**Đáp án: A**

---

### Câu 19

Lệnh xóa image?
A. `docker rmi image_id`
B. `docker rm image_id`
C. `docker delete image_id`
D. `docker remove image_id`

**Đáp án: A**

---

### Câu 20

Lệnh xem logs của container?
A. `docker logs container_id`
B. `docker log container_id`
C. `docker show-logs container_id`
D. `docker get-logs container_id`

**Đáp án: A**

---

## Phần 3 – Dockerfile

### Câu 21

Dockerfile là gì?
A. Text file chứa instructions để build image
B. Binary file
C. Configuration file cho container
D. Log file

**Đáp án: A**

---

### Câu 22

Instruction để chọn base image?
A. `FROM image:tag`
B. `BASE image:tag`
C. `IMAGE image:tag`
D. `USE image:tag`

**Đáp án: A**

---

### Câu 23

Instruction để chạy commands khi build image?
A. `RUN command`
B. `EXEC command`
C. `CMD command`
D. `DO command`

**Đáp án: A**

---

### Câu 24

Instruction để set working directory?
A. `WORKDIR /path`
B. `CD /path`
C. `DIR /path`
D. `PATH /path`

**Đáp án: A**

---

### Câu 25

Instruction để copy files vào image?
A. `COPY source dest`
B. `CP source dest`
C. `MOVE source dest`
D. `ADD source dest`

**Đáp án: A**

---

### Câu 26

Khác biệt giữa COPY và ADD?
A. ADD có thêm features như extract tar và download URLs
B. Giống nhau hoàn toàn
C. COPY có nhiều features hơn
D. Không có khác biệt

**Đáp án: A**

---

### Câu 27

Instruction để set environment variables?
A. `ENV KEY=VALUE`
B. `SET KEY=VALUE`
C. `VAR KEY=VALUE`
D. `EXPORT KEY=VALUE`

**Đáp án: A**

---

### Câu 28

Instruction để expose port?
A. `EXPOSE port`
B. `PORT port`
C. `OPEN port`
D. `LISTEN port`

**Đáp án: A**

---

### Câu 29

Instruction để set default command khi container starts?
A. `CMD ["executable", "param1"]`
B. `RUN ["executable", "param1"]`
C. `START ["executable", "param1"]`
D. `EXEC ["executable", "param1"]`

**Đáp án: A**

---

### Câu 30

Khác biệt giữa CMD và ENTRYPOINT?
A. ENTRYPOINT không thể override dễ dàng, CMD có thể
B. Giống nhau hoàn toàn
C. CMD không thể override
D. ENTRYPOINT dễ override hơn

**Đáp án: A**

---

## Phần 4 – Docker Volumes & Networks

### Câu 31

Docker Volume dùng để?
A. Persist data và share data giữa containers
B. Chỉ backup data
C. Tăng performance
D. Security

**Đáp án: A**

---

### Câu 32

Lệnh tạo volume?
A. `docker volume create volume_name`
B. `docker create volume volume_name`
C. `docker make volume volume_name`
D. `docker new volume volume_name`

**Đáp án: A**

---

### Câu 33

Mount volume vào container?
A. `docker run -v volume_name:/path image`
B. `docker run --volume volume_name:/path image`
C. `docker run --mount source=volume_name,target=/path image`
D. Cả A, B và C đều đúng

**Đáp án: D**

---

### Câu 34

Bind mount là gì?
A. Mount host directory vào container
B. Mount volume vào container
C. Mount container vào host
D. Không có bind mount

**Đáp án: A**

---

### Câu 35

Lệnh xem danh sách volumes?
A. `docker volume ls`
B. `docker list volumes`
C. `docker show volumes`
D. `docker get volumes`

**Đáp án: A**

---

### Câu 36

Docker Network dùng để?
A. Kết nối containers với nhau
B. Kết nối internet
C. Security
D. Monitoring

**Đáp án: A**

---

### Câu 37

Network drivers trong Docker?
A. bridge, host, overlay, macvlan, none
B. Chỉ bridge
C. Chỉ host
D. Không có drivers

**Đáp án: A**

---

### Câu 38

Default network driver?
A. bridge
B. host
C. overlay
D. none

**Đáp án: A**

---

### Câu 39

Lệnh tạo network?
A. `docker network create network_name`
B. `docker create network network_name`
C. `docker make network network_name`
D. `docker new network network_name`

**Đáp án: A**

---

### Câu 40

Connect container vào network?
A. `docker network connect network_name container_name`
B. `docker connect network_name container_name`
C. `docker join network_name container_name`
D. `docker link network_name container_name`

**Đáp án: A**

---

## Phần 5 – Docker Compose & Advanced

### Câu 41

Docker Compose là gì?
A. Tool để define và run multi-container applications
B. Tool để build images
C. Tool để monitor containers
D. Tool để backup containers

**Đáp án: A**

---

### Câu 42

File cấu hình của Docker Compose?
A. `docker-compose.yml`
B. `compose.yaml`
C. `docker.yml`
D. `config.yml`

**Đáp án: A**

---

### Câu 43

Lệnh start services trong Docker Compose?
A. `docker-compose up`
B. `docker-compose start`
C. `docker-compose run`
D. `docker-compose begin`

**Đáp án: A**

---

### Câu 44

Lệnh stop services trong Docker Compose?
A. `docker-compose down`
B. `docker-compose stop`
C. `docker-compose halt`
D. `docker-compose end`

**Đáp án: A**

---

### Câu 45

Multi-stage build trong Dockerfile dùng để?
A. Giảm image size bằng cách dùng nhiều FROM statements
B. Build nhiều images
C. Build nhanh hơn
D. Không có multi-stage build

**Đáp án: A**

---

### Câu 46

Docker Registry là gì?
A. Service để store và distribute images
B. Container registry
C. Volume registry
D. Network registry

**Đáp án: A**

---

### Câu 47

Docker Hub là gì?
A. Public Docker registry
B. Private registry
C. Local registry
D. Backup service

**Đáp án: A**

---

### Câu 48

Lệnh push image lên registry?
A. `docker push image:tag`
B. `docker upload image:tag`
C. `docker send image:tag`
D. `docker publish image:tag`

**Đáp án: A**

---

### Câu 49

Docker Swarm là gì?
A. Native clustering và orchestration cho Docker
B. Monitoring tool
C. Backup tool
D. Security tool

**Đáp án: A**

---

### Câu 50

.dockerignore file dùng để?
A. Exclude files/directories khi build image
B. Ignore containers
C. Ignore networks
D. Ignore volumes

**Đáp án: A**

---
