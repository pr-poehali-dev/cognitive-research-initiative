import type React from "react"
import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

const SQRT_5000 = Math.sqrt(5000)

// Testimonials from jeep tour guests
const testimonials = [
  {
    tempId: 0,
    testimonial:
      "Никогда не думал, что горы могут так впечатлить. Гид знает каждый камень — останавливались в местах, о которых нет ни в одном путеводителе. Это было лучшее путешествие в моей жизни.",
    by: "Александр Петров, Москва",
    imgSrc: "https://api.dicebear.com/7.x/initials/svg?seed=AlexPetrov&backgroundColor=3b82f6&textColor=ffffff",
  },
  {
    tempId: 1,
    testimonial:
      "Ехали семьёй с двумя детьми — всё было продумано до мелочей. Дети в восторге от горных рек и водопадов. Гид находил общий язык со всеми, включая нашего 7-летнего сына.",
    by: "Марина Соколова, Санкт-Петербург",
    imgSrc: "https://api.dicebear.com/7.x/initials/svg?seed=MarinaSokolova&backgroundColor=10b981&textColor=ffffff",
  },
  {
    tempId: 2,
    testimonial:
      "Заказывал индивидуальный тур — полная свобода маршрута. Остановились в трёх сёлах, попробовали настоящую горскую кухню. Джип провёз нас туда, где обычные машины не пройдут.",
    by: "Дмитрий Новиков, Екатеринбург",
    imgSrc: "https://api.dicebear.com/7.x/initials/svg?seed=DmitriyNovikov&backgroundColor=8b5cf6&textColor=ffffff",
  },
  {
    tempId: 3,
    testimonial:
      "Были на Кавказе третий раз, но такого не видели никогда. Гид показал места, которые не найдёшь в интернете. Комфортный автомобиль, профессионал за рулём — рекомендую всем!",
    by: "Ольга и Игорь Черновы, Казань",
    imgSrc: "https://api.dicebear.com/7.x/initials/svg?seed=OlgaChernova&backgroundColor=ef4444&textColor=ffffff",
  },
  {
    tempId: 4,
    testimonial:
      "Подъём к леднику — это что-то невероятное. Я фотограф, и виды там просто нереальные. Гид терпеливо ждал, пока я делал снимки, и подсказывал лучшие точки для съёмки.",
    by: "Антон Миронов, фотограф",
    imgSrc: "https://api.dicebear.com/7.x/initials/svg?seed=AntonMironov&backgroundColor=f59e0b&textColor=ffffff",
  },
  {
    tempId: 5,
    testimonial:
      "Групповой тур на 5 человек — познакомились с замечательными людьми. Атмосфера как в дружеской компании, а не в туристическом автобусе. Уже планируем вернуться следующим летом.",
    by: "Светлана Кузнецова, Ростов-на-Дону",
    imgSrc: "https://api.dicebear.com/7.x/initials/svg?seed=SvetlanaKuznetsova&backgroundColor=6366f1&textColor=ffffff",
  },
  {
    tempId: 6,
    testimonial:
      "Боялась высоты, но гид успокоил и помог преодолеть страх. На перевале в 2800 метров стояла и не верила, что смогла сюда добраться. Это изменило меня.",
    by: "Наташа Волкова, Воронеж",
    imgSrc: "https://api.dicebear.com/7.x/initials/svg?seed=NatashaVolkova&backgroundColor=ec4899&textColor=ffffff",
  },
  {
    tempId: 7,
    testimonial:
      "Приезжал на 3 дня — взяли два маршрута. Оба незабываемые. Гид — настоящий знаток истории и природы Кавказа, слушал его рассказы с открытым ртом всю дорогу.",
    by: "Роман Беляев, Новосибирск",
    imgSrc: "https://api.dicebear.com/7.x/initials/svg?seed=RomanBelyaev&backgroundColor=06b6d4&textColor=ffffff",
  },
  {
    tempId: 8,
    testimonial:
      "Организация на высшем уровне. Встретили вовремя, джип чистый и комфортный, воды и перекус взяли с собой. Всё предусмотрено — расслабляешься и просто наслаждаешься горами.",
    by: "Татьяна Орлова, Самара",
    imgSrc: "https://api.dicebear.com/7.x/initials/svg?seed=TatyanaOrlova&backgroundColor=f97316&textColor=ffffff",
  },
  {
    tempId: 9,
    testimonial:
      "Ехали с корпоративом — 6 человек. Все остались в полном восторге. Гид сделал поездку незабываемой: интересные факты, красивые остановки, отличное настроение весь день.",
    by: "Артём Фролов, корпоративный клиент",
    imgSrc: "https://api.dicebear.com/7.x/initials/svg?seed=ArtemFrolov&backgroundColor=84cc16&textColor=ffffff",
  },
  {
    tempId: 10,
    testimonial:
      "Кавказ — это сила. Горы, запах трав, чистейший воздух и тишина. Спасибо гиду за то, что показал настоящий Кавказ, а не туристическую открытку.",
    by: "Вера Климова, Пермь",
    imgSrc: "https://api.dicebear.com/7.x/initials/svg?seed=VeraKlimova&backgroundColor=a855f7&textColor=ffffff",
  },
  {
    tempId: 11,
    testimonial:
      "Маршрут к нарзанным источникам — просто сказка. Вода с разным вкусом буквально из-под земли, вокруг горы. Такого в городе не купишь ни за какие деньги.",
    by: "Павел Зайцев, Тюмень",
    imgSrc: "https://api.dicebear.com/7.x/initials/svg?seed=PavelZaytsev&backgroundColor=059669&textColor=ffffff",
  },
  {
    tempId: 12,
    testimonial:
      "Взяли с мужем индивидуальный тур на годовщину свадьбы. Гид сделал поездку особенной — нашёл красивое место для пикника с видом на горы. Лучший подарок друг другу.",
    by: "Юлия и Максим Сидоровы",
    imgSrc: "https://api.dicebear.com/7.x/initials/svg?seed=YuliaSidorova&backgroundColor=0ea5e9&textColor=ffffff",
  },
  {
    tempId: 13,
    testimonial:
      "Профессиональный подход, безопасность прежде всего. Ехали по узкому горному серпантину — гид вёл машину уверенно и спокойно. Ни капли страха, только восхищение.",
    by: "Николай Громов, Краснодар",
    imgSrc: "https://api.dicebear.com/7.x/initials/svg?seed=NikolayGromov&backgroundColor=dc2626&textColor=ffffff",
  },
  {
    tempId: 14,
    testimonial:
      "Первый раз в горах — боялась, что не потяну. Оказалось, всё комфортно и безопасно. Теперь мечтаю вернуться и попробовать более сложный маршрут!",
    by: "Анна Захарова, Уфа",
    imgSrc: "https://api.dicebear.com/7.x/initials/svg?seed=AnnaZakharova&backgroundColor=7c3aed&textColor=ffffff",
  },
  {
    tempId: 15,
    testimonial:
      "Гид рассказал столько интересного про историю горских народов, что я потом неделю читал книги об этом. Поездка стала не просто красивыми фото, но настоящим открытием.",
    by: "Илья Борисов, Челябинск",
    imgSrc: "https://api.dicebear.com/7.x/initials/svg?seed=IlyaBorisov&backgroundColor=ea580c&textColor=ffffff",
  },
  {
    tempId: 16,
    testimonial:
      "Приехали с подругами — три человека, три разных желания. Гид умудрился угодить всем. Одна хотела виды, другая — историю, третья — экстрим. Получили всё и сразу.",
    by: "Женя Лебедева, Волгоград",
    imgSrc: "https://api.dicebear.com/7.x/initials/svg?seed=ZhenyaLebedeva&backgroundColor=16a34a&textColor=ffffff",
  },
  {
    tempId: 17,
    testimonial:
      "Фотографии с этой поездки набрали больше лайков в инстаграме, чем всё, что я публиковал раньше. Кавказ фотогеничен невероятно, а гид знает лучшие ракурсы.",
    by: "Слава Медведев, блогер",
    imgSrc: "https://api.dicebear.com/7.x/initials/svg?seed=SlavaMedvedev&backgroundColor=2563eb&textColor=ffffff",
  },
  {
    tempId: 18,
    testimonial:
      "Ездили с пожилыми родителями — беспокоились. Оказалось, зря: гид всё учёл, темп был комфортным, остановки частыми. Папа сказал, что это лучшее путешествие за последние 20 лет.",
    by: "Константин Рябов, Липецк",
    imgSrc: "https://api.dicebear.com/7.x/initials/svg?seed=KonstantinRyabov&backgroundColor=be185d&textColor=ffffff",
  },
  {
    tempId: 19,
    testimonial:
      "Настоящее приключение без лишних рисков. Гид знает горы как свои пять пальцев и заботится о каждом госте. Уеду отсюда другим человеком — в лучшем смысле.",
    by: "Сasha Щербакова, Омск",
    imgSrc: "https://api.dicebear.com/7.x/initials/svg?seed=SashaShcherbakova&backgroundColor=0891b2&textColor=ffffff",
  },
]

