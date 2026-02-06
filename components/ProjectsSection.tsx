import { projects } from "@/lib/data";

export default function ProjectsSection() {
  return (
    <section id="projects" className="py-20">
      <div className="container-custom">
        <div className="text-center mb-15">
          <span className="inline-block bg-gray-100 text-gray-600 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider mb-4">
            作品
          </span>
          <h2 className="text-4xl font-extrabold mb-3 tracking-tight">项目 & 产品</h2>
          <p className="text-gray-600">我主导设计与开发的 AI 产品项目</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-8 border border-gray-200 transition-all duration-300 hover:border-purple-500 hover:shadow-lg hover:shadow-purple-500/10"
            >
              <div className="w-14 h-14 bg-gradient-to-br from-[#667eea] to-[#764ba2] rounded-2xl flex items-center justify-center text-2xl mb-5">
                {project.icon}
              </div>
              <h3 className="text-lg font-bold mb-3">{project.name}</h3>
              <p className="text-gray-600 text-sm leading-relaxed mb-5">{project.description}</p>
              <div className="flex gap-2">
                {project.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="bg-gray-100 text-gray-600 px-3 py-1 rounded-md text-xs font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
