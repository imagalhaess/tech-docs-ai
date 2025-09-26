import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: NextRequest) {
  try {
    const { query } = await request.json();

    if (!query) {
      return NextResponse.json(
        { error: "Query é obrigatória" },
        { status: 400 }
      );
    }

    // Buscar documentação (simulação - em produção, integrar com APIs reais)
    const documentation = await fetchDocumentation(query);

    // Gerar resumo estruturado com OpenAI
    const summary = await generateStructuredSummary(query, documentation);

    return NextResponse.json(summary);
  } catch (error) {
    console.error("Erro na busca:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}

async function fetchDocumentation(technology: string): Promise<string> {
  // Simulação de busca de documentação
  // Em produção, integrar com APIs como:
  // - GitHub API para READMEs
  // - MDN para tecnologias web
  // - NPM API para pacotes Node.js
  // - Scraping de sites oficiais

  const mockDocs = {
    react: `
      React é uma biblioteca JavaScript para construir interfaces de usuário.
      Foi criada pelo Facebook e é amplamente usada para criar aplicações web interativas.
      React usa um conceito chamado Virtual DOM para otimizar a performance.
      É baseado em componentes reutilizáveis e usa JSX para escrever HTML dentro do JavaScript.
    `,
    "node.js": `
      Node.js é um runtime JavaScript que permite executar JavaScript no servidor.
      É baseado no motor V8 do Chrome e permite criar aplicações web escaláveis.
      Node.js é especialmente popular para APIs e aplicações em tempo real.
      Usa um modelo de I/O não-bloqueante e orientado a eventos.
    `,
    python: `
      Python é uma linguagem de programação de alto nível, interpretada e de propósito geral.
      É conhecida por sua sintaxe clara e legível, sendo amplamente usada em ciência de dados,
      desenvolvimento web, automação e inteligência artificial.
      Python tem uma grande comunidade e ecossistema de bibliotecas.
    `,
  };

  return (
    mockDocs[technology.toLowerCase()] ||
    `
    ${technology} é uma tecnologia de software amplamente utilizada.
    Esta é uma descrição simulada. Em produção, a documentação real seria buscada
    de fontes oficiais e APIs públicas.
  `
  );
}

async function generateStructuredSummary(
  technology: string,
  documentation: string
) {
  const prompt = `
    Com base na documentação fornecida sobre ${technology}, gere um resumo estruturado e didático contendo os seguintes tópicos:

    1. Visão Geral - Uma introdução geral sobre a tecnologia
    2. Para que serve - Principais casos de uso e aplicações
    3. O que faz - Funcionalidades principais e características
    4. Instalação - Como instalar e configurar
    5. Como usar - Guia básico de uso
    6. Exemplos de uso - Código de exemplo prático
    7. Compatibilidades - Tecnologias que funcionam bem juntas
    8. Requisitos e dependências - O que é necessário para usar
    9. Melhores práticas - Dicas e recomendações
    10. Links úteis - Recursos adicionais e documentação oficial

    Documentação fornecida:
    ${documentation}

    Responda em formato JSON com as chaves: technology, overview, purpose, functionality, installation, usage, examples, compatibility, requirements, bestPractices, usefulLinks.
    Use formatação Markdown para melhor legibilidade.
  `;

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content:
            "Você é um especialista em documentação técnica. Gere resumos estruturados e didáticos sobre tecnologias de software.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.7,
    });

    const content = completion.choices[0]?.message?.content;
    if (!content) {
      throw new Error("Resposta vazia da OpenAI");
    }

    // Tentar parsear como JSON
    try {
      return JSON.parse(content);
    } catch {
      // Se não for JSON válido, criar estrutura manual
      return {
        technology,
        overview: content,
        purpose: "Tecnologia de software para desenvolvimento",
        functionality: "Funcionalidades principais da tecnologia",
        installation: "Instruções de instalação",
        usage: "Como usar a tecnologia",
        examples: "Exemplos práticos de uso",
        compatibility: "Tecnologias compatíveis",
        requirements: "Requisitos e dependências",
        bestPractices: "Melhores práticas de uso",
        usefulLinks: "Links para documentação oficial",
      };
    }
  } catch (error) {
    console.error("Erro na geração do resumo:", error);
    throw error;
  }
}

