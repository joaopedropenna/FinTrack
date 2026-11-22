import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  ScrollView,
  Alert
} from 'react-native';
import { useFinance } from '../context/FinanceContext';
import { Ionicons, FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';

export default function NovaDespesaScreen({ onNavigate }) {
  const { limiteDiario, solicitarDespesa } = useFinance();

  const [valorDigitado, setValorDigitado] = useState('0');
  const [descricao, setDescricao] = useState('');
  const [categoriaSelecionada, setCategoriaSelecionada] = useState('Compras');

  const categorias = [
    { id: 'Compras', nome: 'Compras', icone: 'shopping-bag', lib: 'FontAwesome5' },
    { id: 'Jogos', nome: 'Jogos', icone: 'gamepad', lib: 'FontAwesome5' },
    { id: 'Comida', nome: 'Comida', icone: 'utensils', lib: 'FontAwesome5' },
    { id: 'Transporte', nome: 'Transporte', icone: 'bus', lib: 'FontAwesome5' },
    { id: 'Presente', nome: 'Presente', icone: 'gift', lib: 'FontAwesome5' },
    { id: 'Outros', nome: 'Outros', icone: 'tag', lib: 'FontAwesome5' }
  ];

  // Teclado numérico interativo
  const handleNumero = (num) => {
    if (valorDigitado === '0') {
      setValorDigitado(num);
    } else {
      // Limite de dígitos para evitar overflow
      if (valorDigitado.length < 8) {
        setValorDigitado(prev => prev + num);
      }
    }
  };

  const handleVirgula = () => {
    if (!valorDigitado.includes(',')) {
      setValorDigitado(prev => prev + ',');
    }
  };

  const handleApagar = () => {
    if (valorDigitado.length <= 1) {
      setValorDigitado('0');
    } else {
      setValorDigitado(prev => prev.slice(0, -1));
    }
  };

  const valorFormatado = () => {
    const valorFloat = parseFloat(valorDigitado.replace(',', '.')) || 0;
    return valorFloat.toFixed(2).replace('.', ',');
  };

  const handleConfirmar = () => {
    const valorFloat = parseFloat(valorDigitado.replace(',', '.'));
    if (!valorFloat || valorFloat <= 0) {
      alert('Por favor, informe um valor maior que zero.');
      return;
    }

    solicitarDespesa({
      descricao: descricao || categoriaSelecionada,
      valor: valorFloat,
      categoria: categoriaSelecionada
    });

    onNavigate('Confirmacao');
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
          <Text style={styles.headerTitle}>Nova Despesa</Text>
        </View>

        {/* CARD VALOR DA DESPESA */}
        <View style={styles.valueCard}>
          <Text style={styles.valueLabel}>Valor</Text>
          <Text style={styles.valueAmount}>R$ {valorFormatado()}</Text>
          <Text style={styles.limitLabel}>
            Limite diário: R$ {limiteDiario.toFixed(2).replace('.', ',')}
          </Text>
        </View>

        {/* CAMPO DESCRIÇÃO */}
        <View style={styles.inputGroup}>
          <Text style={styles.fieldLabel}>Descrição</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.textInput}
              placeholder="No que você vai gastar?"
              placeholderTextColor="#3e4858"
              value={descricao}
              onChangeText={setDescricao}
            />
          </View>
        </View>

        {/* SELEÇÃO DE CATEGORIAS */}
        <View style={styles.categoriesGroup}>
          <Text style={styles.fieldLabel}>Categoria</Text>
          <View style={styles.categoriesGrid}>
            {categorias.map((cat) => {
              const isSelected = categoriaSelecionada === cat.id;
              return (
                <TouchableOpacity
                  key={cat.id}
                  style={[
                    styles.categoryButton,
                    isSelected ? styles.categorySelected : styles.categoryUnselected
                  ]}
                  onPress={() => setCategoriaSelecionada(cat.id)}
                >
                  <FontAwesome5
                    name={cat.icone}
                    size={20}
                    color={isSelected ? '#ffffff' : '#0c121a'}
                  />
                  <Text
                    style={[
                      styles.categoryText,
                      isSelected ? styles.categoryTextSelected : styles.categoryTextUnselected
                    ]}
                  >
                    {cat.nome}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* TECLADO NUMÉRICO */}
        <View style={styles.keypad}>
          <View style={styles.keypadRow}>
            {['1', '2', '3'].map((n) => (
              <TouchableOpacity key={n} style={styles.keypadKey} onPress={() => handleNumero(n)}>
                <Text style={styles.keypadText}>{n}</Text>
              </TouchableOpacity>
            ))}
          </View>
          <View style={styles.keypadRow}>
            {['4', '5', '6'].map((n) => (
              <TouchableOpacity key={n} style={styles.keypadKey} onPress={() => handleNumero(n)}>
                <Text style={styles.keypadText}>{n}</Text>
              </TouchableOpacity>
            ))}
          </View>
          <View style={styles.keypadRow}>
            {['7', '8', '9'].map((n) => (
              <TouchableOpacity key={n} style={styles.keypadKey} onPress={() => handleNumero(n)}>
                <Text style={styles.keypadText}>{n}</Text>
              </TouchableOpacity>
            ))}
          </View>
          <View style={styles.keypadRow}>
            <TouchableOpacity style={styles.keypadKey} onPress={handleVirgula}>
              <Text style={styles.keypadText}>,</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.keypadKey} onPress={() => handleNumero('0')}>
              <Text style={styles.keypadText}>0</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.keypadKey} onPress={handleApagar}>
              <Ionicons name="backspace-outline" size={24} color="#0c121a" />
            </TouchableOpacity>
          </View>
        </View>

        {/* BOTÃO CONFIRMAR DESPESA */}
        <TouchableOpacity style={styles.confirmButton} onPress={handleConfirmar}>
          <Text style={styles.confirmButtonText}>Confirmar Despesa</Text>
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
    marginBottom: 20
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
  inputGroup: {
    marginBottom: 18
  },
  fieldLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#0c121a',
    marginBottom: 8
  },
  inputContainer: {
    backgroundColor: '#ceedff',
    borderWidth: 1,
    borderColor: '#b4d6ef',
    borderRadius: 24,
    paddingHorizontal: 16,
    height: 52,
    justifyContent: 'center'
  },
  textInput: {
    fontSize: 15,
    color: '#0c121a'
  },
  categoriesGroup: {
    marginBottom: 20
  },
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between'
  },
  categoryButton: {
    width: '31%',
    height: 68,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10
  },
  categorySelected: {
    backgroundColor: '#004590',
    borderWidth: 2,
    borderColor: '#004590'
  },
  categoryUnselected: {
    backgroundColor: '#ceedff',
    borderWidth: 1,
    borderColor: '#b4d6ef'
  },
  categoryText: {
    fontSize: 12,
    fontWeight: '500',
    marginTop: 4
  },
  categoryTextSelected: {
    color: '#ffffff'
  },
  categoryTextUnselected: {
    color: '#0c121a'
  },
  keypad: {
    marginBottom: 20
  },
  keypadRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10
  },
  keypadKey: {
    width: '31%',
    height: 52,
    backgroundColor: '#ceedff',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  keypadText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#0c121a'
  },
  confirmButton: {
    backgroundColor: '#004590',
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10
  },
  confirmButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold'
  }
});
