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

        {/* CÍRCULO CENTRAL DE SUCESSO */}
        <View style={styles.circleOuter}>
          <View style={styles.circleInner}>
            <Ionicons name="checkmark-done" size={72} color="#004590" />
          </View>
        </View>

        <Text style={styles.title}>Pedido Enviado!</Text>
        <Text style={styles.subtitle}>
          Sua solicitação de despesa foi enviada para o Painel do Responsável e aguarda aprovação.
        </Text>

        {/* BOTÃO PRINCIPAL */}
        <TouchableOpacity
          style={styles.primaryButton}
          onPress={() => onNavigate('Home')}
        >
          <Text style={styles.primaryButtonText}>Voltar ao Início</Text>
        </TouchableOpacity>

        {/* ATALHO MODO PAIS (Para testar o fluxo de aprovação) */}
        <TouchableOpacity
          style={styles.secondaryButton}
          onPress={() => onNavigate('PainelPais')}
        >
          <Text style={styles.secondaryButtonText}>Ir para Painel dos Pais (Aprovar)</Text>
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
    paddingHorizontal: 28
  },
  circleOuter: {
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: '#ceedff',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 28
  },
  circleInner: {
    width: 130,
    height: 130,
    borderRadius: 65,
    backgroundColor: '#9ed5fd',
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#0c121a',
    marginBottom: 10
  },
  subtitle: {
    fontSize: 15,
    color: '#3e4858',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 36
  },
  primaryButton: {
    backgroundColor: '#004590',
    width: '100%',
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12
  },
  primaryButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold'
  },
  secondaryButton: {
    backgroundColor: '#ceedff',
    borderWidth: 1,
    borderColor: '#b4d6ef',
    width: '100%',
    height: 52,
    borderRadius: 26,
    justifyContent: 'center',
    alignItems: 'center'
  },
  secondaryButtonText: {
    color: '#004590',
    fontSize: 14,
    fontWeight: 'bold'
  }
});
