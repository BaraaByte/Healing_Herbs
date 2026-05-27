import { useTranslation } from 'react-i18next';
import { FiGlobe } from 'react-icons/fi';

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLanguage = i18n.language === 'ar' ? 'en' : 'ar';
    i18n.changeLanguage(newLanguage);
    localStorage.setItem('language', newLanguage);
    
    // Update HTML dir attribute
    document.documentElement.lang = newLanguage;
    document.documentElement.dir = newLanguage === 'ar' ? 'rtl' : 'ltr';
  };

  return (
    <button
      onClick={toggleLanguage}
      className="flex items-center gap-2 px-3 py-2 rounded-lg bg-emerald-100 text-emerald-700 hover:bg-emerald-200 transition-colors duration-300 font-semibold"
      title="تبديل اللغة / Switch Language"
    >
      <FiGlobe className="text-lg" />
      <span className="hidden sm:inline">
        {i18n.language === 'ar' ? 'English' : 'العربية'}
      </span>
    </button>
  );
}
