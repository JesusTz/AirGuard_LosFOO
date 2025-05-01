// CrudScreen.tsx
import styles from "../styles/style_dashboard";
import { useState, useEffect } from "react";
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  Alert,
  Image,
  ScrollView,
} from "react-native";
import { useRouter } from "expo-router";
import {
  readAllEnvironmentalData,
  insertTestData,
  deleteAllEnvironmentalData,
  EnvironmentalData,
} from "../database/databaseSQLite";
import { MaterialIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function CrudScreen() {
  const [currentData, setCurrentData] = useState<EnvironmentalData | null>(
    null
  );
  const router = useRouter();

  const loadCurrentData = async () => {
    const environmentalData = await readAllEnvironmentalData();
    if (environmentalData.length > 0) {
      setCurrentData(environmentalData[environmentalData.length - 1]);
    }
  };

  const checkThresholds = async () => {
    try {
      const thresholds = await AsyncStorage.getItem("thresholds");
      if (thresholds && currentData) {
        const parsedThresholds = JSON.parse(thresholds);
        const { temperature, humidity, dust, pressure } = parsedThresholds;

        const exceededMetrics = [];

        if (currentData.temperature > temperature) {
          exceededMetrics.push({
            metric: "Temperatura",
            value: currentData.temperature,
            limit: temperature,
          });
        }

        if (currentData.humidity > humidity) {
          exceededMetrics.push({
            metric: "Humedad",
            value: currentData.humidity,
            limit: humidity,
          });
        }

        if (currentData.dust > dust) {
          exceededMetrics.push({
            metric: "Polvo",
            value: currentData.dust,
            limit: dust,
          });
        }

        if (currentData.pressure > pressure) {
          exceededMetrics.push({
            metric: "Presión",
            value: currentData.pressure,
            limit: pressure,
          });
        }

        if (exceededMetrics.length > 0) {
          const exceededMessages = exceededMetrics.map(
            (e) => `${e.metric} (Actual: ${e.value}, Límite: ${e.limit})`
          );

          Alert.alert(
            "¡Alerta de Calidad del Aire!",
            `Se han excedido los límites:\n${exceededMessages.join("\n")}`
          );
        }
      }
    } catch (error) {
      console.error("Error al verificar los límites:", error);
    }
  };

  useEffect(() => {
    loadCurrentData();
  }, []);

  useEffect(() => {
    if (currentData) {
      checkThresholds();
    }
  }, [currentData]);

  const handleInsertTestData = async () => {
    await insertTestData();
    await loadCurrentData();
    Alert.alert("Éxito", "Datos de prueba insertados correctamente");
  };

  const handleDeleteAllData = async () => {
    Alert.alert(
      "Confirmar",
      "¿Estás seguro de que deseas eliminar todos los datos?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Eliminar",
          onPress: async () => {
            await deleteAllEnvironmentalData();
            setCurrentData(null);
            Alert.alert("Éxito", "Todos los datos han sido eliminados");
          },
        },
      ]
    );
  };

  const handleManualDataEntry = () => router.push("/screens/createDatos");
  const handleThresholdSettings = () =>
    router.push("/screens/limitesMonitoreo");
  const handleViewThresholdHistory = () =>
    router.push("/screens/Historial_Monitoreo");

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Header */}
        <View style={styles.header}>
          <Image
            source={{
              uri: "https://cdn-icons-png.flaticon.com/512/4087/4087979.png",
            }}
            style={styles.logo}
          />
          <Text style={styles.title}>Monitoreo Actual</Text>
          <Text style={styles.subtitle}>
            Datos en tiempo real de calidad del aire
          </Text>
        </View>

        {/* Tarjeta de datos */}
        {currentData ? (
          <View style={styles.dataCard}>
            <View style={styles.dataRow}>
              <MaterialIcons
                name="device-thermostat"
                size={24}
                color="#0369a1"
              />
              <Text style={styles.dataText}>
                <Text style={styles.label}>Temperatura: </Text>
                <Text style={styles.value}>{currentData.temperature} °C</Text>
              </Text>
            </View>

            <View style={styles.dataRow}>
              <MaterialIcons name="water" size={24} color="#0369a1" />
              <Text style={styles.dataText}>
                <Text style={styles.label}>Humedad: </Text>
                <Text style={styles.value}>{currentData.humidity} %</Text>
              </Text>
            </View>

            <View style={styles.dataRow}>
              <MaterialIcons name="cloud" size={24} color="#0369a1" />
              <Text style={styles.dataText}>
                <Text style={styles.label}>Polvo: </Text>
                <Text style={styles.value}>{currentData.dust} µg/m³</Text>
              </Text>
            </View>

            <View style={styles.dataRow}>
              <MaterialIcons name="speed" size={24} color="#0369a1" />
              <Text style={styles.dataText}>
                <Text style={styles.label}>Presión: </Text>
                <Text style={styles.value}>{currentData.pressure} hPa</Text>
              </Text>
            </View>

            <View style={styles.dataRow}>
              <MaterialIcons name="access-time" size={24} color="#0369a1" />
              <Text style={styles.dataText}>
                <Text style={styles.label}>Registrado: </Text>
                <Text style={styles.value}>
                  {new Date(currentData.timestamp).toLocaleString()}
                </Text>
              </Text>
            </View>
          </View>
        ) : (
          <View style={styles.noDataContainer}>
            <MaterialIcons name="error-outline" size={48} color="#64748b" />
            <Text style={styles.noDataText}>No hay datos disponibles</Text>
          </View>
        )}

        {/* Botones principales */}
        <View style={styles.buttonGroup}>
          <Pressable
            style={[styles.button, styles.primaryButton]}
            onPress={handleManualDataEntry}
          >
            <MaterialIcons name="add-circle" size={24} color="#fff" />
            <Text style={styles.buttonText}>Agregar Datos</Text>
          </Pressable>

          <Pressable
            style={[styles.button, styles.secondaryButton]}
            onPress={handleThresholdSettings}
          >
            <MaterialIcons name="settings" size={24} color="#fff" />
            <Text style={styles.buttonText}>Configurar Límites</Text>
          </Pressable>
        </View>

        <View style={styles.buttonGroup}>
          <Pressable
            style={[styles.button, styles.historyButton]}
            onPress={handleViewThresholdHistory}
          >
            <MaterialIcons name="history" size={24} color="#fff" />
            <Text style={styles.buttonText}>Ver Historial</Text>
          </Pressable>

          <Pressable
            style={[styles.button, styles.dangerButton]}
            onPress={handleDeleteAllData}
          >
            <MaterialIcons name="delete" size={24} color="#fff" />
            <Text style={styles.buttonText}>Limpiar Datos</Text>
          </Pressable>
        </View>
      </ScrollView>

      {/* Botón flotante para datos de prueba */}
      <Pressable style={styles.floatingButton} onPress={handleInsertTestData}>
        <MaterialIcons name="science" size={28} color="#fff" />
      </Pressable>
    </View>
  );
}

