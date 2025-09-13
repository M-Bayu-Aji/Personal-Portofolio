import { useRef, useState } from "react";
// import PasFoto from "../../assets/images/fotoBys.jpg";
import PasFoto from "../../assets/images/fotoProfile/bys.jpeg";
import type { CardProps } from "./CardSertifikat";
import Card from "./CardSertifikat";
import bdpj from "../../assets/images/sertifikat/bdpj.png";
import bdpw from "../../assets/images/sertifikat/bdpw.png";
import bdgg from "../../assets/images/sertifikat/bdgg.png";
import bdc from "../../assets/images/sertifikat/bdc.png";
import fe from "../../assets/images/sertifikat/feup.png";
import bpps from "../../assets/images/sertifikat/bpps.png";
import digiup from "../../assets/images/sertifikat/digiup.png";
import asycPolitan from "../../assets/images/sertifikat/Asyncronous_page-0001.jpg";
import sts from "../../assets/images/sertifikat/Aji E-Certificate Intern At PT Shibly Teknologi Solusi_page-0001.jpg";
import bwa from "../../assets/images/sertifikat/Google Cloud Roadshow x Build with AI Bogor 2025 Certificate _ Muhammad Bayu Aji Sutisna Putra _page-0001.jpg";
import Button from "../Elements/atoms/Button";
import CertificateModal from "./CertificateModal";
import { motion, useInView } from "framer-motion";
import TextSpan from "../SubAtomic/TeksSpan";

// Define experience type
interface Experience {
  title: string;
  role: string;
  period: string;
  description: string;
  skills?: string[];
  type: "education" | "work" | "internship";
}

