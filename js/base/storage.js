const PREFIXO = 'lacosQueUnem:';

export const storage = {
  ler(chave, padrao) {
    try {
      const bruto = localStorage.getItem(PREFIXO + chave);
      if (bruto === null) return padrao;
      const valor = JSON.parse(bruto);
      if (Array.isArray(padrao) && !Array.isArray(valor)) return padrao;
      return valor;
    } catch (erro) {
      console.warn(`Não foi possível ler "${chave}" do localStorage.`, erro);
      return padrao;
    }
  },

  gravar(chave, valor) {
    try {
      localStorage.setItem(PREFIXO + chave, JSON.stringify(valor));
      return true;
    } catch (erro) {
      console.error(`Não foi possível salvar "${chave}" no localStorage.`, erro);
      return false;
    }
  },

  remover(chave) {
    try {
      localStorage.removeItem(PREFIXO + chave);
    } catch {
    }
  },
};