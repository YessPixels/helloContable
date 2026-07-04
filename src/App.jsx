import React, { useState, useEffect } from 'react';
import { 
  Cloud, 
  Clock, 
  ShieldCheck, 
  User, 
  FileText, 
  TrendingUp, 
  ChevronRight, 
  Download, 
  Calendar, 
  Mail, 
  Phone, 
  MapPin, 
  Heart, 
  X, 
  Menu, 
  CheckCircle,
  BookOpen,
  ArrowRight,
  Lock
} from 'lucide-react';
import './App.css';
import MaryImg from './img/Mary.jpg';
import logoImg from './img/logo.png';
import ebookGuide from './assets/ebook_guide.jpg';
import onlineCourse from './assets/online_course.jpg';
import dashboardMockup from './assets/dashboard_mockup.jpg';
import coffeeMug from './assets/coffee_mug.jpg';

// Calendly URL configuration
const CALENDLY_URL = "https://calendly.com/asesores-hellocontable/45min";

// 8 Services + 1 Course Card = 9 Cards in the Services Grid (from the image base)
const SERVICES = [
  {
    icon: <FileText size={32} />,
    title: "Contabilidad Fiscal y Financiera",
    desc: "Información clara y actualizada para tomar decisiones."
  },
  {
    icon: <TrendingUp size={32} />,
    title: "Regularización Fiscal",
    desc: "Ponemos tu situación fiscal en orden y al día."
  },
  {
    icon: <TrendingUp size={32} />,
    title: "Análisis Financiero",
    desc: "Entiende tus números y detecta oportunidades de mejora."
  },
  {
    icon: <FileText size={32} />,
    title: "Declaración Anual Sueldos y Salarios",
    desc: "Nos encargamos de tu declaración anual sin complicaciones."
  },
  {
    icon: <TrendingUp size={32} />,
    title: "Asesoría Financiera",
    desc: "Estrategias personalizadas para mejorar tus finanzas y hacer crecer tu negocio."
  },
  {
    icon: <User size={32} />,
    title: "Asesoría Fiscal",
    desc: "Cumple tus obligaciones fiscales y optimiza tu carga tributaria."
  },
  {
    icon: <FileText size={32} />,
    title: "Análisis Fiscal",
    desc: "Revisamos y analizamos tu situación fiscal para que pagues lo justo."
  },
  {
    icon: <FileText size={32} />,
    title: "Timbrado de CFDI",
    desc: "Genera y administra tus CFDI de forma rápida, segura y sencilla."
  }
];

// Testimonials Data from the image base
const TESTIMONIALS = [
  {
    text: "Por fin entiendo mis números y sé para dónde va mi negocio. Me explican todo súper bien y siempre están disponibles.",
    author: "Emprendedora digital"
  },
  {
    text: "He trabajado con varios contadores y nadie me había dado tanta claridad. La información en tiempo real es un antes y un después.",
    author: "Médico / Cliente recurrente"
  },
  {
    text: "El servicio es increíblemente moderno y el equipo siempre está de mi lado para guiarme sin tecnicismos.",
    author: "Creador de contenido / Freelancer"
  }
];