interface TestimonialCardProps {
  position: number
  testimonial: (typeof testimonials)[0]
  handleMove: (steps: number) => void
  cardSize: number
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ position, testimonial, handleMove, cardSize }) => {
  const isCenter = position === 0
  return (
    <div
      onClick={() => handleMove(position)}
      className={cn(
        "absolute left-1/2 top-1/2 cursor-pointer border-2 p-8 transition-all duration-500 ease-in-out",
        isCenter
          ? "z-10 bg-gray-900 text-white border-gray-900"
          : "z-0 bg-white text-gray-900 border-gray-200 hover:border-gray-400",
      )}
      style={{
        width: cardSize,
        height: cardSize,
        clipPath: `polygon(50px 0%, calc(100% - 50px) 0%, 100% 50px, 100% 100%, calc(100% - 50px) 100%, 50px 100%, 0 100%, 0 0)`,
        transform: `
          translate(-50%, -50%)
          translateX(${(cardSize / 1.5) * position}px)
          translateY(${isCenter ? -65 : position % 2 ? 15 : -15}px)
          rotate(${isCenter ? 0 : position % 2 ? 2.5 : -2.5}deg)
        `,
        boxShadow: isCenter ? "0px 8px 0px 4px hsl(var(--border))" : "0px 0px 0px 0px transparent",
      }}
    >
      <span
        className="absolute block origin-top-right rotate-45 bg-gray-300"
        style={{
          right: -2,
          top: 48,
          width: SQRT_5000,
          height: 2,
        }}
      />
      <img
        src={testimonial.imgSrc || "/placeholder.svg"}
        alt={`${testimonial.by.split(",")[0]}`}
        className="mb-4 h-14 w-12 bg-gray-100 object-cover object-top"
        style={{
          boxShadow: "3px 3px 0px hsl(var(--background))",
        }}
      />
      <h3 className={cn("text-base sm:text-xl font-medium", isCenter ? "text-white" : "text-gray-900")}>
        "{testimonial.testimonial}"
      </h3>
      <p
        className={cn(
          "absolute bottom-8 left-8 right-8 mt-2 text-sm italic",
          isCenter ? "text-gray-300" : "text-gray-600",
        )}
      >
        - {testimonial.by}
      </p>
    </div>
  )
}

