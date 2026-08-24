import { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Galaxy from "./reactbits/Galaxy";
import AccordionGallery from "./reactbits/AccordionGallery";

const ashenritualImagesRow1 = [
  { image: "/projects/ashenritual/Screenshot%202026-08-23%20154953.png", label: "Showcase" },
  { image: "/projects/ashenritual/Screenshot%202026-08-23%20155012.png", label: "Collections" },
  { image: "/projects/ashenritual/Screenshot%202026-08-23%20155110.png", label: "Product Viewer" },
  { image: "/projects/ashenritual/Screenshot%202026-08-23%20155130.png", label: "Interface Details" }
];

const ashenritualImagesRow2 = [
  { image: "/projects/ashenritual/Screenshot%202026-08-23%20155209.png", label: "Cart Experience" },
  { image: "/projects/ashenritual/Screenshot%202026-08-23%20155233.png", label: "Checkout" },
  { image: "/projects/ashenritual/Screenshot%202026-08-23%20155258.png", label: "VESPER AI Concierge" },
  { image: "/projects/ashenritual/Screenshot%202026-08-23%20155333.png", label: "Navigation" }
];

const projectsData = [
  {
    id: "ashenritual",
    name: "ASHENRITUAL",
    repoUrl: "https://github.com/m4n1kya/ASHENRITUAL",
    markdown: `
# ASHENRITUAL
*Luxury Fashion • Artificial Intelligence • Modern Web Engineering*

ASHENRITUAL is a production-grade, headless e-commerce platform built to seamlessly merge the tactile experience of luxury fashion with the computational power of artificial intelligence. Engineered entirely on a modern TypeScript micro-architecture, the application delivers a cinematic user interface optimized for high-performance rendering.

## Core Architecture
Built upon strict software engineering principles, the system separates the presentation layer from the business logic. This decoupled architecture allows for rigorous security implementations, independent scalability, and the integration of advanced server-side rendering techniques.

## Key Features
- **AI Fashion Concierge**: Integrated directly into the interface, the VESPER AI acts as a personal stylist, reading the user's current navigational context to provide highly tailored recommendations.
- **Server-Side Rendering**: Leveraging React Server Components and Next.js SSR, the frontend pre-computes HTML on the server edge, guaranteeing instantaneous initial page loads and optimal SEO indexing.
- **Real-time AI Streaming**: Dialogue and structured data from the AI engine are streamed asynchronously via Server-Sent Events (SSE).
- **Stateless Authentication**: User sessions are maintained using short-lived JSON Web Tokens (JWT) combined with secure, HTTP-only refresh tokens.
- **Cinematic Interface**: Fluid scroll mechanics, advanced timelines, and magnetic interactions are engineered via GSAP and Lenis.

## Technology Stack
- **Frontend**: Next.js, React, TypeScript, Tailwind CSS, GSAP
- **Backend**: NestJS, Prisma ORM, Node.js
- **Database**: Neon PostgreSQL
- **AI Integration**: Google Gemini API
    `
  },
  {
    id: "uniease",
    name: "UNI-EASE",
    repoUrl: "https://github.com/m4n1kya/Epics-UniEase",
    markdown: `
# UNI-EASE
*Campus Resource Optimization Ecosystem*

UniEase is a modern university resource management platform designed to centralize essential campus services into a single, responsive web application. It simplifies access to important university resources by providing students with a unified platform for academic and campus-related information.

## System Overview
The application offers an intuitive interface for accessing faculty details, study materials, transportation schedules, food court information, and career resources, drastically reducing the friction of navigating large campus ecosystems.

## Core Features
- **Centralized Directories**: Comprehensive faculty and food court directories with advanced search and filtering.
- **Digital Library Ecosystem**: Instant access to E-Books and study materials securely hosted on the cloud.
- **Transportation Tracking**: Real-time campus transportation information and scheduling.
- **Responsive Architecture**: Fully responsive user interface optimized for both desktop and mobile viewing.

## Technology Stack
- **Frontend**: React, TypeScript, Tailwind CSS, shadcn/ui
- **Build Tools**: Vite, npm
    `
  },
  {
    id: "ashen-vector",
    name: "ASHEN-VECTOR",
    repoUrl: "https://github.com/m4n1kya/ASHEN-VECTOR",
    markdown: `
# ASHEN-VECTOR
*Quantitative Market Intelligence Platform*

ASHEN-VECTOR is an experimental quantitative market intelligence and systematic research platform built around Qlib-compatible market data infrastructure. It provides a modular architecture for quantitative factor research, statistical analysis, machine learning–based prediction, probability calibration, and systematic backtesting.

## Platform Capabilities
Designed as a personal quantitative research terminal, ASHEN-VECTOR delivers comprehensive analytical tools for systematic trading and market intelligence.

- **Market Data Engine**: High-performance historical OHLCV price series querying via the Qlib data engine.
- **Statistical Analysis**: In-depth calculation of returns, volatility, drawdown, Sharpe, and Sortino ratios.
- **Technical Indicators**: Optimized computations for SMA, EMA, RSI, MACD, Bollinger Bands, ATR, and momentum.
- **Quantitative Factor Scores**: Advanced composite scores for momentum, trend, volatility, liquidity, and mean reversion.
- **Model Explainability**: SHAP-based feature contribution analysis to demystify machine learning predictions.

## Architecture
The system employs a sophisticated pipeline starting from Qlib market data, flowing through feature engineering, quantitative factors, and ML models, ultimately generating calibrated predictions and risk assessments.

## Technology Stack
- **Data & Analytics**: Microsoft Qlib, pandas, NumPy
- **Backend**: Python 3.12, FastAPI
- **Frontend**: Next.js Dashboard
    `
  },
  {
    id: "eco-loop",
    name: "ECO-LOOP",
    repoUrl: "https://github.com/m4n1kya/eco-loop",
    markdown: `
# ECO-LOOP
*AI-Powered Building Energy Optimization*

EcoLoop is an advanced AI-powered building energy optimization system that combines EnergyPlus building simulation with a locally hosted Large Language Model (LLM). It automatically analyzes building performance, recommends HVAC optimization strategies, modifies building control parameters, and evaluates energy savings through an iterative closed-loop workflow.

## The Problem & Solution
Commercial buildings consume a significant portion of global electricity, with HVAC systems accounting for one of the largest energy loads. Traditional EnergyPlus workflows require engineers to manually analyze large simulation outputs and tune HVAC schedules. EcoLoop automates this entirely.

## Key Features
- **AI-Powered Energy Analysis**: Automatic interpretation of EnergyPlus simulation outputs with natural language explanations generated by a local Qwen2.5 LLM.
- **Intelligent HVAC Optimization**: The AI recommends optimal cooling temperatures and automatically updates EnergyPlus IDF schedules.
- **Closed-Loop Simulation**: The system seamlessly runs baseline simulations, analyzes performance, optimizes settings, and re-runs the simulation to measure actual savings.
- **Interactive Dashboard**: A robust Streamlit dashboard featuring KPI cards, energy comparisons, interactive Plotly charts, and optimization history.

## Technology Stack
- **Simulation**: EnergyPlus 26.1, EPW Weather Data, IDF Building Models
- **AI & Analytics**: Python 3.13, Qwen2.5 1.5B via Ollama, Pandas
- **Visualization**: Streamlit, Plotly, Matplotlib, ReportLab
    `
  }
];

const MarkdownComponents = {
  h1: ({node, ...props}) => <h1 className="text-2xl md:text-3xl font-bold mt-6 mb-4 text-white" {...props} />,
  h2: ({node, ...props}) => <h2 className="text-xl md:text-2xl font-bold mt-10 mb-3 text-blue-50 border-b border-white-50/20 pb-2" {...props} />,
  h3: ({node, ...props}) => <h3 className="text-lg md:text-xl font-bold mt-6 mb-2 text-white" {...props} />,
  p: ({node, ...props}) => <p className="text-white-50 text-sm md:text-base leading-relaxed mb-4" {...props} />,
  a: ({node, ...props}) => <a className="text-blue-50 hover:text-white underline transition-colors" target="_blank" rel="noreferrer" {...props} />,
  ul: ({node, ...props}) => <ul className="list-disc pl-6 space-y-1.5 mb-4 text-white-50 text-sm md:text-base" {...props} />,
  ol: ({node, ...props}) => <ol className="list-decimal pl-6 space-y-1.5 mb-4 text-white-50 text-sm md:text-base" {...props} />,
  li: ({node, ...props}) => <li className="pl-1" {...props} />,
  blockquote: ({node, ...props}) => <blockquote className="border-l-4 border-blue-50 pl-4 italic text-white-50 bg-black-200/50 py-2 pr-4 rounded-r-lg my-6" {...props} />,
  code: ({node, inline, ...props}) => 
    inline 
      ? <code className="bg-black-300 text-blue-50 px-1.5 py-0.5 rounded font-mono text-sm" {...props} />
      : <pre className="bg-black-300 p-4 rounded-lg overflow-x-auto my-6 border border-white-50/10"><code className="text-white-50 font-mono text-sm" {...props} /></pre>,
  img: ({node, ...props}) => <img className="max-w-full h-auto rounded-xl border border-white-50/10 my-8 shadow-2xl" {...props} />,
  hr: ({node, ...props}) => <hr className="border-white-50/20 my-10" {...props} />,
  table: ({node, ...props}) => <div className="overflow-x-auto my-8"><table className="w-full text-left border-collapse" {...props} /></div>,
  th: ({node, ...props}) => <th className="border-b border-white-50/20 py-3 px-4 font-bold text-white bg-black-200 text-sm md:text-base" {...props} />,
  td: ({node, ...props}) => <td className="border-b border-white-50/10 py-3 px-4 text-white-50 text-sm md:text-base" {...props} />,
  em: ({node, ...props}) => <em className="text-blue-50/90 font-semibold italic" {...props} />,
};

const ProjectsWindow = ({ onBack, initialProject = "ashenritual" }) => {
  const [activeTab, setActiveTab] = useState(initialProject);
  const [markdownContent, setMarkdownContent] = useState("");

  // Update markdown content when active tab changes
  useEffect(() => {
    const project = projectsData.find(p => p.id === activeTab);
    if (project) {
      setMarkdownContent(project.markdown);
    }
  }, [activeTab]);

  return (
    <div className="fixed inset-0 z-[1000] bg-black flex flex-col w-full h-full overflow-hidden">
      
      {/* Header Area & Tabs Inline */}
      <div className="flex-none flex items-center p-2 md:px-6 md:py-2 border-b border-white-50/10 bg-black-100/40 backdrop-blur-md z-20">
        
        {/* Left Side: Back Button */}
        <div className="flex-none">
          <button
            onClick={onBack}
            className="flex items-center justify-center gap-1 md:gap-2 px-3 py-1.5 md:px-5 md:py-2 rounded-full border border-white-50/20 text-white-50 hover:text-white hover:border-white transition-all duration-300 group bg-black-200/50"
          >
            <svg className="w-4 h-4 md:w-5 md:h-5 transition-transform duration-300 group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span className="font-semibold uppercase text-xs md:text-sm tracking-wider">Back</span>
          </button>
        </div>
        
        {/* Middle: Tabs */}
        <div className="flex-1 flex flex-row gap-2 md:gap-3 overflow-x-auto custom-scrollbar justify-start md:justify-center px-4 py-1">
            {projectsData.map((project) => (
              <button
                key={project.id}
                onClick={() => setActiveTab(project.id)}
                className={`text-center px-3 py-1.5 md:px-4 md:py-2 rounded-full transition-all duration-300 shrink-0 ${
                  activeTab === project.id
                    ? "bg-white text-black font-bold shadow-md scale-[1.05]"
                    : "text-white-50 hover:bg-white-50/10 hover:text-white font-semibold"
                }`}
              >
                <div className="text-[10px] md:text-xs tracking-wide uppercase">{project.name}</div>
              </button>
            ))}
        </div>

        {/* Right Side Spacer for perfect centering */}
        <div className="flex-none w-[70px] md:w-[100px] hidden md:block" />
      </div>

      <div className="flex-1 flex flex-col overflow-hidden relative">
        
        {/* Galaxy Background */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <Galaxy 
            mouseRepulsion={true}
            mouseInteraction={true}
            density={1.5}
            glowIntensity={0.25}
            saturation={0.0}
            twinkleIntensity={0.45}
          />
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto custom-scrollbar relative z-10 scroll-smooth">
          <div className="max-w-4xl mx-auto p-6 md:p-12 lg:p-16">
            
            {/* Conditional Screenshot Area */}
            {activeTab === "ashenritual" ? (
              <div className="flex flex-col gap-6 mb-12">
                <AccordionGallery 
                  items={ashenritualImagesRow1}
                  height={300}
                  defaultIndex={1}
                  expandRatio={0.7}
                />
                <AccordionGallery 
                  items={ashenritualImagesRow2}
                  height={300}
                  defaultIndex={2}
                  expandRatio={0.7}
                />
              </div>
            ) : (
              <div className="w-full aspect-[21/9] bg-black-200/80 rounded-2xl border border-white-50/10 mb-8 flex flex-col items-center justify-center overflow-hidden relative group backdrop-blur-sm">
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-50/10 to-transparent opacity-50 group-hover:opacity-100 transition-opacity duration-700" />
                <svg className="w-10 h-10 md:w-12 md:h-12 text-white-50 mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <p className="text-white-50 font-mono text-xs md:text-sm tracking-widest uppercase">Screenshots Placeholder</p>
                <p className="text-white-50/50 text-[10px] md:text-xs mt-2">Images will be added here</p>
              </div>
            )}

            {/* Markdown Content */}
            <div className="prose prose-invert max-w-none">
              <div className="markdown-body animate-fadeIn">
                <ReactMarkdown 
                  remarkPlugins={[remarkGfm]}
                  components={MarkdownComponents}
                >
                  {markdownContent}
                </ReactMarkdown>
              </div>
            </div>

            {/* View Repository Button */}
            <div className="mt-12 border-t border-white-50/20 pt-8 flex justify-center">
              <a 
                href={projectsData.find(p => p.id === activeTab)?.repoUrl} 
                target="_blank" 
                rel="noreferrer"
                className="inline-flex items-center gap-2 md:gap-3 px-6 py-3 md:px-8 md:py-4 rounded-xl bg-white text-black text-sm md:text-base font-bold hover:bg-white-50 transition-colors group"
              >
                <span>View Full Repository on GitHub</span>
                <svg className="w-4 h-4 md:w-5 md:h-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
              </a>
            </div>

          </div>
        </div>
      </div>

    </div>
  );
};

export default ProjectsWindow;
