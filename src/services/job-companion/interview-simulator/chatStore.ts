import { create } from "zustand";
import type { ChatSession, ChatMessage } from "@/types/chat";
import { apiRequest } from "@/lib/api";
import { BaseResponse } from "@/types/res.type";

interface ChatStore extends ChatSession {
  initializeSession: (jobId: string) => Promise<void>;
  sendMessage: (jobId: string, userMessage: string) => Promise<void>;
}

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
      const logsRes = await apiRequest<
        BaseResponse<
          {
            id: string;
            question: string;
            answer: string | null;
            createdAt: Date;
          }[]
        >
      >(`/interview/logs/${jobId}`, "GET");
      if (logsRes.success && logsRes.data.length > 0) {
        const qna: ChatMessage[] = [];
        logsRes.data.forEach((log) => {
          const createdAt = new Date(log.createdAt);
          qna.push({
            id: log.id,
            sender: "HR Jaka",
            text: log.question,
            timestamp: createdAt.toLocaleTimeString("id-ID", {
              hour: "2-digit",
              minute: "2-digit",
            }),
          });
          if (log.answer) {
            qna.push({
              id: log.id,
              sender: "user",
              text: log.answer,
              timestamp: createdAt.toLocaleTimeString("id-ID", {
                hour: "2-digit",
                minute: "2-digit",
              }),
            });
          }
        });
        set({
          id: jobId,
          messages: qna,
          isLoading: false,
        });
        return;
      }

      const startRes = await apiRequest<BaseResponse<{ question: string }>>(
        `/interview/start/${jobId}`,
        "POST"
      );
      set({
        id: jobId,
        messages: [
          {
            id: Date.now(),
            sender: "HR Jaka",
            text: startRes.data.question,
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
      const answerRes = await apiRequest<BaseResponse<{ question: string }>>(
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
            text: answerRes.data.question,
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
