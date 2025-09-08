import type { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  href?: string;
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset"; // Add for button type (e.g., "submit")
  disabled?: boolean; // Add for disabled state
  [key: string]: any; // Spread for other props
}

const Button = ({ children, href, className, onClick, type, disabled, ...rest }: ButtonProps) => {
  return (
    href ? (
      <a
        href={href}
        className={`px-8 py-4 text-base text-white bg-[#1d4ed8] rounded font-bold cursor-pointer outline-none border-none hover:bg-[#1e40af] hover:outline-offset-3 hover:underline ${className}`}
        {...rest}
      >
        {children}
      </a>
    ) : (
      <button
        onClick={onClick}
        type={type}
        disabled={disabled} // Apply disabled prop
        className={`px-8 py-4 text-sm text-white bg-[#1d4ed8] rounded font-bold cursor-pointer outline-none border-none hover:bg-[#1e40af] hover:outline-offset-3 ${className}`}
        {...rest}
      >
        {children}
      </button>
    )
  );
};

export default Button;