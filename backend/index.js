import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
dotenv.config();


const app = express();

app.use(express.json());
app.use(express.static('frontend/dist')); // Serve the frontend at the root URL

app.get('/api', (req, res) => {
    res.send('Hello World');
    }
);

app.post('/api/weather', async (req, res) => {
    const {city} = req.body;

    const apiKey = "0d35105486dec16e27236b1147ee7892"
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=pl`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.cod !== 200) {
            return res.status(400).send(`Błąd: ${data.message}`);
        }
        res.send(data);
    } catch (err) {
        res.status(500).send("Błąd pobierania danych pogodowych.");
    }
});

app.get('/api/weather', async (req, res) => {

    const apiKey = process.env.WEATEHER_API_KEY;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=London&appid=${apiKey}&units=metric&lang=pl`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.cod !== 200) {
            return res.status(400).send(`Błąd: ${data.message}`);
        }
        res.send(data);
    } catch (err) {
        res.status(500).send("Błąd pobierania danych pogodowych.");
    }
});


app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/dist", "index.html"), err => {
        if (err) {
            console.log(err);
        }
    });
});

app.listen(3000, () => {
    const date = new Date().toISOString();
    console.log(`App started at ${date}`);
    console.log(`Author: Uladzislau Kamisarau`);
    console.log('Server is listening on port 3000: http://localhost:3000');
});