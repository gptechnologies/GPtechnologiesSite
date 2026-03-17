"use client";

import { useState, useRef, useEffect } from "react";
import { useParams } from "next/navigation";
import { Send, Loader2, CheckCircle, XCircle } from "lucide-react";

interface Message {
  role: "user" | "system";
  content: string;
  status?: "success" | "error";
}

export default function EditPage() {
  const { projectId } = useParams<{ projectId: string }>();
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "system",
      content:
        "Describe the changes you want to make to your resume website. Each edit request costs 1 credit.",
    },
  ]);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  async function handleSend(e: React.FormEvent) {
    e.preventDefault();
    if (!input.trim() || sending) return;

    const prompt = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: prompt }]);
    setSending(true);

    try {
      const res = await fetch(`/api/projects/${projectId}/edit`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessages((prev) => [
          ...prev,
          { role: "system", content: data.error ?? "Edit failed", status: "error" },
        ]);
      } else {
        setMessages((prev) => [
          ...prev,
          {
            role: "system",
            content: `Changes applied successfully. Updated ${data.files?.length ?? 0} files.`,
            status: "success",
          },
        ]);
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "system",
          content: "Network error. Please try again.",
          status: "error",
        },
      ]);
    } finally {
      setSending(false);
    }
  }

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)] max-w-2xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Edit with AI</h2>

      <div className="flex-1 overflow-auto space-y-4 pb-4">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[80%] rounded-xl px-4 py-3 text-sm ${
                msg.role === "user"
                  ? "bg-brand text-white"
                  : msg.status === "error"
                  ? "bg-red-500/10 border border-red-500/30 text-red-400"
                  : msg.status === "success"
                  ? "bg-green-500/10 border border-green-500/30 text-green-400"
                  : "bg-surface-raised border border-border text-text-primary"
              }`}
            >
              <div className="flex items-start gap-2">
                {msg.status === "success" && <CheckCircle size={16} className="mt-0.5 shrink-0" />}
                {msg.status === "error" && <XCircle size={16} className="mt-0.5 shrink-0" />}
                <span>{msg.content}</span>
              </div>
            </div>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      <form
        onSubmit={handleSend}
        className="flex gap-3 border-t border-border pt-4"
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Change the headline color to blue..."
          disabled={sending}
          className="flex-1 px-4 py-3 bg-surface-raised border border-border rounded-lg focus:outline-none focus:border-brand-light disabled:opacity-50"
        />
        <button
          type="submit"
          disabled={!input.trim() || sending}
          className="px-4 py-3 bg-brand text-white rounded-lg hover:bg-brand-light transition-colors disabled:opacity-50"
        >
          {sending ? (
            <Loader2 size={18} className="animate-spin" />
          ) : (
            <Send size={18} />
          )}
        </button>
      </form>
    </div>
  );
}
