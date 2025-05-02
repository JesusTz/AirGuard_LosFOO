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
  insertTestData,
  EnvironmentalData,
} from "../database/databaseSQLite";
import { MaterialIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { db } from "../database/Firebase"; // Importa la referencia a Firebase
import { collection, getDocs, query, orderBy, limit, deleteDoc, addDoc } from "firebase/firestore"; // Importa las funciones necesarias
import { generateDynamicTestData } from "../database/testData"; // Importa la función para generar datos aleatorios

export default function CrudScreen() {
  const [currentData, setCurrentData] = useState<EnvironmentalData | null>(
    null
  );
  const router = useRouter();

  const loadCurrentData = async () => {
    try {
      const querySnapshot = await getDocs(
        query(collection(db, "Datos_ambientales"), orderBy("date", "desc"), limit(1)) // Ordena por "date"
      );

      if (!querySnapshot.empty) {
        const doc = querySnapshot.docs[0];
        const data = doc.data();
        setCurrentData({
          temperature: data.temperature,
          humidity: data.humidity,
          dust: data.dust,
          pressure: data.pressure,
          timestamp: data.date.toDate(), // Usa "date" para obtener la fecha
        });
      }
    } catch (error) {
      console.error("Error al cargar el último dato del monitoreo:", error);
    }
  };

  const checkThresholds = async () => {
    try {
      const thresholds = await AsyncStorage.getItem("thresholds");
      console.log("Límites recuperados:", thresholds); // Depuración

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
    try {
      const testData = generateDynamicTestData(); // Genera datos aleatorios
      const batchPromises = testData.map(async (data) => {
        await addDoc(collection(db, "Datos_ambientales"), {
          temperature: data.temperature,
          humidity: data.humidity,
          dust: data.dust,
          pressure: data.pressure,
          date: new Date(), // Guarda la fecha como en createDatos.tsx
        });
      });

      await Promise.all(batchPromises); // Espera a que se inserten todos los datos
      await loadCurrentData(); // Recarga los datos actuales
      Alert.alert("Éxito", "Datos de prueba insertados correctamente");
    } catch (error) {
      console.error("Error al insertar datos de prueba:", error);
      Alert.alert("Error", "No se pudieron insertar los datos de prueba.");
    }
  };

  const handleDeleteAllData = async () => {
    Alert.alert(
      "Confirmar",
      "¿Estás seguro de que deseas eliminar todos los datos y los límites configurados?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Eliminar",
          onPress: async () => {
            try {
              // Elimina todos los documentos de la colección "Datos_ambientales"
              const querySnapshot = await getDocs(collection(db, "Datos_ambientales"));
              const batchSize = querySnapshot.size;

              if (batchSize === 0) {
                Alert.alert("Información", "No hay datos para eliminar.");
                return;
              }

              for (const doc of querySnapshot.docs) {
                await deleteDoc(doc.ref);
              }

              // Limpia los datos actuales en la interfaz
              setCurrentData(null);

              // Elimina los límites de AsyncStorage
              await AsyncStorage.removeItem("thresholds");
              console.log("Límites eliminados de AsyncStorage");

              Alert.alert("Éxito", "Todos los datos y límites han sido eliminados.");
            } catch (error) {
              console.error("Error al eliminar los datos de Firestore:", error);
              Alert.alert("Error", "No se pudieron eliminar los datos.");
            }
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

