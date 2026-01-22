import { GoogleGenAI, Chat, GenerateContentResponse, Part, Modality, Type } from "@google/genai";
import { SYSTEM_INSTRUCTION } from '../constants';

let chatSession: Chat | null = null;
let genAI: GoogleGenAI | null = null;

const getApiKey = () => {
  try {
    // Safely attempt to access process.env
    if (typeof process !== 'undefined' && process.env && process.env.API_KEY) {
      return process.env.API_KEY;
    }
  } catch (e) {
    // Ignore ReferenceError if process is not defined
  }
  return '';
};

export const initializeGenAI = () => {
  const apiKey = getApiKey();
  if (!apiKey) {
    console.warn("API_KEY is not set in environment variables.");
    return null;
  }
  if (!genAI) {
    genAI = new GoogleGenAI({ apiKey });
  }
  return genAI;
};

// --- Mode 1: Standard Chat ---
export const initializeChat = () => {
  const ai = initializeGenAI();
  if (!ai) return;
  
  try {
    chatSession = ai.chats.create({
      model: 'gemini-3-flash-preview',
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
        tools: [{ googleSearch: {} }],
      },
    });
  } catch (error) {
    console.error("Failed to initialize Gemini chat:", error);
  }
};

// --- Mode 2: Thinking Mode ---
export const generateThinkingResponse = async function* (message: string) {
  const ai = initializeGenAI();
  if (!ai) {
    yield "AI service unavailable.";
    return;
  }

  try {
    const responseStream = await ai.models.generateContentStream({
      model: 'gemini-3-pro-preview',
      contents: [
        { role: 'user', parts: [{ text: SYSTEM_INSTRUCTION }, { text: message }] }
      ],
      config: {
        thinkingConfig: { thinkingBudget: 32768 },
      },
    });

    for await (const chunk of responseStream) {
       if (chunk.text) {
        yield chunk.text;
      }
    }
  } catch (error) {
    console.error("Thinking mode error:", error);
    yield "I encountered an error while thinking about your request.";
  }
};

