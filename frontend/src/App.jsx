import React from 'react';
import axios from 'axios';
import {useEffect, useState} from "react";
import {CloudRain, ArrowRight, Loader2 } from "lucide-react";
const popularCities = [
    "Warsaw",
    "London",
    "New York",
    "Tokyo",
    "Paris",
    "Sydney",
    "Dubai",
    "Singapore",
    "Berlin",
    "Toronto",
    "Barcelona",
]

export default function App() {
    const [selectedCity, setSelectedCity] = useState("")
    const [weatherData, setWeatherData] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const handleCityChange = (e) => {
        setSelectedCity(e.target.value)
    }

    const fetchWeather = async () => {
        if (!selectedCity) {
            setError("Please select a city")
            return
        }

        setLoading(true)
        setError(null)

        try {
            const response = await fetch("/api/weather", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ city: selectedCity }),
            })

            if (!response.ok) {
                throw new Error("Failed to fetch weather data")
            }

            const data = await response.json()
            setWeatherData(data)
        } catch (err) {
            setError("Failed to fetch weather data. Please try again.")
            console.error(err)
        } finally {
            setLoading(false)
        }
    }


    return (
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden max-w-2xl mx-auto mt-10">
            <div className="p-6 sm:p-8">
                <div className="flex items-center mb-6">
                    <CloudRain className="h-6 w-6 text-slate-700 mr-2" />
                    <h1 className="text-xl font-medium text-slate-800">Weather Finder</h1>
                </div>

                <div className="space-y-6">
                    <div className="space-y-2">
                        <label htmlFor="city-select" className="block text-sm font-medium text-slate-700">
                            Select a city
                        </label>
                        <div className="flex gap-2">
                            <select
                                id="city-select"
                                value={selectedCity}
                                onChange={handleCityChange}
                                className="block w-full rounded-lg border-slate-200 bg-slate-50 py-3 px-4 text-slate-700 focus:border-slate-500 focus:ring-slate-500"
                            >
                                <option value="">Select a city</option>
                                {popularCities.map((city) => (
                                    <option key={city} value={city}>
                                        {city}
                                    </option>
                                ))}
                            </select>
                            <button
                                onClick={fetchWeather}
                                disabled={loading || !selectedCity}
                                className="inline-flex items-center justify-center rounded-lg bg-slate-800 px-4 py-3 text-sm font-medium text-white hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            >
                                {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <ArrowRight className="h-4 w-4" />}
                            </button>
                        </div>
                        {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
                    </div>

                    {weatherData && (
                        <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl p-6 space-y-4">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h2 className="text-2xl font-semibold text-slate-800">
                                        {weatherData.name}, {weatherData.sys.country}
                                    </h2>
                                    <p className="text-slate-500">
                                        {new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}
                                    </p>
                                </div>
                                <div className="flex items-center">
                                    <img
                                        src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
                                        alt={weatherData.weather[0].description}
                                        className="w-16 h-16"
                                    />
                                </div>
                            </div>

                            <div className="flex items-end">
                                <span className="text-5xl font-light text-slate-800">{Math.round(weatherData.main.temp)}°</span>
                                <span className="ml-2 text-slate-500 capitalize">{weatherData.weather[0].description}</span>
                            </div>

                            <div className="grid grid-cols-2 gap-4 pt-2">
                                <div className="bg-white/60 p-3 rounded-lg">
                                    <p className="text-xs text-slate-500">Feels Like</p>
                                    <p className="text-lg font-medium text-slate-700">{Math.round(weatherData.main.feels_like)}°</p>
                                </div>
                                <div className="bg-white/60 p-3 rounded-lg">
                                    <p className="text-xs text-slate-500">Wind</p>
                                    <p className="text-lg font-medium text-slate-700">{Math.round(weatherData.wind.speed)} m/s</p>
                                </div>
                                <div className="bg-white/60 p-3 rounded-lg">
                                    <p className="text-xs text-slate-500">Humidity</p>
                                    <p className="text-lg font-medium text-slate-700">{weatherData.main.humidity}%</p>
                                </div>
                                <div className="bg-white/60 p-3 rounded-lg">
                                    <p className="text-xs text-slate-500">Pressure</p>
                                    <p className="text-lg font-medium text-slate-700">{weatherData.main.pressure} hPa</p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}