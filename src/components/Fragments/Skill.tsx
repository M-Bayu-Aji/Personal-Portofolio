import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import TextSpan from "../SubAtomic/TeksSpan";

export default function SkillsAndCertifications() {
  const [hoveredCategory, setHoveredCategory] = useState<number | null>(null);
  
  // Refs for scroll animations
  const skillSectionRef = useRef(null);
  const categoryRefs = [useRef(null), useRef(null), useRef(null)]; // One for each category
  
  // Check if sections are in view
  const isSkillInView = useInView(skillSectionRef, { once: true, amount: 0.2 });
  const areCategoriesInView = categoryRefs.map(ref => 
    useInView(ref, { once: true, amount: 0.2 })
  );

  const skillCategories = [
    {
      title: "Programming Languages",
      icon: "💻",
      color: "from-blue-500 to-blue-600",
      borderColor: "border-blue-200 dark:border-blue-700",
      textColor: "text-blue-700 dark:text-blue-300",
      bgColor: "bg-blue-50 dark:bg-blue-900/20",
      skills: ["HTML", "CSS3", "JavaScript", "PHP"],
    },
    {
      title: "Frontend Development",
      icon: "🎨",
      color: "from-purple-500 to-purple-600",
      borderColor: "border-purple-200 dark:border-purple-700",
      textColor: "text-purple-700 dark:text-purple-300",
      bgColor: "bg-purple-50 dark:bg-purple-900/20",
      skills: [
        "Responsive Design",
        "Bootstrap",
        "Tailwind CSS",
        "Vue",
        "React",
        "Next",
        "Laravel",
      ],
    },
    {
      title: "Backend & Tools Development",
      icon: "⚙️",
      color: "from-green-500 to-green-600",
      borderColor: "border-green-200 dark:border-green-700",
      textColor: "text-green-700 dark:text-green-300",
      bgColor: "bg-green-50 dark:bg-green-900/20",
      skills: [
        "PHP",
        "Laravel",
        "MySQL",
        "PostgreSQL",
        "Postman"
      ],
    },
  ];

  return (
    <motion.section
      ref={skillSectionRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.7 }}
      className="p-10 my-5 bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900"
      id="skills"
    >
      <div className="px-6 mx-auto max-w-7xl sm:px-10 lg:px-16">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -30 }}
          animate={isSkillInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -30 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="flex flex-col items-center mb-16 text-center"
        >
          <div className="inline-flex items-center px-6 py-3 mb-6 text-md font-bold tracking-wider text-white font-bricolage uppercase rounded-full bg-[#0000ff] dark:bg-blue-600">
            <span className="mr-2 text-lg">⚡</span>
            Keahlian & Teknologi
          </div>

          <span className="text-5xl font-bold text-gray-900 font-bricolage sm:text-6xl dark:text-white">
            Kemampuan <TextSpan children="Teknis" />
          </span>

          <p className="max-w-3xl mt-6 text-xl leading-relaxed text-gray-600 dark:text-gray-300">
            Berbagai teknologi yang saya kuasai untuk membangun solusi digital
            yang inovatif dan berkualitas tinggi.
          </p>
        </motion.div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              ref={categoryRefs[categoryIndex]}
              className={`group relative overflow-hidden transition-all duration-500 bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl dark:hover:shadow-2xl dark:shadow-gray-900/50 hover:-translate-y-2 ${category.borderColor} border-2 hover:border-opacity-50`}
              onMouseEnter={() => setHoveredCategory(categoryIndex)}
              onMouseLeave={() => setHoveredCategory(null)}
              whileHover={{
                scale: 1.04,
                boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
              }}
              initial={{ opacity: 0, y: 40 }}
              animate={areCategoriesInView[categoryIndex] ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
              transition={{ duration: 0.5, delay: categoryIndex * 0.2 }}
            >
              {/* Background Gradient Overlay */}
              <div
                className={`absolute inset-0 opacity-0 group-hover:opacity-5 dark:group-hover:opacity-10 transition-opacity duration-500 bg-gradient-to-br ${category.color}`}
              ></div>

              <div className="relative p-8">
                {/* Category Header */}
                <div className="flex items-center mb-8 space-x-4">
                  <div
                    className={`flex items-center justify-center flex-shrink-0 w-16 h-16 rounded-xl bg-gradient-to-r ${category.color} shadow-lg transform group-hover:scale-110 transition-transform duration-300`}
                  >
                    <span className="text-2xl">{category.icon}</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 transition-colors dark:text-white group-hover:text-gray-800 dark:group-hover:text-gray-200">
                    {category.title}
                  </h3>
                </div>

                {/* Skills List */}
                <div className="flex flex-wrap gap-3">
                  {category.skills.map((skill, skillIndex) => (
                    <motion.span
                      key={skill}
                      className={`px-4 py-2 text-sm font-semibold transition-all duration-300 rounded-lg border-2 border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 hover:shadow-md hover:-translate-y-0.5 hover:border-opacity-50 ${category.textColor} hover:bg-opacity-10`}
                      style={{
                        transitionDelay: `${skillIndex * 50}ms`,
                      }}
                      whileHover={{ scale: 1.1 }}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: skillIndex * 0.05 }}
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>

                {/* Skill Count Badge */}
                <div
                  className={`absolute top-4 right-4 px-3 py-1 text-xs font-bold rounded-full ${category.bgColor} ${category.textColor} opacity-70`}
                >
                  {category.skills.length} Skills
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}