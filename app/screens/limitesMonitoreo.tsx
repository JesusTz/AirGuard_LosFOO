import { useState } from "react";
import { View, Text, TextInput, Pressable, StyleSheet, Alert, Image, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import { createThreshold } from "../database/databaseSQLite";
import styles from "../styles/style_Limites_Monitoreo";

export default function ThresholdSettingsScreen() {
  const [formData, setFormData] = useState({
    temperature: "",
    humidity: "",
    dust: "",
    pressure: "",
    description: ""
  });
  const router = useRouter();

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSaveThresholds = async () => {
    if (!Object.values(formData).every(Boolean)) {
      Alert.alert("Campos incompletos", "Por favor completa todos los campos.");
      return;
    }

    const thresholds = {
      temperature: parseFloat(formData.temperature),
      humidity: parseFloat(formData.humidity),
      dust: parseFloat(formData.dust),
      pressure: parseFloat(formData.pressure),
      description: formData.description,
      timestamp: new Date().toISOString(),
    };

    try {
      await createThreshold(thresholds);
      Alert.alert("Éxito", "Límites guardados correctamente", [
        { text: "OK", onPress: () => router.push("/screens/dashboard") }
      ]);
    } catch (error) {
      Alert.alert("Error", "No se pudieron guardar los límites.");
      console.error(error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Image 
          source={{ uri: 'https://cdn-icons-png.flaticon.com/512/3767/3767094.png' }}
          style={styles.logo}
        />
        <Text style={styles.title}>Configurar Límites</Text>
        <Text style={styles.subtitle}>Establece los valores máximos permitidos</Text>
      </View>

      {/* Formulario */}
      <View style={styles.formContainer}>
        <View style={styles.inputContainer}>
          <MaterialIcons name="device-thermostat" size={24} color="#ef4444" style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="Límite de temperatura (°C)"
            placeholderTextColor="#94a3b8"
            keyboardType="numeric"
            value={formData.temperature}
            onChangeText={(text) => handleInputChange('temperature', text)}
          />
        </View>

        <View style={styles.inputContainer}>
          <MaterialIcons name="water" size={24} color="#3b82f6" style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="Límite de humedad (%)"
            placeholderTextColor="#94a3b8"
            keyboardType="numeric"
            value={formData.humidity}
            onChangeText={(text) => handleInputChange('humidity', text)}
          />
        </View>

        <View style={styles.inputContainer}>
          <MaterialIcons name="cloud" size={24} color="#94a3b8" style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="Límite de polvo (µg/m³)"
            placeholderTextColor="#94a3b8"
            keyboardType="numeric"
            value={formData.dust}
            onChangeText={(text) => handleInputChange('dust', text)}
          />
        </View>

        <View style={styles.inputContainer}>
          <MaterialIcons name="speed" size={24} color="#10b981" style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="Límite de presión (hPa)"
            placeholderTextColor="#94a3b8"
            keyboardType="numeric"
            value={formData.pressure}
            onChangeText={(text) => handleInputChange('pressure', text)}
          />
        </View>

        <View style={styles.inputContainer}>
          <MaterialIcons name="description" size={24} color="#8b5cf6" style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="Descripción (ej. 'Verano 2024')"
            placeholderTextColor="#94a3b8"
            value={formData.description}
            onChangeText={(text) => handleInputChange('description', text)}
            multiline
          />
        </View>
      </View>

      {/* Botones */}
      <View style={styles.buttonGroup}>
        <Pressable 
          style={[styles.button, styles.saveButton]} 
          onPress={handleSaveThresholds}
        >
          <MaterialIcons name="save" size={24} color="#fff" />
          <Text style={styles.buttonText}>Guardar Límites</Text>
        </Pressable>

        <Pressable 
          style={[styles.button, styles.historyButton]} 
          onPress={() => router.push("/screens/Historial_Limites")}
        >
          <MaterialIcons name="history" size={24} color="#fff" />
          <Text style={styles.buttonText}>Ver Historial</Text>
        </Pressable>

        <Pressable 
          style={[styles.button, styles.cancelButton]} 
          onPress={() => router.push("/screens/dashboard")}
        >
          <MaterialIcons name="arrow-back" size={24} color="#fff" />
          <Text style={styles.buttonText}>Regresar</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

