import type { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  href: string;
}

const Button = ({ children, href }: ButtonProps) => {
  return (
    <a
      href={href}
      className="px-8 py-4 text-base text-white bg-[#1d4ed8] rounded font-bold cursor-pointer outline-none border-none hover:bg-[#1e40af] hover:outline-offset-3 hover:underline"
    >
      {children}
    </a>
  );
};

export default Button;