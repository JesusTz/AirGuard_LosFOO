import { useState, useEffect } from "react";
import { View, Text, Pressable, ScrollView, Alert, Image } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore"; // Importa Firestore
import { db } from "../database/Firebase"; // Importa la referencia a Firebase
import styles from "../styles/style_Historial_limites";

export default function Historial_Limites() {
  const [thresholds, setThresholds] = useState<{ id: string; description?: string; timestamp?: string; temperature?: number; humidity?: number; dust?: number; pressure?: number }[]>([]);

  // Cargar los datos desde Firestore
  const loadThresholds = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "Limites_Monitoreo"));
      const data = querySnapshot.docs.map((doc) => ({
        id: doc.id, // Incluye el ID del documento
        ...doc.data(),
      }));
      setThresholds(data.reverse()); // Mostrar los más recientes primero
    } catch (error) {
      console.error("Error al cargar los límites:", error);
    }
  };

  // Eliminar un límite de Firestore
  const handleDeleteThreshold = async (id: string) => {
    Alert.alert(
      "Confirmar eliminación",
      "¿Estás seguro de que deseas eliminar este límite?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Eliminar",
          onPress: async () => {
            try {
              await deleteDoc(doc(db, "Limites_Monitoreo", id)); // Elimina el documento en Firestore
              Alert.alert("Éxito", "Límite eliminado correctamente");
              loadThresholds(); // Recargar los datos
            } catch (error) {
              Alert.alert("Error", "No se pudo eliminar el límite");
              console.error(error);
            }
          },
        },
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
          source={{ uri: "https://cdn-icons-png.flaticon.com/512/3132/3132735.png" }}
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
                  {threshold.description || "Límite sin descripción"}
                </Text>
                <Text style={styles.cardDate}>
                  {threshold.timestamp ? new Date(threshold.timestamp).toLocaleDateString() : "Fecha no disponible"}
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
                onPress={() => handleDeleteThreshold(threshold.id)} // Pasa el ID del documento
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
    </View>
  );
}
