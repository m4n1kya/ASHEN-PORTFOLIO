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

const counterItems = [];

const logoIconsList = [
  { imgPath: "/images/logos/react.png", name: "React" },
  { imgPath: "/images/logos/python.svg", name: "Python" },
  { imgPath: "/images/logos/node.png", name: "Node.js" },
  { imgPath: "/images/logos/three.png", name: "Three.js" },
  { imgPath: "/images/logos/git.svg", name: "Git" },
  { imgPath: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg", name: "Java" },
  { imgPath: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg", name: "Tailwind CSS" },
  { imgPath: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg", name: "PostgreSQL" },
  { imgPath: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg", name: "Docker" },
  { imgPath: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg", name: "MongoDB" },
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
  { category: "Languages", skills: ["Java", "Python", "JavaScript", "TypeScript", "C++", "SQL"] },
  { category: "Frontend", skills: ["React.js", "Next.js", "HTML5", "CSS3", "Tailwind CSS", "Redux", "Framer Motion", "Radix UI"] },
  { category: "Backend & Databases", skills: ["Node.js", "Express.js", "NestJS", "REST APIs", "JWT", "PostgreSQL", "MySQL", "MongoDB", "Prisma"] },
  { category: "CS Fundamentals", skills: ["Data Structures & Algorithms", "OOP", "DBMS", "Operating Systems", "Computer Networks"] },
  { category: "AI / ML", skills: ["Google Gemini API", "Qwen2.5", "Ollama"] },
  { category: "Cloud & Tools", skills: ["AWS", "Docker", "Kubernetes", "CI/CD", "Git", "GitHub", "Postman", "Swagger/OpenAPI"] },
];

const techStackIcons = [
  {
    name: "React",
    modelPath: "/models/react_logo-transformed.glb",
    scale: 1,
    rotation: [0, 0, 0],
  },
  {
    name: "Python",
    modelPath: "/models/python-transformed.glb",
    scale: 0.8,
    rotation: [0, 0, 0],
  },
  {
    name: "Node.js",
    modelPath: "/models/node-transformed.glb",
    scale: 5,
    rotation: [0, -Math.PI / 2, 0],
  },
  {
    name: "Java",
    modelPath: "/models/java-transformed.glb",
    scale: 0.8,
    rotation: [0, 0, 0],
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
    company: "MPOnline Limited",
    title: "Advanced Software Engineering & Development Intern",
    date: "May 2026 - August 2026",
    responsibilities: [
      "Built and maintained scalable full-stack applications.",
      "Developed robust backend APIs and optimized database queries.",
      "Collaborated on system design and architectural improvements.",
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
    date: "2024",
    responsibilities: [
      "Designed and implemented RESTful APIs using Node.js and Express.",
      "Built dynamic frontend interfaces with React.",
      "Managed application state and integrated MongoDB databases.",
    ],
  }
];

const expLogos = [
  { name: "MPOnline", imgPath: "/images/fav.png" },
  { name: "Ethnus", imgPath: "/images/fav.png" },
];

const testimonials = [];

const socialImgs = [
  { name: "github", imgPath: "/images/x.png", url: "https://github.com/m4n1kya" }, // using 'x.png' as placeholder for github icon if it doesn't exist
  { name: "linkedin", imgPath: "/images/linkedin.png", url: "YOUR_LINKEDIN" },
  { name: "email", imgPath: "/images/chat.png", url: "YOUR_EMAIL" }
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
