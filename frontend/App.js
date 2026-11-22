import React, { useState } from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { FinanceProvider } from './src/context/FinanceContext';

import HomeScreen from './src/screens/HomeScreen';
import NovaDespesaScreen from './src/screens/NovaDespesaScreen';
import ConfirmacaoScreen from './src/screens/ConfirmacaoScreen';
import AprenderScreen from './src/screens/AprenderScreen';
import PainelPaisScreen from './src/screens/PainelPaisScreen';
import BottomNavBar from './src/components/BottomNavBar';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('Home');

  const renderScreen = () => {
    switch (currentScreen) {
      case 'NovaDespesa':
        return <NovaDespesaScreen onNavigate={setCurrentScreen} />;
      case 'Confirmacao':
        return <ConfirmacaoScreen onNavigate={setCurrentScreen} />;
      case 'Aprender':
        return <AprenderScreen onNavigate={setCurrentScreen} />;
      case 'PainelPais':
        return <PainelPaisScreen onNavigate={setCurrentScreen} />;
      case 'Home':
      case 'Metas':
      default:
        return <HomeScreen onNavigate={setCurrentScreen} />;
    }
  };

  const showBottomNav = ['Home', 'Metas', 'Aprender', 'PainelPais'].includes(currentScreen);

  return (
    <FinanceProvider>
      <View style={styles.outerContainer}>
        <View style={styles.appShell}>
          {renderScreen()}
          {showBottomNav && (
            <BottomNavBar
              activeTab={currentScreen}
              onSelectTab={setCurrentScreen}
            />
          )}
        </View>
      </View>
    </FinanceProvider>
  );
}

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    backgroundColor: '#0c121a',
    justifyContent: 'center',
    alignItems: 'center'
  },
  appShell: {
    width: '100%',
    maxWidth: 450,
    height: '100%',
    maxHeight: Platform.OS === 'web' ? 920 : '100%',
    backgroundColor: '#ffffff',
    borderRadius: Platform.OS === 'web' ? 28 : 0,
    overflow: 'hidden',
    position: 'relative',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10
  }
});
