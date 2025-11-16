
import { GoogleGenAI } from "@google/genai";

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateImages = async (prompt: string): Promise<string[]> => {
    try {
        const response = await ai.models.generateImages({
            model: 'imagen-4.0-generate-001',
            prompt: prompt,
            config: {
                numberOfImages: 4,
                outputMimeType: 'image/jpeg',
                aspectRatio: '1:1',
            },
        });

        if (!response.generatedImages || response.generatedImages.length === 0) {
            throw new Error("No images were generated.");
        }

        return response.generatedImages.map(img => {
            const base64ImageBytes = img.image.imageBytes;
            return `data:image/jpeg;base64,${base64ImageBytes}`;
        });
    } catch (error) {
        console.error("Error generating images:", error);
        if (error instanceof Error) {
            throw new Error(`Failed to generate images: ${error.message}`);
        }
        throw new Error("An unknown error occurred while generating images.");
    }
};
