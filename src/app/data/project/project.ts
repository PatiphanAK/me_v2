import { Project } from '@/app/types/project/project.type';

export const projectData: Project[] = [

  {
    id: 5,
    title: "Math for IT",
    description: "A practical, code-driven mathematics notebook covering core topics from Calculus Linear Algebra Probability. It provides hands-on examples and visualizations using Python libraries like NumPy, SymPy, and Matplotlib.",
    image: "/assets/project/math_for_it.png",
    githubURL: "https://github.com/PatiphanAK/math-for-it",
    techStack: ["Python", "NumPy", "SymPy", "Matplotlib"],
    tool: null,
    website: null,
    status: "In-Progress",
    category: "Notebook"
  },
  {
    id: 3,
    title: "Snap My Meal",
    description: "A RESTful API for food logging and analysis. Built with Rust's Axum framework and PostgreSQL for robust data management. The project includes a shell script for quick and easy setup of the development environment.",
    image: null,
    githubURL: "https://github.com/PatiphanAK/snap_my_meal",
    techStack: ["Rust", "Axum", "PostgreSQL", "REST", "Shell"],
    tool: null,
    website: null,
    status: "Active",
    category: "Backend"
  },
  {
    id: 4,
    title: "CMKL Hackathon",
    description: "A Thai medical document analysis system using Typhoon OCR for enhanced text extraction and advanced language models for question-answering. Developed with a FastAPI backend and PyTorch for model inference.",
    image: "/assets/project/cmkl_agentic_healthcare.png",
    githubURL: "https://github.com/PatiphanAK/cmkl-med-hackathon",
    techStack: ["FastAPI", "PyTorch", "OCR", "LLM", "Python"],
    tool: null,
    website: null,
    status: "Active",
    category: "AI/ML"
  },
  {
    id: 2,
    title: "Quiz App",
    description: "An interactive quiz application. Developed with Fiber backend, Gorilla WebSocket for real-time interactions, and Nuxt 3 frontend. Features Google OAuth2.0 authentication with secure HTTP cookie implementation.",
    image: "/assets/project/quiz.png",
    githubURL: "https://github.com/PatiphanAK/leauge-of-quiz",
    techStack: ["Go", "Fiber", "Websocket", "Nuxt 3", "OAuth"],
    tool: null,
    website: null,
    status: "Active",
    category: "Real-time App"
  },
  {
    id: 6,
    title: "Image Depth Estimation",
    description: "An interactive tool for estimating depth from a single 2D image. It leverages a pre-trained PyTorch model (U-Net with a ResNet backbone), converted to ONNX for efficient, cross-platform inference. The backend is built with the Go Fiber framework to serve the model via a REST API.",
    image: "/assets/project/image_depth.png",
    githubURL: "https://github.com/PatiphanAK/image-depth-estimation",
    techStack: ["ONNX", "Fiber", "PyTorch", "U-Net", "ResNet"],
    tool: "https://depth.patiphan.dev/",
    website: null,
    status: "Active",
    category: "AI/ML"
  },
  {
    id: 1,
    title: "Lend System",
    description: "A comprehensive system for lending and borrowing items. Built with Django Rest Framework and Vue 3, featuring a monolithic architecture with REST API integration. Perfect for managing item loans with user authentication and tracking.",
    image: null,
    githubURL: "https://github.com/PatiphanAK/lend_sys",
    techStack: ["Django", "Vue 3", "REST", "API"],
    tool: null,
    website: "https://lend.patiphan.dev/",
    status: "Legacy",
    category: "Full Stack"
  },
];