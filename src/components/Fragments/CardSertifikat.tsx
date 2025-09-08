export interface CardProps {
  imgSrc: string | any;
  imgAlt: string;
  title: string;
  description: string;
  date: string;
  issuer: string;
  credentialUrl?: string;
}

const Card = ({ imgSrc, imgAlt, title, description, date, issuer }: CardProps) => {
  return (
    <div className="flex flex-col overflow-hidden shadow-md bg-[#F0F0F0] rounded-xl certificate-card hover:shadow-lg hover:cursor-pointer">
        <article className="">
          <div className="flex-1">
            <img
              src={imgSrc}
              alt={imgAlt}
              className="object-cover w-full sm:h-56 certificate-image"
              loading="lazy"
            />
            <div className="p-5 bg-pink-100 sm:p-6 dark:bg-gray-800">
              <h5 className="mb-3 font-bold leading-tight text-gray-800 dark:text-gray-300 font-bricolage line-clamp-2">
                {title.length >= 30 ? `${title.substring(0, 30)}...` : title}
              </h5>
              <p className="mb-4 text-xs leading-relaxed text-gray-600 dark:text-gray-300 line-clamp-3">
                {description.length > 120
                    ? `${description.substring(0, 120)}...`
                    : description}
              </p>
              <div className="flex items-center justify-between pt-3 mt-auto text-xs border-t border-gray-100">
                <div className="flex items-center gap-2 text-gray-600">
                  <i className="text-pink-500 far fa-calendar-alt" />
                  <span>{date}</span>
                </div>
                <span className="font-medium text-pink-600">{issuer}</span>
              </div>
            </div>
          </div>
        </article>
    </div>
  );
};

export default Card;