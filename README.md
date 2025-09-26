# Tech Docs AI

Uma aplicação web full-stack que permite pesquisar tecnologias de software e obter resumos estruturados e didáticos da documentação oficial usando IA.

## 🚀 Funcionalidades

- **Busca Inteligente**: Pesquise qualquer tecnologia e obtenha informações estruturadas
- **Resumos Didáticos**: Documentação organizada em tópicos fáceis de entender
- **Organização Personalizada**: Salve resumos em categorias (Estudos, Trabalho, Projetos)
- **Autenticação Google**: Login seguro para salvar conteúdo
- **Interface Acessível**: Design responsivo com boas práticas de acessibilidade

## 🛠️ Tecnologias Utilizadas

- **Frontend**: Next.js 14, React, TypeScript, TailwindCSS
- **Backend**: Next.js API Routes
- **Autenticação**: Firebase Auth
- **Banco de Dados**: Firebase Firestore
- **IA**: OpenAI API
- **Ícones**: Lucide React

## 📦 Instalação

1. Clone o repositório:

```bash
git clone <url-do-repositorio>
cd tech-docs-ai
```

2. Instale as dependências:

```bash
npm install
```

3. Configure as variáveis de ambiente:

```bash
cp config.example.js .env.local
```

4. Preencha o arquivo `.env.local` com suas credenciais:

   - Firebase: Crie um projeto no [Firebase Console](https://console.firebase.google.com)
   - OpenAI: Obtenha sua API key no [OpenAI Platform](https://platform.openai.com)

5. Execute o projeto:

```bash
npm run dev
```

6. Acesse `http://localhost:3000`

## 🔧 Configuração

### Firebase Setup

1. Crie um projeto no Firebase Console
2. Ative Authentication e Firestore Database
3. Configure o Google Auth Provider
4. Copie as credenciais para o arquivo `.env.local`

### OpenAI Setup

1. Crie uma conta no OpenAI Platform
2. Gere uma API key
3. Adicione a chave no arquivo `.env.local`

## 📱 Como Usar

1. **Busca**: Digite o nome de uma tecnologia no campo de busca
2. **Visualização**: Veja o resumo estruturado gerado pela IA
3. **Salvamento**: Faça login com Google para salvar resumos em categorias
4. **Organização**: Gerencie seus resumos e projetos salvos

## 🏗️ Estrutura do Projeto

```
tech-docs-ai/
├── app/                    # Next.js App Router
│   ├── api/               # API Routes
│   ├── globals.css        # Estilos globais
│   ├── layout.tsx         # Layout principal
│   └── page.tsx           # Página inicial
├── components/            # Componentes React
├── contexts/              # Contextos (Auth)
├── lib/                   # Utilitários (Firebase)
└── public/                # Arquivos estáticos
```

## 🎨 Design System

- **Cores**: Paleta baseada em azul (Primary) e cinza
- **Tipografia**: Inter (Google Fonts)
- **Componentes**: TailwindCSS com classes customizadas
- **Acessibilidade**: Navegação por teclado, contraste adequado, leitores de tela

## 🚀 Deploy

### Vercel (Recomendado)

1. Conecte seu repositório ao Vercel
2. Configure as variáveis de ambiente
3. Deploy automático

### Outras Plataformas

O projeto pode ser deployado em qualquer plataforma que suporte Next.js:

- Netlify
- Railway
- DigitalOcean App Platform

## 📄 Licença

MIT License - veja o arquivo LICENSE para detalhes.

## 🤝 Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para:

- Reportar bugs
- Sugerir melhorias
- Enviar pull requests

## 📞 Suporte

Para dúvidas ou problemas, abra uma issue no repositório.
