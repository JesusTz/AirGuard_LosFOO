import { useState, useEffect } from "react";
import { View, Text, ScrollView, StyleSheet, Image } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { readAllEnvironmentalData, EnvironmentalData } from "../database/databaseSQLite";
import styles from "../styles/style_Historial_Monitoreo";

export default function Historial_Monitoreo() {
  const [data, setData] = useState<EnvironmentalData[]>([]);

  const loadEnvironmentalData = async () => {
    const environmentalData = await readAllEnvironmentalData();
    setData(environmentalData.reverse()); // Mostrar los más recientes primero
  };

  useEffect(() => {
    loadEnvironmentalData();
  }, []);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Image 
          source={{ uri: 'https://cdn-icons-png.flaticon.com/512/3132/3132735.png' }}
          style={styles.logo}
        />
        <Text style={styles.title}>Historial Completo</Text>
        <Text style={styles.subtitle}>Registros de calidad del aire</Text>
      </View>

      {/* Contenido */}
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {data.length > 0 ? (
          data.map((item, index) => (
            <View key={index} style={styles.dataCard}>
              <View style={styles.cardHeader}>
                <MaterialIcons name="calendar-today" size={20} color="#64748b" />
                <Text style={styles.timestamp}>
                  {new Date(item.timestamp).toLocaleString()}
                </Text>
              </View>

              <View style={styles.dataGrid}>
                <View style={styles.dataItem}>
                  <MaterialIcons name="device-thermostat" size={24} color="#ef4444" />
                  <Text style={styles.dataValue}>{item.temperature}°C</Text>
                  <Text style={styles.dataLabel}>Temp.</Text>
                </View>

                <View style={styles.dataItem}>
                  <MaterialIcons name="water" size={24} color="#3b82f6" />
                  <Text style={styles.dataValue}>{item.humidity}%</Text>
                  <Text style={styles.dataLabel}>Hum.</Text>
                </View>

                <View style={styles.dataItem}>
                  <MaterialIcons name="cloud" size={24} color="#94a3b8" />
                  <Text style={styles.dataValue}>{item.dust}µg/m³</Text>
                  <Text style={styles.dataLabel}>Polvo</Text>
                </View>

                <View style={styles.dataItem}>
                  <MaterialIcons name="speed" size={24} color="#10b981" />
                  <Text style={styles.dataValue}>{item.pressure}hPa</Text>
                  <Text style={styles.dataLabel}>Presión</Text>
                </View>
              </View>
            </View>
          ))
        ) : (
          <View style={styles.noDataContainer}>
            <MaterialIcons name="error-outline" size={48} color="#64748b" />
            <Text style={styles.noDataText}>No hay datos históricos disponibles</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

