import { Link } from "react-router-dom";
import React, { useEffect, useRef, useState, useCallback } from "react";

export default function Home() {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const [hasAnimated, setHasAnimated] = useState(false);
  const observerRef = useRef(null);

  const startCounting = useCallback(() => {
    const end = 50000;
    const duration = 2000;
    const startTime = performance.now();

    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      setCount(Math.ceil(progress * end));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          startCounting();
          setHasAnimated(true);
        }
      },
      { threshold: 0.5 }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observerRef.current.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observerRef.current.unobserve(currentRef);
      }
    };
  }, [hasAnimated, startCounting]);

  return (
    <div className="font-cairo bg-green-50 text-gray-800" >

      <section
  className="relative bg-[url(/src/assets/homebackground.jpg)] bg-cover bg-center min-h-screen text-white animate-fadeIn"
>
  {/* Overlay */}
  <div className="absolute inset-0 bg-black/60"></div>

  {/* Content */}
  <div className="relative max-w-4xl mx-auto flex flex-col justify-center items-center min-h-screen text-center px-4">
    <h1 className="text-4xl md:text-5xl font-bold mb-6">
      أعشاب طبيعية بعناية علمية
    </h1>

    <p className="max-w-2xl leading-relaxed mb-8">
      نوفر أعشابًا دوائية مختارة بعناية من مصادر موثوقة، مع معلومات دقيقة عن
      الاستخدام والفوائد، وجودة خاضعة لمعايير واضحة، لتقديم تجربة صحية متكاملة
      تجمع بين التراث العشبي والفهم الحديث.
    </p>

    <Link
      to="/dashboard"
      className="inline-block w-64 bg-primary text-white py-4 rounded-full shadow-lg
                 hover:bg-white hover:text-primary transition-all duration-300
                 font-medium text-lg"
    >
      استكشف الأعشاب
    </Link>
  </div>
</section>


      <section className="py-16 px-6 max-w-6xl mx-auto animate-fadeIn">
        <div className="bg-white p-8 rounded-2xl shadow-sm">
          <h2 className="text-3xl font-bold text-primary mb-6 text-center">
            عن الفكرة
          </h2>
          <p className="text-lg leading-relaxed text-gray-600 text-center max-w-4xl mx-auto">
            المنصة توفر للمستخدم إمكانية إدخال الأعراض باللهجة المصرية لتحليلها
            واقتراح وصفات عشبية مناسبة. تتضمن لوحة تحكم شخصية لمتابعة البيانات
            الطبية، مكتبة أعشاب تفاعلية، وقسم "وصفات الأجداد" الذي يجمع الوصفات الشعبية
            بعد مراجعتها، بالإضافة إلى "قصص تراثية" عن الأعشاب.
          </p>
        </div>
      </section>

      <section className="py-16 px-6 bg-primary-light text-white animate-fadeIn">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12">
            المميزات الرئيسية
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <article className="bg-white/5 rounded-2xl p-6 hover:bg-white/10 hover:-translate-y-1 transition-all duration-300">
              <div className="w-16 h-16 rounded-xl flex items-center text-2xl">
                <i className="fa-solid fa-seedling"></i>
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">
                مكتبة الأعشاب
              </h3>
              <p className="text-gray-100 mb-5">
                موسوعة تفاعلية تشمل فوائد وأضرار وطريقة تحضير الأعشاب.
              </p>
              <Link to="/library" className="text-white text-[10px] mt-5 ">
                <span className="ml-3">المزيد</span>
                <i className="fa-solid fa-angle-left"></i>
              </Link>
            </article>
            <article className="bg-white/5 rounded-2xl p-6 hover:bg-white/10 hover:-translate-y-1 transition-all duration-300">
              <div className=" w-16 h-16 rounded-xl flex items-center  text-2xl">
                <i className="fa-solid fa-gauge-high"></i>
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">
                لوحة التحكم
              </h3>
              <p className="text-gray-100 mb-5">
                متابعة بيانات المريض (العمر، الوزن، الأمراض المزمنة) والتحاليل الطبية
                بمساعدة تحليل ذكي.
              </p>

              <Link to="/dashboard" className="text-white text-[10px] mt-5 ">
              <span className="ml-3">المزيد</span>

<i className="fa-solid fa-angle-left"></i>         </Link>
            </article>
            <article className="bg-white/5 rounded-2xl p-6 hover:bg-white/10 hover:-translate-y-1 transition-all duration-300">
              <div className="w-16 h-16 rounded-xl flex items-center text-2xl">
                <svg width="41" height="41" viewBox="0 0 41 41" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M29.8545 7.32131C29.8551 7.29589 29.8614 7.27175 29.8614 7.24633C29.8614 3.94534 25.5921 1.27087 20.3277 1.27087C15.0632 1.27087 10.7932 3.94534 10.7932 7.24633C10.7932 7.27111 10.7996 7.29462 10.7996 7.3194C0.918219 11.1084 -0.892718 20.6441 3.59205 25.1162L3.61302 28.8975C3.61366 34.1232 8.86347 39.3959 20.5945 39.3959C31.0389 39.3959 37.0296 35.57 37.0296 28.8975L37.0264 25.1695C41.5773 20.7184 39.7765 11.1255 29.8545 7.32131ZM31.9481 24.8347C31.9481 26.9398 30.2446 28.6472 28.1445 28.6472C26.0445 28.6472 24.3416 26.9398 24.3416 24.8347C24.3416 22.7295 26.0445 21.0222 28.1445 21.0222C30.2446 21.0222 31.9481 22.7295 31.9481 24.8347ZM20.3277 3.77696C23.9571 3.77696 27.105 5.05097 28.7145 6.92227C26.3393 6.16485 23.5575 5.71561 20.3277 5.71561C16.8062 5.71561 12.6499 6.69479 11.9414 6.92036C13.5522 5.05033 16.6994 3.77696 20.3277 3.77696ZM14.5409 17.6151C16.2229 16.9765 19.222 15.8067 20.5202 15.2017C22.0712 15.9757 23.9197 16.7814 26.115 17.6151C27.3162 18.072 28.4734 18.6371 29.5723 19.3034C29.1064 19.181 28.6269 19.118 28.1452 19.1159C25.7992 19.1159 23.785 20.5367 22.9087 22.5669C21.2105 22.4831 19.5082 22.5358 17.8184 22.7244C16.9803 20.6117 14.9253 19.1159 12.519 19.1159C12.0196 19.1159 11.5386 19.1864 11.0773 19.3072C12.1779 18.6389 13.3373 18.0725 14.5409 17.6151ZM12.519 21.0222C14.6197 21.0222 16.3226 22.7295 16.3226 24.8347C16.3226 26.9398 14.6191 28.6472 12.519 28.6472C10.419 28.6472 8.71669 26.9398 8.71669 24.8347C8.71669 22.7295 10.4196 21.0222 12.519 21.0222ZM20.5945 38.146C9.74225 38.146 4.88449 33.5005 4.88449 28.8937L4.86225 24.9103C5.40045 24.1872 6.32498 23.0701 7.64855 21.8704C7.104 22.7631 6.81579 23.7884 6.81552 24.834C6.81552 27.9927 9.36989 30.5528 12.519 30.5528C15.6694 30.5528 18.2244 27.9927 18.2244 24.834C18.2244 24.7552 18.2155 24.6783 18.2124 24.6008C19.6228 24.4513 21.0421 24.4025 22.4595 24.4547C22.4512 24.5811 22.4404 24.7063 22.4404 24.8347C22.4404 27.9933 24.9954 30.5534 28.1458 30.5534C31.2949 30.5534 33.8506 27.9933 33.8506 24.8347C33.8502 23.7926 33.5638 22.7705 33.0226 21.88C34.0233 22.7819 34.9382 23.7746 35.7556 24.8455L35.7594 28.8982C35.7581 34.7751 30.2319 38.146 20.5945 38.146Z" fill="white"/>
<path d="M24.2463 31.4042C24.2609 31.7931 24.3994 32.1591 24.6066 32.4876C23.9387 32.7373 22.2771 33.2723 20.2902 33.2723C18.3153 33.2723 16.6518 32.7449 15.97 32.492C16.1784 32.1629 16.3188 31.795 16.3334 31.4036C15.8404 31.9208 15.4064 32.3433 14.9101 32.7513C14.4227 33.1649 13.9049 33.5373 13.368 34.0088C13.734 34.0107 14.0828 33.9141 14.4094 33.7788C14.7398 33.6434 15.0429 33.4528 15.3212 33.2285C15.4055 33.1573 15.4869 33.0813 15.5652 33.0004C15.8601 33.9999 17.8603 35.0966 20.2908 35.0966C22.7149 35.0966 24.7133 33.998 25.0145 32.9985C25.0933 33.0798 25.1753 33.1565 25.2604 33.2285C25.5387 33.4534 25.8412 33.6434 26.171 33.7788C26.4988 33.9141 26.8464 34.0107 27.2137 34.0088C26.6761 33.5379 26.1583 33.1656 25.6709 32.7513C25.1727 32.344 24.74 31.9214 24.2463 31.4042Z" fill="white"/>
</svg>

              </div>
              <h3 className="text-xl font-semibold text-white mb-4">
                وصفات الأجداد
              </h3>
              <p className="text-gray-100 mb-5">
                خلطات شعبية متوارثة يتم مراجعتها وإتاحتها للمستخدمين.
              </p>
              <Link to="/community/recipes" className="text-white text-[10px] ">
                <span className="ml-3">المزيد</span>
                <i className="fa-solid fa-angle-left"></i>
              </Link>
            </article>
            <article className="bg-white/5 rounded-2xl p-6 hover:bg-white/10 hover:-translate-y-1 transition-all duration-300">
              <div className="w-16 h-16 rounded-xl flex items-center text-2xl">
                <i className="fa-solid fa-book"></i>
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">
القصص التراثية              </h3>
              <p className="text-gray-100 mb-5">
عرض حكايات تراثية عن استخدام الأعشاب في مصر.              </p>
              <Link to="/stories" className="text-white text-[10px] ">
                <span className="ml-3">المزيد</span>
                <i className="fa-solid fa-angle-left"></i>
              </Link>
            </article>
            <article className="bg-white/5 rounded-2xl p-6 hover:bg-white/10 hover:-translate-y-1 transition-all duration-300">
              <div className="w-16 h-16 rounded-xl flex items-center text-2xl">
                <i className="fa-solid fa-people-arrows"></i>
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">
المجتمع              </h3>
              <p className="text-gray-100 mb-5">مجتمع فيه المرضى والأطباء</p>
              <Link to="/stories" className="text-white text-[10px] ">
                <span className="ml-3">المزيد</span>
                <i className="fa-solid fa-angle-left"></i>
              </Link>
            </article>
          </div>
        </div>
      </section>

      <section className="py-16 px-6 max-w-6xl mx-auto animate-fadeIn">
        <div className="bg-white p-8 rounded-2xl shadow-sm">
          <h2 className="text-3xl font-bold text-primary mb-8 text-center">
            الفئة المستهدفة
          </h2>
          <ul className="grid md:grid-cols-2 gap-6 text-gray-600">
            <li className="flex items-start ">
              <div className="bg-emerald-100 p-2 rounded-lg mr-4 ml-2 mt-1">
                <svg className="w-5 h-5 text-primary" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <span>مرضى السكري والضغط الذين يحتاجون متابعة يومية.</span>
            </li>
            <li className="flex items-start">
              <div className="bg-emerald-100 p-2 rounded-lg mr-4 mt-1 ml-2">
                <svg className="w-5 h-5 text-primary" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <span>المصريون الذين يستخدمون الطب العشبي (حوالي 60% من السكان).</span>
            </li>
            <li className="flex items-start">
              <div className="bg-emerald-100 p-2 rounded-lg mr-4 mt-1 ml-2">
                <svg className="w-5 h-5 text-primary" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <span>الأمهات الجدد الباحثات عن حلول طبيعية.</span>
            </li>
            <li className="flex items-start">
              <div className="bg-emerald-100 p-2 rounded-lg mr-4 mt-1 ml-2">
                <svg className="w-5 h-5 text-primary" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <span>سكان القرى الذين يعتمدون على الأعشاب لضعف الخدمات الصحية.</span>
            </li>
            <li className="flex items-start md:col-span-2">
              <div className="bg-emerald-100 p-2 rounded-lg mr-4 mt-1 ml-2">
                <svg className="w-5 h-5 text-primary" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <span>الشباب المهتمون بالتراث والطب البديل.</span>
            </li>
          </ul>
        </div>
      </section>

      <section className="py-16 px-6 bg-white animate-fadeIn">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-primary text-center mb-12">
            كيف تعمل المنصة؟
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-emerald-50 to-green-50 p-8 rounded-2xl shadow-sm border border-emerald-100 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
              <div className="bg-emerald-500 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 text-white text-2xl">
                1
              </div>
              <h3 className="font-semibold text-lg mb-4 text-emerald-700">تسجيل البيانات</h3>
              <p className="text-gray-600">
                أنشئ حساب بسيط وأدخل بياناتك (العمر، الوزن، الأمراض المزمنة).
              </p>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-8 rounded-2xl shadow-sm border border-blue-100 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
              <div className="bg-blue-500 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 text-white text-2xl">
                2
              </div>
              <h3 className="font-semibold text-lg mb-4 text-blue-700">إدخال الأعراض</h3>
              <p className="text-gray-600">
                اكتب أو سجّل صوتيًا الأعراض، والمنصة تقترح لك وصفات عشبية مناسبة.
              </p>
            </div>
            <div className="bg-gradient-to-br from-amber-50 to-orange-50 p-8 rounded-2xl shadow-sm border border-amber-100 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
              <div className="bg-amber-500 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 text-white text-2xl">
                3
              </div>
              <h3 className="font-semibold text-lg mb-4 text-amber-700">الحصول على النصائح</h3>
              <p className="text-gray-600">
                استلم نصائح عشبية مخصصة وتذكيرات لمتابعة صحتك باستمرار.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-6 bg-gradient-to-r bg-primary-light text-white animate-fadeIn">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">إحصائيات داعمة</h2>
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div className="bg-white bg-opacity-10 p-6 rounded-2xl backdrop-blur-sm text-emerald-900 transition-all duration-300 hover:bg-opacity-20 hover:-translate-y-1">
              <p className="text-4xl font-bold mb-2">60%</p>
              <p>من المصريين جربوا الأعشاب الطبية</p>
            </div>
            <div className="bg-white bg-opacity-10 p-6 rounded-2xl backdrop-blur-sm text-emerald-900 transition-all duration-300 hover:bg-opacity-20 hover:-translate-y-1">
              <p className="text-4xl font-bold mb-2">22%</p>
              <p>من البالغين مصابون بالسكري</p>
            </div>
            <div className="bg-white bg-opacity-10 p-6 rounded-2xl backdrop-blur-sm text-emerald-900 transition-all duration-300 hover:bg-opacity-20 hover:-translate-y-1">
              <p className="text-4xl font-bold mb-2">65%</p>
              <p>يستخدمون الأعشاب بجانب الأدوية</p>
            </div>
            <div ref={ref} className="bg-white bg-opacity-10 p-6 rounded-2xl backdrop-blur-sm text-emerald-900 transition-all duration-300 hover:bg-opacity-20 hover:-translate-y-1">
              <p className="text-4xl font-bold mb-2">{count.toLocaleString()}</p>
              <p>مستخدم متوقع في أول سنة</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-6 bg-gray-100 text-center animate-fadeIn">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold text-primary mb-6">تواصل معنا</h2>
          <p className="text-gray-600 mb-8">
            لو عندك استفسار أو اقتراح لتحسين المنصة، تقدر تتواصل معانا بسهولة.
          </p>
          <a
            href="mailto:moatasemosama18@gmail.com"
            className="inline-block bg-emerald-500 text-white px-8 py-3 rounded-lg shadow hover:bg-primary transition-all duration-300 font-medium"
          >
            أرسل رسالة
          </a>
        </div>
      </section>

      
        
    </div>
  );
}