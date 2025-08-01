import headerImage from "../../assets/images/header.png";
import Button from "../atoms/Button";
import TextSpan from "../SubAtomic/TeksSpan";

export default function Header() {
  return (
    <>
      <header
        className="container grid items-center grid-cols-1 gap-8 p-10 pt-8 my-5 bg-white rounded md:grid-cols-2 max-w-7xl"
        id="header"
      >
        <div className="content">
          <span className="blur"></span>
          <span className="blur"></span>
          <h1 className="text-[#333] font-bricolage mb-4 text-5xl font-bold leading-[4rem]">
            Hi, Saya <TextSpan>BayuAji</TextSpan>, Web Developer
          </h1>
          <p className="text-[#555] mb-8">
            Saya seorang Pengembang Web. Saya dapat menyediakan kode yang bersih. Saya juga membuat situs web lebih
            interaktif dengan animasi web.
          </p>
          <Button href={"#download"}>
            <i className="ri-download-2-line"></i> Download CV
          </Button>
        </div>
        <div className="static image">
          <img
            className="max-w-[600px] my-0 mx-auto"
            src={headerImage}
          />
        </div>
      </header>
    </>
  );
}
