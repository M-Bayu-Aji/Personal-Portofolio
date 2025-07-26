import TextSpan from "../SubAtomic/TeksSpan";

export default function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-[#efefea]">
      <div className="w-full max-w-md overflow-hidden bg-white shadow-lg rounded-xl">
        <div className="p-8 text-center">
          <div className="flex justify-center mb-6">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-24 h-24 text-indigo-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h1 className="mb-2 text-5xl font-bold text-gray-800">404</h1>
          <h2 className="mb-6 text-2xl font-semibold text-gray-700">Page Not Found</h2>
          <p className="mb-8 text-gray-600">
            Oops! The page you're looking for doesn't exist or has been moved.
          </p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <a
              href="/"
              className="px-6 py-3 font-medium text-white transition duration-300 bg-indigo-600 rounded-lg hover:bg-indigo-700"
            >
              Go Home
            </a>
            <a
              href="https://www.linkedin.com/in/baayuaaji/"
              className="px-6 py-3 font-medium text-gray-700 transition duration-300 bg-gray-100 border border-gray-300 rounded-lg hover:bg-gray-200"
            >
              Contact Support
            </a>
          </div>
        </div>
        <div className="px-8 py-4 text-center bg-gray-50">
          <p className="text-sm font-bold text-gray-500">
            © {new Date().getFullYear()} Muhammad<TextSpan>BayuAji</TextSpan>.
          </p>
        </div>
      </div>
    </div>
  );
}