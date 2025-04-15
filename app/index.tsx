// Index.tsx
import { Pressable, Text, View, StyleSheet, Image, ScrollView } from "react-native";
import { Link } from "expo-router";
import styles from "./styles/style_index";

export default function Index() {
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Header con imagen y título */}
        <View style={styles.header}>
          <Image 
            source={{ uri: 'https://cdn-icons-png.flaticon.com/512/4087/4087979.png' }}
            style={styles.logo}
          />
          <Text style={styles.title}>Airguard</Text>
          <Text style={styles.subtitle}>Monitorea la calidad del aire en tiempo real y cuida tu salud</Text>
        </View>
        
        {/* Contenido principal */}
        <View style={styles.content}>
          <Image
            source={{ uri: 'https://cdn-icons-png.flaticon.com/512/2773/2773718.png' }}
            style={styles.illustration}
          />
          
          <View style={styles.features}>
            <View style={styles.featureItem}>
              <Text style={styles.featureIcon}>🌡️</Text>
              <Text style={styles.featureText}>Datos en tiempo real</Text>
            </View>
            <View style={styles.featureItem}>
              <Text style={styles.featureIcon}>📊</Text>
              <Text style={styles.featureText}>Monitoreo continuo</Text>
            </View>
            <View style={styles.featureItem}>
              <Text style={styles.featureIcon}>🔔</Text>
              <Text style={styles.featureText}>Alertas tempranas</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Botón fijo en la parte inferior */}
      <View style={styles.buttonContainer}>
        <Link href="/screens/dashboard" asChild>
          <Pressable style={styles.button}>
            <Text style={styles.buttonText}>Ver datos de monitoreo</Text>
          </Pressable>
        </Link>
      </View>
      
      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>🌿 Respira mejor con Airguard · © 2025</Text>
      </View>
    </View>
  );
}

