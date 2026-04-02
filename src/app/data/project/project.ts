import {
  ProjectCategory,
  Project,
  ProjectStatus,
} from "@/app/types/project/project.type";

export const projectData: Project[] = [
  {
    id: 6,
    title: "Functional Distributed Racing Data Pipeline",
    description:
      "A fault-tolerant batch pipeline for marathon telemetry. It leverages Referential Transparency and Strong Typing to reconcile inconsistent multi-source data (XLSX & IoT) with 100% deterministic results.",
    highlights: [
      "Batch ETL pipeline (Bronze → Silver → Gold)",
      "Resolved inconsistent data (Excel > IoT priority rule)",
      "Modeled ETL as Pure Functions using **Cats Effect** for safe side-effect management.",
      "Orchestrated DAG workflows using Argo Workflows",
      "Distributed processing with Apache Spark",
    ],
    image: "/assets/project/fp_demo.png",
    stack: {
      backend: ["Scala"],
      pipeline: ["Apache Spark", "Hadoop (HDFS)", "Argo Workflows"],
      infra: ["Kubernetes", "Spark Operator", "Helm"],
    },
    links: {
      github: "https://github.com/PatiphanAK/fp_project_demo",
      demo: null,
    },
    metrics: {
      goal: "Demonstrated Idempotency and Fault Tolerance via Pure Functions.",
      data_quality: "Resolved inconsistent records via deterministic rules",
    },
    status: ProjectStatus.Active,
    type: "data",
    categories: [ProjectCategory.Backend],
  },
  {
    id: 5,
    title: "Math for IT: Practical Notebooks",
    description:
      "A code-driven mathematical guide covering core concepts from Calculus, Linear Algebra, and Probability, bridging the gap between theory and IT applications.",
    highlights: [
      "Interactive visualizations using Matplotlib & Seaborn",
      "Symbolic computation implementations with SymPy",
      "Large-scale numerical operations using NumPy",
      "Documented core concepts for Computer Science students",
    ],
    image: "/assets/project/math_for_it.png",
    stack: {
      frontend: ["Jupyter Notebook"],
      backend: ["Python"],
      ml: ["NumPy", "SymPy", "Matplotlib", "Seaborn"],
    },
    links: {
      github: "https://github.com/PatiphanAK/math-for-it",
      demo: null,
    },
    metrics: {
      core_foundations: "Calculus, Linear Algebra, Statistics & Discrete Math",
      advanced_analysis:
        "Stochastic Processes, Information Theory & Optimization",
      approach: "Code-First Visualizations & Algorithm Implementations",
      practical_use: "ML Optimization, Signal Processing & System Reliability",
    },
    status: ProjectStatus.InProgress,
    type: "notebook",
    categories: [ProjectCategory.Notebook],
  },
  {
    id: 4,
    title: "Agentic Medical Doc Analysis (CMKL)",
    description:
      "Advanced Thai medical document analysis system developed during CMKL Hackathon. Combines OCR with LLMs for intelligent question-answering over clinical records.",
    highlights: [
      "Integrated Typhoon OCR for high-accuracy Thai text extraction",
      "Designed RAG pipeline for medical document QA",
      "Asynchronous backend processing via FastAPI",
      "Implemented Agentic workflows for complex query handling",
    ],
    image: "/assets/project/cmkl_agentic_healthcare.png",
    stack: {
      backend: ["FastAPI", "Python"],
      ml: ["PyTorch", "Typhoon OCR", "LLM", "LangChain"],
      pipeline: ["RAG"],
    },
    links: {
      github: "https://github.com/PatiphanAK/cmkl-med-hackathon",
      demo: null,
    },
    metrics: {
      capability: "OCR + Semantic Search + QA",
      domain: "Thai Medical Healthcare",
    },
    status: ProjectStatus.Legacy,
    type: "ml-system",
    categories: [ProjectCategory.AIML],
  },
  {
    id: 3,
    title: "Coral Detection MLOps",
    description:
      "End-to-end ML pipeline for coral detection with real-time monitoring.",
    highlights: [
      "Fine-tuned YOLOv12 on coral dataset",
      "Visualized model decisions with Grad-CAM",
      "Tracked experiments via MLflow",
      "Real-time metrics via Prometheus + Grafana",
    ],
    image: "/assets/project/basic_object_detection.png",
    stack: {
      frontend: ["VanillaJS"],
      backend: ["FastAPI"],
      ml: ["PyTorch", "GradCAM"],
      pipeline: ["MLflow"],
      infra: ["Prometheus", "Grafana"],
    },
    links: {
      github: "https://github.com/PatiphanAK/object_detection_basic",
      demo: null,
    },
    metrics: {
      accuracy: "92%",
    },
    status: ProjectStatus.Legacy,
    type: "ml-system",
    categories: [ProjectCategory.FullStack],
  },
  {
    id: 2,
    title: "League of Quiz: Real-time Interactive App",
    description:
      "A robust real-time quiz platform featuring secure authentication and instant state synchronization for interactive learning.",
    highlights: [
      "Real-time communication using Gorilla WebSockets",
      "Secure Google OAuth 2.0 with HTTP-only cookie session",
      "Modern SSR/CSR frontend using Nuxt 3",
      "High-performance Go Fiber backend architecture",
    ],
    image: "/assets/project/quiz.png",
    stack: {
      frontend: ["Nuxt 3", "Vue 3", "TailwindCSS"],
      backend: ["Go", "Fiber", "Websocket", "Redis"],
      pipeline: ["GitHub Actions"],
      infra: ["Docker", "Google Cloud OAuth"],
    },
    links: {
      github: "https://github.com/PatiphanAK/leauge-of-quiz",
      demo: null,
    },
    metrics: {
      sync: "Low-latency WebSocket updates",
      security: "Secure OAuth2 Flow with SSR support",
    },
    status: ProjectStatus.Legacy,
    type: "realtime",
    categories: [ProjectCategory.FullStack, ProjectCategory.RealTimeApp],
  },
  {
    id: 1,
    title: "On-Device Image Depth Estimation",
    description:
      "A high-performance tool for estimating depth from 2D images. Utilizes a U-Net architecture with a ResNet backbone, optimized for cross-platform inference via the ONNX runtime.",
    highlights: [
      "Optimized PyTorch model using ONNX for 3x faster inference",
      "Built high-concurrency REST API using Go Fiber",
      "Implemented seamless U-Net + ResNet feature extraction",
      "Cross-platform support for efficient edge-device deployment",
    ],
    image: "/assets/project/image_depth.png",
    stack: {
      frontend: ["VanillaJS"],
      backend: ["Go", "Fiber"],
      ml: ["PyTorch", "ONNX", "U-Net", "ResNet"],
      pipeline: ["Docker"],
      infra: ["Self-hosted"],
    },
    links: {
      github: "https://github.com/PatiphanAK/image-depth-estimation",
      demo: null,
    },
    metrics: {
      latency: "Sub-200ms inference on standard CPUs",
      optimization: "Model size reduced via ONNX quantization",
    },
    status: ProjectStatus.Legacy,
    type: "ml-system",
    categories: [ProjectCategory.FullStack, ProjectCategory.AIML],
  },
].sort((a, b) => b.id - a.id) as unknown as Project[];
