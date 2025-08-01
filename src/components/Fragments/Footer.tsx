import TextSpan from "../SubAtomic/TeksSpan";

export default function Footer() {
  const sosMed = [
    {
      href: "https://www.linkedin.com/in/baayuaaji/",
      icon: <i className="text-2xl ri-linkedin-fill"></i>,
      label: "LinkedIn",
      style: "text-gray-500 hover:text-blue-600"
    },
    {
      href: "https://github.com/M-Bayu-Aji",
      icon: <i className="text-2xl ri-github-fill"></i>,
      label: "Github",
      style: "text-gray-500 hover:text-gray-900"
    },
    {
      href: "https://instagram.com/baayuaajii",
      icon: <i className="text-2xl ri-instagram-line"></i>,
      label: "Instagram",
      style: "text-gray-500 hover:text-pink-600"
    },
  ];
  return (
    <>
      <footer>
        <div className="container py-8 mx-auto bg-white rounded max-w-7xl">
          <div className="text-center">
            <p className="text-sm font-bold text-gray-600">© {new Date().getFullYear()} Muhammad<TextSpan>BayuAji</TextSpan></p>

            <div className="flex justify-center mt-4 space-x-6">
              {sosMed.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={item.style}
                >
                  <span className="sr-only">{item.label}</span>
                  {item.icon}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
