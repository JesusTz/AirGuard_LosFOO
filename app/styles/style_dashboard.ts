import { StyleSheet } from "react-native";
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#f0f9ff",
    },
    scrollContainer: {
      padding: 24,
      paddingBottom: 100,
    },
    header: {
      alignItems: "center",
      marginBottom: 30,
    },
    logo: {
      width: 60,
      height: 60,
      marginBottom: 12,
    },
    title: {
      fontSize: 28,
      fontWeight: "800",
      color: "#0369a1",
      marginBottom: 8,
      textAlign: "center",
    },
    subtitle: {
      fontSize: 16,
      color: "#4b5563",
      textAlign: "center",
      marginBottom: 20,
    },
    dataCard: {
      backgroundColor: "#fff",
      borderRadius: 16,
      padding: 20,
      marginBottom: 24,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 3,
    },
    dataRow: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 12,
    },
    dataText: {
      fontSize: 16,
      marginLeft: 12,
    },
    label: {
      fontWeight: "600",
      color: "#4b5563",
    },
    value: {
      fontWeight: "700",
      color: "#0369a1",
    },
    noDataContainer: {
      alignItems: "center",
      justifyContent: "center",
      padding: 40,
    },
    noDataText: {
      fontSize: 18,
      color: "#64748b",
      marginTop: 16,
      textAlign: "center",
    },
    buttonGroup: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: 16,
    },
    button: {
      flex: 1,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      paddingVertical: 14,
      borderRadius: 12,
      marginHorizontal: 4,
    },
    primaryButton: {
      backgroundColor: "#0284c7",
    },
    secondaryButton: {
      backgroundColor: "#0ea5e9",
    },
    historyButton: {
      backgroundColor: "#4b5563",
    },
    dangerButton: {
      backgroundColor: "#ef4444",
    },
    buttonText: {
      color: "#fff",
      fontSize: 16,
      fontWeight: "600",
      marginLeft: 8,
    },
    floatingButton: {
      position: "absolute",
      bottom: 24,
      right: 24,
      backgroundColor: "#7c3aed",
      width: 60,
      height: 60,
      borderRadius: 30,
      justifyContent: "center",
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 8,
      elevation: 6,
    },
  });

export default styles;