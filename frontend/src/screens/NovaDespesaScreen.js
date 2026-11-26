const handleConfirmar = async () => {
  const valorFloat = parseFloat(valorDigitado.replace(',', '.'));

  if (!valorFloat || valorFloat <= 0) {
    alert('Por favor, informe um valor maior que zero.');
    return;
  }

  try {
    await solicitarDespesa({
      descricao: descricao || categoriaSelecionada,
      valor: valorFloat,
      categoria: categoriaSelecionada
    });

    onNavigate('Confirmacao');

  } catch (error) {
    alert(error.message || 'Não foi possível enviar a despesa.');
  }
};
