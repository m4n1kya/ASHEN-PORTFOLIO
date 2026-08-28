const navLinks = [
  {
    name: "Home",
    link: "#hero",
  },
  {
    name: "About",
    link: "#about",
  },
  {
    name: "Experience",
    link: "#experience",
  },
  {
    name: "Projects",
    link: "#projects",
  },
  {
    name: "Skills",
    link: "#skills",
  },
  {
    name: "Contact",
    link: "#contact",
  },
];

const words = [
  { text: "Systems", imgPath: "/images/ideas.svg" },
  { text: "Architecture", imgPath: "/images/concepts.svg" },
  { text: "Scalability", imgPath: "/images/designs.svg" },
  { text: "Products", imgPath: "/images/code.svg" },
  { text: "Systems", imgPath: "/images/ideas.svg" },
  { text: "Architecture", imgPath: "/images/concepts.svg" },
  { text: "Scalability", imgPath: "/images/designs.svg" },
  { text: "Products", imgPath: "/images/code.svg" },
];

const counterItems = [
  { value: 500, suffix: "+", label: "Problems Solved" },
  { value: 7, suffix: "+", label: "Major Projects" },
  { value: 2, suffix: "", label: "Industry Internships" },
  { value: 10, suffix: "+", label: "Technologies Used" },
];

const logoIconsList = [
  { imgPath: "/images/logos/react.png", name: "React" },
  { imgPath: "/images/logos/python.svg", name: "Python" },
  { imgPath: "/images/logos/node.png", name: "Node.js" },
  { imgPath: "/images/logos/git.svg", name: "Git" },
  { imgPath: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg", name: "Java" },
  { imgPath: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg", name: "Tailwind CSS" },
  { imgPath: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg", name: "PostgreSQL" },
  { imgPath: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg", name: "Docker" },
  { imgPath: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg", name: "MongoDB" },
  { imgPath: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg", name: "Next.js" },
  { imgPath: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nestjs/nestjs-original.svg", name: "NestJS" },
  { imgPath: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-original-wordmark.svg", name: "AWS" },
  { imgPath: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg", name: "MySQL" },
];

const abilities = [
  {
    imgPath: "/images/code.svg",
    title: "Software Engineer",
    desc: "Building reliable software with strong foundations in data structures, algorithms, object-oriented programming, databases, and core computer science.",
  },
  {
    imgPath: "/images/seo.png",
    title: "Full-Stack Developer",
    desc: "Developing end-to-end applications across modern frontend frameworks, backend services, REST APIs, databases, authentication, and deployment.",
  },
  {
    imgPath: "/images/ideas.svg",
    title: "AI / Software Engineer",
    desc: "Building practical AI-powered applications using LLMs, NLP, RAG pipelines, and intelligent product features.",
  },
  {
    imgPath: "/images/concepts.svg",
    title: "Backend Engineer",
    desc: "Designing APIs, backend services, data models, and application logic using Node.js, Express, databases, and cloud technologies.",
  }
];

const techStackImgs = [
  { category: "Concepts", skills: ["Data Structures & Algorithms", "OOP", "DBMS", "Operating Systems", "Computer Networks", "REST APIs", "JWT"] },
  { category: "Languages & Frameworks", skills: ["Java", "JavaScript", "TypeScript", "SQL", "React.js", "Next.js", "Node.js", "Express.js", "NestJS", "Prisma"] },
  { category: "Tools, Cloud & AI", skills: ["Git", "GitHub", "Docker", "AWS", "Kubernetes", "CI/CD", "Google Gemini API", "Qwen2.5", "Ollama"] }
];

const techStackIcons = [
  {
    name: "Java",
    modelPath: "/models/jv-transformed.glb",
    scale: 1.4,
    rotation: [Math.PI / 15, 0, 0],
    position: [0, -0.6, 0],
  },
  {
    name: "Python",
    modelPath: "/models/python-transformed.glb",
    scale: 0.8,
    rotation: [0, 0, 0],
  },
  {
    name: "React",
    modelPath: "/models/react_logo-transformed.glb",
    scale: 1,
    rotation: [0, 0, 0],
  },
  {
    name: "Node.js",
    modelPath: "/models/node-transformed.glb",
    scale: 5,
    rotation: [0, -Math.PI / 2, 0],
  },
  {
    name: "Git",
    modelPath: "/models/git-svg-transformed.glb",
    scale: 0.05,
    rotation: [0, -Math.PI / 4, 0],
  },
];

const expCards = [
  {
    leftTitle: "SOFTWARE ENGINEERING",
    leftContent: [
      "Backend Development",
      "API Development",
      "Database Engineering",
      "System Design",
      "Software Architecture",
      "Problem Solving"
    ],
    company: "MPOnline Limited (Govt. of MP & TCS JV)",
    title: "Advanced Software Engineering & Development Intern",
    date: "May 2026 - August 2026 | Bhopal, India",
    responsibilities: [
      "Built REST APIs and backend components using Java, C++, Python, and SQL in an industry-oriented engineering program.",
      "Applied SDLC and Agile methodologies across 6 sprints with comprehensive unit and integration testing for live projects.",
      "Tested 20+ API endpoints using Postman, documented with Swagger, and managed code with Git for version control.",
      "Collaborated with senior engineers on database design and systematic debugging to deliver reliable software features."
    ],
  },
  {
    leftTitle: "FULL-STACK DEVELOPMENT",
    leftContent: [
      "React.js · Node.js",
      "Express.js · MongoDB",
      "REST APIs",
      "Frontend Development",
      "Backend Development",
      "API Integration"
    ],
    company: "Ethnus",
    title: "MERN Stack Intern",
    date: "July 2024 - October 2024 | Remote",
    responsibilities: [
      "Developed 4 full-stack application modules using MongoDB, Express.js, React.js, and Node.js with modular component architecture.",
      "Built 15+ RESTful APIs with JWT-based authentication and secure CRUD operations for core application features.",
      "Created 10+ responsive React interfaces using Redux for state management and Tailwind CSS for consistent styling.",
      "Optimized MongoDB queries with strategic indexing and aggregation pipelines, reducing API response latency by 40%."
    ],
  }
];

const expLogos = [
  { name: "MPOnline", imgPath: "/images/fav.png" },
  { name: "Ethnus", imgPath: "/images/fav.png" },
];

const testimonials = [];

const socialImgs = [
  { name: "github", imgPath: "/images/x.png", url: "https://github.com/m4n1kya/" },
  { name: "linkedin", imgPath: "/images/linkedin.png", url: "https://www.linkedin.com/in/m4n1kya/" },
  { name: "x", imgPath: "/images/x.png", url: "https://x.com/m4n1kya" },
  { name: "email", imgPath: "/images/chat.png", url: "mailto:m4n1kya2005@gmail.com" }
];

export {
  words,
  abilities,
  logoIconsList,
  counterItems,
  expCards,
  expLogos,
  testimonials,
  socialImgs,
  techStackIcons,
  techStackImgs,
  navLinks,
};
