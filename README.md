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

## Author

Uladzislau Kamisarau  
s99792@pollub.edu.pl