import React, { useState } from 'react';
import { View, Text, StyleSheet, Platform, TouchableOpacity, SafeAreaView } from 'react-native';
import { FinanceProvider } from './src/context/FinanceContext';

import HomeScreen from './src/screens/HomeScreen';
import MetasScreen from './src/screens/MetasScreen';
import NovaDespesaScreen from './src/screens/NovaDespesaScreen';
import ConfirmacaoScreen from './src/screens/ConfirmacaoScreen';
import AprenderScreen from './src/screens/AprenderScreen';
import PerfilScreen from './src/screens/PerfilScreen';
import PainelPaisScreen from './src/screens/PainelPaisScreen';
import BottomNavBar from './src/components/BottomNavBar';

export default function App() {
  // Controle de Papel (Role-Based):
  // 'child' = Aplicativo do Filho/Dependente (Léo)
  // 'parent' = Aplicativo do Responsável/Pais (Painel de Aprovações - RF08)
  const [activeRole, setActiveRole] = useState('child');
  const [currentScreen, setCurrentScreen] = useState('Home');

  // Renderização das telas do Dependente
  const renderChildScreen = () => {
    switch (currentScreen) {
      case 'NovaDespesa':
        return <NovaDespesaScreen onNavigate={setCurrentScreen} />;
      case 'Confirmacao':
        return <ConfirmacaoScreen onNavigate={setCurrentScreen} />;
      case 'Metas':
        return <MetasScreen onNavigate={setCurrentScreen} />;
      case 'Aprender':
        return <AprenderScreen onNavigate={setCurrentScreen} />;
      case 'Perfil':
        return (
          <PerfilScreen
            onNavigate={setCurrentScreen}
            onSwitchToParent={() => setActiveRole('parent')}
          />
        );
      case 'Home':
      default:
        return <HomeScreen onNavigate={setCurrentScreen} />;
    }
  };

  const showBottomNav = activeRole === 'child' && ['Home', 'Metas', 'Aprender', 'Perfil'].includes(currentScreen);

  return (
    <FinanceProvider>
      <SafeAreaView style={styles.outerContainer}>

        {/* SELETOR RÁPIDO DE APLICATIVO (FILHO / PAIS) PARA TESTES DA EQUIPE */}
        <View style={styles.roleSwitcherContainer}>
          <TouchableOpacity
            style={[
              styles.roleButton,
              activeRole === 'child' && styles.roleButtonActive
            ]}
            onPress={() => {
              setActiveRole('child');
              setCurrentScreen('Home');
            }}
          >
            <Text
              style={[
                styles.roleText,
                activeRole === 'child' && styles.roleTextActive
              ]}
            >
              👦 App do Filho (Léo)
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.roleButton,
              activeRole === 'parent' && styles.roleButtonActive
            ]}
            onPress={() => setActiveRole('parent')}
          >
            <Text
              style={[
                styles.roleText,
                activeRole === 'parent' && styles.roleTextActive
              ]}
            >
              🛡️ App dos Pais (Responsável)
            </Text>
          </TouchableOpacity>
        </View>

        {/* CASCA DO CELULAR */}
        <View style={styles.appShell}>
          {activeRole === 'child' ? (
            <>
              {renderChildScreen()}
              {showBottomNav && (
                <BottomNavBar
                  activeTab={currentScreen}
                  onSelectTab={setCurrentScreen}
                />
              )}
            </>
          ) : (
            <PainelPaisScreen onBackToChild={() => setActiveRole('child')} />
          )}
        </View>

      </SafeAreaView>
    </FinanceProvider>
  );
}

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    backgroundColor: '#0c121a',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Platform.OS === 'web' ? 12 : 0
  },
  roleSwitcherContainer: {
    flexDirection: 'row',
    backgroundColor: '#1b2533',
    padding: 4,
    borderRadius: 24,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#2a3b52'
  },
  roleButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20
  },
  roleButtonActive: {
    backgroundColor: '#004590'
  },
  roleText: {
    color: '#94a3b8',
    fontSize: 13,
    fontWeight: 'bold'
  },
  roleTextActive: {
    color: '#ffffff'
  },
  appShell: {
    width: '100%',
    maxWidth: 440,
    height: '100%',
    maxHeight: Platform.OS === 'web' ? 840 : '100%',
    backgroundColor: '#ffffff',
    borderRadius: Platform.OS === 'web' ? 36 : 0,
    overflow: 'hidden',
    position: 'relative',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.4,
    shadowRadius: 24,
    elevation: 12
  }
});
