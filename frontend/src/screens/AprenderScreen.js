import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  ScrollView,
  Alert
} from 'react-native';
import { useFinance } from '../context/FinanceContext';
import { Ionicons } from '@expo/vector-icons';

export default function AprenderScreen({ onNavigate }) {
  const { pontos, adicionarPontos } = useFinance();

  const aulas = [
    {
      id: '1',
      titulo: 'Como fazer a mesada render',
      duracao: '4:15',
      pontosBonus: 50,
      corFundo: '#004590'
    },
    {
      id: '2',
      titulo: 'Eu preciso ou eu só quero muito?',
      duracao: '5:30',
      pontosBonus: 50,
      corFundo: '#2b88c0'
    },
    {
      id: '3',
      titulo: 'O perigo dos jogos que pedem dinheiro',
      duracao: '6:10',
      pontosBonus: 50,
      corFundo: '#2b88c0'
    },
    {
      id: '4',
      titulo: 'O primeiro passo de um investidor',
      duracao: '4:45',
      pontosBonus: 50,
      corFundo: '#004590'
    }
  ];

  const handleAssistir = (aula) => {
    adicionarPontos(aula.pontosBonus);
    alert(`Parabéns! Você assistiu "${aula.titulo}" e ganhou +${aula.pontosBonus} pontos!`);
  };

  const handleResgatar = () => {
    alert(`Você possui ${pontos} pontos acumulados! Em breve mais recompensas na comunidade.`);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>

        {/* HEADER */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => onNavigate('Home')}
          >
            <Ionicons name="arrow-back" size={20} color="#004590" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Aprender & Recompensas</Text>
        </View>

        {/* CARD PONTUAÇÃO */}
        <View style={styles.scoreCard}>
          <Text style={styles.scoreLabel}>Pontuação Atual</Text>
          <Text style={styles.scoreAmount}>🌟 {pontos} Pontos</Text>
          <Text style={styles.scoreSubtext}>Assista aulas para ganhar mais!</Text>
        </View>

        <Text style={styles.sectionTitle}>Aulas Disponíveis</Text>

        {/* GRID DE AULAS */}
        <View style={styles.lessonsGrid}>
          {aulas.map((aula) => (
            <TouchableOpacity
              key={aula.id}
              style={styles.lessonCard}
              onPress={() => handleAssistir(aula)}
            >
              <View style={[styles.lessonBanner, { backgroundColor: aula.corFundo }]}>
                <Ionicons name="play" size={28} color="#ffffff" />
                <View style={styles.timeTag}>
                  <Text style={styles.timeText}>{aula.duracao}</Text>
                </View>
              </View>
              <View style={styles.lessonBody}>
                <Text style={styles.lessonTitle}>▶ {aula.titulo}</Text>
                <Text style={styles.lessonBonus}>+{aula.pontosBonus} pts</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* BOTÃO RESGATAR RECOMPENSAS */}
        <TouchableOpacity style={styles.redeemButton} onPress={handleResgatar}>
          <Text style={styles.redeemButtonText}>Resgatar Recompensas</Text>
        </TouchableOpacity>

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
    paddingTop: 16,
    paddingBottom: 40
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#ceedff',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0c121a'
  },
  scoreCard: {
    backgroundColor: '#004590',
    borderRadius: 28,
    paddingVertical: 22,
    alignItems: 'center',
    marginBottom: 24
  },
  scoreLabel: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 13,
    fontWeight: 'bold'
  },
  scoreAmount: {
    color: '#ffffff',
    fontSize: 32,
    fontWeight: 'bold',
    marginVertical: 4
  },
  scoreSubtext: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 12
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#0c121a',
    marginBottom: 14
  },
  lessonsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 24
  },
  lessonCard: {
    width: '48%',
    backgroundColor: '#ceedff',
    borderWidth: 1,
    borderColor: '#b4d6ef',
    borderRadius: 20,
    overflow: 'hidden',
    marginBottom: 14
  },
  lessonBanner: {
    height: 85,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative'
  },
  timeTag: {
    position: 'absolute',
    bottom: 6,
    right: 6,
    backgroundColor: 'rgba(0, 0, 0, 0.65)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 10
  },
  timeText: {
    color: '#ffffff',
    fontSize: 10,
    fontWeight: 'bold'
  },
  lessonBody: {
    padding: 10
  },
  lessonTitle: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#0c121a',
    minHeight: 38
  },
  lessonBonus: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#004590',
    marginTop: 4
  },
  redeemButton: {
    backgroundColor: '#004590',
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10
  },
  redeemButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold'
  }
});
