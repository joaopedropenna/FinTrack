import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  ScrollView
} from 'react-native';
import { useFinance } from '../context/FinanceContext';
import { Ionicons, Feather, MaterialIcons } from '@expo/vector-icons';

export default function PerfilScreen({ onNavigate }) {
  const { streakDias, pontos } = useFinance();

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>

        {/* HEADER DO PERFIL */}
        <View style={styles.profileHeader}>
          <View style={styles.avatarLarge}>
            <Text style={styles.avatarLargeText}>L</Text>
          </View>
          <Text style={styles.userName}>Léo Silva</Text>
          <View style={styles.userRoleBadge}>
            <Text style={styles.userRoleText}>👦 Dependente (Conta Jovem)</Text>
          </View>
        </View>

        {/* ESTATÍSTICAS */}
        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <Ionicons name="flame" size={24} color="#f99032" />
            <Text style={styles.statValue}>{streakDias} dias</Text>
            <Text style={styles.statLabel}>Ofensiva</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={{ fontSize: 22 }}>🌟</Text>
            <Text style={styles.statValue}>{pontos}</Text>
            <Text style={styles.statLabel}>Pontos</Text>
          </View>
          <View style={styles.statCard}>
            <Feather name="award" size={24} color="#004590" />
            <Text style={styles.statValue}>Nível 2</Text>
            <Text style={styles.statLabel}>Poupador</Text>
          </View>
        </View>

        {/* CONFIGURAÇÕES GERAIS */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Configurações</Text>

          <View style={styles.menuItem}>
            <Ionicons name="notifications-outline" size={22} color="#004590" style={styles.menuIcon} />
            <Text style={styles.menuText}>Notificações</Text>
            <Ionicons name="chevron-forward" size={18} color="#b4d6ef" />
          </View>

          <View style={styles.menuItem}>
            <Ionicons name="lock-closed-outline" size={22} color="#004590" style={styles.menuIcon} />
            <Text style={styles.menuText}>Segurança e Senha</Text>
            <Ionicons name="chevron-forward" size={18} color="#b4d6ef" />
          </View>

          <View style={styles.menuItem}>
            <Ionicons name="help-circle-outline" size={22} color="#004590" style={styles.menuIcon} />
            <Text style={styles.menuText}>Ajuda e Suporte</Text>
            <Ionicons name="chevron-forward" size={18} color="#b4d6ef" />
          </View>

          <View style={styles.menuItem}>
            <Ionicons name="information-circle-outline" size={22} color="#004590" style={styles.menuIcon} />
            <Text style={styles.menuText}>Sobre o FinTrack</Text>
            <Ionicons name="chevron-forward" size={18} color="#b4d6ef" />
          </View>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#ffffff'
  },
  container: {
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 90
  },
  profileHeader: {
    alignItems: 'center',
    marginBottom: 24
  },
  avatarLarge: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#004590',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12
  },
  avatarLargeText: {
    color: '#ffffff',
    fontSize: 32,
    fontWeight: 'bold'
  },
  userName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#0c121a'
  },
  userRoleBadge: {
    backgroundColor: '#ceedff',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 16,
    marginTop: 6
  },
  userRoleText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#004590'
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 28
  },
  statCard: {
    width: '31%',
    backgroundColor: '#ceedff',
    borderWidth: 1,
    borderColor: '#b4d6ef',
    borderRadius: 20,
    paddingVertical: 14,
    alignItems: 'center'
  },
  statValue: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#0c121a',
    marginTop: 6
  },
  statLabel: {
    fontSize: 11,
    color: '#3e4858',
    marginTop: 2
  },
  section: {
    marginBottom: 24
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0c121a',
    marginBottom: 12
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#e8f4fd',
    borderRadius: 18,
    paddingHorizontal: 16,
    paddingVertical: 14,
    marginBottom: 10
  },
  menuIcon: {
    marginRight: 12
  },
  menuText: {
    flex: 1,
    fontSize: 15,
    fontWeight: '500',
    color: '#0c121a'
  }
});
