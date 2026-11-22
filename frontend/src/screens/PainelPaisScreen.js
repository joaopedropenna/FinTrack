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

export default function PainelPaisScreen({ onNavigate }) {
  const {
    limiteDiario,
    setLimiteDiario,
    aprovacoesPendentes,
    aprovarDespesa,
    negarDespesa
  } = useFinance();

  const totalPendente = aprovacoesPendentes.reduce((acc, curr) => acc + curr.valor, 0);

  const handleAjustarLimites = () => {
    const novo = prompt('Informe o novo limite diário (R$):', String(limiteDiario));
    if (novo) {
      const val = parseFloat(novo.replace(',', '.'));
      if (!isNaN(val) && val >= 0) {
        setLimiteDiario(val);
      }
    }
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
          <Text style={styles.headerTitle}>Painel do Responsável</Text>
        </View>

        {/* CARD VALOR TOTAL PENDENTE */}
        <View style={styles.valueCard}>
          <Text style={styles.valueLabel}>Total em Aprovação</Text>
          <Text style={styles.valueAmount}>
            R$ {totalPendente.toFixed(2).replace('.', ',')}
          </Text>
          <Text style={styles.limitLabel}>
            Limite diário atual: R$ {limiteDiario.toFixed(2).replace('.', ',')}
          </Text>
        </View>

        {/* TÍTULO DA SEÇÃO */}
        <Text style={styles.sectionTitle}>Aprovações Pendentes</Text>

        {aprovacoesPendentes.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Ionicons name="checkmark-circle-outline" size={48} color="#33bc55" />
            <Text style={styles.emptyText}>Nenhuma despesa pendente de aprovação!</Text>
          </View>
        ) : (
          aprovacoesPendentes.map((item) => (
            <View key={item.id} style={styles.itemWrapper}>
              
              {/* CARD DESCRITIVO DA DESPESA */}
              <View style={styles.itemCard}>
                <Text style={styles.itemText}>
                  {item.icone || '🏷️'} {item.descricao} - R${' '}
                  {item.valor.toFixed(2).replace('.', ',')}
                </Text>
              </View>

              {/* BOTÕES DE AÇÃO: APROVAR E NEGAR */}
              <View style={styles.actionsRow}>
                <TouchableOpacity
                  style={styles.approveButton}
                  onPress={() => aprovarDespesa(item.id)}
                >
                  <Text style={styles.buttonText}>Aprovar</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.denyButton}
                  onPress={() => negarDespesa(item.id)}
                >
                  <Text style={styles.buttonText}>Negar</Text>
                </TouchableOpacity>
              </View>

            </View>
          ))
        )}

        {/* BOTÃO AJUSTAR LIMITES */}
        <TouchableOpacity style={styles.adjustButton} onPress={handleAjustarLimites}>
          <Text style={styles.adjustButtonText}>Ajustar Limites</Text>
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
  valueCard: {
    backgroundColor: '#004590',
    borderRadius: 28,
    paddingVertical: 22,
    alignItems: 'center',
    marginBottom: 24
  },
  valueLabel: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 13,
    fontWeight: 'bold'
  },
  valueAmount: {
    color: '#ffffff',
    fontSize: 34,
    fontWeight: 'bold',
    marginVertical: 4,
    letterSpacing: -0.5
  },
  limitLabel: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 12
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0c121a',
    textAlign: 'center',
    marginBottom: 16
  },
  emptyContainer: {
    backgroundColor: '#ceedff',
    borderWidth: 1,
    borderColor: '#b4d6ef',
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
    marginBottom: 20
  },
  emptyText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#004590',
    marginTop: 8
  },
  itemWrapper: {
    marginBottom: 22
  },
  itemCard: {
    backgroundColor: '#ceedff',
    borderWidth: 1,
    borderColor: '#b4d6ef',
    borderRadius: 24,
    height: 52,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10
  },
  itemText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0c121a'
  },
  actionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  approveButton: {
    width: '48%',
    height: 52,
    backgroundColor: '#33bc55',
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center'
  },
  denyButton: {
    width: '48%',
    height: 52,
    backgroundColor: '#d92f32',
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold'
  },
  adjustButton: {
    backgroundColor: '#004590',
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10
  },
  adjustButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold'
  }
});
