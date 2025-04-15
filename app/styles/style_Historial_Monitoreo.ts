import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#f0f9ff",
    },
    header: {
      alignItems: 'center',
      padding: 24,
      paddingBottom: 16,
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
      marginBottom: 4,
    },
    subtitle: {
      fontSize: 16,
      color: "#64748b",
      textAlign: "center",
    },
    scrollContainer: {
      paddingHorizontal: 16,
      paddingBottom: 24,
    },
    dataCard: {
      backgroundColor: "#fff",
      borderRadius: 16,
      padding: 16,
      marginBottom: 16,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 3,
    },
    cardHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 12,
      paddingBottom: 12,
      borderBottomWidth: 1,
      borderBottomColor: "#e2e8f0",
    },
    timestamp: {
      marginLeft: 8,
      color: "#64748b",
      fontSize: 14,
    },
    dataGrid: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      flexWrap: 'wrap',
    },
    dataItem: {
      width: '48%',
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 12,
      padding: 8,
      backgroundColor: '#f8fafc',
      borderRadius: 8,
    },
    dataValue: {
      fontSize: 16,
      fontWeight: '600',
      color: "#1e293b",
      marginLeft: 8,
      marginRight: 4,
    },
    dataLabel: {
      fontSize: 12,
      color: "#64748b",
      textTransform: 'uppercase',
    },
    noDataContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 40,
    },
    noDataText: {
      fontSize: 18,
      color: "#64748b",
      marginTop: 16,
      textAlign: 'center',
    },
  });
  export default styles;