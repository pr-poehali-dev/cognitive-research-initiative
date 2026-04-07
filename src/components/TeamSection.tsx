import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Icon from "@/components/ui/icon"

const guides = [
  {
    id: 1,
    name: "Алексей Горский",
    role: "Старший гид • 12 лет в горах",
    photo: "https://cdn.poehali.dev/projects/46dd4494-3289-46e0-b512-2259236e3c49/files/e7746093-e559-408b-86cb-42936de8cfde.jpg",
    greeting:
      "Горы стали моим домом двенадцать лет назад — и с тех пор я не представляю жизни без них. Я знаю каждый перевал, каждый родник и каждую историю, спрятанную в этих скалах. Моя задача — не просто довезти вас из точки A в точку B, а показать Кавказ таким, каким его видят только местные. Готов поделиться этим с вами.",
    speciality: "Перевалы и ледники",
    icon: "Mountain",
  },
  {
    id: 2,
    name: "Тимур Чегемов",
    role: "Гид-экстремал • 7 лет опыта",
    photo: "https://cdn.poehali.dev/projects/46dd4494-3289-46e0-b512-2259236e3c49/files/f6ed1ba2-9902-47f1-8cb7-3128b805c638.jpg",
    greeting:
      "Если вы хотите настоящего приключения — вы попали по адресу! Я специализируюсь на маршрутах, куда обычные туристы не добираются: скрытые каньоны, горные реки, переправы вброд. Мы едем туда, где заканчивается асфальт и начинается настоящий Кавказ. Обещаю — скучно не будет.",
    speciality: "Экстремальные маршруты",
    icon: "Zap",
  },
  {
    id: 3,
    name: "Марьяна Эльбрусова",
    role: "Гид-историк • 5 лет опыта",
    photo: "https://cdn.poehali.dev/projects/46dd4494-3289-46e0-b512-2259236e3c49/files/5efb3011-eed9-4905-8640-d50dc951c6cf.jpg",
    greeting:
      "Кавказ — это не просто красивые горы, это тысячелетняя история. Я расскажу вам о древних башнях и их хранителях, о традициях горских народов и легендах, которые живут в каждом камне. Мои туры — это путешествие во времени. Вы уедете отсюда с другим взглядом на мир.",
    speciality: "История и культура",
    icon: "BookOpen",
  },
  {
    id: 4,
    name: "Руслан Казбеков",
    role: "Семейный гид • 9 лет опыта",
    photo: "https://cdn.poehali.dev/projects/46dd4494-3289-46e0-b512-2259236e3c49/files/1b5ed8ac-1ed9-4b68-bc2a-339474138ec6.jpg",
    greeting:
      "За девять лет я провёл сотни семей через горы Кавказа — и каждый раз вижу, как глаза детей загораются от первого вида на заснеженные вершины. Я умею подобрать маршрут так, чтобы было интересно всем — и семилетнему непоседе, и бабушке. Горы для каждого, и я докажу это вашей семье.",
    speciality: "Семейные туры",
    icon: "Users",
  },
]

export default function TeamSection() {
  const [active, setActive] = useState<number | null>(null)

  return (
    <section id="team" className="relative py-20 bg-white">
      <div className="absolute inset-0 bg-grid-subtle opacity-30 pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-black tracking-wider text-gray-900 mb-4">НАША КОМАНДА</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Четыре профессионала, которые влюблены в Кавказ и готовы показать его вам
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {guides.map((guide, i) => (
            <motion.div
              key={guide.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              viewport={{ once: true }}
              className="group cursor-pointer"
              onClick={() => setActive(active === guide.id ? null : guide.id)}
            >
              {/* Photo */}
              <div
                className="relative overflow-hidden mb-4"
                style={{ clipPath: "polygon(20px 0%, 100% 0%, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0% 100%, 0% 20px)" }}
              >
                <img
                  src={guide.photo}
                  alt={guide.name}
                  className="w-full aspect-[3/4] object-cover object-top transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

                {/* Speciality badge */}
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="flex items-center gap-2 bg-white/15 backdrop-blur-sm px-3 py-1.5">
                    <Icon name={guide.icon} size={14} className="text-amber-300" />
                    <span className="text-white text-xs font-semibold">{guide.speciality}</span>
                  </div>
                </div>

                {/* Hint */}
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="bg-white/20 backdrop-blur-sm rounded-full p-1.5">
                    <Icon name={active === guide.id ? "ChevronUp" : "ChevronDown"} size={16} className="text-white" />
                  </div>
                </div>
              </div>

              {/* Name & Role */}
              <div className="px-1">
                <h3 className="font-black text-gray-900 text-lg tracking-wide">{guide.name}</h3>
                <p className="text-gray-500 text-sm mb-3">{guide.role}</p>

                {/* Greeting — expandable */}
                <AnimatePresence>
                  {active === guide.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="border-l-2 border-gray-900 pl-4 py-1">
                        <p className="text-gray-600 text-sm leading-relaxed italic">"{guide.greeting}"</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {!active || active !== guide.id ? (
                  <button className="text-xs font-semibold text-gray-400 hover:text-gray-900 transition-colors flex items-center gap-1 mt-1">
                    Читать приветствие <Icon name="ChevronDown" size={12} />
                  </button>
                ) : (
                  <button className="text-xs font-semibold text-gray-400 hover:text-gray-900 transition-colors flex items-center gap-1 mt-3">
                    Скрыть <Icon name="ChevronUp" size={12} />
                  </button>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
