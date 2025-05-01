import { useState, useEffect } from "react";
import { View, Text, Pressable, ScrollView, StyleSheet, Alert, Image } from "react-native";
import { useRouter } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import { readAllThresholds, deleteThresholdById, Threshold } from "../database/databaseSQLite";
import styles from "../styles/style_Historial_limites";

export default function ThresholdHistorial_Monitoreo() {
  const [thresholds, setThresholds] = useState<Threshold[]>([]);
  const router = useRouter();

  const loadThresholds = async () => {
    const data = await readAllThresholds();
    setThresholds(data.reverse()); // Mostrar los más recientes primero
  };

  const handleDeleteThreshold = async (id: number) => {
    Alert.alert(
      "Confirmar eliminación",
      "¿Estás seguro de que deseas eliminar este conjunto de límites?",
      [
        { text: "Cancelar", style: "cancel" },
        { 
          text: "Eliminar", 
          onPress: async () => {
            try {
              await deleteThresholdById(id);
              Alert.alert("Éxito", "Límites eliminados correctamente");
              loadThresholds();
            } catch (error) {
              Alert.alert("Error", "No se pudo eliminar los límites");
            }
          }
        }
      ]
    );
  };

  useEffect(() => {
    loadThresholds();
  }, []);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Image 
          source={{ uri: 'https://cdn-icons-png.flaticon.com/512/3132/3132735.png' }}
          style={styles.logo}
        />
        <Text style={styles.title}>Historial de Límites</Text>
        <Text style={styles.subtitle}>Configuraciones anteriores de monitoreo</Text>
      </View>

      {/* Contenido */}
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {thresholds.length > 0 ? (
          thresholds.map((threshold) => (
            <View key={threshold.id} style={styles.card}>
              <View style={styles.cardHeader}>
                <MaterialIcons name="settings" size={20} color="#64748b" />
                <Text style={styles.cardTitle}>
                  {threshold.description || "Límites sin descripción"}
                </Text>
                <Text style={styles.cardDate}>
                  {new Date(threshold.timestamp).toLocaleDateString()}
                </Text>
              </View>

              <View style={styles.dataGrid}>
                <View style={styles.dataItem}>
                  <MaterialIcons name="device-thermostat" size={20} color="#ef4444" />
                  <Text style={styles.dataValue}>{threshold.temperature}°C</Text>
                </View>

                <View style={styles.dataItem}>
                  <MaterialIcons name="water" size={20} color="#3b82f6" />
                  <Text style={styles.dataValue}>{threshold.humidity}%</Text>
                </View>

                <View style={styles.dataItem}>
                  <MaterialIcons name="cloud" size={20} color="#94a3b8" />
                  <Text style={styles.dataValue}>{threshold.dust}µg/m³</Text>
                </View>

                <View style={styles.dataItem}>
                  <MaterialIcons name="speed" size={20} color="#10b981" />
                  <Text style={styles.dataValue}>{threshold.pressure}hPa</Text>
                </View>
              </View>

              <Pressable 
                style={styles.deleteButton} 
                onPress={() => handleDeleteThreshold(threshold.id!)}
              >
                <MaterialIcons name="delete" size={20} color="#fff" />
                <Text style={styles.deleteButtonText}>Eliminar</Text>
              </Pressable>
            </View>
          ))
        ) : (
          <View style={styles.noDataContainer}>
            <MaterialIcons name="error-outline" size={48} color="#64748b" />
            <Text style={styles.noDataText}>No hay límites configurados</Text>
          </View>
        )}
      </ScrollView>

      {/* Botón flotante para regresar */}
      <Pressable 
        style={styles.backButton} 
        onPress={() => router.push("/screens/dashboard")}
      >
        <MaterialIcons name="arrow-back" size={24} color="#fff" />
      </Pressable>
    </View>
  );
}