export const StaggerTestimonials: React.FC = () => {
  const [cardSize, setCardSize] = useState(365)
  const [testimonialsList, setTestimonialsList] = useState(testimonials)

  const handleMove = (steps: number) => {
    const newList = [...testimonialsList]
    if (steps > 0) {
      for (let i = steps; i > 0; i--) {
        const item = newList.shift()
        if (!item) return
        newList.push({ ...item, tempId: Math.random() })
      }
    } else {
      for (let i = steps; i < 0; i++) {
        const item = newList.pop()
        if (!item) return
        newList.unshift({ ...item, tempId: Math.random() })
      }
    }
    setTestimonialsList(newList)
  }

  useEffect(() => {
    const updateSize = () => {
      const { matches } = window.matchMedia("(min-width: 640px)")
      setCardSize(matches ? 365 : 290)
    }
    updateSize()
    window.addEventListener("resize", updateSize)
    return () => window.removeEventListener("resize", updateSize)
  }, [])

  return (
    <div className="relative w-full overflow-hidden bg-white" style={{ height: 600 }}>
      {testimonialsList.map((testimonial, index) => {
        const position =
          testimonialsList.length % 2 ? index - (testimonialsList.length + 1) / 2 : index - testimonialsList.length / 2
        return (
          <TestimonialCard
            key={testimonial.tempId}
            testimonial={testimonial}
            handleMove={handleMove}
            position={position}
            cardSize={cardSize}
          />
        )
      })}
      <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
        <button
          onClick={() => handleMove(-1)}
          className={cn(
            "flex h-14 w-14 items-center justify-center text-2xl transition-colors",
            "bg-white border-2 border-gray-300 hover:bg-gray-900 hover:text-white",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-offset-2",
          )}
          aria-label="Предыдущий отзыв"
        >
          <ChevronLeft />
        </button>
        <button
          onClick={() => handleMove(1)}
          className={cn(
            "flex h-14 w-14 items-center justify-center text-2xl transition-colors",
            "bg-white border-2 border-gray-300 hover:bg-gray-900 hover:text-white",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-offset-2",
          )}
          aria-label="Следующий отзыв"
        >
          <ChevronRight />
        </button>
      </div>
    </div>
  )
}