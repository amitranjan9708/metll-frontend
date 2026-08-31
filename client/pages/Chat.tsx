import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ChevronLeft, Send } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import { chatApi } from "../lib/chatApi";
import { socketService } from "../lib/socketService";
import { useToast } from "@/hooks/use-toast";

interface Message {
  id: number;
  senderId: number;
  content: string;
  type: string;
  mediaUrl?: string;
  createdAt: string;
  isOwn: boolean;
}

export default function Chat() {
  const { matchId } = useParams<{ matchId: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();

  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState("");
  const [loading, setLoading] = useState(true);
  const [matchDetails, setMatchDetails] = useState<any>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (!matchId) return;

    const loadChat = async () => {
      try {
        const response = await chatApi.getChatRoom(Number(matchId));
        if (response.success && response.data) {
          setMatchDetails(response.data.matchedUser);
          
          if (response.data.chatRoom && response.data.chatRoom.messages) {
             // Messages come descending from backend, reverse for display
             const sorted = [...response.data.chatRoom.messages].reverse();
             setMessages(sorted);
          }
        }
      } catch (error) {
        console.error("Failed to load chat", error);
        toast({ title: "Error", description: "Could not load chat.", variant: "destructive" });
      } finally {
        setLoading(false);
      }
    };

    loadChat();

    // Socket connect
    socketService.connect();
    socketService.joinChat(Number(matchId));

    const unsubscribeMessage = socketService.onMessage((newMessage: any) => {
      setMessages((prev) => {
        // Prevent duplicate messages
        if (prev.some(m => m.id === newMessage.id)) return prev;
        
        const isOwn = newMessage.senderId === Number(user?.id);
        return [...prev, { ...newMessage, isOwn }];
      });
    });

    return () => {
      unsubscribeMessage();
      socketService.leaveChat(Number(matchId));
    };
  }, [matchId, user?.id]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!inputText.trim() || !matchId) return;
    
    const content = inputText.trim();
    setInputText("");

    // Optimistic update
    const tempId = Date.now();
    const optimisticMsg: Message = {
      id: tempId,
      senderId: Number(user?.id),
      content,
      type: "text",
      createdAt: new Date().toISOString(),
      isOwn: true,
    };
    
    setMessages(prev => [...prev, optimisticMsg]);

    try {
      const res = await chatApi.sendMessage(Number(matchId), { content, type: "text" });
      if (res.success && res.data) {
         // Replace optimistic message with actual message from server if needed, 
         // though the socket might also broadcast it back. We will just wait for socket or 
         // let optimistic stay.
      }
    } catch (error) {
      console.error("Send failed", error);
      toast({ title: "Error", description: "Failed to send message.", variant: "destructive" });
      setMessages(prev => prev.filter(m => m.id !== tempId));
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center pt-safe">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-[100dvh] bg-gray-50">
      {/* Header */}
      <div className="bg-white px-4 pt-safe flex items-center h-[60px] border-b border-gray-100 shadow-sm shrink-0 z-10 sticky top-0">
        <button onClick={() => navigate(-1)} className="p-2 -ml-2 rounded-full hover:bg-gray-100 active:bg-gray-200 transition-colors">
          <ChevronLeft className="w-6 h-6 text-gray-700" />
        </button>
        
        {matchDetails && (
          <div className="flex items-center gap-3 ml-2">
            <img 
              src={matchDetails.profilePhoto || "https://via.placeholder.com/150"} 
              alt={matchDetails.name}
              className="w-10 h-10 rounded-full object-cover border border-gray-100"
            />
            <div>
              <h2 className="font-bold text-gray-900 leading-tight">{matchDetails.name}</h2>
              <p className="text-xs text-gray-500">Connected</p>
            </div>
          </div>
        )}
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3">
        {messages.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center opacity-50">
            <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mb-3">
              <span className="text-2xl">👋</span>
            </div>
            <p className="text-gray-500 font-medium">Say hello to {matchDetails?.name || "your match"}!</p>
          </div>
        ) : (
          messages.map((msg) => (
            <div 
              key={msg.id} 
              className={`max-w-[75%] rounded-[20px] px-4 py-2.5 ${
                msg.isOwn 
                  ? "bg-primary text-white self-end rounded-br-sm" 
                  : "bg-white text-gray-800 self-start rounded-bl-sm border border-gray-100 shadow-sm"
              }`}
            >
              {msg.type === 'text' ? (
                <p className="text-[15px] leading-relaxed">{msg.content}</p>
              ) : (
                <p className="text-[15px] italic opacity-80">[Media Message]</p>
              )}
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="bg-white border-t border-gray-100 p-3 pb-safe shrink-0">
        <div className="flex items-center gap-2 bg-gray-50 rounded-full px-2 py-1.5 border border-gray-200 focus-within:border-primary focus-within:ring-1 focus-within:ring-primary/20 transition-all">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="Type a message..."
            className="flex-1 bg-transparent border-none outline-none px-3 text-[15px]"
          />
          <button 
            onClick={handleSend}
            disabled={!inputText.trim()}
            className="w-10 h-10 rounded-full bg-primary flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed hover:bg-primary/90 transition-colors"
          >
            <Send className="w-5 h-5 text-white -ml-0.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
