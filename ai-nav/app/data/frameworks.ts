export interface Framework {
  id: string;
  title: string;
  description: string;
  link: string;
  repoLink: string;
  docsLink: string;
  tags: string[];
  category: string;
  stars?: number;
}

export const frameworkCategories = [
  'All',
  'General Frameworks',
  'Computer Vision',
  'NLP Frameworks',
  'Graph Neural Networks',
  'Reinforcement Learning',
  'Model Deployment',
  'AutoML',
  'MLOps'
];

export const frameworks: Framework[] = [
  {
    id: 'pytorch',
    title: 'PyTorch',
    description: 'Deep learning framework developed by Facebook, known for its dynamic computation graph and Python-first design philosophy, popular among researchers',
    link: 'https://pytorch.org/',
    repoLink: 'https://github.com/pytorch/pytorch',
    docsLink: 'https://pytorch.org/docs/stable/index.html',
    tags: ['Deep Learning', 'Dynamic Graph', 'Python', 'General Framework'],
    category: 'General Frameworks',
    stars: 73000
  },
  {
    id: 'tensorflow',
    title: 'TensorFlow',
    description: 'End-to-end open-source machine learning platform developed by Google, supporting multiple languages and platforms with strong production deployment capabilities',
    link: 'https://www.tensorflow.org/',
    repoLink: 'https://github.com/tensorflow/tensorflow',
    docsLink: 'https://www.tensorflow.org/api_docs',
    tags: ['Deep Learning', 'Static Graph', 'Multi-platform', 'Enterprise-grade'],
    category: 'General Frameworks',
    stars: 177000
  },
  {
    id: 'huggingface',
    title: 'Hugging Face Transformers',
    description: 'Most popular NLP library providing thousands of pre-trained models and easy-to-use APIs, simplifying the use of Transformer models',
    link: 'https://huggingface.co/transformers/',
    repoLink: 'https://github.com/huggingface/transformers',
    docsLink: 'https://huggingface.co/docs/transformers/index',
    tags: ['NLP', 'Transformer', 'Pre-trained Models', 'Transfer Learning'],
    category: 'NLP Frameworks',
    stars: 115000
  },
  {
    id: 'jax',
    title: 'JAX',
    description: 'High-performance numerical computing library developed by Google, combining NumPy and automatic differentiation, designed for high-performance machine learning research',
    link: 'https://github.com/google/jax',
    repoLink: 'https://github.com/google/jax',
    docsLink: 'https://jax.readthedocs.io/',
    tags: ['High-performance Computing', 'Automatic Differentiation', 'GPU/TPU', 'Functional'],
    category: 'General Frameworks',
    stars: 25000
  },
  {
    id: 'keras',
    title: 'Keras',
    description: 'User-friendly deep learning API focused on fast experimentation, can be used with TensorFlow, CNTK, and Theano',
    link: 'https://keras.io/',
    repoLink: 'https://github.com/keras-team/keras',
    docsLink: 'https://keras.io/api/',
    tags: ['Deep Learning', 'High-level API', 'User-friendly', 'Rapid Prototyping'],
    category: 'General Frameworks',
    stars: 59000
  },
  {
    id: 'detectron2',
    title: 'Detectron2',
    description: 'Computer vision library developed by Facebook AI, implementing state-of-the-art object detection and segmentation algorithms',
    link: 'https://github.com/facebookresearch/detectron2',
    repoLink: 'https://github.com/facebookresearch/detectron2',
    docsLink: 'https://detectron2.readthedocs.io/',
    tags: ['Computer Vision', 'Object Detection', 'Image Segmentation', 'PyTorch'],
    category: 'Computer Vision',
    stars: 26000
  },
  {
    id: 'onnx',
    title: 'ONNX',
    description: 'Open Neural Network Exchange format allowing AI developers to transfer models between different frameworks, promoting framework interoperability',
    link: 'https://onnx.ai/',
    repoLink: 'https://github.com/onnx/onnx',
    docsLink: 'https://onnx.ai/onnx/intro/',
    tags: ['Model Exchange', 'Cross-framework', 'Deployment', 'Standardization'],
    category: 'Model Deployment',
    stars: 15000
  },
  {
    id: 'dgl',
    title: 'Deep Graph Library (DGL)',
    description: 'Framework specifically designed for graph neural networks, supporting PyTorch, TensorFlow, and MXNet backends',
    link: 'https://www.dgl.ai/',
    repoLink: 'https://github.com/dmlc/dgl',
    docsLink: 'https://docs.dgl.ai/',
    tags: ['Graph Neural Networks', 'GNN', 'Knowledge Graphs', 'Relational Data'],
    category: 'Graph Neural Networks',
    stars: 12000
  },
  {
    id: 'spacy',
    title: 'spaCy',
    description: 'Industrial-strength natural language processing library focused on efficient text processing and NLP tasks in production environments',
    link: 'https://spacy.io/',
    repoLink: 'https://github.com/explosion/spaCy',
    docsLink: 'https://spacy.io/api',
    tags: ['NLP', 'Text Processing', 'Named Entity Recognition', 'Dependency Parsing'],
    category: 'NLP Frameworks',
    stars: 27000
  },
  {
    id: 'stable-baselines3',
    title: 'Stable Baselines3',
    description: 'PyTorch version of reinforcement learning algorithms library, providing reliable implementations and user-friendly APIs',
    link: 'https://github.com/DLR-RM/stable-baselines3',
    repoLink: 'https://github.com/DLR-RM/stable-baselines3',
    docsLink: 'https://stable-baselines3.readthedocs.io/',
    tags: ['Reinforcement Learning', 'RL', 'PyTorch', 'Algorithm Implementation'],
    category: 'Reinforcement Learning',
    stars: 5700
  },
  {
    id: 'scikit-learn',
    title: 'scikit-learn',
    description: 'Simple and efficient tools for data analysis and machine learning built on NumPy, SciPy, and matplotlib, ideal for traditional ML algorithms',
    link: 'https://scikit-learn.org/',
    repoLink: 'https://github.com/scikit-learn/scikit-learn',
    docsLink: 'https://scikit-learn.org/stable/user_guide.html',
    tags: ['Machine Learning', 'Classification', 'Regression', 'Clustering', 'Python'],
    category: 'General Frameworks',
    stars: 55000
  },
  {
    id: 'fastai',
    title: 'fastai',
    description: 'Deep learning library built on top of PyTorch that simplifies training fast and accurate neural nets using modern best practices',
    link: 'https://www.fast.ai/',
    repoLink: 'https://github.com/fastai/fastai',
    docsLink: 'https://docs.fast.ai/',
    tags: ['Deep Learning', 'High-level API', 'Transfer Learning', 'Computer Vision', 'NLP'],
    category: 'General Frameworks',
    stars: 24000
  },
  {
    id: 'lightning',
    title: 'PyTorch Lightning',
    description: 'Lightweight PyTorch wrapper that helps organize code and scale complex models without the boilerplate code',
    link: 'https://www.pytorchlightning.ai/',
    repoLink: 'https://github.com/Lightning-AI/lightning',
    docsLink: 'https://pytorch-lightning.readthedocs.io/',
    tags: ['PyTorch', 'High-level API', 'Research', 'Production', 'Scalable'],
    category: 'General Frameworks',
    stars: 22000
  },
  {
    id: 'llama-index',
    title: 'LlamaIndex',
    description: 'Data framework for building LLM applications over external data to augment LLMs with private or domain-specific information',
    link: 'https://www.llamaindex.ai/',
    repoLink: 'https://github.com/jerryjliu/llama_index',
    docsLink: 'https://docs.llamaindex.ai/',
    tags: ['LLM', 'RAG', 'Information Retrieval', 'Document QA'],
    category: 'NLP Frameworks',
    stars: 26000
  },
  {
    id: 'langchain',
    title: 'LangChain',
    description: 'Framework for developing applications powered by language models through composability, including tools for chatbots, RAG, agents and more',
    link: 'https://langchain.com/',
    repoLink: 'https://github.com/langchain-ai/langchain',
    docsLink: 'https://python.langchain.com/docs/get_started/introduction',
    tags: ['LLM', 'Agents', 'RAG', 'Chains', 'Prompt Templates'],
    category: 'NLP Frameworks',
    stars: 73000
  },
  {
    id: 'transformers-js',
    title: 'Transformers.js',
    description: 'State-of-the-art Machine Learning for the web. Run 🤗 Transformers directly in your browser, with no need for a server',
    link: 'https://huggingface.co/docs/transformers.js',
    repoLink: 'https://github.com/xenova/transformers.js',
    docsLink: 'https://huggingface.co/docs/transformers.js/index',
    tags: ['Web', 'JavaScript', 'Browser ML', 'ONNX', 'Client-side'],
    category: 'NLP Frameworks',
    stars: 5800
  },
  {
    id: 'tensorrt',
    title: 'TensorRT',
    description: 'NVIDIA\'s high-performance deep learning inference optimizer and runtime that delivers low latency and high throughput',
    link: 'https://developer.nvidia.com/tensorrt',
    repoLink: 'https://github.com/NVIDIA/TensorRT',
    docsLink: 'https://docs.nvidia.com/deeplearning/tensorrt/developer-guide/index.html',
    tags: ['Inference', 'Optimization', 'NVIDIA', 'GPU Acceleration', 'Deployment'],
    category: 'Model Deployment',
    stars: 8000
  },
  {
    id: 'mlflow',
    title: 'MLflow',
    description: 'Platform for managing the ML lifecycle, including experimentation, reproducibility, deployment, and a central model registry',
    link: 'https://mlflow.org/',
    repoLink: 'https://github.com/mlflow/mlflow',
    docsLink: 'https://mlflow.org/docs/latest/index.html',
    tags: ['MLOps', 'Experiment Tracking', 'Model Registry', 'Deployment'],
    category: 'MLOps',
    stars: 15500
  },
  {
    id: 'kubeflow',
    title: 'Kubeflow',
    description: 'Machine Learning toolkit for Kubernetes dedicated to making deployments of ML workflows on Kubernetes simple, portable and scalable',
    link: 'https://www.kubeflow.org/',
    repoLink: 'https://github.com/kubeflow/kubeflow',
    docsLink: 'https://www.kubeflow.org/docs/',
    tags: ['Kubernetes', 'ML Pipelines', 'Orchestration', 'Enterprise'],
    category: 'MLOps',
    stars: 12700
  },
  {
    id: 'dvc',
    title: 'DVC (Data Version Control)',
    description: 'Version control system for machine learning projects, making models shareable and reproducible with Git-like interface',
    link: 'https://dvc.org/',
    repoLink: 'https://github.com/iterative/dvc',
    docsLink: 'https://dvc.org/doc',
    tags: ['Version Control', 'Data Management', 'Pipelines', 'Reproducibility'],
    category: 'MLOps',
    stars: 11800
  },
  {
    id: 'wandb',
    title: 'Weights & Biases',
    description: 'Machine learning experiment tracking, dataset versioning, and model management platform to streamline ML development',
    link: 'https://wandb.ai/',
    repoLink: 'https://github.com/wandb/wandb',
    docsLink: 'https://docs.wandb.ai/',
    tags: ['Experiment Tracking', 'Visualization', 'Collaboration', 'Model Monitoring'],
    category: 'MLOps',
    stars: 6300
  },
  {
    id: 'ultralytics-yolo',
    title: 'Ultralytics YOLOv8',
    description: 'Real-time object detection and image segmentation model that builds upon the success of previous YOLO versions',
    link: 'https://ultralytics.com/yolov8',
    repoLink: 'https://github.com/ultralytics/ultralytics',
    docsLink: 'https://docs.ultralytics.com/',
    tags: ['Object Detection', 'Computer Vision', 'YOLO', 'Real-time'],
    category: 'Computer Vision',
    stars: 17600
  },
  {
    id: 'albumentations',
    title: 'Albumentations',
    description: 'Fast and flexible image augmentation library for computer vision tasks with a simple unified API',
    link: 'https://albumentations.ai/',
    repoLink: 'https://github.com/albumentations-team/albumentations',
    docsLink: 'https://albumentations.ai/docs/',
    tags: ['Image Augmentation', 'Computer Vision', 'Preprocessing', 'Data Augmentation'],
    category: 'Computer Vision',
    stars: 12000
  },
  {
    id: 'mediapipe',
    title: 'MediaPipe',
    description: 'Google\'s framework for building multimodal perception ML pipelines, cross-platform and mobile-optimized',
    link: 'https://mediapipe.dev/',
    repoLink: 'https://github.com/google/mediapipe',
    docsLink: 'https://developers.google.com/mediapipe/framework/getting_started/overview',
    tags: ['Perception', 'Mobile ML', 'Face Detection', 'Pose Estimation', 'Cross-platform'],
    category: 'Computer Vision',
    stars: 23800
  },
  {
    id: 'autogluon',
    title: 'AutoGluon',
    description: 'AutoML framework that automates machine learning tasks enabling easy model building with minimal domain knowledge',
    link: 'https://auto.gluon.ai/',
    repoLink: 'https://github.com/autogluon/autogluon',
    docsLink: 'https://auto.gluon.ai/stable/index.html',
    tags: ['AutoML', 'Tabular Data', 'Image Classification', 'Object Detection'],
    category: 'AutoML',
    stars: 6800
  },
  {
    id: 'optuna',
    title: 'Optuna',
    description: 'Automatic hyperparameter optimization framework designed for machine learning with flexible API',
    link: 'https://optuna.org/',
    repoLink: 'https://github.com/optuna/optuna',
    docsLink: 'https://optuna.readthedocs.io/',
    tags: ['Hyperparameter Tuning', 'Optimization', 'AutoML', 'Parameter Search'],
    category: 'AutoML',
    stars: 8200
  },
  {
    id: 'ray-tune',
    title: 'Ray Tune',
    description: 'Scalable hyperparameter tuning library built on Ray, supporting distributed experiments and various search algorithms',
    link: 'https://docs.ray.io/en/latest/tune/index.html',
    repoLink: 'https://github.com/ray-project/ray',
    docsLink: 'https://docs.ray.io/en/latest/tune/index.html',
    tags: ['Hyperparameter Tuning', 'Distributed Computing', 'Scalable', 'AutoML'],
    category: 'AutoML',
    stars: 26000
  },
  {
    id: 'fairseq',
    title: 'fairseq',
    description: 'Facebook AI Research\'s sequence-to-sequence toolkit for neural machine translation and text generation',
    link: 'https://github.com/facebookresearch/fairseq',
    repoLink: 'https://github.com/facebookresearch/fairseq',
    docsLink: 'https://fairseq.readthedocs.io/',
    tags: ['NLP', 'Machine Translation', 'Text Generation', 'Sequence Models'],
    category: 'NLP Frameworks',
    stars: 17000
  },
  {
    id: 'trax',
    title: 'Trax',
    description: 'Google\'s library for deep learning that focuses on sequence models and reinforcement learning, with clean code and speed',
    link: 'https://github.com/google/trax',
    repoLink: 'https://github.com/google/trax',
    docsLink: 'https://trax-ml.readthedocs.io/',
    tags: ['Sequence Models', 'Reinforcement Learning', 'Clean API', 'Performance'],
    category: 'General Frameworks',
    stars: 7100
  },
  {
    id: 'cleanrl',
    title: 'CleanRL',
    description: 'Single-file reinforcement learning implementation focusing on simplicity, readability, and reproducibility',
    link: 'https://github.com/vwxyzjn/cleanrl',
    repoLink: 'https://github.com/vwxyzjn/cleanrl',
    docsLink: 'https://docs.cleanrl.dev/',
    tags: ['Reinforcement Learning', 'Clean Code', 'Education', 'Implementation'],
    category: 'Reinforcement Learning',
    stars: 3600
  }
]; 