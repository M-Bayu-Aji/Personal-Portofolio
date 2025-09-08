import { useState, useEffect } from "react";
import type { CardProps } from "./CardSertifikat";

interface CertificateModalProps {
  certificate: CardProps;
  onClose: () => void;
}

const CertificateModal = ({ certificate, onClose }: CertificateModalProps) => {
  const [isClosing, setIsClosing] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const timer = setTimeout(() => setIsLoaded(true), 50);

    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleClose();
      }
    };

    document.addEventListener("keydown", handleEsc);

    return () => {
      document.body.style.overflow = "auto";
      clearTimeout(timer);
      document.removeEventListener("keydown", handleEsc);
    };
  }, []);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
    }, 300);
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center transition-opacity duration-300 backdrop-blur-sm bg-black/80 ${
        isClosing ? "opacity-0" : "opacity-100"
      }`}
      onClick={handleClose}
    >
      <div
        className={`relative bg-white dark:bg-gray-800 rounded-xl lg:rounded-2xl max-w-7xl max-h-[90vh] overflow-hidden shadow-2xl transition-all duration-300 z-50 ${
          isClosing
            ? "animate-scaleOut"
            : isLoaded
            ? "animate-scaleIn"
            : "scale-95 opacity-0"
        } flex flex-col md:flex-row`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Image container */}
        <div className="flex items-center justify-center p-2 md:w-1/2 lg:w-3/5 bg-gradient-to-br from-blue-50 to-gray-100 dark:from-gray-700 dark:to-gray-900">
          <div className="relative flex items-center justify-center w-full h-full mx-4 overflow-hidden rounded-lg">
            <img
              src={certificate.imgSrc}
              alt={certificate.title}
              className={`object-contain w-full h-auto max-h-[50vh] md:max-h-[80vh] transition-opacity duration-500 ${
                isLoaded ? "opacity-100" : "opacity-0"
              }`}
              onLoad={() => setIsLoaded(true)}
            />
            {!isLoaded && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-200 dark:bg-gray-700 animate-pulse">
                <div className="w-12 h-12 border-4 border-blue-500 rounded-full border-t-transparent animate-spin"></div>
              </div>
            )}
          </div>
        </div>

        {/* Content container */}
        <div className="md:w-1/2 lg:w-2/5 p-5 sm:p-6 lg:p-8 overflow-y-auto max-h-[90vh] md:max-h-[80vh] relative z-50">
          <button
            className="absolute flex items-center justify-center w-8 h-8 text-gray-500 transition-all duration-200 bg-gray-100 rounded-full top-3 right-3 dark:bg-gray-700 hover:bg-red-50 hover:text-red-500 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onClick={handleClose}
            aria-label="Close"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>

          <div className="mt-2 md:mt-4 lg:mt-6">
            <span className="inline-flex items-center px-3 py-1 text-xs font-semibold tracking-wider text-blue-600 uppercase rounded-full bg-blue-50 dark:bg-blue-900/50 dark:text-blue-200">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4 mr-1"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              Certificate
            </span>

            <h2 className="mt-4 text-2xl font-bold leading-tight text-gray-800 md:text-3xl lg:text-[2rem] dark:text-white">
              {certificate.title}
            </h2>

            <div className="flex flex-wrap items-center mt-3 text-sm text-gray-500 dark:text-gray-400">
              <div className="flex items-center mr-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-4 h-4 mr-1"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
                </svg>
                <span className="font-medium text-gray-700 dark:text-gray-300">
                  {certificate.issuer}
                </span>
              </div>
              <div className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-4 h-4 mr-1"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>{certificate.date}</span>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-gray-200 dark:border-gray-700">
              <h3 className="mb-3 text-lg font-semibold text-gray-800 dark:text-white">
                Tentang Sertifikat
              </h3>
              <p className="leading-relaxed text-gray-600 dark:text-gray-300">
                {certificate.description}
              </p>
            </div>

            {certificate.credentialUrl && (
              <div className="flex flex-wrap gap-3 pt-6 mt-8 border-t border-gray-200 dark:border-gray-700">
              <a
                href={certificate.credentialUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white transition-colors duration-300 bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
              >
                <i className="fa-solid fa-arrow-up-right-from-square"></i>
                <span>View Credential</span>
              </a>
            </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CertificateModal;
