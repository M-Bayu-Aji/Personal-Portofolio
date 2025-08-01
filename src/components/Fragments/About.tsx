import { useRef, useState } from "react";
import PasFoto from "../../assets/images/fotoBys.jpg";
import type { CardProps } from "./CardSertifikat";
import Card from "./CardSertifikat";
import bdpj from "../../assets/images/sertifikat/bdpj.png";
import bdpw from "../../assets/images/sertifikat/bdpw.png";
import bdgg from "../../assets/images/sertifikat/bdgg.png";
import bdc from "../../assets/images/sertifikat/bdc.png";
import Button from "../atoms/Button";

export default function About() {
  const [showAll, setShowAll] = useState(false);
  const [visibleCardCount, setVisibleCardCount] = useState(3);
  const [fadingOut, setFadingOut] = useState(false);

  const cards: CardProps[] = [
    {
      imgSrc: bdpw,
      imgAlt: "Belajar Dasar Pemrograman Web",
      title: "Belajar Dasar Pemrograman Web",
      description:
        "Kelas ini membahas tuntas dasar HTML dan CSS sebagai tiga fondasi pembuatan website. Fondasi diperlukan untuk Anda yang ingin mengembangkan kemampuan pengembangan website ke tahap yang lebih lanjut. Disusun dan diverifikasi oleh tim expert Dicoding, materi yang disajikan terstruktur dan komprehensif.",
      date: "29 Oktober 2023",
      issuer: "Dicoding Indonesia",
    },
    {
      imgSrc: bdpj,
      imgAlt: "Belajar Dasar Pemrograman Javascript",
      title: "Belajar Dasar Pemrograman Javascript",
      description:
        "Kelas untuk individu yang ingin melangkah menjadi seorang Web Developer/Back-end developer menggunakan teknologi Node.js menggunakan standar kompetensi industri yang divalidasi oleh AWS. Di akhir kelas, siswa dapat menguasai dasar JavaScript untuk pengembangan aplikasi web menggunakan Node.Js.",
      date: "22 Juli 2024",
      issuer: "Dicoding Indonesia",
    },
    {
      imgSrc: bdgg,
      imgAlt: "Belajar Dasar Git dengan Github",
      title: "Belajar Dasar Git dengan Github",
      description:
        "Kelas untuk individu yang ingin melangkah menjadi seorang Web Developer/Back-end developer menggunakan teknologi Node.js menggunakan standar kompetensi industri yang divalidasi oleh AWS. Di akhir kelas, siswa dapat menguasai dasar JavaScript untuk pengembangan aplikasi web menggunakan Node.Js.",
      date: "22 Juli 2024",
      issuer: "Dicoding Indonesia",
    },
    {
      imgSrc: bdc,
      imgAlt: "Belajar Dasar Cloud dan Gen AI di AWS",
      title: "Belajar Dasar Cloud dan Gen AI di AWS",
      description:
        "Kelas ditujukan bagi pemula yang ingin memulai karirnya di bidang cloud computing dengan mengacu pada standar kompetensi internasional milik AWS. Di akhir kelas, siswa dapat memahami AWS Cloud dengan segala jenis layanan, infrastruktur global, hingga harganya.",
      date: "05 Mei 2025",
      issuer: "Dicoding Indonesia",
    }
  ];

  const sertifikatRef = useRef<HTMLDivElement | null>(null);

  const handleToggle = () => {
    if (showAll) {
      setFadingOut(true);
      // Scroll ke bagian sertifikasi terlebih dahulu
      setTimeout(() => {
        sertifikatRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 100); // biarkan efek klik berjalan

      // Setelah scroll dan animasi selesai, kurangi kartu
      setTimeout(() => {
        setVisibleCardCount(3);
        setFadingOut(false);
        setShowAll(false);
      }, 500);
    } else {
      setVisibleCardCount(cards.length);
      setShowAll(true);
    }
  };

  return (
    <section
      className="flex flex-col p-10 mx-auto bg-white gap-14 max-w-7xl"
      id="about"
    >
      <div className="flex items-center justify-center about-me max-w-7xl">
        <img src={PasFoto} />
        <div className="about-text">
          <h2 className="font-bricolage">About Me</h2>
          <h5 className="font-bold">Web Developer</h5>
          <p ref={sertifikatRef}>
            Saya adalah seorang Siswa dengan fokus utama pada pengembangan web.
            Saya dikenal sebagai individu yang pekerja keras, tekun, disiplin,
            dan berdedikasi tinggi dalam setiap tanggung jawab. Dengan minat
            mendalam dalam karir sebagai Front End Developer, saya berkomitmen
            untuk terus meningkatkan keterampilan dan memberikan kontribusi
            terbaik dalam dunia teknologi.
          </p>
        </div>
      </div>

      <section className="min-h-screen mx-auto max-w-7xl bg-gradient-to-b from-gray-50 to-white">
        <div className="mb-8 font-bold sm:mb-12">
          <h2 className="flex items-center gap-3 mb-2 text-2xl font-bold text-gray-900 sm:text-3xl lg:text-4xl">
            <div className="p-2 bg-pink-100 rounded-full">
              <i className="text-xl text-pink-600 fas fa-ribbon sm:text-2xl" />
            </div>
            <span className="text-5xl font-bricolage">Sertifikasi</span>
          </h2>
          <p className="max-w-3xl text-gray-600">
            Pencapaian dan validasi keahlian dari platform terkemuka
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 sm:gap-8">
          {cards.map((card, index) => {
            if (index < visibleCardCount) {
              const isFading = fadingOut && index >= 3;
              return (
                <div
                  key={card.title}
                  className={`transition-all duration-500 ${
                    isFading ? "animate-fade-out" : "animate-fade-in-up"
                  }`}
                >
                  <Card {...card} />
                </div>
              );
            }
            return null;
          })}
        </div>

        {cards.length > 3 && (
          <div className="flex justify-center mt-8">
            <Button onClick={handleToggle}>
              {showAll ? (
                <>
                  Tampilkan Lebih Sedikit{" "}
                  <i className="ml-2 ri-arrow-up-line"></i>
                </>
              ) : (
                <>
                  Lihat Semua Sertifikat{" "}
                  <i className="ml-2 ri-arrow-down-line"></i>
                </>
              )}
            </Button>
          </div>
        )}
      </section>
    </section>
  );
}
