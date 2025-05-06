# Weather App

A simple weather application using OpenWeatherMap API and Docker.

## 🔧 Technologies

- **Frontend**: React + Vite, Tailwind CSS
- **Backend**: Node.js (Express)
- **API**: [OpenWeatherMap](https://openweathermap.org/api)
- **Containerization**: Docker
---

## Docker Build & Run

### 🔨 Build the image

```bash
docker build -t weather-app .
```

### Run the container

```bash
docker run -d -p 3000:3000 --name weather-app-container weather-app
```

### Open in browser

```
http://localhost:3000
```

### View logs

```bash
docker logs weather-app-container
```

### Check image layers

```bash
docker history weather-app:latest
```

---
## Linux/arm64 oraz linux/amd64 wykorzystując sterownik buildx docker.

1. Utworzenie i aktywacja buildera dla wielu architektur:
```bash
   docker buildx create --use --name multi-builder
   docker buildx inspect --bootstrap
```
2. Budowanie obrazu dla obu architektur i wypchnięcie go do rejestru:
```bash
docker buildx build --platform linux/amd64,linux/arm64 -t s99792/weather-app:latest --push -f Dockerfile .
```
4. Sprawdzenie manifestu obrazu:
```bash
docker buildx imagetools inspect s99792/weather-app:latest

```

## Author

Uladzislau Kamisarau  
s99792@pollub.edu.pl