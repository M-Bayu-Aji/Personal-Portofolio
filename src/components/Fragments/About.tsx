export default function About() {
  return (
    <>
      <section
        className="about"
        id="about"
        data-aos="fade-up"
        data-aos-duration="1000"
      >
        <div className="about-me" data-aos="fade-up" data-aos-duration="1000">
          <img src="assets/img/fotoBys.jpg" />
          <div className="about-text">
            <h2>
              About <span>Me</span>
            </h2>
            <h5>Web Developer</h5>
            <p>
              Saya adalah seorang mahasiswa dengan fokus utama pada pengembangan
              web. Saya dikenal sebagai individu yang pekerja keras, tekun,
              disiplin, dan berdedikasi tinggi dalam setiap tanggung jawab.
              Dengan minat mendalam dalam karir sebagai Front End Developer,
              saya berkomitmen untuk terus meningkatkan keterampilan dan
              memberikan kontribusi terbaik dalam dunia teknologi.
            </p>
            <a href="sertifikat.html">
              <button className="btn-ser">
                <i className="fa-solid fa-award"></i> View Certificates
              </button>
            </a>
          </div>
        </div>
        <div
          className="certificates-content"
          data-aos="fade-up"
          data-aos-duration="1000"
        >
          <h1>Sertifikat</h1>
          <div className="certificates">
            <img src="assets/img/dicoding.jpeg" alt="Logo"></img>
            <div className="details">
              <h4>Belajar Dasar Pemrograman Web</h4>
              <p>Dicoding | 2023 - 2026</p>
            </div>
            <div className="view-btn">
              <a href="https://www.dicoding.com/certificates/07Z68ENJ2XQR">
                Lihat
              </a>
            </div>
          </div>
          <div className="certificates">
            <img src="assets/img/dicoding.jpeg" alt="Logo"></img>
            <div className="details">
              <h4>Belajar Dasar Pemrograman JavaScript</h4>
              <p>Dicoding | 2024 - 2027</p>
            </div>
            <div className="view-btn">
              <a href="https://www.dicoding.com/certificates/07Z60M3EJZQR">
                Lihat
              </a>
            </div>
          </div>
          <div className="certificates">
            <img src="assets/img/dicoding.jpeg" alt="Logo"></img>
            <div className="details">
              <h4>Belajar Prinsip Pemrograman Solid</h4>
              <p>Dicoding | 2024 - 2027</p>
            </div>
            <div className="view-btn">
              <a href="https://www.dicoding.com/certificates/QLZ97EVVEP5D">
                Lihat
              </a>
            </div>
          </div>
          <div className="view-btn">
            <a href="assets/html/sertifikat.html">Lihat Semua</a>
          </div>
        </div>
      </section>
    </>
  );
}
