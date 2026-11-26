import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { Feather, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

export default function BottomNavBar({ activeTab, onSelectTab }) {
  // As 4 abas oficiais do aplicativo do jovem conforme o Figma:
  // Início, Metas, Aprender, Perfil
  const tabs = [
    { id: 'Home', label: 'Início', icon: 'home' },
    { id: 'Metas', label: 'Metas', icon: 'crosshair' },
    { id: 'Aprender', label: 'Aprender', icon: 'book-open' },
    { id: 'Perfil', label: 'Perfil', icon: 'user' }
  ];

  return (
    <View style={styles.navContainer}>
      <View style={styles.navList}>
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <TouchableOpacity
              key={tab.id}
              style={styles.navItem}
              onPress={() => onSelectTab(tab.id)}
              activeOpacity={0.8}
            >
              <View
                style={[
                  styles.iconCircle,
                  isActive && styles.activeIconCircle
                ]}
              >
                <Feather
                  name={tab.icon}
                  size={20}
                  color={isActive ? '#ffffff' : '#3e4858'}
                />
              </View>
              <Text
                style={[
                  styles.navLabel,
                  isActive ? styles.activeLabel : styles.inactiveLabel
                ]}
              >
                {tab.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  navContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: Platform.OS === 'web' ? 70 : 66,
    backgroundColor: 'rgba(206, 237, 255, 0.98)',
    borderTopWidth: 1,
    borderTopColor: '#b4d6ef',
    justifyContent: 'center',
    paddingBottom: Platform.OS === 'web' ? 6 : 0
  },
  navList: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  navItem: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 68
  },
  iconCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center'
  },
  activeIconCircle: {
    backgroundColor: '#004590'
  },
  navLabel: {
    fontSize: 11,
    marginTop: 2,
    fontWeight: 'bold'
  },
  activeLabel: {
    color: '#004590'
  },
  inactiveLabel: {
    color: '#3e4858'
  }
});
