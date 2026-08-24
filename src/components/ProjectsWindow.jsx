import { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remarkGfm";

const projectsData = [
  {
    id: "ashenritual",
    name: "ASHENRITUAL",
    repoUrl: "https://github.com/m4n1kya/ASHENRITUAL",
    rawReadme: "https://raw.githubusercontent.com/m4n1kya/ASHENRITUAL/main/README.md"
  },
  {
    id: "uniease",
    name: "UNI-EASE",
    repoUrl: "https://github.com/m4n1kya/Epics-UniEase",
    rawReadme: "https://raw.githubusercontent.com/m4n1kya/Epics-UniEase/main/README.md"
  },
  {
    id: "ashen-vector",
    name: "ASHEN-VECTOR",
    repoUrl: "https://github.com/m4n1kya/ASHEN-VECTOR",
    rawReadme: "https://raw.githubusercontent.com/m4n1kya/ASHEN-VECTOR/main/README.md"
  },
  {
    id: "eco-loop",
    name: "ECO-LOOP",
    repoUrl: "https://github.com/m4n1kya/eco-loop",
    rawReadme: "https://raw.githubusercontent.com/m4n1kya/eco-loop/main/README.md"
  }
];

const MarkdownComponents = {
  h1: ({node, ...props}) => <h1 className="text-3xl md:text-5xl font-bold mt-8 mb-6 text-white" {...props} />,
  h2: ({node, ...props}) => <h2 className="text-2xl md:text-4xl font-bold mt-12 mb-4 text-blue-50 border-b border-white-50/20 pb-2" {...props} />,
  h3: ({node, ...props}) => <h3 className="text-xl md:text-2xl font-bold mt-8 mb-3 text-white" {...props} />,
  p: ({node, ...props}) => <p className="text-white-50 text-base md:text-lg leading-relaxed mb-6" {...props} />,
  a: ({node, ...props}) => <a className="text-blue-50 hover:text-white underline transition-colors" target="_blank" rel="noreferrer" {...props} />,
  ul: ({node, ...props}) => <ul className="list-disc pl-6 space-y-2 mb-6 text-white-50 text-base md:text-lg" {...props} />,
  ol: ({node, ...props}) => <ol className="list-decimal pl-6 space-y-2 mb-6 text-white-50 text-base md:text-lg" {...props} />,
  li: ({node, ...props}) => <li className="pl-1" {...props} />,
  blockquote: ({node, ...props}) => <blockquote className="border-l-4 border-blue-50 pl-4 italic text-white-50 bg-black-200/50 py-2 pr-4 rounded-r-lg my-6" {...props} />,
  code: ({node, inline, ...props}) => 
    inline 
      ? <code className="bg-black-300 text-blue-50 px-1.5 py-0.5 rounded font-mono text-sm" {...props} />
      : <pre className="bg-black-300 p-4 rounded-lg overflow-x-auto my-6 border border-white-50/10"><code className="text-white-50 font-mono text-sm" {...props} /></pre>,
  img: ({node, ...props}) => <img className="max-w-full h-auto rounded-xl border border-white-50/10 my-8 shadow-2xl" {...props} />,
  hr: ({node, ...props}) => <hr className="border-white-50/20 my-10" {...props} />,
  table: ({node, ...props}) => <div className="overflow-x-auto my-8"><table className="w-full text-left border-collapse" {...props} /></div>,
  th: ({node, ...props}) => <th className="border-b border-white-50/20 py-3 px-4 font-bold text-white bg-black-200" {...props} />,
  td: ({node, ...props}) => <td className="border-b border-white-50/10 py-3 px-4 text-white-50" {...props} />,
};

const ProjectsWindow = ({ onBack, initialProject = "ashenritual" }) => {
  const [activeTab, setActiveTab] = useState(initialProject);
  const [markdownContent, setMarkdownContent] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  // Fetch README when active tab changes
  useEffect(() => {
    const fetchReadme = async () => {
      setIsLoading(true);
      const project = projectsData.find(p => p.id === activeTab);
      if (!project) return;
      
      try {
        const response = await fetch(project.rawReadme);
        if (response.ok) {
          const text = await response.text();
          setMarkdownContent(text);
        } else {
          setMarkdownContent("### Error fetching project details.\nPlease visit the [GitHub Repository](" + project.repoUrl + ") directly.");
        }
      } catch (error) {
        setMarkdownContent("### Error fetching project details.\nPlease visit the [GitHub Repository](" + project.repoUrl + ") directly.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchReadme();
  }, [activeTab]);

  return (
    <div className="fixed inset-0 z-[1000] bg-black-100 flex flex-col w-full h-full overflow-hidden">
      
      {/* Header Area */}
      <div className="flex-none flex items-center justify-between p-6 md:px-12 md:py-8 border-b border-white-50/10 bg-black-100/90 backdrop-blur-md z-10">
        <h1 className="text-2xl md:text-4xl font-bold text-white tracking-widest uppercase">Projects</h1>
        <button
          onClick={onBack}
          className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-full border border-white-50/20 text-white-50 hover:text-white hover:border-white transition-all duration-300 group bg-black-200"
        >
          <svg className="w-5 h-5 transition-transform duration-300 group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          <span className="font-semibold uppercase text-sm tracking-wider">Back</span>
        </button>
      </div>

      <div className="flex-1 flex flex-col md:flex-row overflow-hidden relative">
        {/* Background gradient effects */}
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-blue-50/5 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-purple-500/5 blur-[120px] pointer-events-none" />

        {/* Tabs Sidebar */}
        <div className="flex-none md:w-64 lg:w-80 overflow-x-auto md:overflow-y-auto border-b md:border-b-0 md:border-r border-white-50/10 bg-black-200/30 z-10 custom-scrollbar">
          <div className="flex flex-row md:flex-col p-4 md:p-6 gap-2 min-w-max md:min-w-0">
            {projectsData.map((project) => (
              <button
                key={project.id}
                onClick={() => setActiveTab(project.id)}
                className={`text-left px-6 py-4 rounded-xl transition-all duration-300 ${
                  activeTab === project.id
                    ? "bg-white text-black font-bold shadow-lg scale-[1.02]"
                    : "text-white-50 hover:bg-white-50/10 hover:text-white font-semibold"
                }`}
              >
                <div className="text-sm md:text-base tracking-wider">{project.name}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto custom-scrollbar relative z-10 scroll-smooth">
          <div className="max-w-4xl mx-auto p-6 md:p-12 lg:p-16">
            
            {/* Screenshot Placeholder Area */}
            <div className="w-full aspect-[21/9] bg-black-200 rounded-2xl border border-white-50/10 mb-12 flex flex-col items-center justify-center overflow-hidden relative group">
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-50/10 to-transparent opacity-50 group-hover:opacity-100 transition-opacity duration-700" />
              <svg className="w-12 h-12 text-white-50 mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <p className="text-white-50 font-mono text-sm tracking-widest uppercase">Screenshots Placeholder</p>
              <p className="text-white-50/50 text-xs mt-2">Images will be added here</p>
            </div>

            {/* Markdown Content */}
            <div className="prose prose-invert max-w-none">
              {isLoading ? (
                <div className="flex flex-col items-center justify-center py-20">
                  <div className="w-10 h-10 border-4 border-white-50/20 border-t-blue-50 rounded-full animate-spin mb-6" />
                  <p className="text-white-50 uppercase tracking-widest text-sm font-semibold animate-pulse">Loading README...</p>
                </div>
              ) : (
                <div className="markdown-body animate-fadeIn">
                  <ReactMarkdown 
                    remarkPlugins={[remarkGfm]}
                    components={MarkdownComponents}
                  >
                    {markdownContent}
                  </ReactMarkdown>
                </div>
              )}
            </div>

          </div>
        </div>
      </div>

    </div>
  );
};

export default ProjectsWindow;
