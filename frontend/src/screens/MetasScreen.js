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
import { FontAwesome5, Ionicons } from '@expo/vector-icons';

export default function MetasScreen({ onNavigate }) {
  const { metas } = useFinance();

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>

        {/* HEADER */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Minhas Metas</Text>
          <TouchableOpacity style={styles.newGoalButton}>
            <Ionicons name="add" size={16} color="#002a67" />
            <Text style={styles.newGoalText}>Nova meta</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.subtitle}>
          Acompanhe o progresso das suas conquistas e aprenda a poupar para o que você realmente quer!
        </Text>

        {/* LISTA DE METAS */}
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

        {/* CARD INFORMATIVO */}
        <View style={styles.tipCard}>
          <Ionicons name="bulb-outline" size={24} color="#004590" />
          <View style={styles.tipContent}>
            <Text style={styles.tipTitle}>Como atingir sua meta mais rápido?</Text>
            <Text style={styles.tipText}>
              Evite gastos por impulso em lanches ou jogos e reserve sua mesada toda semana!
            </Text>
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
    paddingTop: 20,
    paddingBottom: 90
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8
  },
  headerTitle: {
    fontSize: 22,
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
  subtitle: {
    fontSize: 14,
    color: '#3e4858',
    lineHeight: 20,
    marginBottom: 20
  },
  goalCard: {
    backgroundColor: '#ceedff',
    borderWidth: 1,
    borderColor: '#b4d6ef',
    borderRadius: 24,
    padding: 16,
    marginBottom: 14
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
  tipCard: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#b4d6ef',
    borderRadius: 20,
    padding: 16,
    marginTop: 10
  },
  tipContent: {
    marginLeft: 12,
    flex: 1
  },
  tipTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#004590'
  },
  tipText: {
    fontSize: 13,
    color: '#3e4858',
    marginTop: 4,
    lineHeight: 18
  }
});
