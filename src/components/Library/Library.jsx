import { useEffect, useState } from "react";
import Loader from "../Loader/Loader";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import api from "../utils/axiosInstance";

export default function Library() {
  const [herbs, setHerbs] = useState([]);
  const navigate = useNavigate();

  async function getHerbs() {
    try {
      const {
        data: { data },
      } = await api.get("/api/v1/herbs");
      setHerbs(data);
    } catch (error) {
      toast.error(error.response?.data?.error || "فشل في جلب البيانات");
    }
  }

  useEffect(() => {
    getHerbs();
  }, []);

  if (herbs.length === 0) return <Loader />;

  return (
    <div
      className="min-h-screen py-16 px-6 font-cairo
                 bg-green-50"
    >
      <div className="max-w-6xl mx-auto">
        {/* Title */}
        <h1
          className="text-4xl md:text-5xl font-bold mb-12 text-center
                     text-primary"
        >
          <i className="fa fa-leaf"></i> مكتبة الأعشاب
        </h1>

        {/* Table Wrapper */}
        <div
          className="bg-white rounded-2xl overflow-hidden
                    
                     shadow-sm"
        >
          <table className="w-full table-auto text-right">
            {/* Head */}
            <thead
              className="text-white"
              style={{
                background:
                  "linear-gradient(to left, var(--color-primary), var(--color-primary-light))",
              }}
            >
              <tr>
                <th className="px-8 py-6 text-lg font-bold">#</th>
                <th className="px-8 py-6 text-lg font-bold">اسم العشبة</th>
                <th className="px-8 py-6 text-lg font-bold">الوصف</th>
              </tr>
            </thead>

            {/* Body */}
            <tbody>
              {herbs.map((herb, index) => (
                <tr
                  key={herb.id}
                  onClick={() => navigate(`/herbDetails/${herb.id}`)}
                  className="cursor-pointer transition-all duration-300
                             border-b border-primary-light
                             hover:bg-primary-light hover:text-white"
                >
                  <td className="px-8 py-6 text-lg font-medium">
                    {index + 1}
                  </td>

                  <td className="px-8 py-6 text-lg font-semibold">
                    {herb.name}
                  </td>

                  <td className="px-8 py-6 max-w-md">
                    <div className="line-clamp-2 text-lg leading-relaxed opacity-80">
                      {herb.description}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
