# 1) Build frontend with Vite
FROM oven/bun:1.1 AS builder

# Ustawiamy katalog roboczy
WORKDIR /app

# Kopiujemy zależności do cache
COPY package.json bun.lock ./

# Instalujemy zależności
RUN bun install

# Kopiujemy kod źródłowy frontend
COPY frontend ./frontend

# Budujemy aplikację Vite
RUN cd frontend && bunx vite build

# 2) Setup production server
FROM oven/bun:1.1-slim AS runner

LABEL org.opencontainers.image.authors="Uladzislau Kamisarau <s99792@pollub.edu.pl>"
# Ustawiamy katalog roboczy
WORKDIR /app

# Kopiujemy zależności i instalujemy tylko zależności produkcyjne
COPY package.json  ./
RUN bun install --production

# Kopiujemy backend
COPY backend ./backend

# Kopiujemy zbudowany frontend
COPY --from=builder /app/frontend/dist ./frontend/dist

# Udostępniamy port
EXPOSE 3000

# Healthcheck
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
  CMD curl --fail http://localhost:3000 || exit 1

# Komenda uruchomienia
CMD ["bun", "backend/index.js"]
