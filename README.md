# AquaLembrete: Aplicativo de Lembretes para Beber Água

## Sobre o Projeto

O AquaLembrete é um aplicativo web que ajuda você a manter-se hidratado enviando lembretes regulares para beber água. O aplicativo permite configurar a frequência dos lembretes e envia notificações diretamente para o seu WhatsApp, garantindo que você nunca se esqueça de beber água suficiente durante o dia.

![Screenshot do aplicativo](./public/screenshot.png)

## Principais Funcionalidades

- **Lembretes personalizáveis**: Configure a frequência dos lembretes de acordo com suas necessidades.
- **Integração com WhatsApp**: Receba lembretes diretamente no seu WhatsApp.
- **Interface amigável**: Interface moderna construída com React e shadcn/ui.
- **Estatísticas**: Acompanhe quantos lembretes você recebeu.

## Como Usar

1. Clone este repositório
2. Instale as dependências com `npm install`
3. Configure a integração com WhatsApp (opcional, veja abaixo)
4. Inicie o aplicativo com `npm run dev`
5. Acesse o aplicativo em http://localhost:8080
6. Digite seu número de telefone e configure o intervalo entre os lembretes
7. Clique em Iniciar!

```sh
# Clone o repositório
git clone [URL_DO_REPOSITÓRIO]

# Entre no diretório do projeto
cd IA-water-main

# Instale as dependências
npm install

# Inicie o servidor de desenvolvimento
npm run dev
```

## Tecnologias Utilizadas

Este projeto foi construído com as seguintes tecnologias:

- **Frontend**:
  - React 18
  - TypeScript
  - Vite (para build e desenvolvimento)
  - Tailwind CSS (estilização)
  - shadcn/ui (componentes de UI)

- **Backend**:
  - Node.js
  - Express (para API do WhatsApp)
  - Axios (para requisições HTTP)

## Integração com WhatsApp

Este projeto inclui integração com a API do WhatsApp Business para enviar lembretes automáticos. Para configurá-la:

1. Obtenha as credenciais necessárias da [Meta for Developers](https://developers.facebook.com/):
   - Token de API do WhatsApp
   - ID do número de telefone
   - ID da conta business

2. Configure o arquivo `.env` na raiz do projeto com suas credenciais:
   ```
   WHATSAPP_API_TOKEN=seu_token_aqui
   WHATSAPP_PHONE_NUMBER_ID=seu_phone_number_id
   WHATSAPP_BUSINESS_ACCOUNT_ID=seu_business_account_id
   PORT=3001
   ```

3. Inicie o servidor backend:
   ```sh
   node server/server.js
   ```

4. Em outro terminal, inicie o frontend:
   ```sh
   npm run dev
   ```

### Funcionamento da Integração

O aplicativo tenta enviar mensagens usando a API oficial do WhatsApp Business. Se houver qualquer problema ou se o servidor não estiver disponível, ele usa automaticamente um método de fallback que abre a URL do WhatsApp no navegador.

> **Nota**: Para uso em produção, é necessário que seu número do WhatsApp Business seja verificado pela Meta. Durante o desenvolvimento, você pode usar números de teste fornecidos pela plataforma.

## Implantação

O projeto pode ser implantado em qualquer serviço que suporte aplicações Node.js/React. Algumas opções recomendadas:

- Netlify
- Vercel
- GitHub Pages (apenas frontend)
- Render
- Railway

Para implantar o backend, certifique-se de configurar as variáveis de ambiente necessárias no seu serviço de hospedagem.

## Estrutura do Projeto

```
/
├── public/           # Arquivos estáticos
├── server/           # Backend para API do WhatsApp
├── src/
│   ├── components/   # Componentes React reutilizáveis
│   ├── hooks/        # React hooks personalizados
│   ├── lib/          # Bibliotecas e configurações
│   ├── pages/        # Páginas da aplicação
│   └── utils/        # Utilitários e serviços
├── .env             # Variáveis de ambiente (não comitar)
└── package.json     # Dependências e scripts
```

## Licença

Este projeto está licenciado sob a licença MIT - veja o arquivo LICENSE para mais detalhes.