function App() {
  // Navigation & Scroll states
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Modals visibility states
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [bookingSubmitted, setBookingSubmitted] = useState(false);
  const [ebookModalOpen, setEbookModalOpen] = useState(false);
  const [ebookSubmitted, setEbookSubmitted] = useState(false);
  const [courseModalOpen, setCourseModalOpen] = useState(false);

  // Form inputs states
  const [bookingForm, setBookingForm] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: ''
  });

  const [ebookForm, setEbookForm] = useState({ name: '', email: '' });

  // Testimonials state
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  // Toast notifications state
  const [toasts, setToasts] = useState([]);

  // Setup scroll listener for Header styling
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Setup auto-play for testimonials carousel
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveTestimonial((prev) => (prev === TESTIMONIALS.length - 1 ? 0 : prev + 1));
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  // Helper to push a notification toast
  const addToast = (message) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  // Handle Free Consultation Booking Submission (from modal)
  const handleBookingSubmit = (e) => {
    e.preventDefault();
    if (!bookingForm.name || !bookingForm.email || !bookingForm.phone) {
      addToast('Por favor completa todos los campos requeridos.');
      return;
    }
    console.log('Booking Request Recieved:', bookingForm);
    setBookingSubmitted(true);
    addToast('¡Consultoría agendada exitosamente!');
  };

  // Reset Booking Modal Form
  const resetBookingForm = () => {
    setBookingForm({ name: '', email: '', phone: '', company: '', message: '' });
    setBookingSubmitted(false);
    setBookingModalOpen(false);
  };

  // Handle Ebook Download Submission
  const handleEbookSubmit = (e) => {
    e.preventDefault();
    if (!ebookForm.name || !ebookForm.email) {
      addToast('Por favor introduce tu nombre y correo.');
      return;
    }
    console.log('Ebook Lead captured:', ebookForm);
    setEbookSubmitted(true);
    addToast('¡Guía enviada a tu correo!');
    
    // Simulate PDF file download triggering
    setTimeout(() => {
      addToast('Iniciando descarga del archivo PDF de la guía...');
    }, 1000);
  };

  // Reset Ebook Modal Form
  const resetEbookForm = () => {
    setEbookForm({ name: '', email: '' });
    setEbookSubmitted(false);
    setEbookModalOpen(false);
  };

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  return (
    <div className="app-wrapper">
      {/* --- TOAST NOTIFICATIONS --- */}
      <div className="toast-container">
        {toasts.map((t) => (
          <div key={t.id} className="toast">
            <CheckCircle size={18} />
            <span>{t.message}</span>
          </div>
        ))}
      </div>

      {/* --- HEADER --- */}
      <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
        <div className="container header-container">
          <div className="logo-box" onClick={() => scrollToSection('inicio')}>
            <img src={logoImg} alt="Hello! Contable" className="logo-image" />
          </div>

          <div className="header-actions">
            <button 
              className="hamburger-btn" 
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Abrir menú"
              style={{ display: 'flex' }}
            >
              <Menu size={28} />
            </button>
          </div>
        </div>
      </header>

      {/* --- MOBILE NAVIGATION OVERLAY --- */}
      {mobileMenuOpen && <div className="mobile-nav-backdrop" onClick={() => setMobileMenuOpen(false)} />}
      <div className={`mobile-nav-overlay ${mobileMenuOpen ? 'open' : ''}`}>
        <div className="mobile-nav-header">
          <div className="logo-box">
            <img src={logoImg} alt="Hello! Contable" className="logo-image" />
          </div>
          <button 
            className="hamburger-btn" 
            onClick={() => setMobileMenuOpen(false)}
            aria-label="Cerrar menú"
          >
            <X size={28} />
          </button>
        </div>
        <ul className="mobile-nav-links">
          <li><span className="mobile-nav-link" onClick={() => scrollToSection('inicio')}>Inicio</span></li>
          <li><span className="mobile-nav-link" onClick={() => scrollToSection('servicios')}>Servicios</span></li>
          <li><span className="mobile-nav-link" onClick={() => scrollToSection('como-trabajamos')}>Cómo Trabajamos</span></li>
          <li><span className="mobile-nav-link" onClick={() => scrollToSection('sobre-nosotros')}>Sobre Nosotros</span></li>
          <li><span className="mobile-nav-link" onClick={() => scrollToSection('recursos')}>Recursos</span></li>
        </ul>
        <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{ width: '100%' }}>
          Agendar consultoría gratuita →
        </a>
      </div>

      {/* --- HERO SECTION --- */}
      <section id="inicio" className="hero-section">
        <div className="container hero-grid">
          <div className="hero-content">
            <span className="badge badge-orange">Contabilidad en la nube</span>
            <h1>Tus números al alcance de un clic</h1>
            <p className="hero-text">
              Contabilidad moderna, remota y en tiempo real para que tomes decisiones con confianza y hagas crecer tu negocio.
            </p>
            <div className="hero-actions">
              <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                Agendar consultoría gratuita →
              </a>
              <button className="btn btn-secondary" onClick={() => scrollToSection('recursos')}>
                Descarga tu recurso gratuito 🎁
              </button>
            </div>
          </div>

          <div className="hero-visual">
            <div className="hero-bg-plant">
              <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M50 0 C60 20 60 50 50 100 C40 50 40 20 50 0" fill="#720d18" opacity="0.12" />
                <path d="M20 30 C40 35 45 45 50 100 C30 70 20 50 20 30" fill="#720d18" opacity="0.12" />
                <path d="M80 30 C60 35 55 45 50 100 C70 70 80 50 80 30" fill="#720d18" opacity="0.12" />
              </svg>
            </div>

            <div className="hero-note-container">
              <p className="hero-handwritten-note">
                información clara, siempre disponible, desde donde estés.
              </p>
              <svg className="hero-handwritten-arrow" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10,10 Q25,35 40,25" stroke="#720d18" strokeWidth="2.5" fill="none" />
                <path d="M35,22 L41,26 L36,31" stroke="#720d18" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>

            <div className="hero-phone-mockup">
              <img src={dashboardMockup} alt="Hello! Contable App Dashboard" className="hero-phone-image" />
            </div>

            <div className="hero-mug-wrap">
              <img src={coffeeMug} alt="Hello! Contable Taza" className="hero-mug-image" />
            </div>
          </div>
        </div>
      </section>

      {/* --- VALUE HIGHLIGHTS (BELOW HERO) --- */}
      <section className="highlights-section">
        <div className="container highlights-grid">
          <div className="highlight-card">
            <div className="highlight-icon-box">
              <Cloud size={24} />
            </div>
            <h3>100% Remoto</h3>
            <p>Atendemos a todo México. Tú eliges dónde estar.</p>
          </div>

          <div className="highlight-card">
            <div className="highlight-icon-box">
              <Clock size={24} />
            </div>
            <h3>En tiempo real</h3>
            <p>Accede a tus números cuando lo necesites y toma mejores decisiones.</p>
          </div>

          <div className="highlight-card">
            <div className="highlight-icon-box">
              <ShieldCheck size={24} />
            </div>
            <h3>Transparencia total</h3>
            <p>Te explicamos todo hasta que lo entiendas. Sin letras chiquitas.</p>
          </div>

          <div className="highlight-card">
            <div className="highlight-icon-box">
              <User size={24} />
            </div>
            <h3>Contadores buenísima onda</h3>
            <p>Cercanos, claros y siempre de tu lado.</p>
          </div>
        </div>
      </section>

      {/* --- SERVICES SECTION (9 Cards including Hotmart Course) --- */}
      <section id="servicios" className="section-padding services-section">
        <div className="container">
          <div className="text-center">
            <span className="badge badge-orange">Nuestros Servicios</span>
            <h2 className="section-title">Todo lo que tu negocio necesita para crecer con seguridad</h2>
            <p className="section-subtitle">
              Soluciones diseñadas para darte claridad financiera y mantener tus obligaciones fiscales cubiertas.
            </p>
          </div>

          <div className="services-grid">
            {SERVICES.map((s, idx) => (
              <div key={idx} className="service-card">
                <div className="service-icon-box">
                  {s.icon}
                </div>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </div>
            ))}

            {/* Special Course Card inside Services Grid as Card 9 */}
            <div className="service-card special-course">
              <div className="service-icon-box" style={{ color: 'var(--accent-orange)' }}>
                <BookOpen size={32} />
              </div>
              <h3>Curso en línea</h3>
              <p>Aprende a hacer tu Declaración Anual de Sueldos y Salarios de forma sencilla y sin complicaciones.</p>
              <div className="course-badge">
                🔥 Disponible en Hotmart
              </div>
              <button 
                className="btn btn-primary" 
                style={{ width: '100%', marginTop: '20px', padding: '10px' }}
                onClick={() => setCourseModalOpen(true)}
              >
                Ver información
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* --- HOW WE WORK SECTION --- */}
      <section id="como-trabajamos" className="section-padding how-we-work-section">
        <div className="container">
          <div className="text-center">
            <span className="badge badge-orange">Cómo Trabajamos</span>
            <h2 className="section-title">Un proceso simple, claro y humano</h2>
            <p className="section-subtitle">
              Nos integramos a tu dinámica de trabajo rápidamente sin procesos complejos.
            </p>
          </div>

          <div className="process-flow">
            <div className="process-step">
              <div className="step-number-bubble">1</div>
              <div className="step-icon-wrap">
                <Mail size={28} />
              </div>
              <h3>Agendamos una asesoría</h3>
              <p>Agendamos una asesoría (gratuita o de pago) para conversar sobre tu situación.</p>
              <div className="step-arrow" />
            </div>

            <div className="process-step">
              <div className="step-number-bubble">2</div>
              <div className="step-icon-wrap">
                <FileText size={28} />
              </div>
              <h3>Analizamos tus necesidades</h3>
              <p>Evaluamos tu situación contable y fiscal para ver qué requiere tu negocio.</p>
              <div className="step-arrow" />
            </div>

            <div className="process-step">
              <div className="step-number-bubble">3</div>
              <div className="step-icon-wrap">
                <ShieldCheck size={28} />
              </div>
              <h3>Propuesta personalizada</h3>
              <p>Te hacemos una propuesta de servicios contables personalizada y clara.</p>
              <div className="step-arrow" />
            </div>

            <div className="process-step">
              <div className="step-number-bubble">4</div>
              <div className="step-icon-wrap">
                <Heart size={28} />
              </div>
              <h3>¡Comenzamos a trabajar!</h3>
              <p>La apruebas, firmamos y ¡ya eres parte de Hello! Contable!</p>
            </div>
          </div>
        </div>
      </section>

      {/* --- SOBRE NOSOTROS (MEET THE FOUNDER) --- */}
      <section id="sobre-nosotros" className="section-padding about-section">
        <div className="container about-grid">
          <div className="founder-intro-card">
            <div className="founder-image-wrapper">
              <img src={MaryImg} alt="Marycruz Paredes - Fundadora de Hello! Contable" className="founder-photo" />
              <div className="founder-photo-ring" />
            </div>
            <span className="badge badge-orange" style={{ alignSelf: 'flex-start' }}>Hola, soy Marycruz Paredes</span>
            <h3>Detrás de Hello! Contable hay una persona que entiende tu negocio.</h3>
            <p>
              Soy contadora y fundadora de Hello! Contable. Creo en una contabilidad moderna, cercana y útil, que realmente te ayude a crecer con tranquilidad.
            </p>
            <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{ alignSelf: 'flex-start' }}>
              Conoce más sobre mí →
            </a>
          </div>

          <div className="founder-quote-card">
            <span className="quote-decor">“</span>
            <p className="founder-quote-text">
              En Hello! Contable encontrarás contadores buenísima onda que te van a explicar todo hasta que al fin lo entiendas.
            </p>
            <div className="founder-quote-badge">
              <div className="founder-quote-author">
                <span className="name">Marycruz Paredes</span>
                <span className="role">Fundadora & Contadora</span>
              </div>
              <div className="founder-quote-icon-bubble">
                <span>H!</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- DOUBLE PROMO SECTION (EBOOK & COURSE) --- */}
      <section id="recursos" className="section-padding recursos-section">
        <div className="container">
          <div className="text-center">
            <span className="badge badge-orange">Recursos</span>
            <h2 className="section-title">Herramientas gratuitas y capacitaciones</h2>
            <p className="section-subtitle">
              Aprende a dominar tus finanzas y cumplir con el SAT de forma sencilla.
            </p>
          </div>
          
          <div className="promos-grid">
            {/* Ebook Promo Left */}
            <div className="promo-box promo-ebook">
              <div className="promo-box-content">
                <span className="badge badge-gold">Recurso Gratuito</span>
                <h3>Descarga tu guía gratuita</h3>
                <p>5 pasos para entender tus números y tomar mejores decisiones hoy mismo.</p>
                <button className="btn btn-primary" onClick={() => setEbookModalOpen(true)}>
                  Descargar ahora <Download size={16} className="btn-icon" />
                </button>
              </div>
              <div className="promo-box-visual">
                <img src={ebookGuide} alt="Ebook 5 Pasos para Entender tus Números" className="promo-ebook-img" />
              </div>
            </div>

            {/* Online Course Promo Right */}
            <div className="promo-box promo-course" id="curso">
              <div className="promo-box-content">
                <span className="badge badge-orange" style={{ color: 'var(--accent-orange)', borderColor: 'rgba(255,255,255,0.3)' }}>Curso en Línea</span>
                <h3>Aprende a hacer tu Declaración Anual</h3>
                <p>Explicado paso a paso, en lenguaje sencillo y sin complicaciones de ningún tipo.</p>
                <button className="btn btn-primary" onClick={() => setCourseModalOpen(true)}>
                  Ver curso en Hotmart 🔥
                </button>
              </div>
              <div className="promo-box-visual">
                <img src={onlineCourse} alt="Hotmart Curso Declaración Anual" className="promo-course-img" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- TESTIMONIALS SECTION --- */}
      <section className="section-padding testimonials-section">
        <div className="container">
          <div className="text-center">
            <span className="badge badge-orange">Lo que dicen nuestros clientes</span>
            <h2 className="section-title">Confianza que se construye con resultados</h2>
            <p className="section-subtitle">
              Nuestros clientes nos recomiendan por nuestra claridad, cercanía y servicio profesional.
            </p>
          </div>

          <div className="testimonials-carousel-wrapper">
            <div 
              className="testimonials-track"
              style={{ transform: `translateX(-${activeTestimonial * (100 / TESTIMONIALS.length)}%)` }}
            >
              {TESTIMONIALS.map((t, idx) => (
                <div key={idx} className="testimonial-slide">
                  <div className="testimonial-bubble">
                    <p className="testimonial-text">
                      "{t.text}"
                    </p>
                    <span className="testimonial-author">
                      — {t.author}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="carousel-dots">
              {TESTIMONIALS.map((_, idx) => (
                <button
                  key={idx}
                  className={`carousel-dot ${activeTestimonial === idx ? 'active' : ''}`}
                  onClick={() => setActiveTestimonial(idx)}
                  aria-label={`Ir a testimonio ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* --- FINAL CTA BANNER --- */}
      <section className="final-cta-section">
        <div className="container">
          <div className="final-cta-banner">
            <div className="final-cta-left">
              <div className="final-cta-bubble">
                <span>H!</span>
              </div>
              <div className="final-cta-text">
                <h2>¿Listo para entender tus números y hacer crecer tu negocio?</h2>
                <p>Agenda tu consultoría gratuita y da el primer paso hacia la tranquilidad financiera.</p>
              </div>
            </div>
            <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer" className="btn final-cta-btn">
              Agendar consultoría gratuita →
            </a>
          </div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="footer">
        <div className="container">
          {/* Top Features / Taglines */}
          <div className="footer-features">
            <div className="footer-feature-item">
              <MapPin size={16} className="footer-feature-icon" />
              <span>Atendemos a todo México</span>
            </div>
            <div className="footer-feature-item">
              <Cloud size={16} className="footer-feature-icon" />
              <span>100% Remoto</span>
            </div>
            <div className="footer-feature-item">
              <ShieldCheck size={16} className="footer-feature-icon" />
              <span>Información segura</span>
            </div>
            <div className="footer-feature-item">
              <Heart size={16} className="footer-feature-icon" />
              <span>Contadores buenísima onda</span>
            </div>
          </div>

          {/* Bottom Columns Grid */}
          <div className="footer-columns-grid">
            {/* Column 1: Brand */}
            <div className="footer-col brand-col">
              <div className="logo-box" onClick={() => scrollToSection('inicio')} style={{ marginBottom: '16px', cursor: 'pointer' }}>
                <img src={logoImg} alt="Hello! Contable" className="logo-image" />
              </div>
              <p className="footer-tagline" style={{ fontSize: '0.8rem', color: 'var(--text-medium)', marginBottom: '16px', lineHeight: '1.5' }}>
                Contabilidad moderna, remota y en tiempo real para que tomes decisiones con confianza.
              </p>
              <span className="footer-copyright" style={{ fontSize: '0.75rem', color: 'var(--text-light)', fontWeight: 600 }}>
                &copy; {new Date().getFullYear()} Hello! Contable.
              </span>
            </div>

            {/* Column 2: Contact */}
            <div className="footer-col">
              <h4 className="footer-col-title">Contacto</h4>
              <ul className="footer-links-list">
                <li>
                  <a href="mailto:asesores@hellocontable.com">
                    <Mail size={14} style={{ color: 'var(--accent-orange)' }} /> asesores@hellocontable.com
                  </a>
                </li>
                <li>
                  <a href="https://wa.me/5213322322628" target="_blank" rel="noopener noreferrer">
                    <Phone size={14} style={{ color: 'var(--accent-orange)' }} /> +52 1 33 2232 2628
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 3: Socials */}
            <div className="footer-col">
              <h4 className="footer-col-title">Síguenos</h4>
              <ul className="footer-socials-list">
                <li className="footer-social-item">
                  <a href="https://www.instagram.com/hellocontable.asesores?igsh=MXAyNGV1ZzNrazhsdA==" target="_blank" rel="noopener noreferrer">
                    <svg width="14" height="14" fill="currentColor" viewBox="0 0 16 16" style={{ flexShrink: 0, color: 'var(--accent-orange)' }}>
                      <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.917 3.917 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04 1.804.57 3.205 1.726 4.361 1.156 1.156 2.556 1.686 4.36 1.726.853.038 1.125.048 3.298.048 2.17 0 2.442-.01 3.296-.048 1.805-.04 3.207-.57 4.361-1.726 1.156-1.155 1.686-2.556 1.726-4.36.038-.853.048-1.125.048-3.298 0-2.172-.01-2.444-.048-3.298-.04-1.803-.57-3.204-1.726-4.361-1.156-1.156-2.556-1.686-4.36-1.726C10.443.01 10.17 0 8 0zm.002 1.46c2.14 0 2.394.008 3.237.046.778.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.707.275 1.486.038.84.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.778-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.778-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334z"/>
                    </svg>
                    <span>@hellocontable.asesores</span>
                  </a>
                </li>
                <li className="footer-social-item">
                  <a href="https://www.instagram.com/tu.sociafiscal?igsh=Ymg1M2N0ZHh6dDRu" target="_blank" rel="noopener noreferrer">
                    <svg width="14" height="14" fill="currentColor" viewBox="0 0 16 16" style={{ flexShrink: 0, color: 'var(--accent-orange)' }}>
                      <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.917 3.917 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04 1.804.57 3.205 1.726 4.361 1.156 1.156 2.556 1.686 4.36 1.726.853.038 1.125.048 3.298.048 2.17 0 2.442-.01 3.296-.048 1.805-.04 3.207-.57 4.361-1.726 1.156-1.155 1.686-2.556 1.726-4.36.038-.853.048-1.125.048-3.298 0-2.172-.01-2.444-.048-3.298-.04-1.803-.57-3.204-1.726-4.361-1.156-1.156-2.556-1.686-4.36-1.726C10.443.01 10.17 0 8 0zm.002 1.46c2.14 0 2.394.008 3.237.046.778.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.707.275 1.486.038.84.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.778-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.778-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334z"/>
                    </svg>
                    <span>@tu.sociafiscal</span>
                  </a>
                </li>
                <li className="footer-social-item">
                  <a href="https://www.instagram.com/tello.tusociofinanciero?igsh=ZWgzdzVxOGh5aGY5" target="_blank" rel="noopener noreferrer">
                    <svg width="14" height="14" fill="currentColor" viewBox="0 0 16 16" style={{ flexShrink: 0, color: 'var(--accent-orange)' }}>
                      <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.917 3.917 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04 1.804.57 3.205 1.726 4.361 1.156 1.156 2.556 1.686 4.36 1.726.853.038 1.125.048 3.298.048 2.17 0 2.442-.01 3.296-.048 1.805-.04 3.207-.57 4.361-1.726 1.156-1.155 1.686-2.556 1.726-4.36.038-.853.048-1.125.048-3.298 0-2.172-.01-2.444-.048-3.298-.04-1.803-.57-3.204-1.726-4.361-1.156-1.156-2.556-1.686-4.36-1.726C10.443.01 10.17 0 8 0zm.002 1.46c2.14 0 2.394.008 3.237.046.778.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.707.275 1.486.038.84.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.778-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.778-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334z"/>
                    </svg>
                    <span>@tello.tusociofinanciero</span>
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 4: Legal */}
            <div className="footer-col">
              <h4 className="footer-col-title">Legal</h4>
              <ul className="footer-links-list">
                <li>
                  <a href="https://app.box.com/s/yuc4pxwjdodlmp5jbti8vdtp7tqj221m" target="_blank" rel="noopener noreferrer">
                    Aviso de Privacidad
                  </a>
                </li>
                <li>
                  <a href="https://app.box.com/s/foylwwx9sw7la4u4fe3vnn78gtjwyu6c" target="_blank" rel="noopener noreferrer">
                    Términos y Condiciones
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>

      {/* --- EBOOK LEAD CAPTURE MODAL --- */}
      {ebookModalOpen && (
        <div className="modal-backdrop" onClick={resetEbookForm}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={resetEbookForm} aria-label="Cerrar modal">
              <X size={24} />
            </button>

            {!ebookSubmitted ? (
              <>
                <div className="modal-header">
                  <h3>Descarga tu Guía Gratuita</h3>
                  <p>Ingresa tus datos y te enviaremos el enlace de descarga directamente a tu correo electrónico.</p>
                </div>
                <form onSubmit={handleEbookSubmit}>
                  <div className="form-group">
                    <label htmlFor="ebook-name">Nombre completo *</label>
                    <input 
                      type="text" 
                      id="ebook-name" 
                      className="form-input" 
                      required 
                      placeholder="Ej. Nancy Ramos"
                      value={ebookForm.name}
                      onChange={(e) => setEbookForm({...ebookForm, name: e.target.value})}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="ebook-email">Correo electrónico *</label>
                    <input 
                      type="email" 
                      id="ebook-email" 
                      className="form-input" 
                      required 
                      placeholder="nancy@miempresa.com"
                      value={ebookForm.email}
                      onChange={(e) => setEbookForm({...ebookForm, email: e.target.value})}
                    />
                  </div>

                  <button type="submit" className="btn btn-primary form-submit-btn">
                    Enviar y descargar guía
                  </button>
                </form>
              </>
            ) : (
              <div className="text-center" style={{ padding: '20px 0' }}>
                <CheckCircle size={60} style={{ color: 'var(--accent-orange)', marginBottom: '20px' }} />
                <h3 style={{ fontFamily: 'var(--font-title)', fontWeight: 800, color: 'var(--primary-burgundy)', fontSize: '1.5rem', marginBottom: '12px' }}>
                  ¡Guía lista para descargar!
                </h3>
                <p style={{ color: 'var(--text-medium)', fontSize: '0.9rem', marginBottom: '24px', lineHeight: 1.6 }}>
                  Hemos enviado un correo a <strong>{ebookForm.email}</strong> con tu enlace de descarga permanente de la guía <strong>"5 pasos para entender tus números"</strong>. ¡Esperamos que sea de gran utilidad para tu negocio!
                </p>
                <button className="btn btn-primary" onClick={resetEbookForm} style={{ width: '100%' }}>
                  Aceptar
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* --- HOTMART COURSE INFO MODAL --- */}
      {courseModalOpen && (
        <div className="modal-backdrop" onClick={() => setCourseModalOpen(false)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={() => setCourseModalOpen(false)} aria-label="Cerrar modal">
              <X size={24} />
            </button>
            <div className="modal-header">
              <span className="badge badge-orange">Curso Online</span>
              <h3>Declaración Anual de Sueldos y Salarios</h3>
              <p>Aprende paso a paso a realizar tu declaración fiscal en el SAT de manera segura.</p>
            </div>
            
            <div style={{ color: 'var(--text-medium)', fontSize: '0.9rem', lineHeight: 1.6, marginBottom: '24px' }}>
              <p style={{ marginBottom: '12px' }}>
                Este curso práctico está diseñado para personas físicas bajo el régimen de Sueldos y Salarios que desean declarar sus deducciones personales y obtener saldos a favor.
              </p>
              <ul style={{ listStylePosition: 'inside', display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '16px', fontWeight: 600 }}>
                <li>💻 100% online y a tu propio ritmo.</li>
                <li>📝 Ejercicios reales con el portal del SAT.</li>
                <li>🔥 Disponible en la plataforma Hotmart.</li>
              </ul>
            </div>

            <a 
              href="https://pay.hotmart.com/O105526283L" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn btn-primary" 
              style={{ width: '100%', display: 'flex', gap: '8px', justifyContent: 'center' }}
              onClick={() => { setCourseModalOpen(false); addToast('Redirigiendo a Hotmart Checkout seguro...'); }}
            >
              Comprar en Hotmart 🔥
            </a>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
