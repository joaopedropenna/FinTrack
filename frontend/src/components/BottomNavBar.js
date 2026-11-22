import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons';

export default function BottomNavBar({ activeTab, onSelectTab }) {
  const tabs = [
    { id: 'Home', label: 'Início', icon: 'home' },
    { id: 'Metas', label: 'Metas', icon: 'flag' },
    { id: 'Aprender', label: 'Aprender', icon: 'book' },
    { id: 'PainelPais', label: 'Pais', icon: 'shield' }
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
    height: 72,
    backgroundColor: 'rgba(206, 237, 255, 0.98)',
    borderTopWidth: 1,
    borderTopColor: '#b4d6ef',
    paddingBottom: 4
  },
  navList: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: '100%'
  },
  navItem: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 72
  },
  iconCircle: {
    width: 38,
    height: 38,
    borderRadius: 19,
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
