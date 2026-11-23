import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Platform,
  TouchableOpacity,
  SafeAreaView,
  useWindowDimensions
} from 'react-native';
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
  const { height: windowHeight, width: windowWidth } = useWindowDimensions();

  const isWeb = Platform.OS === 'web';

  // Altura e largura responsivas para a casca do celular no navegador:
  // Garante que o seletor (topo) + o celular + margens caibam SEMPRE 100% na tela do usuário,
  // sem cortar nada em cima ou embaixo!
  const shellHeight = isWeb
    ? Math.max(520, Math.min(800, windowHeight - 96))
    : '100%';

  const shellWidth = isWeb
    ? Math.min(420, windowWidth - 32)
    : '100%';

  // Se a tela for muito baixa (ex: altura menor que 680px), alinha no topo para nunca cortar o seletor
  const shouldCenter = isWeb ? windowHeight >= 680 : true;

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
        return <PerfilScreen onNavigate={setCurrentScreen} />;
      case 'Home':
      default:
        return <HomeScreen onNavigate={setCurrentScreen} />;
    }
  };

  const showBottomNav = activeRole === 'child' && ['Home', 'Metas', 'Aprender', 'Perfil'].includes(currentScreen);

  return (
    <FinanceProvider>
      <SafeAreaView
        style={[
          styles.outerContainer,
          isWeb && {
            justifyContent: shouldCenter ? 'center' : 'flex-start'
          }
        ]}
      >

        {/* SELETOR RÁPIDO DE APLICATIVO (FILHO / PAIS) PARA TESTES DA EQUIPE */}
        <View style={[styles.roleSwitcherContainer, isWeb && { maxWidth: shellWidth }]}>
          <TouchableOpacity
            style={[
              styles.roleButton,
              activeRole === 'child' && styles.roleButtonActive
            ]}
            onPress={() => {
              setActiveRole('child');
              setCurrentScreen('Home');
            }}
            activeOpacity={0.8}
          >
            <Text
              style={[
                styles.roleText,
                activeRole === 'child' && styles.roleTextActive
              ]}
              numberOfLines={1}
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
            activeOpacity={0.8}
          >
            <Text
              style={[
                styles.roleText,
                activeRole === 'parent' && styles.roleTextActive
              ]}
              numberOfLines={1}
            >
              🛡️ App dos Pais (Responsável)
            </Text>
          </TouchableOpacity>
        </View>

        {/* CASCA DO CELULAR */}
        <View
          style={[
            styles.appShell,
            isWeb && {
              height: shellHeight,
              width: shellWidth
            }
          ]}
        >
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
    paddingVertical: Platform.OS === 'web' ? 14 : 0,
    paddingHorizontal: Platform.OS === 'web' ? 16 : 0,
    ...Platform.select({
      web: {
        minHeight: '100vh',
        height: '100vh',
        overflowY: 'auto'
      }
    })
  },
  roleSwitcherContainer: {
    flexDirection: 'row',
    backgroundColor: '#16202c',
    padding: 4,
    borderRadius: 24,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#2a3b52',
    width: '100%',
    maxWidth: 420,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4
  },
  roleButton: {
    flex: 1,
    paddingHorizontal: 12,
    paddingVertical: 9,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center'
  },
  roleButtonActive: {
    backgroundColor: '#004590',
    shadowColor: '#004590',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 2
  },
  roleText: {
    color: '#94a3b8',
    fontSize: 13,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  roleTextActive: {
    color: '#ffffff'
  },
  appShell: {
    width: '100%',
    maxWidth: 420,
    height: '100%',
    maxHeight: Platform.OS === 'web' ? 800 : '100%',
    backgroundColor: '#ffffff',
    borderRadius: Platform.OS === 'web' ? 36 : 0,
    borderWidth: Platform.OS === 'web' ? 6 : 0,
    borderColor: '#1e293b',
    overflow: 'hidden',
    position: 'relative',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.5,
    shadowRadius: 24,
    elevation: 12
  }
});
