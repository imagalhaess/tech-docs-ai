#!/bin/bash

# Script para fazer commits organizados do projeto Tech Docs AI

echo "🚀 Iniciando processo de commit do Tech Docs AI..."

# Verificar se estamos em um repositório Git
if [ ! -d ".git" ]; then
    echo "📁 Inicializando repositório Git..."
    git init
fi

# Adicionar arquivos de configuração
echo "⚙️ Adicionando arquivos de configuração..."
git add package.json tsconfig.json tailwind.config.js next.config.js postcss.config.js .eslintrc.json .gitignore

# Commit de configuração
git commit -m "config: configuração inicial do projeto

- Next.js 14 com TypeScript
- TailwindCSS para estilização
- ESLint para linting
- Configuração de build e desenvolvimento"

# Adicionar estrutura da aplicação
echo "🏗️ Adicionando estrutura da aplicação..."
git add app/ contexts/ lib/

# Commit da estrutura
git commit -m "feat: estrutura base da aplicação

- Layout principal com AuthProvider
- Página inicial com busca
- Contexto de autenticação Firebase
- Configuração Firebase e Firestore"

# Adicionar componentes
echo "🧩 Adicionando componentes..."
git add components/

# Commit dos componentes
git commit -m "feat: componentes da interface

- Header com autenticação
- Formulário de busca
- Exibição de resumos estruturados
- Sistema de categorização
- Funcionalidades de acessibilidade (A11y)"

# Adicionar APIs
echo "🔌 Adicionando APIs..."
git add app/api/

# Commit das APIs
git commit -m "feat: APIs de backend

- Busca e geração de resumos com OpenAI
- Salvamento de resumos por categoria
- Gerenciamento de projetos
- Integração com Firebase Firestore"

# Adicionar documentação
echo "📚 Adicionando documentação..."
git add README.md config.example.js git-commands.md

# Commit da documentação
git commit -m "docs: documentação completa

- README com instruções de instalação
- Exemplo de configuração de ambiente
- Guia de comandos Git
- Documentação de funcionalidades"

echo "✅ Todos os commits foram realizados com sucesso!"
echo ""
echo "📋 Resumo dos commits:"
echo "1. config: configuração inicial do projeto"
echo "2. feat: estrutura base da aplicação"
echo "3. feat: componentes da interface"
echo "4. feat: APIs de backend"
echo "5. docs: documentação completa"
echo ""
echo "🚀 Próximo passo: git push -u origin main"

