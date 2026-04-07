import { LiquidButton } from "@/components/ui/liquid-glass-button"
import Icon from "@/components/ui/icon"
import { useState } from "react"

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const slides = [
    {
      image: "https://cdn.poehali.dev/projects/46dd4494-3289-46e0-b512-2259236e3c49/files/21c6628c-3c86-4e82-9699-cc5be0900a8a.jpg",
      alt: "Джип на горной дороге Кавказа",
    },
    {
      image: "https://cdn.poehali.dev/projects/46dd4494-3289-46e0-b512-2259236e3c49/files/f0b5a93d-8324-4621-b43b-411cff248d31.jpg",
      alt: "Панорама горных вершин Кавказа",
    },
    {
      image: "https://cdn.poehali.dev/projects/46dd4494-3289-46e0-b512-2259236e3c49/files/c67e9125-4c16-4d4b-b9d5-85953a51fa44.jpg",
      alt: "Группа туристов в джипе на горном маршруте",
    },
  ]

  const navItems = [
    { name: "Главная", href: "#hero" },
    { name: "О нас", href: "#mission" },
    { name: "Маршруты", href: "#community" },
    { name: "Галерея", href: "#gallery" },
    { name: "Отзывы", href: "#testimonials" },
    { name: "Контакты", href: "#contacts" },
  ]

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length)
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
    setIsMenuOpen(false)
  }

  return (
    <div id="hero" className="relative h-screen w-full overflow-hidden bg-black">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-1000 ease-in-out"
        style={{
          backgroundImage: `url('${slides[currentSlide].image}')`,
        }}
      >
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* Navigation */}
      <nav className="relative z-20 flex items-center justify-between p-6 md:p-8">
        <div className="text-white font-bold text-xl tracking-wider">ЛУЧШИЕ ДРУЗЬЯ</div>

        <div className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => (
            <button
              key={item.name}
              onClick={() => scrollToSection(item.href)}
              className="relative text-white hover:text-gray-300 transition-colors duration-300 font-medium tracking-wide pb-1 group"
            >
              {item.name}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all duration-300 ease-out group-hover:w-full"></span>
            </button>
          ))}
        </div>

        <button
          className="md:hidden text-white hover:text-gray-300 transition-colors"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <Icon name="X" size={24} /> : <Icon name="Menu" size={24} />}
          <span className="sr-only">Меню</span>
        </button>
      </nav>

      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div className="absolute top-0 left-0 w-full h-full bg-black/90 z-30 md:hidden">
          <div className="flex flex-col items-center justify-center h-full space-y-8">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => scrollToSection(item.href)}
                className="text-white text-2xl font-bold tracking-wider hover:text-gray-300 transition-colors duration-300"
              >
                {item.name}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Hero Content */}
      <div className="relative z-10 flex h-full items-center justify-center px-6">
        <div className="text-center text-white max-w-4xl">
          <p className="text-sm md:text-base font-medium tracking-widest mb-4 text-amber-300 uppercase">
            Профессиональный гид • Комфортные джипы
          </p>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-wider mb-4 leading-none">
            ГОРЫ
            <br />
            КАВКАЗА
          </h1>

          <p className="text-xl md:text-2xl font-light tracking-wide mb-8 text-gray-200">
            Джип-туры и экскурсии с личным гидом
          </p>

          <LiquidButton
            size="xxl"
            className="font-semibold text-lg tracking-wide"
            onClick={() => scrollToSection("#community")}
          >
            Смотреть маршруты
          </LiquidButton>

          <div className="flex flex-wrap justify-center gap-3 mt-8">
            <a
              href="tel:+79054413485"
              className="flex items-center gap-2 px-5 py-2.5 bg-white/10 hover:bg-white/25 backdrop-blur-sm border border-white/30 text-white font-medium transition-all duration-300"
            >
              <Icon name="Phone" size={16} />
              <span className="text-sm">+7 905 441 34 85</span>
            </a>
            <a
              href="https://wa.me/79054413485"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-2.5 bg-green-500/80 hover:bg-green-500 backdrop-blur-sm border border-green-400/50 text-white font-medium transition-all duration-300"
            >
              <Icon name="MessageCircle" size={16} />
              <span className="text-sm">WhatsApp</span>
            </a>
            <a
              href="https://t.me/Igor_Dorsh"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-2.5 bg-sky-500/80 hover:bg-sky-500 backdrop-blur-sm border border-sky-400/50 text-white font-medium transition-all duration-300"
            >
              <Icon name="Send" size={16} />
              <span className="text-sm">Telegram</span>
            </a>
            <a
              href="https://instagram.com/doroshenko_is"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-2.5 bg-pink-600/80 hover:bg-pink-600 backdrop-blur-sm border border-pink-400/50 text-white font-medium transition-all duration-300"
            >
              <Icon name="Instagram" size={16} />
              <span className="text-sm">@doroshenko_is</span>
            </a>
          </div>
        </div>
      </div>

      {/* Slider Navigation */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
        <div className="flex items-center space-x-4">
          <button
            onClick={prevSlide}
            className="text-white hover:text-gray-300 transition-colors p-2"
            aria-label="Предыдущий слайд"
          >
            <Icon name="ChevronLeft" size={24} />
          </button>

          <div className="flex space-x-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  currentSlide === index ? "bg-white" : "bg-white/40 hover:bg-white/60"
                }`}
                aria-label={`Перейти к слайду ${index + 1}`}
              />
            ))}
          </div>

          <button
            onClick={nextSlide}
            className="text-white hover:text-gray-300 transition-colors p-2"
            aria-label="Следующий слайд"
          >
            <Icon name="ChevronRight" size={24} />
          </button>
        </div>
      </div>

      {/* Side Navigation Indicators */}
      <div className="absolute right-8 top-1/2 transform -translate-y-1/2 z-20 hidden md:block">
        <div className="flex flex-col space-y-3">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-1 h-8 transition-all duration-300 ${
                currentSlide === index ? "bg-white" : "bg-white/40 hover:bg-white/60"
              }`}
              aria-label={`Слайд ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}