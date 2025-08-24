"use client";

import React, { useEffect, useState, useRef } from "react";
import { useChatStore } from "@/services/job-companion/interview-simulator/chatStore";
import { Send } from "lucide-react";
import { ChatBubble, TypingIndicator } from "./BubbleChats";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function ChatInterview() {
  const {
    messages,
    isLoading,
    initializeSession,
    sendMessage,
    restartInterview,
  } = useChatStore();
  const [inputText, setInputText] = useState("");
  const chatEndRef = useRef<HTMLDivElement>(null);
  const params = useParams();
  const jobId = params?.id as string;

  useEffect(() => {
    initializeSession(jobId);
  }, [jobId]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    sendMessage(jobId, inputText);
    setInputText("");
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="w-full max-w-3xl h-[70svh] flex flex-col bg-white rounded-xl shadow-2xl">
      {/* Header */}
      <header className="flex justify-between items-center p-4 bg-accent text-white rounded-t-xl shadow-md">
        <div>
          <h1 className="text-lg font-bold">Simulasi Wawancara</h1>
          <p className="text-xs text-blue-200">
            Berlatih wawancara dengan AI Interviewer
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => restartInterview(jobId)}
            className="px-4 py-2 text-sm bg-yellow-400 font-medium rounded-lg hover:bg-yellow-500 cursor-pointer transition-colors"
            disabled={isLoading}
            type="button"
          >
            Mulai Ulang
          </button>
          <Link
            href={`/job-companion/${jobId}/interview-feedback`}
            className="px-4 py-2 text-sm bg-[#0FDB00] font-medium rounded-lg hover:bg-green-500 cursor-pointer transition-colors"
          >
            Lihat Feedback
          </Link>
          <Link
            href={`/job-companion/${jobId}/email-preview`}
            className="px-4 py-2 text-sm bg-[#EF4444] font-medium rounded-lg hover:bg-[#db3d3d] cursor-pointer transition-colors"
          >
            Lewati
          </Link>
        </div>
      </header>

      {/* Chat Area */}
      <div className="flex-1 p-4 md:p-6 overflow-y-auto">
        <div className="flex flex-col gap-4">
          {messages.map((msg) => (
            <ChatBubble key={msg.id} message={msg} />
          ))}
          {isLoading && <TypingIndicator />}
          <div ref={chatEndRef} />
        </div>
      </div>

      {/* Input Area */}
      <footer className="p-4 border-t border-slate-200">
        <div className="relative">
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Ketik jawaban Anda di sini..."
            className="w-full h-12 p-3 pr-14 bg-slate-100 border border-slate-300 rounded-lg resize-none focus:border-0 focus:ring-1 focus:ring-accent focus:outline-none"
            rows={1}
          />
          <button
            onClick={handleSend}
            disabled={isLoading || !inputText.trim()}
            className="absolute right-0 size-12 top-0 bg-accent text-white rounded-lg disabled:bg-slate-400 hover:bg-blue-700 transition-colors flex items-center justify-center"
          >
            <Send className="scale-75" />
          </button>
        </div>
        <p className="text-xs text-slate-500 mt-2 text-center">
          Tip: Jawab pertanyaan dengan jujur dan jelas seperti dalam wawancara
          nyata
        </p>
      </footer>
    </div>
  );
}
