import type { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  href?: string;
  className?: string;
  onClick?: () => void;
}

const Button = ({ children, href, className, onClick }: ButtonProps) => {
  return (
    href ? (
      <a
        href={href}
        className={`px-8 py-4 text-base text-white bg-[#1d4ed8] rounded font-bold cursor-pointer outline-none border-none hover:bg-[#1e40af] hover:outline-offset-3 hover:underline ${className}`}
      >
        {children}
      </a>
    ) : (
      <button onClick={onClick}
        className={`px-8 py-4 text-base text-white bg-[#1d4ed8] rounded font-bold cursor-pointer outline-none border-none hover:bg-[#1e40af] hover:outline-offset-3 ${className}`}
      >
        {children}
      </button>
    )
  );
};

export default Button;