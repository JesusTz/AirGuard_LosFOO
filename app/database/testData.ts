// testData.ts

import { EnvironmentalData } from "./database";

// Datos de prueba para simular los datos del ESP32
export const testEnvironmentalData: Omit<EnvironmentalData, "id">[] = [
  {
    temperature: 25.3,
    humidity: 60.5,
    dust: 35.2,
    pressure: 1013.2,
    timestamp: new Date().toISOString(),
  },
  {
    temperature: 22.8,
    humidity: 55.1,
    dust: 40.7,
    pressure: 1012.8,
    timestamp: new Date().toISOString(),
  },
  {
    temperature: 27.1,
    humidity: 65.3,
    dust: 30.5,
    pressure: 1014.5,
    timestamp: new Date().toISOString(),
  },
  {
    temperature: 24.0,
    humidity: 58.2,
    dust: 38.9,
    pressure: 1011.7,
    timestamp: new Date().toISOString(),
  },
  {
    temperature: 23.5,
    humidity: 62.0,
    dust: 33.8,
    pressure: 1013.0,
    timestamp: new Date().toISOString(),
  },
];

// Función para generar datos dinámicos (opcional)
export function generateDynamicTestData(): Omit<EnvironmentalData, "id"> {
  const randomTemperature = (20 + Math.random() * 10).toFixed(1); // 20°C - 30°C
  const randomHumidity = (50 + Math.random() * 20).toFixed(1); // 50% - 70%
  const randomDust = (30 + Math.random() * 20).toFixed(1); // 30 µg/m³ - 50 µg/m³
  const randomPressure = (1010 + Math.random() * 10).toFixed(1); // 1010 hPa - 1020 hPa

  return {
    temperature: parseFloat(randomTemperature),
    humidity: parseFloat(randomHumidity),
    dust: parseFloat(randomDust),
    pressure: parseFloat(randomPressure),
    timestamp: new Date().toISOString(),
  };
}
