import {
  ProjectCategory,
  Project,
  ProjectStatus,
} from "@/app/types/project/project.type";

export const projectData: Project[] = [
  {
    id: 1,
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

    status: ProjectStatus.Active,
    type: "ml-system",
    categories: [ProjectCategory.FullStack],
  },
  {
    id: 2,
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
      frontend: [],
      backend: ["Scala"],
      ml: [],
      pipeline: ["Apache Spark", "Hadoop (HDFS)", "Argo Workflows"],
      infra: ["Kubernetes", "Spark Operator", "Helm"],
    },

    links: {
      github: "https://github.com/PatiphanAK/fp_project_demo",
      demo: null,
    },

    metrics: {
      goal: "Demonstrated **Idempotency** and **Fault Tolerance**: Students learn how Pure Functions allow the pipeline to safely retry failed tasks on Kubernetes/Spark without data duplication or state corruption.",
      data_quality: "Resolved inconsistent records via deterministic rules",
    },

    status: ProjectStatus.Active,
    type: "data",
    categories: [ProjectCategory.Backend],
  },
];
// export const projectData: Project[] = [
//   {
//     id: 1,
//     title: "Object detection basic",
//     description:
//       "Full-Stack MLOps for Green Coral Detection. Fine-tuned YOLOv12n analyzed with Grad-CAM, tracked by MLflow, and monitored in real-time using Prometheus/Grafana visualization via a basic Web UI.",
//     image: "/assets/project/basic_object_detection.png",
//     githubURL: "https://github.com/PatiphanAK/object_detection_basic",
//     techStack: [
//       "FastAPI",
//       "PyTorch",
//       "PyTorch-GRADCAM",
//       "OpenCV",
//       "MLflow",
//       "VanillaJS",
//     ],
//     tool: null,
//     website: null,
//     status: ProjectStatus.Active,
//     categories: [ProjectCategory.FullStack],
//   },
//   {
//     id: 5,
//     title: "Math for IT",
//     description:
//       "A practical, code-driven mathematics notebook covering core topics from Calculus Linear Algebra Probability. It provides hands-on examples and visualizations using Python libraries like NumPy, SymPy, and Matplotlib.",
//     image: "/assets/project/math_for_it.png",
//     githubURL: "https://github.com/PatiphanAK/math-for-it",
//     techStack: ["Python", "NumPy", "SymPy", "Matplotlib"],
//     tool: null,
//     website: null,
//     status: ProjectStatus.InProgress,
//     categories: [ProjectCategory.Notebook],
//   },
//   {
//     id: 4,
//     title: "CMKL Hackathon",
//     description:
//       "A Thai medical document analysis system using Typhoon OCR for enhanced text extraction and advanced language models for question-answering. Developed with a FastAPI backend and PyTorch for model inference.",
//     image: "/assets/project/cmkl_agentic_healthcare.png",
//     githubURL: "https://github.com/PatiphanAK/cmkl-med-hackathon",
//     techStack: ["FastAPI", "PyTorch", "OCR", "LLM", "Python"],
//     tool: null,
//     website: null,
//     status: ProjectStatus.InProgress,
//     categories: [ProjectCategory.AIML],
//   },
//   {
//     id: 2,
//     title: "Quiz App",
//     description:
//       "An interactive quiz application. Developed with Fiber backend, Gorilla WebSocket for real-time interactions, and Nuxt 3 frontend. Features Google OAuth2.0 authentication with secure HTTP cookie implementation.",
//     image: "/assets/project/quiz.png",
//     githubURL: "https://github.com/PatiphanAK/leauge-of-quiz",
//     techStack: ["Go", "Fiber", "Websocket", "Nuxt 3", "OAuth"],
//     tool: null,
//     website: null,
//     status: ProjectStatus.Completed,
//     categories: [ProjectCategory.FullStack, ProjectCategory.RealTimeApp],
//   },
//   {
//     id: 6,
//     title: "Image Depth Estimation",
//     description:
//       "An interactive tool for estimating depth from a single 2D image. It leverages a pre-trained PyTorch model (U-Net with a ResNet backbone), converted to ONNX for efficient, cross-platform inference. The backend is built with the Go Fiber framework to serve the model via a REST API.",
//     image: "/assets/project/image_depth.png",
//     githubURL: "https://github.com/PatiphanAK/image-depth-estimation",
//     techStack: ["ONNX", "Fiber", "PyTorch", "U-Net", "ResNet"],
//     tool: "https://depth.patiphan.dev/",
//     website: null,
//     status: ProjectStatus.Legacy,
//     categories: [ProjectCategory.FullStack, ProjectCategory.AIML],
//   },
// ];