export default function About() {
  const [showAll, setShowAll] = useState(false);
  const [visibleCardCount, setVisibleCardCount] = useState(3);
  const [fadingOut, setFadingOut] = useState(false);

  // Refs for scroll animations
  const experienceSectionRef = useRef(null);
  const sertifikatSectionRef = useRef(null);

  // Check if sections are in view
  const isExperienceInView = useInView(experienceSectionRef, {
    once: true,
    amount: 0.3,
  });
  const isSertifikatInView = useInView(sertifikatSectionRef, {
    once: true,
    amount: 0.3,
  });

  const cards: CardProps[] = [
    {
      imgSrc: digiup,
      imgAlt: "Junior Web Developer",
      title: "Junior Web Developer",
      description: `Sertifikat Kompetensi yang dikeluarkan oleh Badan Nasional Sertifikasi Profesi (BNSP), bekerja sama dengan Lembaga Sertifikasi Teknologi Digital bidang Pengembangan Website pada level Junior Web Developer.`,
      date: "25 Januari 2025",
      issuer: "Telkom DigiUp",
    },
    {
      imgSrc: sts,
      imgAlt: "Magang PT Shibly Teknologi Solusi",
      title: "Magang PT Shibly Teknologi Solusi",
      description: `Sertifikat penyelesaian program magang sebagai Front End Developer di PT Shibly Teknologi Solusi, di mana saya terlibat dalam pengembangan fitur dan tampilan aplikasi berbasis web, integrasi API menggunakan Postman dan Swagger, serta membangun antarmuka responsif menggunakan React, Next.js, dan Material UI.`,
      date: "30 June 2025",
      issuer: "PT Shibly Teknologi Solusi",
    },
    {
      imgSrc: bwa,
      imgAlt: "Google Cloud Roadshows x Build with AI Bogor 2025",
      title: "Google Cloud Roadshows x Build with AI Bogor 2025",
      description: `Mengikuti seminar Google Cloud Roadshows x Build with AI Bogor 2025 untuk memperdalam pengetahuan tentang layanan Google Cloud, pengembangan aplikasi berbasis AI, serta tren terbaru teknologi cloud. Mendapat wawasan praktik langsung terkait implementasi AI dalam solusi digital modern.`,
      date: "05 Mei 2025",
      issuer: "Google Developer Group",
    },
    {
      imgSrc: bdpj,
      imgAlt: "Belajar Dasar Pemrograman Javascript",
      title: "Belajar Dasar Pemrograman Javascript",
      description:
        "Kelas untuk individu yang ingin melangkah menjadi seorang Web Developer Back-end developer menggunakan teknologi Node.js menggunakan standar kompetensi industri yang divalidasi oleh AWS. Di akhir kelas, siswa dapat menguasai dasar JavaScript untuk pengembangan aplikasi web menggunakan Node.Js.",
      date: "22 Juli 2024",
      issuer: "Dicoding Indonesia",
      credentialUrl: `https://www.dicoding.com/certificates/07Z60M3EJZQR`,
    },
    {
      imgSrc: bdpw,
      imgAlt: "Belajar Dasar Pemrograman Web",
      title: "Belajar Dasar Pemrograman Web",
      description:
        "Kelas ini membahas tuntas dasar HTML dan CSS sebagai tiga fondasi pembuatan website. Fondasi diperlukan untuk Anda yang ingin mengembangkan kemampuan pengembangan website ke tahap yang lebih lanjut. Disusun dan diverifikasi oleh tim expert Dicoding, materi yang disajikan terstruktur dan komprehensif.",
      date: "29 Oktober 2023",
      issuer: "Dicoding Indonesia",
      credentialUrl: `https://www.dicoding.com/certificates/07Z68ENJ2XQR`,
    },
    {
      imgSrc: fe,
      imgAlt: "Belajar Membuat Front-End Web untuk Pemula",
      title: "Belajar Membuat Front-End Web untuk Pemula",
      description: `Kelas ini ditujukan untuk seorang Front-End Web Developer yang ingin mengembangkan website yang memiliki fungsionalitas lebih daripada hanya media informasi saja, sesuai dengan standar industri. Di akhir kelas, siswa dapat membuat aplikasi front-end web yang interaktif serta memiliki fitur penyimpanan menggunakan web storage.`,
      date: "17 September 2024",
      issuer: "Dicoding Indonesia",
      credentialUrl: `https://www.dicoding.com/certificates/81P2NEOWNXOY`,
    },
    {
      imgSrc: bpps,
      imgAlt: "Belajar Prinsip Pemrograman SOLID",
      title: "Belajar Prinsip Pemrograman SOLID",
      description: `Kelas ini ditujukan bagi pemula yang ingin memahami bagaimana menuliskan kode yang baik dengan paradigma OOP (object-priented programming) dengan mengacu pada standar industri. Di akhir kelas, siswa dapat memahami kelima prinsip SOLID dan siap menerapkannya dalam mengembangkan aplikasi.`,
      date: "17 September 2024",
      issuer: "Dicoding Indonesia",
      credentialUrl: `https://www.dicoding.com/certificates/81P2NEOWNXOY`,
    },
    {
      imgSrc: bdc,
      imgAlt: "Belajar Dasar Cloud dan Gen AI di AWS",
      title: "Belajar Dasar Cloud dan Gen AI di AWS",
      description:
        "Kelas ditujukan bagi pemula yang ingin memulai karirnya di bidang cloud computing dengan mengacu pada standar kompetensi internasional milik AWS. Di akhir kelas, siswa dapat memahami AWS Cloud dengan segala jenis layanan, infrastruktur global, hingga harganya.",
      date: "05 Mei 2025",
      issuer: "Dicoding Indonesia",
      credentialUrl: `https://www.dicoding.com/certificates/N9ZO9K9Y6XG5`,
    },
    {
      imgSrc: bdgg,
      imgAlt: "Belajar Dasar Git dengan Github",
      title: "Belajar Dasar Git dengan Github",
      description: `Kelas ini ditujukan bagi developer yang ingin mempelajari pengelolaan kode atau data menggunakan Git dengan GitHub agar bisa berkolaborasi dengan developer lain yang sesuai dengan standar industri. Di akhir kelas, siswa dapat mengelola kumpulan data atau kode mereka sendiri dalam repository GitHub, serta dapat berkolaborasi dengan developer lain pada repository yang sama.`,
      date: "22 Juli 2024",
      issuer: "Dicoding Indonesia",
      credentialUrl: `https://www.dicoding.com/certificates/L4PQE4RJ2PO1`,
    },
    {
      imgSrc: asycPolitan,
      imgAlt: "Belajar JavaScript Async",
      title: "Belajar JavaScript Async",
      description: `Sertifikat penyelesaian kelas Belajar JavaScript Async yang diselenggarakan oleh platform pembelajaran online CODEPOLITAN, sebagai bagian dari program peningkatan kompetensi di bidang pemrograman JavaScript.`,
      date: "25 Januari 2025",
      issuer: "CODEPOLITAN",
      credentialUrl: "https://www.codepolitan.com/c/TJPBP5U/",
    },
  ];

  const [selected, setSelected] = useState<CardProps | null>(null);

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

  // Experience data
  const experiences: Experience[] = [
    {
      title: "SMK Wikrama Bogor",
      role: "Siswa - Pengembangan Perangkat Lunak dan Gim",
      period: "June 2023 - April 2026",
      description:
        "Belajar tentang pengembangan perangkat lunak, termasuk pemrograman web, mobile, dan desktop. Fokus pada teknologi front-end dan back-end untuk pembangunan aplikasi yang komprehensif.",
      skills: ["HTML", "CSS", "JavaScript", "React", "PHP", "Laravel", "MySQL", "Dart", "Flutter"],
      type: "education",
    },
    // {
    //   title: "Freelance Web Developer",
    //   role: "Front-End Developer",
    //   period: "2023 - Present",
    //   description: "Mengembangkan website dan aplikasi web untuk berbagai klien. Fokus pada pengembangan UI yang responsif dan pengalaman pengguna yang optimal.",
    //   skills: ["React", "Next.js", "Tailwind CSS", "JavaScript"],
    //   type: "work"
    // },
    {
      title: "PT Shibly Teknologi Solusi",
      role: "Front End Developer",
      period: "January 2025 - June 2025",
      description:
        "Melaksanakan program magang sebagai Front End Developer dengan fokus pada pengembangan fitur dan tampilan aplikasi berbasis web. Terlibat dalam integrasi API menggunakan Postman dan Swagger, serta membangun antarmuka responsif menggunakan React, Next.js, dan Material UI. Berkontribusi dalam tim untuk meningkatkan kualitas dan performa aplikasi perusahaan.",
      skills: ["Next.js", "React", "Material UI", "Postman", "Swagger"],
      type: "internship",
    },
  ];

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 0.3 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.7 }}
      className="flex flex-col p-10 mx-auto bg-white dark:bg-gray-900 gap-14 max-w-7xl"
      id="about"
    >
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="px-4 py-8 mx-auto sm:px-6 sm:py-12 lg:px-10 lg:py-16 max-w-7xl"
        id="about"
      >
        <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:gap-12">
          {/* Profile Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, x: -50 }}
            whileInView={{ opacity: 1, scale: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="flex flex-col items-center flex-shrink-0 lg:items-start"
          >
            <div className="relative">
              <motion.div
                className="overflow-hidden border-4 border-white shadow-xl h-96 w-96 lg:w-72 lg:h-80 rounded-xl dark:border-gray-800"
                transition={{ duration: 0.3 }}
              >
                <img
                  className="object-cover object-center w-full h-full"
                  src={PasFoto}
                  alt="Muhammad Bayu Aji"
                />
              </motion.div>

              {/* Badge: Open to work - Improved positioning */}
              <motion.div
                initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
                whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: 0.8, type: "spring", stiffness: 200 }}
                className="absolute transform -translate-x-1/2 -bottom-4 left-1/2 lg:left-16 lg:transform-none"
              >
                <div className="px-3 py-2 text-white transition-transform duration-200 border-2 border-white rounded-full shadow-lg bg-gradient-to-r from-blue-600 to-indigo-700 sm:px-4 dark:border-gray-800 backdrop-blur-sm rotate-3 hover:rotate-0">
                  <div className="flex items-center gap-2 text-xs font-medium sm:text-sm whitespace-nowrap">
                    <span className="relative flex h-2 w-2 sm:h-2.5 sm:w-2.5">
                      <span className="absolute inline-flex w-full h-full bg-green-400 rounded-full opacity-75 animate-ping"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 sm:h-2.5 sm:w-2.5 bg-green-500"></span>
                    </span>
                    <span className="hidden sm:inline">Terbuka untuk Peluang Kerja! 🚀</span>
                    <span className="sm:hidden">Open to Work! 🚀</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* About Text - Improved spacing and typography */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            className="flex-1 mt-8 text-center lg:mt-0 lg:text-left"
          >
            <motion.h2
              initial={{ opacity: 0, y: -30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="mb-4 text-4xl font-bold text-gray-900 sm:text-5xl lg:text-6xl xl:text-7xl dark:text-white sm:mb-6 font-bricolage"
            >
              Tentang <TextSpan>Saya</TextSpan>
            </motion.h2>
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="w-full h-1 mx-auto mb-6 origin-left bg-blue-600 lg:mx-0"
            ></motion.div>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: 1.0 }}
              className="max-w-3xl mx-auto text-xl leading-relaxed text-justify text-gray-600 dark:text-gray-300 sm:text-base lg:text-lg lg:mx-0"
            >
             Sebagai seorang siswa yang menekuni dunia pengembangan web, saya memiliki semangat untuk terus belajar dan beradaptasi dengan teknologi terbaru. Saya percaya bahwa kombinasi antara kerja keras, disiplin, dan kreativitas dapat menghasilkan solusi digital yang bermanfaat. Dengan ketertarikan khusus pada Frontend Development, saya ingin mengembangkan karier dengan menghadirkan website yang tidak hanya berfungsi, tetapi juga memberi pengalaman menyenangkan bagi pengguna.
            </motion.p>
          </motion.div>
        </div>
      </motion.section>

      {/* Experience Section */}
      <motion.section
        ref={experienceSectionRef}
        initial={{ opacity: 0, y: 50 }}
        animate={
          isExperienceInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }
        }
        transition={{ duration: 0.7, delay: 0.3 }}
        className="mx-auto rounded max-w-7xl"
        id="experience"
      >
        <div className="mb-8 font-bold sm:mb-12">
          <h2 className="flex items-center gap-3 mb-2 text-2xl font-bold text-gray-900 sm:text-3xl lg:text-4xl">
            <div className="p-2 bg-blue-100 rounded-full dark:bg-blue-900">
              <i className="text-xl text-blue-600 fas fa-briefcase sm:text-2xl" />
            </div>
            <span className="text-5xl font-bricolage dark:text-white">
              Pengalaman
            </span>
          </h2>
          <p className="max-w-3xl text-gray-600 dark:text-gray-300">
            Perjalanan pendidikan dan karier saya
          </p>
        </div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-0 w-1 h-full transform -translate-x-1/2 bg-gradient-to-b from-blue-500 to-indigo-600 lg:left-1/2"></div>

          <div className="space-y-8">
            {experiences.map((exp, index) => (
              <div
                key={index}
                className={`relative flex flex-col lg:flex-row ${
                  index % 2 === 0 ? "lg:flex-row-reverse" : ""
                }`}
              >
                {/* Timeline point */}
                <div className="absolute left-0 z-10 flex items-center justify-center w-8 h-8 transform -translate-x-1/2 rounded-full lg:left-1/2 bg-gradient-to-r from-blue-500 to-indigo-600">
                  <div className="w-3 h-3 bg-white rounded-full"></div>
                </div>

                {/* Content */}
                <div className="flex-1 lg:px-8">
                  <div
                    className={`p-6 transition-all duration-300 bg-white rounded-lg shadow-lg hover:shadow-xl dark:bg-gray-800 ${
                      index % 2 === 0 ? "lg:ml-6" : "lg:mr-6"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span
                        className={`px-3 py-1 text-xs font-semibold rounded-full ${
                          exp.type === "education"
                            ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                            : "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                        }`}
                      >
                        {exp.type === "education"
                          ? "Pendidikan"
                          : exp.type === "work"
                          ? "Pekerjaan"
                          : "Magang"}
                      </span>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {exp.period}
                      </span>
                    </div>
                    <h3 className="mb-1 text-xl font-bold text-gray-900 dark:text-white">
                      {exp.title}
                    </h3>
                    <p className="mb-4 text-lg font-medium text-gray-600 dark:text-gray-300">
                      {exp.role}
                    </p>
                    <p className="mb-4 text-justify text-gray-700 dark:text-gray-300">
                      {exp.description}
                    </p>

                    {exp.skills && (
                      <div className="flex flex-wrap gap-2">
                        {exp.skills.map((skill, i) => (
                          <span
                            key={i}
                            className="px-3 py-1 text-xs font-medium text-gray-700 bg-gray-100 rounded-full dark:bg-gray-700 dark:text-gray-300"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Spacer div for timeline layout */}
                <div className="flex-1"></div>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      <motion.section
        ref={sertifikatSectionRef}
        initial={{ opacity: 0, y: 50 }}
        animate={
          isSertifikatInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }
        }
        transition={{ duration: 0.7, delay: 0.3 }}
        className="min-h-screen p-10 mx-auto rounded max-w-7xl bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-900"
      >
        <div className="mb-8 font-bold sm:mb-12">
          <h2 className="flex items-center gap-3 mb-2 text-2xl font-bold text-gray-900 sm:text-3xl lg:text-4xl">
            <div className="p-2 bg-pink-100 rounded-full dark:bg-pink-900">
              <i className="text-xl text-pink-600 fas fa-ribbon sm:text-2xl" />
            </div>
            <span className="text-5xl font-bricolage dark:text-white">
              Sertifikasi
            </span>
          </h2>
          <p className="max-w-3xl text-gray-600 dark:text-gray-300">
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
                  onClick={() => setSelected(card)}
                >
                  <Card {...card} />
                </div>
              );
            }
            return null;
          })}
        </div>
        {selected && (
          <CertificateModal
            certificate={selected}
            onClose={() => setSelected(null)}
          />
        )}
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
      </motion.section>
    </motion.section>
  );
}