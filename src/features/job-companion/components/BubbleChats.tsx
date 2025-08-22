import { ChatMessage } from "@/types/chat";
import { Bot } from "lucide-react";

interface ChatBubbleProps {
  message: ChatMessage;
}

export function ChatBubble({ message }: ChatBubbleProps) {
  const isUser = message.sender === 'user';
  return (
    <div className={`flex items-end gap-3 ${isUser ? 'justify-end' : 'justify-start'}`}>
      {!isUser && (
        <div className="w-8 h-8 flex-shrink-0 bg-slate-200 rounded-full flex items-center justify-center">
          <Bot size={18} className="text-slate-600" />
        </div>
      )}
      <div className={`max-w-md p-3 rounded-xl ${isUser ? 'bg-blue-600 text-white rounded-br-none' : 'bg-slate-200 text-slate-800 rounded-bl-none'}`}>
        {!isUser && <p className="font-bold text-sm mb-1">{message.sender} <span className="font-normal text-xs text-slate-500">{message.timestamp}</span></p>}
        <p className="text-sm">{message.text}</p>
        {isUser && <p className="text-xs text-blue-200 text-right mt-1">{message.timestamp}</p>}
      </div>
    </div>
  );
}

export function TypingIndicator() {
  return (
    <div className="flex items-center gap-2">
      <div className="w-8 h-8 flex-shrink-0 bg-slate-200 rounded-full flex items-center justify-center">
        <Bot size={18} className="text-slate-600" />
      </div>
      <div className="flex items-center gap-1 p-3 bg-slate-200 rounded-xl rounded-bl-none">
        <div className="w-2 h-2 bg-slate-500 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
        <div className="w-2 h-2 bg-slate-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
        <div className="w-2 h-2 bg-slate-500 rounded-full animate-bounce"></div>
      </div>
    </div>
  );
}