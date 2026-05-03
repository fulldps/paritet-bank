#!/usr/bin/env bash
set -e

GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

echo -e "${GREEN}=== Paritet Bank — Setup ===${NC}"

# 1. Проверяем зависимости
check_cmd() {
	if ! command -v "$1" &>/dev/null; then
		echo -e "${RED}✗ $1 не найден. Установите: $2${NC}"
		exit 1
	fi
	echo -e "${GREEN}✓ $1${NC}"
}

echo "Проверяем зависимости..."
check_cmd docker "https://docker.com/products/docker-desktop"
check_cmd node "https://nodejs.org"
check_cmd npm "https://nodejs.org"

# 2. Копируем .env если не существует
copy_env() {
	local dir="$1"
	if [ ! -f "$dir/.env" ]; then
		cp "$dir/.env.example" "$dir/.env"
		echo -e "${YELLOW}⚠ Создан $dir/.env из .env.example — проверь значения!${NC}"
	else
		echo -e "${GREEN}✓ $dir/.env уже существует${NC}"
	fi
}

copy_env "server"
copy_env "frontend"

# 3. Устанавливаем зависимости
echo ""
echo "Устанавливаем зависимости сервера..."
(cd server && npm install)

echo "Устанавливаем зависимости фронтенда..."
(cd frontend && npm install)

# 4. Запускаем PostgreSQL
echo ""
echo "Запускаем PostgreSQL..."
docker compose up -d postgres

# 5. Ждём готовности БД
echo "Ожидаем готовности БД"
until docker compose exec -T postgres pg_isready -U paritet -d paritet_bank &>/dev/null; do
	printf '.'
	sleep 1
done
echo -e " ${GREEN}готово!${NC}"

echo ""
echo -e "${GREEN}✅ Всё готово!${NC}"
echo ""
echo "Запусти разработку:"
echo -e "  ${YELLOW}Терминал 1:${NC} cd server && npm run dev"
echo -e "  ${YELLOW}Терминал 2:${NC} cd frontend && npm run dev"
echo ""
echo -e "pgAdmin (опционально): ${YELLOW}docker compose --profile dev up -d pgadmin${NC}"
echo -e "  → http://localhost:5050  (admin@paritet.by / admin)"
echo ""
echo -e "${YELLOW}⚠ Не забудь добавить GROQ_API_KEY в server/.env${NC}"
echo "  Получи бесплатно: https://console.groq.com"
