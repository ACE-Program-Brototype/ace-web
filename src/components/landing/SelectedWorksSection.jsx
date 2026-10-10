import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { PROJECTS } from "../../constants/projectDatas";

const revealVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

export default function SelectedWorksSection() {
  return (
    <motion.section
      className="py-section-gap border-b border-outline-variant bg-surface"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={stagger}
    >
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
        <motion.div
          variants={revealVariant}
          className="flex justify-between items-end mb-16"
        >
          <h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-primary">
            The Project Showcase.
          </h2>
        </motion.div>

        <motion.div
          variants={revealVariant}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {PROJECTS.map((proj) => (
            <div
              key={proj.title}
              className="bg-surface-container-lowest border border-outline-variant p-6 hover:border-on-surface-variant transition-colors duration-300 flex flex-col h-full group"
            >
              <div
                className={`aspect-video ${
                  proj.imgBg || "bg-surface-container-low"
                } border border-outline-variant mb-6 overflow-hidden relative flex items-center justify-center`}
              >
                <img
                  src={proj.img}
                  alt={proj.title}
                  className={`w-full h-full ${
                    proj.imgFit === "contain"
                      ? "object-contain"
                      : "object-cover"
                  } transition-transform duration-500 group-hover:scale-105`}
                  loading="lazy"
                  decoding="async"
                  width="600"
                  height="338"
                />

                <div className="absolute inset-0 flex items-center justify-center bg-black/45 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <a
                    href={proj.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`View ${proj.title} on GitHub`}
                    className="w-11 h-11 flex items-center justify-center rounded-full bg-white/95 text-black shadow-lg hover:bg-white hover:scale-105 transition-all duration-200"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-5 h-5"
                      aria-hidden="true"
                    >
                      <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.866-.014-1.7-2.782.604-3.369-1.341-3.369-1.341-.455-1.157-1.11-1.465-1.11-1.465-.908-.62.069-.608.069-.608 1.004.07 1.532 1.03 1.532 1.03.892 1.529 2.341 1.087 2.91.831.091-.646.349-1.087.636-1.338-2.221-.253-4.555-1.111-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0 1 12 6.844a9.6 9.6 0 0 1 2.504.337c1.909-1.294 2.748-1.025 2.748-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.841-2.338 4.687-4.566 4.935.359.309.678.919.678 1.852 0 .3-.012 2.415-.012 2.744 0 .267.18.578.688.48A10.001 10.001 0 0 0 22 12c0-5.523-4.477-10-10-10Z" />
                    </svg>
                  </a>
                </div>
              </div>

              <div className="flex flex-col flex-grow">
                <div className="mb-4">
                  <span className="inline-flex items-center px-2 py-1 mb-3 border border-outline-variant bg-surface-container-low font-mono text-[10px] uppercase tracking-wider text-on-surface-variant">
                    {proj.tag}
                  </span>

                  <h3 className="font-headline-md text-[20px] text-primary leading-tight">
                    {proj.title}
                  </h3>

                  <p className="font-label-sm text-label-sm text-on-surface-variant mt-1">
                    {proj.meta}
                  </p>
                </div>

                <p className="font-body-md text-body-md text-on-surface-variant text-sm flex-grow mb-6">
                  {proj.desc}
                </p>

                <div className="flex items-center gap-3 pt-4 border-t border-outline-variant mt-auto">
                  {proj.authors && proj.authors.length > 0 ? (
                    <>
                      <div className="flex -space-x-2 shrink-0 py-0.5">
                        {proj.authors.map((member) => (
                          <img
                            key={member.name}
                            src={member.img}
                            alt={member.name}
                            title={member.name}
                            className="w-8 h-8 rounded-full object-cover border-2 border-surface-container-lowest shadow-sm shrink-0 hover:scale-110 hover:z-10 transition-transform"
                            loading="lazy"
                            decoding="async"
                            width="32"
                            height="32"
                          />
                        ))}
                      </div>
                      <div className="min-w-0 flex-1">
                        <span
                          className="font-label-sm text-[11px] leading-tight text-on-surface uppercase tracking-wider block line-clamp-2"
                          title={proj.author}
                        >
                          {proj.author}
                        </span>
                        <span className="text-[10px] text-on-surface-variant font-mono block mt-0.5">
                          Team Project ({proj.authors.length})
                        </span>
                      </div>
                    </>
                  ) : (
                    <>
                      <img
                        src={proj.authorImg}
                        alt={proj.author}
                        className="w-8 h-8 rounded-full object-cover border border-outline-variant shrink-0"
                        loading="lazy"
                        decoding="async"
                        width="32"
                        height="32"
                      />
                      <span className="font-label-sm text-label-sm uppercase tracking-wider truncate">
                        {proj.author}
                      </span>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </motion.div>

        <div className="mt-8 text-center md:hidden">
          <Link
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            to="/directory"
            className="inline-flex items-center gap-2 font-label-sm text-label-sm uppercase tracking-wider text-primary border border-outline-variant px-6 py-3 hover:bg-surface-container-low transition-colors"
          >
            View full directory
            <span className="material-symbols-outlined text-[16px]">
              arrow_forward
            </span>
          </Link>
        </div>
      </div>
    </motion.section>
  );
}
