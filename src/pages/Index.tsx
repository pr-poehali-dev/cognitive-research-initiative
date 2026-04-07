import HeroSection from "@/components/HeroSection"
import { TextGradientScroll } from "@/components/ui/text-gradient-scroll"
import { Timeline } from "@/components/ui/timeline"
import GallerySection from "@/components/GallerySection"
import ReviewsSection from "@/components/ReviewsSection"
import TeamSection from "@/components/TeamSection"

export default function Index() {
  const missionStatement =
    "Кавказские горы — это живая легенда. Я проведу вас к древним башням и ледникам, вдоль ущелий с бирюзовыми реками и над облаками на вершинах, куда не доберётся обычный автобус. Комфортный джип, личный гид, маршруты на любой вкус — от лёгких прогулок до настоящих экспедиций. Каждая поездка — это история, которую вы будете рассказывать всю жизнь."

  const timelineEntries = [
    {
      id: 1,
      image: "https://cdn.poehali.dev/projects/46dd4494-3289-46e0-b512-2259236e3c49/files/5639da56-bc04-4413-811c-63fb1e1564fe.jpg",
      alt: "Домбай - жемчужина кавказа",
      title: "Индивидуальные туры",
      description:
        "Домбай — горный край невероятной красоты в сердце Карачаево‑Черкесии. Он раскинулся у подножия Главного Кавказского хребта, в окружении заснеженных вершин, среди которых величественно возвышается гора Домбай‑Ёльген (4046 м).

Здесь, на Домбайской поляне (1 650 м над уровнем моря), три ущелья — Алибек, Аманауз и Домбай‑Ёльген — сходятся в природном амфитеатре, обрамлённом пихтовыми лесами, альпийскими лугами и ледниками. Бурлят горные водопады, искрятся чистейшие озёра, а воздух наполнен ароматом хвои и свежестью высокогорья.

Зимой Домбай манит лыжников и сноубордистов заснеженными склонами Мусса‑Ачитары (3012 м), а летом — путешественников тропами к Алибекскому водопаду, озеру Туманлы‑Кель и другим чудесам природы. Футуристическая «Тарелка» — гостиница на склоне горы — добавляет месту особый шарм.

Домбай завораживает с первого взгляда: это место, где небо кажется ближе, а сердце замирает от величия Кавказских гор.Маршрут полностью под вас: удобный темп, интересные вам локации, остановки там, где захочется. Идеально для пар, семей с детьми или тех, кто хочет сойти с проторённой тропы и открыть Кавказ по-настоящему. Поедем туда, куда не возят группы.",
      layout: "left" as const,
    },
    {
      id: 2,
      image: "https://cdn.poehali.dev/projects/46dd4494-3289-46e0-b512-2259236e3c49/files/c67e9125-4c16-4d4b-b9d5-85953a51fa44.jpg",
      alt: "Группа туристов в джипе",
      title: "Групповые экскурсии",
      description:
        "Небольшие группы до 6 человек — атмосфера дружеского путешествия, а не шумного автобуса. Мы объединяем людей, которые хотят увидеть настоящий Кавказ: перевалы, водопады, нарзанные источники и горные сёла с живой историей.",
      layout: "right" as const,
    },
    {
      id: 3,
      image: "https://cdn.poehali.dev/projects/46dd4494-3289-46e0-b512-2259236e3c49/files/21c6628c-3c86-4e82-9699-cc5be0900a8a.jpg",
      alt: "Джип на горной дороге",
      title: "Экстремальные маршруты",
      description:
        "Для тех, кто хочет большего — подъём к ледникам, переправы через горные реки, ночёвки под звёздами на высоте 3000 метров. Современные полноприводные автомобили и опыт гида гарантируют безопасность даже там, где нет дорог.",
      layout: "left" as const,
    },
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <HeroSection />

      {/* Team Section */}
      <TeamSection />

      {/* Mission Statement Section */}
      <section id="mission" className="relative min-h-screen flex items-center justify-center py-20 bg-white">
        <div className="absolute inset-0 bg-grid-subtle opacity-30 pointer-events-none" />

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-6xl font-black tracking-wider mb-12 text-gray-900">МОЯ МИССИЯ</h2>
            <TextGradientScroll
              text={missionStatement}
              className="text-2xl md:text-3xl lg:text-4xl font-medium leading-relaxed text-gray-800"
              type="word"
              textOpacity="soft"
            />
          </div>
        </div>
      </section>

      {/* Routes / Timeline Section */}
      <section id="community" className="relative py-20 bg-white">
        <div className="absolute inset-0 bg-grid-subtle opacity-30 pointer-events-none" />

        <div className="relative z-10">
          <div className="container mx-auto px-6 mb-16">
            <div className="text-center">
              <h2 className="text-4xl md:text-6xl font-black tracking-wider mb-6 text-gray-900">НАШИ МАРШРУТЫ</h2>
              <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto">
                Каждый тур — это особый опыт. Выберите формат, который подходит именно вам.
              </p>
            </div>
          </div>

          <Timeline entries={timelineEntries} />
        </div>
      </section>

      {/* Gallery Section */}
      <GallerySection />

      {/* Testimonials Section */}
      <ReviewsSection />
    </div>
  )
}