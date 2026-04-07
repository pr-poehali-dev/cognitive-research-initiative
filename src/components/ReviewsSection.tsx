import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Icon from "@/components/ui/icon"

const REVIEWS_URL = "https://functions.poehali.dev/5331f788-81bb-494a-90db-675bd0e4e015"

interface Review {
  id: number
  name: string
  city: string
  text: string
  rating: number
  created_at: string
}

const COLORS = [
  "3b82f6", "10b981", "8b5cf6", "ef4444", "f59e0b",
  "6366f1", "ec4899", "06b6d4", "f97316", "84cc16",
]

function avatarUrl(name: string, idx: number) {
  const color = COLORS[idx % COLORS.length]
  return `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(name)}&backgroundColor=${color}&textColor=ffffff`
}

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <Icon
          key={s}
          name="Star"
          size={14}
          className={s <= rating ? "text-amber-400 fill-amber-400" : "text-gray-300"}
        />
      ))}
    </div>
  )
}

function ReviewCard({ review, index }: { review: Review; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="bg-white border-2 border-gray-100 p-6 flex flex-col gap-4"
      style={{ clipPath: "polygon(20px 0%, 100% 0%, 100% 100%, 0% 100%, 0% 20px)" }}
    >
      <Stars rating={review.rating} />
      <p className="text-gray-700 leading-relaxed flex-1">"{review.text}"</p>
      <div className="flex items-center gap-3 pt-2 border-t border-gray-100">
        <img
          src={avatarUrl(review.name, review.id)}
          alt={review.name}
          className="w-10 h-10 rounded-full"
        />
        <div>
          <div className="font-bold text-gray-900 text-sm">{review.name}</div>
          {review.city && <div className="text-gray-400 text-xs">{review.city}</div>}
        </div>
      </div>
    </motion.div>
  )
}

export default function ReviewsSection() {
  const [reviews, setReviews] = useState<Review[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)

  const [form, setForm] = useState({ name: "", city: "", text: "", rating: 5 })
  const [errors, setErrors] = useState<{ name?: string; text?: string }>({})

  const fetchReviews = async () => {
    try {
      const res = await fetch(REVIEWS_URL)
      const data = await res.json()
      const parsed = typeof data === "string" ? JSON.parse(data) : data
      setReviews(parsed.reviews || [])
    } catch {
      setReviews([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchReviews()
  }, [])

  const validate = () => {
    const e: { name?: string; text?: string } = {}
    if (!form.name.trim()) e.name = "Введите ваше имя"
    if (!form.text.trim()) e.text = "Напишите отзыв"
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return
    setSubmitting(true)
    try {
      await fetch(REVIEWS_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })
      setSuccess(true)
      setForm({ name: "", city: "", text: "", rating: 5 })
      setShowForm(false)
      await fetchReviews()
      setTimeout(() => setSuccess(false), 4000)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section id="testimonials" className="relative py-20 bg-white">
      <div className="absolute inset-0 bg-grid-subtle opacity-30 pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-6xl font-black tracking-wider text-gray-900 mb-4">
            Что говорят наши{" "}
            <span className="bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">ГОСТИ</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            Реальные впечатления людей, которые уже побывали в наших горных турах.
          </p>

          <button
            onClick={() => setShowForm((v) => !v)}
            className="inline-flex items-center gap-2 bg-gray-900 text-white font-semibold px-6 py-3 hover:bg-gray-700 transition-colors"
            style={{ clipPath: "polygon(12px 0%, 100% 0%, 100% 100%, 0% 100%, 0% 12px)" }}
          >
            <Icon name={showForm ? "X" : "PenLine"} size={18} />
            {showForm ? "Закрыть" : "Оставить отзыв"}
          </button>
        </motion.div>

        {/* Form */}
        <AnimatePresence>
          {showForm && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.35 }}
              className="overflow-hidden mb-12"
            >
              <form
                onSubmit={handleSubmit}
                className="max-w-2xl mx-auto bg-gray-950 text-white p-8"
                style={{ clipPath: "polygon(24px 0%, 100% 0%, 100% 100%, 0% 100%, 0% 24px)" }}
              >
                <h3 className="text-2xl font-black tracking-wider mb-6">ВАШЕ ВПЕЧАТЛЕНИЕ</h3>

                {/* Rating */}
                <div className="mb-5">
                  <label className="text-gray-400 text-sm mb-2 block">Оценка</label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => setForm((f) => ({ ...f, rating: s }))}
                        className="transition-transform hover:scale-110"
                      >
                        <Icon
                          name="Star"
                          size={28}
                          className={s <= form.rating ? "text-amber-400 fill-amber-400" : "text-gray-600"}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="text-gray-400 text-sm mb-1 block">Имя *</label>
                    <input
                      type="text"
                      placeholder="Александр"
                      value={form.name}
                      onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                      className="w-full bg-gray-800 border border-gray-700 text-white px-4 py-3 focus:outline-none focus:border-white transition-colors"
                    />
                    {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
                  </div>
                  <div>
                    <label className="text-gray-400 text-sm mb-1 block">Город</label>
                    <input
                      type="text"
                      placeholder="Москва"
                      value={form.city}
                      onChange={(e) => setForm((f) => ({ ...f, city: e.target.value }))}
                      className="w-full bg-gray-800 border border-gray-700 text-white px-4 py-3 focus:outline-none focus:border-white transition-colors"
                    />
                  </div>
                </div>

                <div className="mb-6">
                  <label className="text-gray-400 text-sm mb-1 block">Ваш отзыв *</label>
                  <textarea
                    placeholder="Расскажите о своём путешествии..."
                    value={form.text}
                    onChange={(e) => setForm((f) => ({ ...f, text: e.target.value }))}
                    rows={4}
                    className="w-full bg-gray-800 border border-gray-700 text-white px-4 py-3 focus:outline-none focus:border-white transition-colors resize-none"
                  />
                  {errors.text && <p className="text-red-400 text-xs mt-1">{errors.text}</p>}
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-white text-gray-900 font-bold py-3 hover:bg-gray-100 transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
                >
                  {submitting ? (
                    <Icon name="Loader2" size={18} className="animate-spin" />
                  ) : (
                    <Icon name="Send" size={18} />
                  )}
                  {submitting ? "Отправляю..." : "Отправить отзыв"}
                </button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Success toast */}
        <AnimatePresence>
          {success && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="fixed top-6 left-1/2 -translate-x-1/2 z-50 bg-gray-900 text-white px-6 py-4 flex items-center gap-3 shadow-xl"
              style={{ clipPath: "polygon(12px 0%, 100% 0%, 100% 100%, 0% 100%, 0% 12px)" }}
            >
              <Icon name="CheckCircle" size={20} className="text-green-400" />
              <span className="font-semibold">Спасибо! Ваш отзыв опубликован.</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Reviews Grid */}
        {loading ? (
          <div className="flex justify-center py-12">
            <Icon name="Loader2" size={32} className="text-gray-400 animate-spin" />
          </div>
        ) : reviews.length === 0 ? (
          <div className="text-center py-12 text-gray-400">
            <Icon name="MessageSquare" size={48} className="mx-auto mb-4 opacity-40" />
            <p>Пока нет отзывов. Будьте первым!</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reviews.map((r, i) => (
              <ReviewCard key={r.id} review={r} index={i} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
