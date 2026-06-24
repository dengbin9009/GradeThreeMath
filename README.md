# GradeThreeMath

上海三年级数学母题学习工作台，包含 Vue 前端、Hono/Better Auth API、PostgreSQL 数据库、账号有效期管理和交互动画题库。

## Linux 部署

下面示例以 Ubuntu 22.04/24.04、Node.js 20+、PostgreSQL 16/17、Nginx、systemd 为例。域名请替换成你自己的域名，示例使用 `math.example.com`。

### 1. 安装基础依赖

```bash
sudo apt update
sudo apt install -y git curl ca-certificates nginx postgresql postgresql-contrib

curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

node -v
npm -v
psql --version
```

### 2. 拉取代码

```bash
sudo mkdir -p /srv
sudo chown "$USER":"$USER" /srv
cd /srv
git clone https://github.com/dengbin9009/GradeThreeMath.git
cd GradeThreeMath
```

### 3. 创建 PostgreSQL 数据库

请把 `CHANGE_ME_STRONG_PASSWORD` 换成强密码。

```bash
sudo -u postgres psql
```

在 `psql` 中执行：

```sql
CREATE USER math WITH PASSWORD 'CHANGE_ME_STRONG_PASSWORD';
CREATE DATABASE math OWNER math;
\q
```

### 4. 配置环境变量

生产环境不要使用仓库里的示例密码。生成一个至少 32 字符的 `BETTER_AUTH_SECRET`：

```bash
openssl rand -base64 48
```

创建 API 环境文件：

```bash
cd /srv/GradeThreeMath/apps/api
cp .env.example .env
nano .env
```

参考内容：

```bash
DATABASE_URL=postgres://math:CHANGE_ME_STRONG_PASSWORD@127.0.0.1:5432/math
BETTER_AUTH_SECRET=CHANGE_ME_64_CHAR_RANDOM_SECRET
APP_ORIGIN=https://math.example.com
WEB_DIST_DIR=../../apps/web/dist
PORT=4174
NODE_ENV=production
SEED_ADMIN_USERNAME=admin
SEED_ADMIN_PASSWORD=CHANGE_ME_TEMP_ADMIN_PASSWORD_15_PLUS
SEED_ADMIN_NAME=系统管理员
```

说明：

- `APP_ORIGIN` 必须是最终访问地址的 origin，不要带路径，例如 `https://math.example.com`。
- `SEED_ADMIN_PASSWORD` 只用于首次创建管理员，首次登录后会要求修改密码。
- 首次部署完成并确认管理员创建后，建议从 `.env` 中删除 `SEED_ADMIN_PASSWORD`。

### 5. 安装依赖并构建

```bash
cd /srv/GradeThreeMath
npm ci
npm run build
```

### 6. 执行数据库迁移并创建管理员

```bash
cd /srv/GradeThreeMath
npm run db:migrate
npm run seed:admin
```

如果输出提示管理员已存在，可以忽略。首次登录后请立刻修改临时密码。

### 7. 用 systemd 运行服务

创建服务文件：

```bash
sudo nano /etc/systemd/system/grade-three-math.service
```

写入：

```ini
[Unit]
Description=GradeThreeMath learning workbench
After=network.target postgresql.service

[Service]
Type=simple
WorkingDirectory=/srv/GradeThreeMath
EnvironmentFile=/srv/GradeThreeMath/apps/api/.env
ExecStart=/usr/bin/npm run serve:web -w @math/api
Restart=always
RestartSec=5
User=www-data
Group=www-data

[Install]
WantedBy=multi-user.target
```

授权并启动：

```bash
sudo chown -R www-data:www-data /srv/GradeThreeMath
sudo systemctl daemon-reload
sudo systemctl enable --now grade-three-math
sudo systemctl status grade-three-math
```

本应用默认监听 `127.0.0.1:4174`，API 和前端由同一个 Node 服务发布。

### 8. 配置 Nginx 反向代理

创建站点配置：

```bash
sudo nano /etc/nginx/sites-available/grade-three-math
```

写入：

```nginx
server {
    listen 80;
    server_name math.example.com;

    client_max_body_size 20m;

    location / {
        proxy_pass http://127.0.0.1:4174;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

启用站点：

```bash
sudo ln -s /etc/nginx/sites-available/grade-three-math /etc/nginx/sites-enabled/grade-three-math
sudo nginx -t
sudo systemctl reload nginx
```

如果要启用 HTTPS，推荐使用 Certbot：

```bash
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d math.example.com
```

启用 HTTPS 后，确认 `.env` 中的 `APP_ORIGIN` 是 `https://math.example.com`，然后重启服务：

```bash
sudo systemctl restart grade-three-math
```

### 9. 验证部署

```bash
curl -i https://math.example.com/api/health/live
curl -i https://math.example.com/api/health/ready
```

浏览器打开：

```text
https://math.example.com/login
```

使用 `.env` 中的 `SEED_ADMIN_USERNAME` 和 `SEED_ADMIN_PASSWORD` 登录。首次登录后系统会要求修改密码。

### 10. 日常更新

```bash
cd /srv/GradeThreeMath
sudo -u www-data git pull
sudo -u www-data npm ci
sudo -u www-data npm run build
sudo -u www-data npm run db:migrate
sudo systemctl restart grade-three-math
```

更新后检查：

```bash
sudo systemctl status grade-three-math
curl -i https://math.example.com/api/health/ready
```

### 11. 备份与恢复

生产环境建议每天备份 PostgreSQL。示例：

```bash
sudo mkdir -p /srv/math-backups
sudo chown www-data:www-data /srv/math-backups

cd /srv/GradeThreeMath
sudo -u www-data env DATABASE_URL="$(grep '^DATABASE_URL=' apps/api/.env | cut -d= -f2-)" BACKUP_DIR=/srv/math-backups apps/api/scripts/backup.sh
```

恢复请先在隔离数据库演练，不要直接覆盖生产库：

```bash
RESTORE_DATABASE_URL="postgres://math:password@127.0.0.1:5432/math_restore" apps/api/scripts/restore.sh /srv/math-backups/math-YYYYMMDD.dump
```

更多备份说明见 `docs/operations/recovery.md`。
