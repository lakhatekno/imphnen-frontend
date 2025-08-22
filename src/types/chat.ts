export interface ChatMessage {
  id: string | number;
  sender: 'HR Jaka' | 'user';
  text: string;
  timestamp: string;
}

export interface ChatSession {
  id: string | null;
  messages: ChatMessage[];
  isLoading: boolean;
  error: string | null;
}