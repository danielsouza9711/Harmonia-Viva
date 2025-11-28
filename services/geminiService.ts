import { GoogleGenAI, Type } from "@google/genai";
import { GeneratedPrompt } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const SYSTEM_INSTRUCTION = `
Você é um Engenheiro de Prompt especialista na ferramenta Suno AI (v3.5/v4).
Sua função é receber uma ideia vaga de música de um usuário e transformá-la em uma estrutura profissional pronta para colar no "Custom Mode" do Suno.

Regras de Output:
1. "Style of Music": Deve ser uma string concisa em inglês com Gênero, Vibe, Instrumentos e Tipo de Voz. Max 120 caracteres.
2. "Lyrics": Deve ser uma letra completa estruturada com Metatags do Suno.
   - Use [Intro], [Verse], [Chorus], [Bridge], [Outro].
   - Adicione descritores de estilo dentro da letra se necessário, ex: [Guitar Solo].
3. O idioma da letra deve ser o mesmo do input do usuário, a menos que especificado contrário.

Gere uma resposta JSON estruturada.
`;

export const generateSunoPrompt = async (userIdea: string): Promise<GeneratedPrompt> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Ideia do usuário: "${userIdea}". Crie o prompt para o Suno.`,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            style: { type: Type.STRING, description: "The style string for Suno" },
            lyrics: { type: Type.STRING, description: "The structured lyrics with metatags" },
            title_suggestion: { type: Type.STRING, description: "A catchy title for the song" }
          },
          required: ["style", "lyrics", "title_suggestion"]
        }
      }
    });

    const jsonText = response.text;
    if (!jsonText) throw new Error("No text returned from Gemini");

    return JSON.parse(jsonText) as GeneratedPrompt;
  } catch (error) {
    console.error("Error generating prompt:", error);
    throw error;
  }
};
