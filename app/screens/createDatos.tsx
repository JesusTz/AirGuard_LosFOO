import { useState } from "react";
import { View, Text, TextInput, Pressable, StyleSheet, Alert, Image, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import { createEnvironmentalData } from "../database/database";

export default function ManualDataEntryScreen() {
  const [formData, setFormData] = useState({
    temperature: "",
    humidity: "",
    dust: "",
    pressure: ""
  });
  const router = useRouter();

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSaveData = async () => {
    if (!Object.values(formData).every(Boolean)) {
      Alert.alert("Campos incompletos", "Por favor, completa todos los campos.");
      return;
    }

    try {
      await createEnvironmentalData({
        temperature: parseFloat(formData.temperature),
        humidity: parseFloat(formData.humidity),
        dust: parseFloat(formData.dust),
        pressure: parseFloat(formData.pressure),
        timestamp: new Date().toISOString(),
      });
      
      Alert.alert("Éxito", "Datos guardados correctamente", [
        { text: "OK", onPress: () => router.push("/screens/dashboard") }
      ]);
    } catch (error) {
      Alert.alert("Error", "No se pudieron guardar los datos.");
      console.error(error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Image 
          source={{ uri: 'https://cdn-icons-png.flaticon.com/512/3767/3767084.png' }}
          style={styles.logo}
        />
        <Text style={styles.title}>Registro Manual</Text>
        <Text style={styles.subtitle}>Ingresa los datos de calidad del aire</Text>
      </View>

      {/* Formulario */}
      <View style={styles.formContainer}>
        <View style={styles.inputContainer}>
          <MaterialIcons name="device-thermostat" size={24} color="#ef4444" style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="Temperatura (°C)"
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
            placeholder="Humedad (%)"
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
            placeholder="Polvo (µg/m³)"
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
            placeholder="Presión (hPa)"
            placeholderTextColor="#94a3b8"
            keyboardType="numeric"
            value={formData.pressure}
            onChangeText={(text) => handleInputChange('pressure', text)}
          />
        </View>
      </View>

      {/* Botones */}
      <View style={styles.buttonGroup}>
        <Pressable 
          style={[styles.button, styles.saveButton]} 
          onPress={handleSaveData}
        >
          <MaterialIcons name="save" size={24} color="#fff" />
          <Text style={styles.buttonText}>Guardar Datos</Text>
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

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#f0f9ff",
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  header: {
    alignItems: 'center',
    marginTop: 24,
    marginBottom: 32,
  },
  logo: {
    width: 80,
    height: 80,
    marginBottom: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: "800",
    color: "#0369a1",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#64748b",
    textAlign: "center",
  },
  formContainer: {
    marginBottom: 24,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingHorizontal: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    height: 56,
    fontSize: 16,
    color: "#1e293b",
  },
  buttonGroup: {
    marginTop: 8,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  saveButton: {
    backgroundColor: "#0284c7",
  },
  cancelButton: {
    backgroundColor: "#64748b",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 8,
  },
});