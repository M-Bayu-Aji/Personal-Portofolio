export default function Skill() {
  return (
    <>
      <section className="mySkill" data-aos="fade-up" data-aos-duration="1000">
        <h1>Keahlian Saya</h1>
        <div className="container">
          <div className="bhs">Bahasa Pemrograman</div>
          <div className="skill-container">
            <div className="item">
              <img src="assets/img/html.png" alt="" width="40px" />
              <h3>HTML</h3>
            </div>
            <div className="item">
              <img src="assets/img/css.svg" alt="" width="45px" />
              <h3>CSS</h3>
            </div>
            <div className="item">
              <img src="assets/img/js.png" alt="" width="40px" />
              <h3>Js</h3>
            </div>
            <div className="item">
              <img src="assets/img/php.svg" alt="" width="60px" />
              <h3>PHP</h3>
            </div>
          </div>

          <div className="frame-alat">Frameworks</div>
          <div className="fram">
            <div className="child">
              <i className="fa-brands fa-bootstrap"></i>
              <p>Boostrap</p>
            </div>
            <div className="child">
              <i className="fa-brands fa-css3"></i>
              <p>Tailwind</p>
            </div>
            <div className="child">
              <i className="fa-brands fa-laravel"></i>
              <p>Laravel</p>
            </div>
            <div className="child">
              <i className="ri-reactjs-line"></i>
              <p>React Js</p>
            </div>
          </div>

          <div className="frame-alat">Alat Bantu</div>
          <div className="tools">
            <div className="child">
              <i className="fa-brands fa-git-alt"></i>
              <p>Git</p>
            </div>
            <div className="child">
              <i className="fa-brands fa-github"></i>
              <p>Github</p>
            </div>
            <div className="child">
              <i className="fa-solid fa-code"></i>
              <p>Vs Code</p>
            </div>
            <div className="child">
              <i className="fa-solid fa-dragon"></i>
              <p>Laragon</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
