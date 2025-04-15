import { StyleSheet } from 'react-native';
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#f0f9ff",
    },
    scrollContainer: {
      flexGrow: 1,
      padding: 24,
    },
    header: {
      alignItems: 'center',
      marginTop: 20,
      marginBottom: 30,
    },
    logo: {
      width: 80,
      height: 80,
      marginBottom: 16,
    },
    title: {
      fontSize: 36,
      fontWeight: "800",
      color: "#0369a1",
      marginBottom: 8,
      textAlign: "center",
      fontFamily: 'sans-serif-medium',
    },
    subtitle: {
      fontSize: 16,
      color: "#4b5563",
      textAlign: "center",
      maxWidth: '80%',
      lineHeight: 24,
    },
    content: {
      alignItems: 'center',
      marginBottom: 20,
    },
    illustration: {
      width: 200,
      height: 200,
      marginBottom: 24,
    },
    features: {
      width: '100%',
      marginVertical: 20,
    },
    featureItem: {
      flexDirection: 'row',
      alignItems: 'center',
      marginVertical: 8,
      padding: 12,
      backgroundColor: 'rgba(14, 165, 233, 0.1)',
      borderRadius: 12,
    },
    featureIcon: {
      fontSize: 24,
      marginRight: 12,
    },
    featureText: {
      fontSize: 16,
      color: "#1e3a8a",
      fontWeight: '500',
    },
    buttonContainer: {
      paddingHorizontal: 24,
      paddingBottom: 16,
    },
    button: {
      backgroundColor: "#0284c7",
      paddingVertical: 16,
      borderRadius: 30,
      shadowColor: "#0284c7",
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 10,
      elevation: 5,
      width: '100%',
    },
    buttonText: {
      color: "#fff",
      fontSize: 18,
      fontWeight: "600",
      textAlign: "center",
    },
    footer: {
      paddingBottom: 20,
      alignItems: 'center',
      backgroundColor: "#f0f9ff",
    },
    footerText: {
      color: "#64748b",
      fontSize: 14,
      fontWeight: '500',
    },
  });

  export default styles;