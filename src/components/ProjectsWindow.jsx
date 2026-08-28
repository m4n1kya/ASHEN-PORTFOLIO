import { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import Galaxy from "./reactbits/Galaxy";
import MorphSlider from "./reactbits/MorphSlider";
import GooeyNav from "./reactbits/GooeyNav";

const ashenritualImages = [
  { image: "/projects/ashenritual/Screenshot%202026-08-23%20154953.jpg" },
  { image: "/projects/ashenritual/Screenshot%202026-08-23%20155012.jpg" },
  { image: "/projects/ashenritual/Screenshot%202026-08-23%20155110.jpg" },
  { image: "/projects/ashenritual/Screenshot%202026-08-23%20155130.jpg" },
  { image: "/projects/ashenritual/Screenshot%202026-08-23%20155209.jpg" },
  { image: "/projects/ashenritual/Screenshot%202026-08-23%20155233.jpg" },
  { image: "/projects/ashenritual/Screenshot%202026-08-23%20155333.jpg" }
];

const ashenVectorImages = [
  { image: "/projects/ashen-vector/Screenshot%202026-08-24%20144308.jpg" },
  { image: "/projects/ashen-vector/Screenshot%202026-08-24%20144322.jpg" },
  { image: "/projects/ashen-vector/Screenshot%202026-08-24%20144339.jpg" },
  { image: "/projects/ashen-vector/Screenshot%202026-08-24%20144423.jpg" },
  { image: "/projects/ashen-vector/Screenshot%202026-08-24%20144443.jpg" },
  { image: "/projects/ashen-vector/Screenshot%202026-08-24%20144536.jpg" }
];

const ecoLoopImages = [
  { image: "/projects/beacon/Screenshot%202026-08-28%20105348.png" },
  { image: "/projects/beacon/Screenshot%202026-08-28%20105409.png" },
  { image: "/projects/beacon/Screenshot%202026-08-28%20105421.png" },
  { image: "/projects/beacon/Screenshot%202026-08-28%20105439.png" },
  { image: "/projects/beacon/Screenshot%202026-08-28%20105457.png" },
  { image: "/projects/beacon/Screenshot%202026-08-28%20105509.png" },
  { image: "/projects/beacon/Screenshot%202026-08-28%20105522.png" }
];

const unieaseImages = [
  { image: "/projects/uni-verse/Screenshot%202026-08-28%20104912.png" },
  { image: "/projects/uni-verse/Screenshot%202026-08-28%20104924.png" },
  { image: "/projects/uni-verse/Screenshot%202026-08-28%20104948.png" },
  { image: "/projects/uni-verse/Screenshot%202026-08-28%20105004.png" },
  { image: "/projects/uni-verse/Screenshot%202026-08-28%20105012.png" },
  { image: "/projects/uni-verse/Screenshot%202026-08-28%20105025.png" },
  { image: "/projects/uni-verse/Screenshot%202026-08-28%20105036.png" },
  { image: "/projects/uni-verse/Screenshot%202026-08-28%20105048.png" },
  { image: "/projects/uni-verse/Screenshot%202026-08-28%20105058.png" },
  { image: "/projects/uni-verse/Screenshot%202026-08-28%20105121.png" }
];

const projectsData = [
  {
    id: "ashenritual",
    name: "ASHENRITUAL",
    repoUrl: "https://github.com/m4n1kya/ASHENRITUAL",
    liveUrl: "https://ashenritual.vercel.app",
    shortDescription: "ASHENRITUAL is a production-grade, headless e-commerce platform built to seamlessly merge the tactile experience of luxury fashion with the computational power of artificial intelligence. Engineered entirely on a modern TypeScript micro-architecture, the application delivers a cinematic user interface optimized for high-performance rendering.",
    markdown: `
# ASHENRITUAL
*Luxury Fashion • Artificial Intelligence • Modern Web Engineering*

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
    id: "uni-verse",
    name: "UNI-VERSE",
    repoUrl: "https://github.com/m4n1kya/Uni-Verse",
    liveUrl: "https://uni-verse-swart.vercel.app/",
    shortDescription: "UniVerse is a modern university resource management platform designed to centralize essential campus services into a single, responsive web application. It simplifies access to important university resources by providing students with a unified platform for academic and campus-related information.",
    markdown: `
# UNI-VERSE
*Campus Resource Optimization Ecosystem*

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
    id: "beacon",
    name: "BEACON",
    repoUrl: "https://github.com/m4n1kya/Beacon",
    liveUrl: "https://beacon-fuqtpoomdhrfdzhksccvvu.streamlit.app/",
    shortDescription: "Beacon – Building Energy Analytics & Control Optimization Network is an advanced AI-powered building energy optimization system that combines EnergyPlus building simulation with a locally hosted Large Language Model (LLM). It automatically analyzes building performance, recommends HVAC optimization strategies, modifies building control parameters, and evaluates energy savings through an iterative closed-loop workflow.",
    markdown: `
# BEACON
*Building Energy Analytics & Control Optimization Network*

## The Problem & Solution
Commercial buildings consume a significant portion of global electricity, with HVAC systems accounting for one of the largest energy loads. Traditional EnergyPlus workflows require engineers to manually analyze large simulation outputs and tune HVAC schedules. Beacon automates this entirely.

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
  },
  {
    id: "ashen-vector",
    name: "ASHEN-VECTOR",
    repoUrl: "https://github.com/m4n1kya/ASHEN-VECTOR",
    shortDescription: "ASHEN-VECTOR is an experimental quantitative market intelligence and systematic research platform built around Qlib-compatible market data infrastructure. It provides a modular architecture for quantitative factor research, statistical analysis, machine learning-based prediction, probability calibration, and systematic backtesting.",
    markdown: `
# ASHEN-VECTOR
*Quantitative Market Intelligence Platform*

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
  }
];

const MarkdownComponents = {
  h1: ({node, ...props}) => <h1 className="text-2xl md:text-3xl font-bold mt-0 mb-4 text-white" {...props} />,
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

  const handleTabChange = (newTabId) => {
    if (newTabId === activeTab) return;
    setActiveTab(newTabId);
  };

  return (
    <div className="projects-window fixed inset-0 z-[1000] bg-black flex flex-col w-full h-full overflow-hidden">
      
      {/* Global Galaxy Background (Behind Everything) */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <Galaxy 
          mouseRepulsion={true}
          mouseInteraction={true}
          density={1.5}
          glowIntensity={0.25}
          saturation={0.0}
          twinkleIntensity={0.45}
        />
      </div>

      {/* Floating Header Elements (Fixes GooeyNav mix-blend-mode) */}
      <div className="absolute top-0 left-0 w-full p-4 md:p-6 z-[50] pointer-events-none">
        
        {/* Left Side: Back Button */}
        <div className="pointer-events-auto inline-block">
          <button
            onClick={onBack}
            className="flex items-center justify-center gap-1 md:gap-2 px-3 py-1.5 md:px-5 md:py-2 rounded-full text-white/40 hover:text-white transition-all duration-300 group bg-transparent"
          >
            <svg className="w-4 h-4 md:w-5 md:h-5 transition-transform duration-300 group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span className="font-semibold uppercase text-xs md:text-sm tracking-wider">Back</span>
          </button>
        </div>
        
        {/* Middle: Floating Tabs */}
        <div className="absolute left-0 w-full md:left-1/2 md:-translate-x-1/2 md:w-auto top-16 md:top-6 pointer-events-auto flex justify-center z-[51]">
          <GooeyNav 
            items={projectsData}
            activeIndex={projectsData.findIndex(p => p.id === activeTab)}
            onChange={(index) => handleTabChange(projectsData[index].id)}
          />
        </div>

      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden relative z-10 pt-32 md:pt-24 bg-transparent">
        
        {/* Content Container */}
        <div className="flex-1 overflow-y-auto lg:overflow-hidden relative z-10 flex flex-col bg-transparent">
          <div className="w-full flex-1 lg:h-full max-w-[1800px] mx-auto p-6 md:p-8 lg:p-12 xl:px-16 flex flex-col lg:flex-row gap-8 lg:gap-12 xl:gap-16">
            
            {/* Left Side: Fixed on Desktop (Slider + Beautiful Info Card) */}
            <div className="w-full lg:w-[60%] lg:h-full lg:overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] flex flex-col gap-6 z-20 pb-8 lg:pb-16">
              
              <div className="w-full aspect-[2559/1273] relative rounded-2xl overflow-hidden shadow-2xl border border-white-50/10 shrink-0 bg-[#0c0c0e]">
                
                {/* Render ALL sliders simultaneously — no remounting, no white flash */}
                {projectsData.map(project => {
                  const isActive = project.id === activeTab;
                  const images = (() => {
                    switch (project.id) {
                      case "ashenritual": return ashenritualImages;
                      case "uni-verse": return unieaseImages;
                      case "ashen-vector": return ashenVectorImages;
                      case "beacon": return ecoLoopImages;
                      default: return ashenritualImages;
                    }
                  })();
                  return (
                    <div
                      key={project.id}
                      className="absolute inset-0 z-10 bg-[#0c0c0e]"
                      style={{
                        opacity: isActive ? 1 : 0,
                        pointerEvents: isActive ? 'auto' : 'none',
                        transition: 'opacity 0.6s cubic-bezier(0.22, 1, 0.36, 1)',
                        zIndex: isActive ? 10 : 0,
                      }}
                    >
                      <MorphSlider 
                        items={images}
                        transition="melt" 
                        intensity={0.55} 
                        aberration={0.35} 
                        drift={0.4} 
                        autoplay={isActive}
                      />
                    </div>
                  );
                })}

              </div>
              
              {/* Short Description & Action Links (Desktop Only) */}
              <div className="hidden lg:block relative h-[160px] shrink-0 px-2 mt-2 bg-transparent">
                {projectsData.map(project => {
                  const isActive = project.id === activeTab;
                  return (
                    <div 
                      key={project.id}
                      className="absolute inset-0 flex flex-col text-white-50 z-10"
                      style={{
                        opacity: isActive ? 1 : 0,
                        pointerEvents: isActive ? 'auto' : 'none',
                        transition: 'opacity 0.5s cubic-bezier(0.22, 1, 0.36, 1)',
                      }}
                    >
                       <div className="flex items-center justify-between mb-3">
                         <h3 className="text-xl font-bold text-white tracking-widest uppercase">{project.name}</h3>
                         <div className="flex gap-3">
                           {project.liveUrl && (
                             <a href={project.liveUrl} target="_blank" rel="noreferrer" className="flex items-center gap-2 px-4 py-2 bg-white text-black text-xs font-bold rounded-lg hover:bg-white-50 transition-colors shadow-[0_0_15px_rgba(255,255,255,0.2)]">
                               <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                               Live Demo
                             </a>
                           )}
                           <a href={project.repoUrl} target="_blank" rel="noreferrer" className="flex items-center gap-2 px-4 py-2 bg-black-300 border border-white-50/20 text-white text-xs font-bold rounded-lg hover:bg-white-50/10 transition-colors">
                             <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                             Code
                           </a>
                         </div>
                       </div>
                       <p className="text-base leading-relaxed text-white-50/80 w-full">{project.shortDescription}</p>
                    </div>
                  );
                })}
              </div>
            </div>            {/* Right Side: Scrollable on Desktop */}
            <div className="w-full lg:w-[40%] lg:h-full relative z-10 pb-16 lg:pr-4 bg-transparent">
              {projectsData.map(project => {
                const isActive = project.id === activeTab;
                return (
                  <div 
                    key={project.id}
                    className={`absolute inset-0 lg:overflow-y-auto custom-scrollbar z-10 bg-black ${isActive ? '' : 'overflow-hidden'}`}
                    style={{
                      opacity: isActive ? 1 : 0,
                      pointerEvents: isActive ? 'auto' : 'none',
                      transition: 'opacity 0.6s cubic-bezier(0.22, 1, 0.36, 1)',
                    }}
                  >
                    <div className="prose prose-invert max-w-none pb-12 [&_*]:!bg-transparent">
                      <div>
                        <ReactMarkdown 
                          remarkPlugins={[remarkGfm]}
                          components={MarkdownComponents}
                        >
                          {project.markdown}
                        </ReactMarkdown>
                      </div>
                      
                      {/* Action Buttons */}
                      <div className="mt-12 mb-8 flex flex-wrap justify-start gap-4">
                        {project.repoUrl && (
                          <a 
                            href={project.repoUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-white text-black font-bold hover:scale-105 transition-transform duration-300 shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.5)]"
                          >
                            <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" aria-hidden="true">
                              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"></path>
                            </svg>
                            View Repository
                          </a>
                        )}
                        {project.liveUrl && (
                          <a 
                            href={project.liveUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-transparent border border-white/20 text-white font-bold hover:bg-white/5 hover:border-white/50 hover:scale-105 transition-all duration-300 shadow-[0_0_15px_rgba(255,255,255,0.05)] hover:shadow-[0_0_25px_rgba(255,255,255,0.15)] backdrop-blur-sm"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                            Live Preview
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectsWindow;
