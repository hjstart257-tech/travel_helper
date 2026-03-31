import { GoogleGenAI, Type } from '@google/genai';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function recognizeItemsFromImage(base64Image: string, scenario: string, destination: string) {
  try {
    // Remove data:image/jpeg;base64, prefix if present
    const base64Data = base64Image.replace(/^data:image\/\w+;base64,/, '');
    
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: [
        {
          inlineData: {
            data: base64Data,
            mimeType: 'image/jpeg',
          },
        },
        {
          text: `Identify the items in this image for packing a suitcase. 
          Scenario: ${scenario}, Destination: ${destination}.
          Return a JSON array of items. Each item must have:
          - item_name: string
          - category: string (one of: 衣物, 鞋履, 洗护, 电子, 证件, 药品, 户外, 其他)
          - size_level: string (XS, S, M, L, XL)
          - is_fragile: boolean
          - is_liquid: boolean
          - is_wrinkle_prone: boolean
          - priority: string (high, normal, low)
          - confidence: number (0.0 to 1.0)
          - suggestions: string (brief packing suggestion)`
        }
      ],
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              item_name: { type: Type.STRING },
              category: { type: Type.STRING },
              size_level: { type: Type.STRING },
              is_fragile: { type: Type.BOOLEAN },
              is_liquid: { type: Type.BOOLEAN },
              is_wrinkle_prone: { type: Type.BOOLEAN },
              priority: { type: Type.STRING },
              confidence: { type: Type.NUMBER },
              suggestions: { type: Type.STRING },
            },
            required: ['item_name', 'category', 'size_level', 'is_fragile', 'is_liquid', 'is_wrinkle_prone', 'priority', 'confidence', 'suggestions']
          }
        }
      }
    });

    if (response.text) {
      return JSON.parse(response.text);
    }
    return [];
  } catch (error) {
    console.error("Error recognizing items:", error);
    throw error;
  }
}

export async function generatePackingSteps(items: any[], suitcaseSize: string, scenario: string) {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Generate a step-by-step packing guide for a ${suitcaseSize} inch suitcase.
      Scenario: ${scenario}.
      Items to pack: ${JSON.stringify(items.map(i => i.name))}
      
      Return a JSON object with:
      - steps: Array of strings (each string is a detailed step)
      - strategies: Array of strings (core strategies used, e.g., "卷装法提密度")
      - suggestions: Array of strings (additional items to bring or items to leave behind)
      `,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            steps: { type: Type.ARRAY, items: { type: Type.STRING } },
            strategies: { type: Type.ARRAY, items: { type: Type.STRING } },
            suggestions: { type: Type.ARRAY, items: { type: Type.STRING } },
          },
          required: ['steps', 'strategies', 'suggestions']
        }
      }
    });

    if (response.text) {
      return JSON.parse(response.text);
    }
    return { steps: [], strategies: [], suggestions: [] };
  } catch (error) {
    console.error("Error generating steps:", error);
    throw error;
  }
}
