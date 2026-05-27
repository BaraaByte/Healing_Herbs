import React from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { BiSolidLockAlt } from 'react-icons/bi';

export default function AuthRequiredModal({ type = 'post', onClose }) {
  const navigate = useNavigate();

  const handleSignIn = () => {
    navigate('/login');
    onClose?.();
  };

  const handleRegister = () => {
    navigate('/register');
    onClose?.();
  };

  const messages = {
    recipe: {
      ar: 'يرجى تسجيل الدخول أو إنشاء حساب أولاً لنشر الوصفات',
      en: 'Please sign in or register first to post recipes'
    },
    question: {
      ar: 'يرجى تسجيل الدخول أو إنشاء حساب أولاً لطرح الأسئلة',
      en: 'Please sign in or register first to ask questions'
    },
    answer: {
      ar: 'يرجى تسجيل الدخول أو إنشاء حساب أولاً لإضافة إجابات',
      en: 'Please sign in or register first to post answers'
    }
  };

  const lang = document.documentElement.lang || 'ar';
  const message = messages[type]?.[lang] || messages[type]?.ar;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6 text-center">
        <div className="flex justify-center mb-4">
          <div className="bg-red-100 p-4 rounded-full">
            <BiSolidLockAlt className="text-3xl text-red-600" />
          </div>
        </div>

        <h2 className="text-xl font-bold text-gray-800 mb-2">
          {lang === 'ar' ? 'مطلوب تسجيل دخول' : 'Authentication Required'}
        </h2>

        <p className="text-gray-600 mb-6">{message}</p>

        <div className="flex gap-3">
          <button
            onClick={handleSignIn}
            className="flex-1 bg-emerald-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-emerald-700 transition-colors duration-300"
          >
            {lang === 'ar' ? 'تسجيل الدخول' : 'Sign In'}
          </button>
          <button
            onClick={handleRegister}
            className="flex-1 bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-300"
          >
            {lang === 'ar' ? 'إنشاء حساب' : 'Register'}
          </button>
        </div>

        {onClose && (
          <button
            onClick={onClose}
            className="w-full mt-3 text-gray-600 hover:text-gray-800 font-medium"
          >
            {lang === 'ar' ? 'إغلاق' : 'Close'}
          </button>
        )}
      </div>
    </div>
  );
}
