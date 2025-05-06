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

---
## Screenshots:
![image](https://github.com/user-attachments/assets/b50d4213-79d7-40d8-b934-25c936a64651)
![image](https://github.com/user-attachments/assets/79669f27-bcb6-4782-a52c-bf419c7e18b3)
![image](https://github.com/user-attachments/assets/11685dae-8da9-4258-bd29-a0b2568c9b05)


## Author

Uladzislau Kamisarau  
s99792@pollub.edu.pl
