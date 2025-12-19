
import { GoogleGenAI } from "@google/genai";
import { ProjectDetails } from "../types";

export const generateSAPDocument = async (details: ProjectDetails): Promise<string> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const prompt = `
# Role
Você é um Consultor SAP Specialist com vasta experiência em arquitetura de processos e documentação técnica/funcional. Seu objetivo é gerar uma especificação detalhada baseada no padrão de consultorias (Numen, Deloitte, Accenture, PwC).

# Contexto de Entrada
- **Tipo de Documento:** ${details.type}
- **Projeto:** ${details.title}
- **Cliente:** ${details.client}
- **Módulos SAP:** ${details.modules.join(', ')}
- **Descrição Funcional:** ${details.description}
- **Configurações:** ${details.includeAbap ? 'Incluir desenvolvimento ABAP,' : ''} ${details.testPlan ? 'Incluir Plano de Testes,' : ''} ${details.effortEstimation ? 'Incluir Estimativa de Esforço' : ''}

# Instruções de Formatação (Template Consultoria SAP)
Você deve gerar o conteúdo utilizando sintaxe Markdown clara. Para garantir que cada seção possa ser quebrada em páginas exclusivas posteriormente, utilize o marcador "--- PAGE BREAK ---" entre as seções.

1. **Capa (Página 1):**
   - Título: ${details.type} - ${details.title}
   - Cliente: ${details.client}
   - Tabelas Autores, Históricos e Versoes (Gere dados fictícios consistentes com um projeto real).

2. **Disclaimer (Página 2):**
   - Texto padrão de confidencialidade e propriedade intelectual sobre o conteúdo do documento para o cliente ${details.client}.

3. **Índice (Página 3):**
   - Gerar um Sumário estruturado com tópicos e subtópicos.

4. **Conteúdo Principal (Página 4 em diante):**
   - **Introdução:** Objetivo do desenvolvimento focado em ${details.description}.
   - **Processo de Negócio:** Descrição detalhada do "As-Is" e "To-Be".
   - **Requisitos Funcionais:** Detalhamento técnico-funcional (campos, tabelas SAP reais como MARA, EKKO, BSEG, etc. relevantes para os módulos ${details.modules.join(', ')}).
   - **Regras de Negócio:** Lógica de validação e cálculos detalhados.
   - **User Interface (se aplicável):** Mockup de tela ou campos de seleção em formato de tabela Markdown.
   - **Tratamento de Erros:** Mensagens T100 e exceções.
   ${details.testPlan ? '- **Plano de Testes:** Cenários de teste unitário e integrado.' : ''}
   ${details.effortEstimation ? '- **Estimativa de Esforço:** Horas baseadas na complexidade do requisito.' : ''}

# Diretrizes de Estilo
- Utilize negrito para destacar nomes de tabelas, transações (T-Codes) e campos técnicos.
- Linguagem: Formal, técnica e precisa.
- Idioma: Português (PT-BR).

# Execução
Com base nas informações fornecidas, gere agora o documento completo.
`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        temperature: 0.7,
        topP: 0.9,
      }
    });

    return response.text || "Erro ao gerar conteúdo.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw new Error("Falha na comunicação com a IA.");
  }
};
