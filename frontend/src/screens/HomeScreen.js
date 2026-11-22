import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar
} from 'react-native';
import { useFinance } from '../context/FinanceContext';
import { Ionicons, FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';

export default function HomeScreen({ navigation, onNavigate }) {
  const { saldo, rendimentoSemanal, streakDias, metas } = useFinance();

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#004590" />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        {/* HEADER AZUL COM CURVA */}
        <View style={styles.header}>
          {/* Círculos decorativos de fundo */}
          <View style={styles.decorativeCircle1} />
          <View style={styles.decorativeCircle2} />

          {/* Top Bar (Avatar, Saudação, Streak, Notificações) */}
          <View style={styles.topBar}>
            <View style={styles.userInfo}>
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>L</Text>
              </View>
              <View style={styles.welcomeContainer}>
                <Text style={styles.welcomeSmall}>Olá,</Text>
                <Text style={styles.welcomeName}>Léo!</Text>
              </View>
            </View>

            <View style={styles.headerActions}>
              <View style={styles.streakBadge}>
                <Ionicons name="flame" size={16} color="#002a67" />
                <Text style={styles.streakText}>{streakDias}</Text>
              </View>
              <TouchableOpacity style={styles.iconButton}>
                <Ionicons name="notifications-outline" size={20} color="#ffffff" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Saldo Atual */}
          <View style={styles.balanceContainer}>
            <Text style={styles.balanceLabel}>Seu saldo atual</Text>
            <Text style={styles.balanceValue}>
              R$ {saldo.toFixed(2).replace('.', ',')}
            </Text>
            <View style={styles.weeklyBadge}>
              <Ionicons name="arrow-up" size={14} color="#ffffff" />
              <Text style={styles.weeklyText}>
                + R$ {rendimentoSemanal.toFixed(2).replace('.', ',')} esta semana
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.body}>

          {/* METAS DE POUPANÇA */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Metas de Poupança</Text>
              <TouchableOpacity style={styles.newGoalButton}>
                <Ionicons name="add" size={16} color="#002a67" />
                <Text style={styles.newGoalText}>Nova meta</Text>
              </TouchableOpacity>
            </View>

            {metas.map((meta) => (
              <View key={meta.id} style={styles.goalCard}>
                <View style={styles.goalRow}>
                  <View style={[styles.goalIconContainer, { backgroundColor: meta.cor }]}>
                    <FontAwesome5
                      name={meta.icone === 'gamepad' ? 'gamepad' : 'bicycle'}
                      size={20}
                      color="#ffffff"
                    />
                  </View>
                  <View style={styles.goalInfo}>
                    <Text style={styles.goalTitle}>{meta.titulo}</Text>
                    <Text style={styles.goalValues}>
                      R$ {meta.valorAtual.toFixed(2).replace('.', ',')} de R${' '}
                      {meta.valorTotal.toFixed(2).replace('.', ',')}
                    </Text>
                  </View>
                  <Text style={[styles.goalPercent, { color: meta.cor }]}>
                    {meta.porcentagem}%
                  </Text>
                </View>

                {/* Barra de Progresso */}
                <View style={styles.progressBarTrack}>
                  <View
                    style={[
                      styles.progressBarFill,
                      {
                        width: `${meta.porcentagem}%`,
                        backgroundColor: meta.cor
                      }
                    ]}
                  />
                </View>
              </View>
            ))}
          </View>

          {/* DICAS FINANCEIRAS COM IA */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Dicas Financeiras com IA</Text>
              <TouchableOpacity
                style={styles.novaDespesaButton}
                onPress={() => onNavigate('NovaDespesa')}
              >
                <Ionicons name="add" size={16} color="#f99032" />
                <Text style={styles.novaDespesaText}>Nova Despesa</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.aiCard}>
              <View style={styles.aiCardOverlay} />
              <View style={styles.aiBadgeRow}>
                <View style={styles.aiIconBadge}>
                  <MaterialCommunityIcons name="lightbulb-on" size={18} color="#004590" />
                </View>
                <Text style={styles.aiCardTag}>DICA DO DIA</Text>
              </View>
              <Text style={styles.aiCardBody}>
                Guarde 10% de tudo que você recebe antes de gastar. Pequenas quantias viram grandes conquistas com o tempo!
              </Text>
            </View>
          </View>

          {/* APRENDER FINANÇAS */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Aprender Finanças</Text>
              <TouchableOpacity onPress={() => onNavigate('Aprender')}>
                <Text style={styles.seeAllText}>Ver tudo</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.videoGrid}>
              <TouchableOpacity
                style={styles.videoCard}
                onPress={() => onNavigate('Aprender')}
              >
                <View style={[styles.videoThumbnail, { backgroundColor: '#2b88c0' }]}>
                  <Ionicons name="play-circle" size={32} color="#ffffff" />
                  <View style={styles.timeTag}>
                    <Ionicons name="time-outline" size={11} color="#ffffff" />
                    <Text style={styles.timeText}>4:12</Text>
                  </View>
                </View>
                <View style={styles.videoDetails}>
                  <Text style={styles.videoCategory}>Poupança</Text>
                  <Text style={styles.videoTitle}>Como economizar sua mesada</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.videoCard}
                onPress={() => onNavigate('Aprender')}
              >
                <View style={[styles.videoThumbnail, { backgroundColor: '#004590' }]}>
                  <Ionicons name="play-circle" size={32} color="#ffffff" />
                  <View style={styles.timeTag}>
                    <Ionicons name="time-outline" size={11} color="#ffffff" />
                    <Text style={styles.timeText}>6:30</Text>
                  </View>
                </View>
                <View style={styles.videoDetails}>
                  <Text style={styles.videoCategory}>Orçamento</Text>
                  <Text style={styles.videoTitle}>Fazendo um orçamento fácil</Text>
                </View>
              </TouchableOpacity>
            </View>
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
  scrollContent: {
    paddingBottom: 90
  },
  header: {
    backgroundColor: '#004590',
    borderBottomLeftRadius: 36,
    borderBottomRightRadius: 36,
    paddingTop: 16,
    paddingBottom: 28,
    paddingHorizontal: 20,
    position: 'relative',
    overflow: 'hidden'
  },
  decorativeCircle1: {
    position: 'absolute',
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    top: -40,
    right: -40
  },
  decorativeCircle2: {
    position: 'absolute',
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    bottom: -30,
    left: -20
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center'
  },
  avatarText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold'
  },
  welcomeContainer: {
    marginLeft: 12
  },
  welcomeSmall: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 13
  },
  welcomeName: {
    color: '#ffffff',
    fontSize: 17,
    fontWeight: 'bold'
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  streakBadge: {
    backgroundColor: '#9ed5fd',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginRight: 10
  },
  streakText: {
    color: '#002a67',
    fontWeight: 'bold',
    fontSize: 14,
    marginLeft: 4
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center'
  },
  balanceContainer: {
    alignItems: 'center',
    marginTop: 22
  },
  balanceLabel: {
    color: 'rgba(255, 255, 255, 0.85)',
    fontSize: 14
  },
  balanceValue: {
    color: '#ffffff',
    fontSize: 40,
    fontWeight: 'bold',
    marginVertical: 4,
    letterSpacing: -0.5
  },
  weeklyBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.18)',
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
    marginTop: 4
  },
  weeklyText: {
    color: '#ffffff',
    fontSize: 13,
    fontWeight: '500',
    marginLeft: 4
  },
  body: {
    paddingHorizontal: 20,
    paddingTop: 20
  },
  section: {
    marginBottom: 24
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0c121a'
  },
  newGoalButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#bee4ff',
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20
  },
  newGoalText: {
    color: '#002a67',
    fontSize: 13,
    fontWeight: 'bold',
    marginLeft: 4
  },
  novaDespesaButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ceedff',
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20
  },
  novaDespesaText: {
    color: '#f99032',
    fontSize: 13,
    fontWeight: 'bold',
    marginLeft: 4
  },
  seeAllText: {
    color: '#004590',
    fontSize: 14,
    fontWeight: 'bold'
  },
  goalCard: {
    backgroundColor: '#ceedff',
    borderWidth: 1,
    borderColor: '#b4d6ef',
    borderRadius: 24,
    padding: 16,
    marginBottom: 12
  },
  goalRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14
  },
  goalIconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center'
  },
  goalInfo: {
    flex: 1,
    marginLeft: 12
  },
  goalTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#0c121a'
  },
  goalValues: {
    fontSize: 13,
    color: '#3e4858',
    marginTop: 2
  },
  goalPercent: {
    fontSize: 17,
    fontWeight: 'bold'
  },
  progressBarTrack: {
    height: 10,
    backgroundColor: '#ddf2ff',
    borderRadius: 5,
    overflow: 'hidden'
  },
  progressBarFill: {
    height: '100%',
    borderRadius: 5
  },
  aiCard: {
    backgroundColor: '#004590',
    borderRadius: 24,
    padding: 18,
    position: 'relative',
    overflow: 'hidden'
  },
  aiCardOverlay: {
    position: 'absolute',
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    top: -20,
    right: -20
  },
  aiBadgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8
  },
  aiIconBadge: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#9ed5fd',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8
  },
  aiCardTag: {
    color: 'rgba(255, 255, 255, 0.85)',
    fontSize: 12,
    fontWeight: 'bold',
    letterSpacing: 0.5
  },
  aiCardBody: {
    color: '#ffffff',
    fontSize: 14,
    lineHeight: 20
  },
  videoGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  videoCard: {
    width: '48%',
    backgroundColor: '#ceedff',
    borderWidth: 1,
    borderColor: '#b4d6ef',
    borderRadius: 20,
    overflow: 'hidden'
  },
  videoThumbnail: {
    height: 96,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative'
  },
  timeTag: {
    position: 'absolute',
    bottom: 6,
    right: 6,
    backgroundColor: 'rgba(0, 0, 0, 0.65)',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 10
  },
  timeText: {
    color: '#ffffff',
    fontSize: 10,
    fontWeight: 'bold',
    marginLeft: 3
  },
  videoDetails: {
    padding: 10
  },
  videoCategory: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#004590',
    textTransform: 'uppercase'
  },
  videoTitle: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#0c121a',
    marginTop: 2
  }
});
