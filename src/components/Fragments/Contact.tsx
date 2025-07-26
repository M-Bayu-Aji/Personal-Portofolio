export default function Contact() {
  return (
    <>
      <section
        className="contact"
        id="contact"
        data-aos="fade-up"
        data-aos-duration="1000"
      >
        <div className="content-text">
          <h1>
            Ayo 👋 <span>Bekerja</span> Sama
          </h1>
          <p>
            Saya siap membantu Anda dalam mengembangkan ide dan proyek web Anda.
            Mari berkolaborasi untuk menciptakan solusi digital yang inovatif
            dan berkualitas tinggi sesuai dengan kebutuhan Anda.
          </p>
        </div>
        <div className="row">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d247.64227394683823!2d106.81809079771497!3d-6.736098958105907!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sid!2sid!4v1701090930026!5m2!1sid!2sid"
            loading="lazy"
            className="map"
          ></iframe>
          <form
            action="https://formspree.io/f/xpwaalpo"
            method="POST"
            className="contact-content"
          >
            <label htmlFor="name">Name </label>
            <input
              type="text"
              placeholder="Your Name"
              id="name"
              name="text"
              className="input"
              required
            />
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              placeholder="Enter Your Email"
              className="input"
              required
            />
            <label htmlFor="pesan">Message</label>
            <textarea
              name="message"
              id="pesan"
              placeholder="Message"
              className="input"
              required
            ></textarea>
            <button type="submit" className="send">
              Send Message <i className="fa-solid fa-arrow-trend-up"></i>
            </button>
          </form>
        </div>
      </section>
    </>
  );
}
