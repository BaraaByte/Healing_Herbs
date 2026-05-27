import { useState, useEffect, useContext, useRef } from "react";
import api from "../utils/axiosInstance";
import { userContext } from "../../context/UserContext";
import ReactMarkdown from "react-markdown";
import { Link } from "react-router-dom";

export default function Chatbot() {
  const { userTokenAccess } = useContext(userContext);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [conversations, setConversations] = useState([]);
  const bottomRef = useRef(null);

  useEffect(() => {
    if (userTokenAccess) {
      loadHistory();
    } else {
      setConversations([]);
      setMessages([]);
    }
  }, [userTokenAccess]);

  async function loadHistory() {
    try {
      const { data: { data } } = await api.get("/api/v1/ai/history", {
        headers: { Authorization: `Bearer ${userTokenAccess}` },
        params: { page: 1, limit: 50, sort_order: "desc" },
      });

      const convs = data?.conversations || [];
      setConversations(convs);

      if (convs.length) {
        loadConversation(convs[0].id, convs);
      }
    } catch (err) {
      setMessages([
        {
          id: "error",
          text: "❌ حصل خطأ أثناء تحميل المحادثات.",
          isBot: true,
        },
      ]);
    }
  }

  function loadConversation(convId, convs = conversations) {
    const conv = convs.find((c) => c.id === convId);
    if (!conv) return;

    const msgs = [];

    msgs.push({
      id: `welcome`,
      text: "👋 أهلًا بيك! اطلع على المحادثة السابقة أدناه.",
      isBot: true,
    });

    if (conv.user_message?.message) {
      msgs.push({
        id: `${conv.id}-user`,
        text: conv.user_message.message,
        isBot: false,
        timestamp: conv.timestamp,
      });
    }

    if (conv.ai_response?.response) {
      msgs.push({
        id: `${conv.id}-ai`,
        text: conv.ai_response.response,
        isBot: true,
        timestamp: conv.timestamp,
      });
    }

    setMessages(msgs);
  }

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  async function handleSendMessage() {
    if (!inputValue.trim() || isLoading) return;

    const userMessage = inputValue.trim();
    setMessages((prev) => [...prev, { text: userMessage, isBot: false }] );
    setInputValue("");
    setIsLoading(true);

    try {
      const { data } = await api.post(
        "/api/v1/ai/chat",
        { message: userMessage },
        {
          headers: {
            Authorization: `Bearer ${userTokenAccess}`,
            "Content-Type": "application/json",
          },
        }
      );

      setMessages((prev) => [
        ...prev,
        {
          id: data.data.message_id,
          text: data.data.response || "لم يتم استلام رد.",
          isBot: true,
        },
      ]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { text: "❌ حصل خطأ أثناء التواصل مع السيرفر.", isBot: true },
      ]);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <section className="min-h-screen flex flex-col md:flex-row font-cairo bg-green-50 mt-5">
      {userTokenAccess ? (
        <>
          <aside className="w-full md:w-64 bg-white border-b md:border-b-0 md:border-r overflow-y-auto p-4 md:flex-shrink-0 max-h-96 md:max-h-full">
            <h2 className="font-bold text-green-900 mb-4 text-center">المحادثات السابقة</h2>
            <ul className="flex flex-col gap-2">
              {conversations.map((conv) => (
                <li
                  key={conv.id}
                  className="p-3 bg-gray-100 rounded-xl hover:bg-green-100 cursor-pointer text-sm truncate"
                  onClick={() => loadConversation(conv.id)}
                  title={conv.user_message?.message}
                >
                  {conv.user_message?.message?.slice(0, 30) || "محادثة فارغة"}
                </li>
              ))}
            </ul>
          </aside>

          <div className="flex-1 flex flex-col">
            <header className="py-6 text-center">
              <h1 className="text-3xl font-bold text-green-900">عشبة شفاء بوت</h1>
            </header>

            <div className="flex-1 overflow-y-auto px-4">
              <div className="max-w-4xl mx-auto flex flex-col gap-4">
                {messages.map((msg, index) => (
                  <div
                    key={msg.id || index}
                    className={`p-4 rounded-2xl shadow max-w-lg ${msg.isBot ? "bg-emerald-900 text-white mr-auto" : "bg-white ml-auto"}`}
                  >
                    <ReactMarkdown>{msg.text}</ReactMarkdown>
                  </div>
                ))}
                <div ref={bottomRef} />
              </div>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="m-4 bg-white p-4 flex flex-col sm:flex-row gap-2 items-center rounded-2xl shadow"
            >
              <textarea
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="اكتب رسالتك..."
                rows={2}
                className="flex-1 w-full sm:w-auto resize-none outline-none p-3 border border-gray-300 rounded-xl"
              />
              <button
                type="submit"
                disabled={isLoading}
                className="w-full sm:w-auto bg-emerald-600 text-white font-bold py-3 px-6 rounded-xl hover:bg-emerald-700 transition disabled:opacity-50"
              >
                إرسال
              </button>
            </form>
          </div>
        </>
      ) : (
        <div className="flex-1 flex flex-col justify-center items-center p-6">
          <h2 className="text-xl font-bold text-gray-700 mb-4">يرجى تسجيل الدخول للوصول إلى الدردشة</h2>
          <Link to="/login" className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition">
            تسجيل الدخول
          </Link>
        </div>
      )}
    </section>
  );
}
