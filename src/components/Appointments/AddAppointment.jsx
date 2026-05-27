import { useState } from "react";
import api from "../utils/axiosInstance";
import toast from "react-hot-toast";

export default function AddAppointment({ onSuccess }) {
  const initialForm = {
    date: "",
    time: "",
    location: "",
    name: "",
    appointment_type: "regular",
    notes_or_details: "",
  };

  const [form, setForm] = useState(initialForm);
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      let {data:{data}}=await api.post("/api/v1/appointments", form);
      toast.success("تم إضافة الموعد بنجاح!");
      setForm(initialForm);
      if (onSuccess) onSuccess();
    } catch(err) {
      toast.error(err.response.data.error?.issue[0].message||"تعذر إضافة الموعد");
    } finally {
      setSubmitting(false);
    }
  };

  return (
      <div className="flex justify-center items-center py-8">
        <div className="max-w-lg w-full bg-white rounded-xl shadow-md border border-emerald-100  max-h-[80vh] overflow-y-auto p-6">
          <h2 className="text-2xl font-bold text-emerald-700 mb-6 text-center font-cairo">
            ➕ إضافة موعد جديد
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="date"
                  className="block text-base font-medium text-emerald-700 mb-2"
                >
                  📅 التاريخ
                </label>
                <input
                  id="date"
                  name="date"
                  type="date"
                  value={form.date}
                  onChange={handleChange}
                  required
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                />
              </div>

              <div>
                <label
                  htmlFor="time"
                  className="block text-base font-medium text-emerald-700 mb-2"
                >
                  ⏰ الوقت
                </label>
                <input
                  id="time"
                  name="time"
                  type="time"
                  value={form.time}
                  onChange={handleChange}
                  required
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="location"
                className="block text-base font-medium text-emerald-700 mb-2"
              >
                📍 الموقع
              </label>
              <input
                id="location"
                name="location"
                placeholder="أدخل موقع الموعد..."
                value={form.location}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              />
            </div>

            <div>
              <label
                htmlFor="name"
                className="block text-base font-medium text-emerald-700 mb-2"
              >
                👨‍⚕️ الطبيب / المستشفى
              </label>
              <input
                id="name"
                name="name"
                placeholder="أدخل اسم الطبيب أو المستشفى..."
                value={form.name}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              />
            </div>

            <div>
              <label
                htmlFor="appointment_type"
                className="block text-base font-medium text-emerald-700 mb-2"
              >
                📌 نوع الموعد
              </label>
              <select
                id="appointment_type"
                name="appointment_type"
                value={form.appointment_type}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              >
                <option value="medical">طبي</option>
                <option value="regular">عادي</option>
                <option value="follow-up">متابعة</option>
                <option value="emergency">طوارئ</option>
                <option value="annual">سنوي</option>
                <option value="consultation">استشارة</option>
                <option value="diagnostic">تشخيصي</option>
                <option value="procedure">إجراء طبي</option>
                <option value="second_opinion">رأي ثاني</option>
                <option value="telemedicine">طب عن بعد</option>
                <option value="physical_exam">فحص بدني</option>
                <option value="group_session">جلسة جماعية</option>
                <option value="home_visit">زيارة منزلية</option>
                <option value="virtual">افتراضي</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="notes_or_details"
                className="block text-base font-medium text-emerald-700 mb-2"
              >
                📝 ملاحظات إضافية
              </label>
              <textarea
                id="notes_or_details"
                name="notes_or_details"
                placeholder="أدخل أي ملاحظات أو تفاصيل إضافية..."
                value={form.notes_or_details}
                onChange={handleChange}
                rows="3"
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              />
            </div>

            <div className="flex justify-end pt-2">
              <button
                type="submit"
                disabled={submitting}
                aria-label="إضافة الموعد"
                className={`px-6 py-2 rounded-lg shadow text-white transition ${
                  submitting
                    ? "bg-emerald-400 cursor-not-allowed"
                    : "bg-emerald-600 hover:bg-emerald-700"
                }`}
              >
                {submitting ? "جارٍ الإضافة..." : "➕ إضافة الموعد"}
              </button>
            </div>
          </form>
        </div>
      </div>
   
  );
}
