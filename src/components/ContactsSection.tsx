import { motion } from "framer-motion"
import Icon from "@/components/ui/icon"

const phone = "+79054413485"
const phoneDisplay = "+7 905 441 34 85"

const contacts = [
  {
    icon: "Phone",
    label: "Телефон",
    value: phoneDisplay,
    href: `tel:${phone}`,
    color: "bg-gray-900",
  },
  {
    icon: "MessageCircle",
    label: "WhatsApp",
    value: phoneDisplay,
    href: `https://wa.me/${phone}`,
    color: "bg-green-600",
  },
  {
    icon: "Send",
    label: "Telegram",
    value: "@Igor Dorsh",
    href: `https://t.me/Igor_Dorsh`,
    color: "bg-sky-500",
  },
  {
    icon: "Instagram",
    label: "Instagram",
    value: "@doroshenko_is",
    href: `https://instagram.com/doroshenko_is`,
    color: "bg-pink-600",
  },
]

export default function ContactsSection() {
  return (
    <section id="contacts" className="relative py-20 bg-gray-950">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <h2 className="text-4xl md:text-6xl font-black tracking-wider text-white mb-4">СВЯЗАТЬСЯ</h2>
          <p className="text-lg text-gray-400 max-w-xl mx-auto">
            Напишите или позвоните — обсудим маршрут, даты и всё остальное
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
          {contacts.map((c, i) => (
            <motion.a
              key={c.label}
              href={c.href}
              target={c.href.startsWith("http") ? "_blank" : undefined}
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              viewport={{ once: true }}
              whileHover={{ y: -4 }}
              className="group flex flex-col items-center gap-4 p-8 bg-white/5 border border-white/10 hover:border-white/30 hover:bg-white/10 transition-all duration-300 cursor-pointer"
              style={{ clipPath: "polygon(20px 0%, 100% 0%, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0% 100%, 0% 20px)" }}
            >
              <div className={`w-14 h-14 ${c.color} flex items-center justify-center`}
                style={{ clipPath: "polygon(12px 0%, 100% 0%, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0% 100%, 0% 12px)" }}
              >
                <Icon name={c.icon} size={24} className="text-white" />
              </div>
              <div className="text-center">
                <div className="text-gray-400 text-xs font-semibold tracking-widest uppercase mb-1">{c.label}</div>
                <div className="text-white font-bold text-sm group-hover:text-gray-200 transition-colors">{c.value}</div>
              </div>
            </motion.a>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center text-gray-500 text-sm mt-10"
        >
          Отвечаю быстро — обычно в течение часа
        </motion.p>
      </div>
    </section>
  )
}
