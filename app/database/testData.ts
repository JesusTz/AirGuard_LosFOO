import { EnvironmentalData } from "./databaseSQLite";

// Función para generar 10 datos dinámicos
export function generateDynamicTestData(): Omit<EnvironmentalData, "id">[] {
  const data: Omit<EnvironmentalData, "id">[] = [];
  
  for (let i = 0; i < 10; i++) {
    const randomTemperature = (20 + Math.random() * 10).toFixed(1); // 20°C - 30°C
    const randomHumidity = (50 + Math.random() * 20).toFixed(1); // 50% - 70%
    const randomDust = (30 + Math.random() * 20).toFixed(1); // 30 µg/m³ - 50 µg/m³
    const randomPressure = (1010 + Math.random() * 10).toFixed(1); // 1010 hPa - 1020 hPa

    data.push({
      temperature: parseFloat(randomTemperature),
      humidity: parseFloat(randomHumidity),
      dust: parseFloat(randomDust),
      pressure: parseFloat(randomPressure),
      timestamp: new Date().toISOString(),
    });
  }

  return data;
}