// --- Mode 3: Image Editing ---
export const editImageWithGemini = async function* (message: string, base64Image: string, mimeType: string) {
  const ai = initializeGenAI();
  if (!ai) {
    yield { text: "AI service unavailable." };
    return;
  }

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          {
            inlineData: {
              mimeType: mimeType,
              data: base64Image
            }
          },
          { text: message }
        ]
      }
    });

    const parts = response.candidates?.[0]?.content?.parts || [];
    for (const part of parts) {
      if (part.inlineData) {
        const imageUrl = `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
        yield { image: imageUrl };
      } else if (part.text) {
        yield { text: part.text };
      }
    }
  } catch (error) {
    console.error("Image editing error:", error);
    yield { text: "Failed to process image. Please try again." };
  }
};

// --- Mode 4: NotebookLM Audio Overview ---
export const generatePodcastOverview = async function* (fileData: string, mimeType: string) {
  const ai = initializeGenAI();
  if (!ai) {
    yield { text: "AI service unavailable." };
    return;
  }

  yield { text: "🎧 **Audio Overview**: Analyzing document..." };

  try {
    // Step 1: Generate Script
    const scriptResponse = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: {
            parts: [
                { inlineData: { mimeType, data: fileData } },
                { text: "Generate a lively, engaging 2-person podcast script (Speakers: 'Host' and 'Guest') summarizing the key insights of this document. Keep it punchy (approx 150 words). No scene directions." }
            ]
        }
    });

    const scriptText = scriptResponse.text;
    if (!scriptText) {
        yield { text: "Failed to analyze document structure." };
        return;
    }

    yield { text: "🎙️ **Studio**: Synthesizing Voices..." };

    // Step 2: Generate Audio
    const audioResponse = await ai.models.generateContent({
        model: 'gemini-2.5-flash-preview-tts',
        contents: { parts: [{ text: scriptText }] },
        config: {
            responseModalities: [Modality.AUDIO],
            speechConfig: {
                multiSpeakerVoiceConfig: {
                    speakerVoiceConfigs: [
                        { speaker: 'Host', voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Puck' } } },
                        { speaker: 'Guest', voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Kore' } } }
                    ]
                }
            }
        }
    });

    const audioData = audioResponse.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
    
    if (audioData) {
        yield { 
          audio: audioData, 
          text: `**Audio Overview Ready**\n\n*Preview of script:*\n${scriptText.substring(0, 100)}...` 
        };
    } else {
        yield { text: "Failed to generate audio stream." };
    }

  } catch (error) {
    console.error("Podcast generation error:", error);
    yield { text: "Error creating Audio Overview. Please try a smaller document." };
  }
};

// --- Mode 5: Veo Video Creation ---
export const generateVeoVideo = async function* (prompt: string, fileData?: string, mimeType?: string) {
  const ai = initializeGenAI();
  if (!ai) {
    yield { text: "AI service unavailable." };
    return;
  }

  yield { text: "🎥 **Veo Video**: Initializing generation (this may take a moment)..." };

  try {
    let videoPrompt = prompt;
    
    // If a document is attached, first get a visual summary prompt
    if (fileData && mimeType) {
        const summary = await ai.models.generateContent({
            model: 'gemini-3-flash-preview',
            contents: {
                parts: [
                    { inlineData: { mimeType, data: fileData } },
                    { text: "Describe a cinematic, visually striking scene that represents the core theme of this document. Keep it under 50 words. Focus on visual details for a video generator." }
                ]
            }
        });
        videoPrompt = summary.text || prompt;
    }

    // Call Veo
    let operation = await ai.models.generateVideos({
      model: 'veo-3.1-fast-generate-preview',
      prompt: videoPrompt,
      config: {
        numberOfVideos: 1,
        resolution: '720p',
        aspectRatio: '16:9'
      }
    });

    yield { text: `🎬 **Veo**: Rendering video for: "${videoPrompt.substring(0, 50)}..."` };

    // Poll for completion
    while (!operation.done) {
      await new Promise(resolve => setTimeout(resolve, 5000)); // Poll every 5s
      operation = await ai.operations.getVideosOperation({ operation: operation });
    }

    const videoUri = operation.response?.generatedVideos?.[0]?.video?.uri;
    if (videoUri) {
        // Construct the fetch URL with the API key (client-side needs to handle this carefully, but here we pass the URI)
        // Note: The actual fetching requires the key appended. We'll pass the base URI and client appends key.
        yield { video: videoUri, text: "Video generation complete!" };
    } else {
        yield { text: "Video generation finished but no URI returned." };
    }

  } catch (error) {
    console.error("Video generation error:", error);
    yield { text: "Failed to generate video. Ensure your API key has access to Veo models." };
  }
};

// --- Mode 6: Studio Study Materials (Slides, Quiz, etc.) ---
export const generateStudyMaterial = async function* (type: string, fileData: string, mimeType: string) {
    const ai = initializeGenAI();
    if (!ai) {
        yield { text: "AI unavailable." };
        return;
    }

    const prompts: Record<string, string> = {
        'mind_map': "Create a text-based Mind Map of this document using indented bullet points and arrows (->) to show relationships. Make it hierarchical.",
        'quiz': "Generate a 5-question multiple choice quiz based on this document. Include the correct answer at the end.",
        'flashcards': "Create 5 key flashcards from this content. Format as 'Front: [Concept] | Back: [Definition]'.",
        'slides': "Outline a 5-slide presentation deck. For each slide provide: Title, Bullet Points, and Speaker Notes.",
        'infographic': "Describe a visual infographic layout that would best explain this content. details sections, icons, and flow.",
        'summary': "Provide a comprehensive Executive Summary of the document."
    };

    const prompt = prompts[type] || "Analyze this document.";

    try {
        const responseStream = await ai.models.generateContentStream({
            model: 'gemini-3-flash-preview',
            contents: {
                parts: [
                    { inlineData: { mimeType, data: fileData } },
                    { text: prompt }
                ]
            }
        });

        for await (const chunk of responseStream) {
            if (chunk.text) yield chunk.text;
        }
    } catch (e) {
        yield "Error generating study material.";
    }
};


// --- Unified Router ---
export const sendMessageToGemini = async function* (
  message: string, 
  options: { 
    useThinking?: boolean, 
    image?: { data: string, mimeType: string },
    document?: { data: string, mimeType: string },
    mode?: 'chat' | 'audio_overview' | 'video_overview' | 'studio'
    studioType?: string
  } = {}
) {
  // 1. Audio Overview
  if (options.document && options.mode === 'audio_overview') {
    yield* generatePodcastOverview(options.document.data, options.document.mimeType);
    return;
  }

  // 2. Video Overview (Veo)
  if (options.mode === 'video_overview') {
      yield* generateVeoVideo(message, options.document?.data, options.document?.mimeType);
      return;
  }

  // 3. Studio Materials (Slides, Quiz, etc.)
  if (options.mode === 'studio' && options.document && options.studioType) {
      yield* generateStudyMaterial(options.studioType, options.document.data, options.document.mimeType);
      return;
  }

  // 4. Image Editor
  if (options.image) {
    yield* editImageWithGemini(message, options.image.data, options.image.mimeType);
    return;
  }

  // 5. Thinking Mode
  if (options.useThinking) {
    yield* generateThinkingResponse(message);
    return;
  }

  // 6. Document Chat
  const ai = initializeGenAI();
  if (options.document) {
    try {
      const responseStream = await ai.models.generateContentStream({
        model: 'gemini-3-flash-preview',
        contents: {
          parts: [
             { text: SYSTEM_INSTRUCTION },
             { inlineData: { mimeType: options.document.mimeType, data: options.document.data } },
             { text: message }
          ]
        }
      });
      for await (const chunk of responseStream) {
        if (chunk.text) yield chunk.text;
      }
      return;
    } catch (e) {
      yield "Error analyzing document.";
      return;
    }
  }

  // 7. Default Chat
  if (!chatSession) initializeChat();
  if (!chatSession || !ai) {
    yield "Connection error. Please refresh.";
    return;
  }

  try {
    const responseStream = await chatSession.sendMessageStream({ message });
    for await (const chunk of responseStream) {
      const c = chunk as GenerateContentResponse;
      if (c.text) yield c.text;
    }
  } catch (error) {
    console.warn("Chat session error, resetting...", error);
    initializeChat(); 
    yield "Connection reset. Please try again.";
  }
};