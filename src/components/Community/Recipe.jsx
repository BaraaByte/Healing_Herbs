import { useContext, useEffect, useState } from "react";
import api from "../utils/axiosInstance";
import { userContext } from "../../context/UserContext";
import { Link } from "react-router-dom";
import Loader from "../Loader/Loader";
import Questions from "./Questions/Questions";
import AuthRequiredModal from "../AuthRequiredModal/AuthRequiredModal";

function timeAgo(dateString) {
  const now = new Date();
  const date = new Date(dateString);
  const diff = Math.floor((now - date) / 1000);

  if (diff < 60) return `منذ ${diff} ثانية`;
  if (diff < 3600) return `منذ ${Math.floor(diff / 60)} دقيقة`;
  if (diff < 86400) return `منذ ${Math.floor(diff / 3600)} ساعة`;
  return `منذ ${Math.floor(diff / 86400)} يوم`;
}

export default function RecipesList() {
  let { userTokenAccess } = useContext(userContext);
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showAuthModal, setShowAuthModal] = useState(false);

  async function getRecipes() {
    try {
      setLoading(true);
      setError("");
      const { data:{data} } = await api.get(`/api/v1/recipes`, {
        headers: {
          Authorization: `Bearer ${userTokenAccess}`,
        },
      });
      
      setRecipes(data);
      
    } catch (err) {
      setError("حدث خطأ في تحميل الوصفات. حاول مرة أخرى.");
      setRecipes([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getRecipes();
  }, []);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return (
      <div className="min-h-screen py-12 px-4 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-4xl mb-4">⚠️</div>
          <p className="text-gray-700 text-lg mb-4">{error}</p>
          <button
            onClick={getRecipes}
            className="bg-emerald-600 text-white px-6 py-2 rounded-lg hover:bg-emerald-700"
          >
            حاول مرة أخرى
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 font-cairo bg-gradient-to-br from-emerald-50 to-white">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-16">
          <div className="relative inline-block mb-6">
            <h1 className="text-4xl md:text-5xl font-bold text-emerald-700 mb-4 relative z-10">
              مجتمعنا
            </h1>
            <div className="absolute -bottom-2 left-0 w-full h-3 bg-emerald-100 rounded-full opacity-70 z-0"></div>
          </div>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            مكان لتبادل الأفكار والمناقشات حول الطب الطبيعي
          </p>
          <div className="relative block mb-6">
            <h1 className="text-3xl md:text-4xl font-bold text-emerald-700 relative z-10">
              وصفات الأجداد <i className="fas fa-leaf"></i>
            </h1>
          </div>
          <Link
            to={userTokenAccess ? "add" : "#"}
            onClick={(e) => !userTokenAccess && (e.preventDefault(), setShowAuthModal(true))}
            className="inline-flex items-center gap-2 bg-emerald-600 text-white px-8 py-3 rounded-xl shadow-lg hover:bg-emerald-700 transition-all duration-300 font-semibold hover:shadow-emerald-200 hover:shadow-xl hover:-translate-y-1"
          >
            <span>أضف وصفة جديدة</span>
            <span className="text-lg">🌿</span>
          </Link>
          
          {showAuthModal && (
            <AuthRequiredModal type="recipe" onClose={() => setShowAuthModal(false)} />
          )}
        </header>

        {recipes.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-5xl mb-4">🍃</div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              لا توجد وصفات حتى الآن
            </h3>
            <p className="text-gray-600 mb-6">
              كن أول من يشارك وصفة طبيعية مفيدة!
            </p>
            <Link
              to="add"
              className="inline-flex items-center gap-2 bg-emerald-600 text-white px-6 py-2 rounded-lg hover:bg-emerald-700"
            >
              <span>أضف أول وصفة</span>
              <span>➕</span>
            </Link>
          </div>
        ) : (
          <div className="grid gap-8">
            {recipes.map((rec) => (
              <Link
                to={`/community/recipes/${rec.id}`}
                key={rec.id}
                className="block bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 border border-emerald-100 hover:border-emerald-200 p-6 hover:scale-[1.02] group"
              >
                <div className="flex flex-col md:flex-row md:items-start gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-xl font-semibold text-emerald-800 group-hover:text-emerald-900 transition-colors">
                        {rec.title}
                      </h3>
                      <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                    </div>
                    <p className="text-gray-600 leading-relaxed mb-4 line-clamp-2">
                      {rec.description && rec.description.length > 100
                        ? rec.description.substring(0, 150) + "..."
                        : rec.description || "لا يوجد وصف"}
                    </p>
                  </div>

                  <div className="flex items-center justify-between md:justify-end md:flex-col md:items-end gap-2">
                    <span className="text-emerald-600 font-medium bg-emerald-50 px-3 py-1 rounded-full text-sm">
                      {rec.author_username || rec.author || "مجهول"}
                    </span>
                    <div className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-sm flex items-center gap-1 group-hover:bg-emerald-200 transition-colors">
                      <span>منذ {timeAgo(rec.created_at)}</span>
                      <span className="transform group-hover:translate-x-1 transition-transform">
                        →
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
      
      <Questions />
    </div>
  );
}