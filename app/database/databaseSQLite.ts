// database.ts
import * as SQLite from "expo-sqlite";
import { generateDynamicTestData } from "./testDataSQLite";

const DB_NAME = "airQualityDatabase";

export interface EnvironmentalData {
  id?: number;
  temperature: number; // Temperatura en grados Celsius
  humidity: number; // Humedad en porcentaje
  dust: number; // Concentración de polvo en µg/m³
  pressure: number; // Presión atmosférica en hPa
  timestamp: string; // Fecha y hora del registro
}

export interface Threshold {
  id?: number;
  temperature: number;
  humidity: number;
  dust: number;
  pressure: number;
  description: string; // Descripción del límite
  timestamp: string; // Fecha y hora de creación
}

// Conexión única a la base de datos (singleton)
let dbInstance: SQLite.SQLiteDatabase | null = null;

async function getDatabase() {
  if (!dbInstance) {
    dbInstance = await SQLite.openDatabaseAsync(DB_NAME);
    await dbInstance.execAsync(`
      PRAGMA journal_mode = WAL;
      CREATE TABLE IF NOT EXISTS environmental_data (
        id INTEGER PRIMARY KEY NOT NULL,
        temperature REAL NOT NULL,
        humidity REAL NOT NULL,
        dust REAL NOT NULL,
        pressure REAL NOT NULL,
        timestamp TEXT NOT NULL
      );
      CREATE TABLE IF NOT EXISTS thresholds (
        id INTEGER PRIMARY KEY NOT NULL,
        temperature REAL NOT NULL,
        humidity REAL NOT NULL,
        dust REAL NOT NULL,
        pressure REAL NOT NULL,
        description TEXT NOT NULL,
        timestamp TEXT NOT NULL
      );
    `);
  }
  return dbInstance;
}

// Función para agregar un nuevo registro de datos ambientales
export async function createEnvironmentalData(
  data: Omit<EnvironmentalData, "id">
): Promise<number> {
  const db = await getDatabase();
  const result = await db.runAsync(
    "INSERT INTO environmental_data (temperature, humidity, dust, pressure, timestamp) VALUES (?, ?, ?, ?, ?)",
    data.temperature,
    data.humidity,
    data.dust,
    data.pressure,
    data.timestamp
  );
  return result.lastInsertRowId as number;
}

// Función para leer todos los registros de datos ambientales
export async function readAllEnvironmentalData(): Promise<EnvironmentalData[]> {
  const db = await getDatabase();
  return await db.getAllAsync<EnvironmentalData>("SELECT * FROM environmental_data");
}

// Función para agregar datos de prueba
export async function insertTestData(): Promise<void> {
  const db = await getDatabase();
  
  // Inserta un dato dinámico (opcional)
  const dynamicData = generateDynamicTestData();
  for (const data of dynamicData) {
    await createEnvironmentalData(data);
  }
}

// Función para eliminar todos los datos (útil para pruebas)
export async function deleteAllEnvironmentalData(): Promise<void> {
  const db = await getDatabase();
  await db.runAsync("DELETE FROM environmental_data");
}

// Función para agregar un nuevo límite
export async function createThreshold(data: Omit<Threshold, "id">): Promise<number> {
  const db = await getDatabase();
  const result = await db.runAsync(
    "INSERT INTO thresholds (temperature, humidity, dust, pressure, description, timestamp) VALUES (?, ?, ?, ?, ?, ?)",
    data.temperature,
    data.humidity,
    data.dust,
    data.pressure,
    data.description,
    data.timestamp
  );
  return result.lastInsertRowId as number;
}

// Función para leer todos los límites
export async function readAllThresholds(): Promise<Threshold[]> {
  const db = await getDatabase();
  return await db.getAllAsync<Threshold>("SELECT * FROM thresholds");
}

// Función para eliminar un límite por ID
export async function deleteThresholdById(id: number): Promise<void> {
  const db = await getDatabase();
  await db.runAsync("DELETE FROM thresholds WHERE id = ?", id);
}