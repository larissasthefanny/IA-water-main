
import { toast } from "sonner";
import apiService from "./api";

interface ReminderOptions {
  interval: number; // in minutes
  phoneNumber: string;
}

class ReminderService {
  private timerId: number | null = null;
  private nextReminderTime: Date | null = null;
  private options: ReminderOptions | null = null;
  private reminderCount = 0;

  startReminders(options: ReminderOptions): void {
    this.stopReminders(); // Clear any existing timers
    this.options = options;
    this.reminderCount = 0;
    
    // Schedule the first reminder
    this.scheduleNextReminder();
    
    // Notify the user that reminders have started
    const nextTime = this.formatReminderTime(this.nextReminderTime!);
    toast.info(`Próximo lembrete às ${nextTime}`);
    
    console.log(
      `Reminder service started with interval: ${options.interval} minutes for number: ${options.phoneNumber}`
    );
  }

  stopReminders(): void {
    if (this.timerId !== null) {
      window.clearTimeout(this.timerId);
      this.timerId = null;
      this.nextReminderTime = null;
      this.options = null;
      console.log("Reminder service stopped");
    }
  }

  isRunning(): boolean {
    return this.timerId !== null;
  }

  getNextReminderTime(): Date | null {
    return this.nextReminderTime;
  }
  
  getReminderCount(): number {
    return this.reminderCount;
  }

  private scheduleNextReminder(): void {
    if (!this.options) return;
    
    // Calculate the next reminder time
    const now = new Date();
    this.nextReminderTime = new Date(
      now.getTime() + this.options.interval * 60 * 1000
    );
    
    // Set the timeout
    this.timerId = window.setTimeout(() => {
      this.sendReminder();
      this.reminderCount++;
      this.scheduleNextReminder(); // Schedule the next reminder
    }, this.options.interval * 60 * 1000);
  }

  private sendReminder(): void {
    if (!this.options) return;
    
    // Simulate sending a WhatsApp message
    this.triggerWhatsAppReminder(this.options.phoneNumber);
    
    // Notify in the app as well
    toast.success("Hora de beber água!", {
      description: "Um lembrete foi enviado para o seu WhatsApp.",
      duration: 10000,
    });
  }

  private async triggerWhatsAppReminder(phoneNumber: string): Promise<void> {
    const message = "🚰 Hora de beber água! Mantenha-se hidratado. Este é um lembrete automático do seu app Lembrete de Água.";
    
    try {
      // Verificar se o servidor está disponível
      const isServerAvailable = await apiService.checkServerHealth();
      
      if (!isServerAvailable) {
        // Fallback para o método anterior se o servidor não estiver disponível
        console.log("Servidor não disponível, usando fallback...");
        this.triggerWhatsAppFallback(phoneNumber, message);
        return;
      }
      
      // Usar a API para enviar a mensagem
      const result = await apiService.sendWhatsAppMessage(phoneNumber, message);
      
      if (result.success) {
        console.log("Mensagem WhatsApp enviada com sucesso via API!");
      } else {
        console.error("Erro ao enviar mensagem WhatsApp:", result.error);
        // Usar o fallback em caso de erro
        this.triggerWhatsAppFallback(phoneNumber, message);
      }
    } catch (error) {
      console.error("Exceção ao tentar enviar mensagem:", error);
      // Usar o fallback em caso de exceção
      this.triggerWhatsAppFallback(phoneNumber, message);
    }
  }

  private formatReminderTime(date: Date): string {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }
  
  // Método de fallback que usa a URL do WhatsApp
  private triggerWhatsAppFallback(phoneNumber: string, message: string): void {
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    
    console.log(`Usando fallback para WhatsApp: ${phoneNumber}`);
    
    // Abrir em uma nova aba (apenas para o primeiro lembrete)
    if (this.reminderCount < 1) {
      window.open(whatsappUrl, '_blank');
    }
  }
}

// Create a singleton instance
const reminderService = new ReminderService();
export default reminderService;
