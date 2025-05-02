import { useState } from "react";
import { View, Text, TextInput, Pressable, StyleSheet, Alert, Image, ScrollView } from "react-native";
import { router, useRouter } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import { createEnvironmentalData } from "../database/databaseSQLite";
import styles from "../styles/style_createDatos";
import { db } from "../database/Firebase";
import { addDoc, collection } from "firebase/firestore";

const ManualDataEntryScreen = () => {
  const [temperature, setTemperature] = useState("");
  const [humidity, setHumidity] = useState("");
  const [dust, setDust] = useState("");
  const [pressure, setPressure] = useState("");

  const GuardarDatos = async () => {
    if (!temperature || !humidity || !dust || !pressure) {
      Alert.alert("Error", "Por favor completa todos los campos.");
      return;
    }

    const fechaActual = new Date();
    try {
      await addDoc(collection(db, "Datos_ambientales"), {
        temperature: temperature,
        humidity: humidity,
        dust: dust,
        pressure:pressure,
        date: fechaActual ,
      });

      Alert.alert("Éxito", "Datos guardados correctamente.");
      setTemperature("");
      setHumidity("");
      setDust("");
      setPressure("");
      router.push("/screens/dashboard");
    } catch (error) {
      Alert.alert("Error", "No se pudieron guardar los datos.");
      console.error(error);
    }
  }


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
            value={temperature}
            onChangeText={setTemperature}
          />
        </View>

        <View style={styles.inputContainer}>
          <MaterialIcons name="water" size={24} color="#3b82f6" style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="Humedad (%)"
            placeholderTextColor="#94a3b8"
            keyboardType="numeric"
            value={humidity}
            onChangeText={setHumidity}
          />
        </View>

        <View style={styles.inputContainer}>
          <MaterialIcons name="cloud" size={24} color="#94a3b8" style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="Polvo (µg/m³)"
            placeholderTextColor="#94a3b8"
            keyboardType="numeric"
            value={dust}
            onChangeText={setDust}
          />
        </View>

        <View style={styles.inputContainer}>
          <MaterialIcons name="speed" size={24} color="#10b981" style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="Presión (hPa)"
            placeholderTextColor="#94a3b8"
            keyboardType="numeric"
            value={pressure}
            onChangeText={setPressure}
          />
        </View>
      </View>

      {/* Botones */}
      <View style={styles.buttonGroup}>
        <Pressable 
          style={[styles.button, styles.saveButton]} 
          onPress={GuardarDatos}
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


export default ManualDataEntryScreen;