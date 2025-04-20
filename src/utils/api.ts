/**
 * Serviço para interagir com a API backend
 * Semelhante a um Service/Repository pattern em Java
 */
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  details?: any;
}

/**
 * Classe responsável por fazer as chamadas à API
 */
class ApiService {
  private readonly baseUrl: string;
  
  constructor() {
    // Em produção, isso viria de variáveis de ambiente
    this.baseUrl = 'http://localhost:3001/api';
  }

  /**
   * Envia uma mensagem para o WhatsApp usando a API
   * @param phoneNumber - Número do telefone de destino
   * @param message - Mensagem a ser enviada
   */
  async sendWhatsAppMessage(phoneNumber: string, message: string): Promise<ApiResponse<any>> {
    try {
      // Faz a chamada à API usando fetch (similar ao RestTemplate ou HttpClient em Java)
      const response = await fetch(`${this.baseUrl}/send-whatsapp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          phoneNumber,
          message,
        }),
      });

      // Converte a resposta para JSON
      const data = await response.json();
      
      // Verifica se a requisição foi bem-sucedida
      if (!response.ok) {
        throw { response: data };
      }
      
      return data;
    } catch (error: any) {
      console.error('Erro ao enviar mensagem:', error);
      return {
        success: false,
        error: 'Falha ao enviar mensagem WhatsApp',
        details: error.response || error.message,
      };
    }
  }

  /**
   * Verifica se o servidor da API está acessível
   */
  async checkServerHealth(): Promise<boolean> {
    try {
      const response = await fetch(`${this.baseUrl}/health`);
      return response.ok;
    } catch (error) {
      console.error('Servidor não está disponível:', error);
      return false;
    }
  }
}

// Cria uma instância singleton do serviço (pattern comum em Spring/Java)
const apiService = new ApiService();
export default apiService;
