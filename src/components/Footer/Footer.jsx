
import subLogo from "../../assets/sub-logo.png";
import { Link } from 'react-router-dom';
export default function Footer() {
  return (
    <footer className="text-center mb-0 py-16 font-sans">
      <div className="grid md:grid-cols-3 gap-8 items-start justify-items-center ">
      <article className="text-right">
        <img src={subLogo} alt="logo" className="w-36" />
        <p><span className="font-bold text-right">رقم الهاتف : </span><a href="tel:+201156554473">01156554473</a></p>        
        <p><span className="font-bold">الإيميل : </span><a href="mailto:moatasemosama18@gmail.com">moatasemosama18@gmail.com</a></p>        
      </article>
      <article className="text-right">
        <h3 className="text-lg font-semibold mb-4">روابط سريعة</h3>
        <ul className="space-y-2  overflow-hidden">
          <li className="hover:-translate-x-2.5  transition-all duration-300">
            <Link to="/" className="text-gray-600 hover:text-emerald-600  transition-all duration-300 text-sm">الصفحة الرئيسية</Link>        
          </li>
          <li className="hover:-translate-x-2.5  transition-all duration-300">
            <Link to="/library" className="text-gray-600 hover:text-emerald-600 transition-all duration-300 text-sm">مكتبة الأعشاب</Link>        
          </li>
          <li className="hover:-translate-x-2.5  transition-all duration-300">
            <Link to="/stories" className="text-gray-600 hover:text-emerald-600 transition-all duration-300 text-sm">القصص التراثية</Link>        
          </li>
          <li className="hover:-translate-x-2.5  transition-all duration-300">
            <Link to="/community/recipes" className="text-gray-600 hover:text-emerald-600 transition-all duration-300 text-sm">المجتمع</Link>        
          </li>
          <li className="hover:-translate-x-2.5  transition-all duration-300">
            <Link to="/chatbot" className="text-gray-600 hover:text-emerald-600 transition-all duration-300 text-sm">الروبوت</Link>        
          </li>

        </ul>
      </article>
      <article className="text-right">
        <h3 className="text-lg font-semibold mb-4">وسائل التواصل :</h3>
       
            <a href="https://www.facebook.com/moatasem.osama.14" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-emerald-600 transition-all duration-300 mx-2 text-sm">
            <i className="fab fa-facebook"></i>
            </a>
            <a href="https://www.linkedin.com/company/healing-herb-website/" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-emerald-600 transition-all duration-300 mx-2 text-sm">
            <i className="fab fa-linkedin"></i>
            </a>
            <a href="https://wa.me/+201156554473" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-emerald-600 transition-all duration-300 mx-2 text-sm">
            <i className="fab fa-whatsapp"></i>
            </a>
        
      </article>
      <div className="font-cairo">
          <p>© 2025 عشبة شفاء - جميع الحقوق محفوظة</p>
        </div>
      </div>
      </footer>
  )
}
