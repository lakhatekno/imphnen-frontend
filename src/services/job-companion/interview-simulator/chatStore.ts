import { create } from "zustand";
import type { ChatSession, ChatMessage } from "@/types/chat"; // Sesuaikan path import
import { apiRequest } from "@/lib/api";

interface ChatStore extends ChatSession {
  initializeSession: (jobId: string) => Promise<void>;
  sendMessage: (jobId: string, userMessage: string) => Promise<void>;
}

// --- MOCK API FUNCTIONS ---
// Ganti ini dengan fetch call ke endpoint BE Anda yang sebenarnya.
const mockApi = {
  createSession: async (): Promise<{
    sessionId: string;
    initialMessages: ChatMessage[];
  }> => {
    console.log("API: Creating new session...");
    await new Promise((res) => setTimeout(res, 500));
    return {
      sessionId: `session_${Date.now()}`,
      initialMessages: [
        {
          id: 1,
          sender: "HR Jaka",
          text: "Halo! Selamat datang di simulasi wawancara. Saya Andi, HR Manager yang akan mewawancarai Anda hari ini.",
          timestamp: "12.46",
        },
        {
          id: 2,
          sender: "HR Jaka",
          text: "Bisakah Anda memperkenalkan diri Anda secara singkat?",
          timestamp: "12.47",
        },
      ],
    };
  },
  getChatLogs: async (sessionId: string): Promise<ChatMessage[]> => {
    console.log(`API: Getting logs for session ${sessionId}...`);
    await new Promise((res) => setTimeout(res, 500));
    // Di aplikasi nyata, ini akan mengembalikan log yang sudah ada
    return [];
  },
  getAiResponse: async (userMessage: string): Promise<ChatMessage> => {
    console.log(`API: Getting AI response for "${userMessage}"...`);
    await new Promise((res) => setTimeout(res, 1500));
    return {
      id: Date.now(),
      sender: "HR Jaka",
      text: `Itu adalah perkenalan yang menarik. Sekarang, bisa Anda ceritakan tentang pengalaman kerja Anda yang paling relevan dengan posisi ini?`,
      timestamp: new Date().toLocaleTimeString("id-ID", {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };
  },
};

export const useChatStore = create<ChatStore>((set, get) => ({
  // --- INITIAL STATE ---
  id: null,
  messages: [],
  isLoading: false,
  error: null,

  // --- ACTIONS ---
  initializeSession: async (jobId: string) => {
    set({ isLoading: true, error: null });
    try {
      const startRes = await apiRequest<{ message: string }>(
        `/interview/start/${jobId}`,
        "POST"
      );
      set({
        id: jobId,
        messages: [
          {
            id: Date.now(),
            sender: "HR Jaka",
            text: startRes.message,
            timestamp: new Date().toLocaleTimeString("id-ID", {
              hour: "2-digit",
              minute: "2-digit",
            }),
          },
        ],
        isLoading: false,
      });
    } catch (err) {
      set({ error: "Gagal memulai sesi.", isLoading: false });
    }
  },

  sendMessage: async (jobId: string, userMessageText: string) => {
    if (!userMessageText.trim() || get().isLoading) return;

    const userMessage: ChatMessage = {
      id: Date.now(),
      sender: "user",
      text: userMessageText,
      timestamp: new Date().toLocaleTimeString("id-ID", {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    // Tampilkan pesan pengguna secara instan & set loading
    set((state) => ({
      messages: [...state.messages, userMessage],
      isLoading: true,
    }));

    try {
      // Panggil endpoint untuk mendapatkan respons AI
      const answerRes = await apiRequest<{ message: string }>(
        `/interview/answer/${jobId}`,
        "POST",
        { message: userMessageText }
      );
      set((state) => ({
        messages: [
          ...state.messages,
          {
            id: Date.now(),
            sender: "HR Jaka",
            text: answerRes.message,
            timestamp: new Date().toLocaleTimeString("id-ID", {
              hour: "2-digit",
              minute: "2-digit",
            }),
          },
        ],
        isLoading: false,
      }));
    } catch (err) {
      console.error(err);
      const errorResponse: ChatMessage = {
        id: "error",
        sender: "HR Jaka",
        text: "Maaf, terjadi kesalahan saat memproses jawaban Anda. Coba lagi.",
        timestamp: new Date().toLocaleTimeString("id-ID", {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };
      set((state) => ({
        messages: [...state.messages, errorResponse],
        isLoading: false,
      }));
    }
  },
}));
