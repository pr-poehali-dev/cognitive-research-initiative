import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Icon from "@/components/ui/icon"

const photos = [
  {
    id: 1,
    src: "https://cdn.poehali.dev/projects/46dd4494-3289-46e0-b512-2259236e3c49/files/21c6628c-3c86-4e82-9699-cc5be0900a8a.jpg",
    alt: "Джип на горной дороге",
    label: "Горные маршруты",
    span: "col-span-2 row-span-2",
  },
  {
    id: 2,
    src: "https://cdn.poehali.dev/projects/46dd4494-3289-46e0-b512-2259236e3c49/files/685aa894-cdd7-4b7d-a3e1-af9d1fdb63d2.jpg",
    alt: "Водопад в горах Кавказа",
    label: "Водопады",
    span: "col-span-1 row-span-1",
  },
  {
    id: 3,
    src: "https://cdn.poehali.dev/projects/46dd4494-3289-46e0-b512-2259236e3c49/files/b2be3d44-c356-4a51-aa74-bcd99b2653d2.jpg",
    alt: "Древняя башня на Кавказе",
    label: "Исторические памятники",
    span: "col-span-1 row-span-1",
  },
  {
    id: 4,
    src: "https://cdn.poehali.dev/projects/46dd4494-3289-46e0-b512-2259236e3c49/files/ff422538-cfdc-4bff-bf54-aa2d9842bab5.jpg",
    alt: "Бирюзовая горная река",
    label: "Горные реки",
    span: "col-span-1 row-span-1",
  },
  {
    id: 5,
    src: "https://cdn.poehali.dev/projects/46dd4494-3289-46e0-b512-2259236e3c49/files/e8b3eeae-948c-41ef-b1f9-d74c318d99c5.jpg",
    alt: "Вершина горы на рассвете",
    label: "Рассветы на вершинах",
    span: "col-span-1 row-span-2",
  },
  {
    id: 6,
    src: "https://cdn.poehali.dev/projects/46dd4494-3289-46e0-b512-2259236e3c49/files/eb0bb7d1-405c-46b4-85ee-bbf0538b5648.jpg",
    alt: "Горное село Кавказа",
    label: "Горные сёла",
    span: "col-span-1 row-span-1",
  },
  {
    id: 7,
    src: "https://cdn.poehali.dev/projects/46dd4494-3289-46e0-b512-2259236e3c49/files/ad1d13c1-2268-4234-934c-caba74bfca06.jpg",
    alt: "Серпантин в горах",
    label: "Горные дороги",
    span: "col-span-1 row-span-1",
  },
  {
    id: 8,
    src: "https://cdn.poehali.dev/projects/46dd4494-3289-46e0-b512-2259236e3c49/files/f0b5a93d-8324-4621-b43b-411cff248d31.jpg",
    alt: "Панорама горных вершин",
    label: "Кавказские вершины",
    span: "col-span-2 row-span-1",
  },
]

export default function GallerySection() {
  const [selected, setSelected] = useState<(typeof photos)[0] | null>(null)

  return (
    <section id="gallery" className="relative py-20 bg-gray-950">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-black tracking-wider text-white mb-4">ГАЛЕРЕЯ</h2>
          <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto">
            Живые снимки с наших маршрутов — горы, которые ждут вас
          </p>
        </motion.div>

        {/* Mosaic Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 grid-rows-4 gap-3 md:gap-4 h-[700px] md:h-[800px]">
          {photos.map((photo, i) => (
            <motion.div
              key={photo.id}
              className={`${photo.span} relative overflow-hidden cursor-pointer group`}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              viewport={{ once: true }}
              onClick={() => setSelected(photo)}
            >
              <img
                src={photo.src}
                alt={photo.alt}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300" />
              <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <span className="text-white text-sm font-semibold tracking-wide uppercase bg-black/50 px-3 py-1 backdrop-blur-sm">
                  {photo.label}
                </span>
              </div>
              <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="bg-white/20 backdrop-blur-sm rounded-full p-1.5">
                  <Icon name="ZoomIn" size={16} className="text-white" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selected && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
          >
            <motion.div
              className="relative max-w-5xl w-full"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={selected.src}
                alt={selected.alt}
                className="w-full max-h-[80vh] object-contain rounded-lg"
              />
              <div className="mt-3 flex items-center justify-between">
                <span className="text-white font-semibold tracking-wide">{selected.label}</span>
                <button
                  onClick={() => setSelected(null)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <Icon name="X" size={24} />
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
