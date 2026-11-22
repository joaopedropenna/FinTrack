import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function ConfirmacaoScreen({ onNavigate }) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      <View style={styles.container}>

        {/* CÍRCULO VERDE COM CHECKMARK DO FIGMA */}
        <View style={styles.circleGreen}>
          <Ionicons name="checkbox-outline" size={90} color="#ffffff" />
        </View>

        <Text style={styles.title}>Pedido Enviado!</Text>

        {/* BOTÃO VOLTAR AO INÍCIO */}
        <TouchableOpacity
          style={styles.primaryButton}
          onPress={() => onNavigate('Home')}
          activeOpacity={0.85}
        >
          <Text style={styles.primaryButtonText}>Voltar ao Início</Text>
        </TouchableOpacity>

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#ffffff'
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24
  },
  circleGreen: {
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: '#33bc55',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
    shadowColor: '#33bc55',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#0c121a',
    marginBottom: 80
  },
  primaryButton: {
    backgroundColor: '#004590',
    width: '100%',
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center'
  },
  primaryButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold'
  }
});
