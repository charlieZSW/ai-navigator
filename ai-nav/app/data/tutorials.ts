export interface Tutorial {
  id: string;
  title: string;
  description: string;
  link: string;
  tags: string[];
  category: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  type: 'video' | 'article' | 'course' | 'book';
  isFree: boolean;
}

// 新的数据模型
export interface TutorialNew {
  id: string;
  title: string;
  description: string;
  link: string;
  // 重构标签系统
  primaryCategory: string;         // 主要分类
  subCategories: string[];         // 子分类
  topics: string[];                // 主题标签
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  type: 'video' | 'article' | 'course' | 'book';
  language: string;                // 资源语言
  isFree: boolean;
}

// 标准化的分类体系
export const PRIMARY_CATEGORIES = {
  ALL: 'all',
  FOUNDATIONS: 'foundations',
  MACHINE_LEARNING: 'machine-learning',
  DEEP_LEARNING: 'deep-learning',
  NLP: 'nlp',
  COMPUTER_VISION: 'computer-vision',
  REINFORCEMENT_LEARNING: 'reinforcement-learning',
  GENERATIVE_AI: 'generative-ai',
  TOOLS: 'tools-platforms',
  OTHER: 'other'
};

// 确保每个主分类下有明确的子分类
export const SUB_CATEGORIES = {
  [PRIMARY_CATEGORIES.ALL]: ['all'],
  [PRIMARY_CATEGORIES.FOUNDATIONS]: [
    'all',
    'python-programming',
    'mathematics',
    'data-analysis',
    'ai-basics',
    'tools-platforms'
  ],
  [PRIMARY_CATEGORIES.MACHINE_LEARNING]: [
    'all',
    'supervised-learning',
    'unsupervised-learning',
    'model-evaluation'
  ],
  [PRIMARY_CATEGORIES.DEEP_LEARNING]: [
    'all',
    'neural-networks',
    'cnn',
    'rnn',
    'transformers',
    'frameworks'
  ],
  [PRIMARY_CATEGORIES.NLP]: [
    'all',
    'text-processing',
    'sentiment-analysis',
    'language-models',
    'translation'
  ],
  [PRIMARY_CATEGORIES.COMPUTER_VISION]: [
    'all',
    'image-classification',
    'object-detection',
    'segmentation',
    'face-recognition'
  ],
  [PRIMARY_CATEGORIES.REINFORCEMENT_LEARNING]: [
    'all',
    'q-learning',
    'policy-gradients',
    'deep-reinforcement-learning'
  ],
  [PRIMARY_CATEGORIES.GENERATIVE_AI]: [
    'all',
    'gans',
    'diffusion-models',
    'text-to-image',
    'prompt-engineering'
  ],
  [PRIMARY_CATEGORIES.TOOLS]: [
    'all',
    'development-environments',
    'libraries',
    'cloud-platforms'
  ],
  [PRIMARY_CATEGORIES.OTHER]: ['all']
};

// 用于UI显示的名称映射
export const CATEGORY_NAMES = {
  [PRIMARY_CATEGORIES.ALL]: 'All',
  [PRIMARY_CATEGORIES.FOUNDATIONS]: 'AI Foundations',
  [PRIMARY_CATEGORIES.MACHINE_LEARNING]: 'Machine Learning',
  [PRIMARY_CATEGORIES.DEEP_LEARNING]: 'Deep Learning',
  [PRIMARY_CATEGORIES.NLP]: 'Natural Language Processing',
  [PRIMARY_CATEGORIES.COMPUTER_VISION]: 'Computer Vision',
  [PRIMARY_CATEGORIES.REINFORCEMENT_LEARNING]: 'Reinforcement Learning',
  [PRIMARY_CATEGORIES.GENERATIVE_AI]: 'Generative AI',
  [PRIMARY_CATEGORIES.TOOLS]: 'Tools & Platforms',
  [PRIMARY_CATEGORIES.OTHER]: 'Other'
};

// 难度级别显示名称
export const DIFFICULTY_NAMES = {
  'all': 'All Levels',
  'beginner': 'Beginner',
  'intermediate': 'Intermediate',
  'advanced': 'Advanced'
};

// 资源类型显示名称
export const TYPE_NAMES = {
  'all': 'All Types',
  'video': 'Video',
  'article': 'Article',
  'course': 'Course',
  'book': 'Book'
};

// 语言显示名称
export const LANGUAGE_NAMES = {
  'all': 'All Languages',
  'zh': 'Chinese',
  'en': 'English',
  'jp': 'Japanese',
  'kr': 'Korean',
  'fr': 'French',
  'de': 'German',
  'es': 'Spanish',
  'ru': 'Russian',
  'other': 'Other Languages'
};

// 子分类显示名称映射
export const SUB_CATEGORY_NAMES = {
  'all': 'All',
  'python-programming': 'Python Programming',
  'mathematics': 'Mathematics',
  'data-analysis': 'Data Analysis',
  'ai-basics': 'AI Basic Concepts',
  'tools-platforms': 'Tools & Platforms',
  'supervised-learning': 'Supervised Learning',
  'unsupervised-learning': 'Unsupervised Learning',
  'model-evaluation': 'Model Evaluation',
  'neural-networks': 'Neural Networks',
  'cnn': 'Convolutional Neural Networks',
  'rnn': 'Recurrent Neural Networks',
  'transformers': 'Transformer Models',
  'frameworks': 'Deep Learning Frameworks',
  'text-processing': 'Text Processing',
  'sentiment-analysis': 'Sentiment Analysis',
  'language-models': 'Language Models',
  'translation': 'Machine Translation',
  'image-classification': 'Image Classification',
  'object-detection': 'Object Detection',
  'segmentation': 'Image Segmentation',
  'face-recognition': 'Face Recognition',
  'q-learning': 'Q-Learning',
  'policy-gradients': 'Policy Gradients',
  'deep-reinforcement-learning': 'Deep Reinforcement Learning',
  'gans': 'Generative Adversarial Networks',
  'diffusion-models': 'Diffusion Models',
  'text-to-image': 'Text-to-Image',
  'prompt-engineering': 'Prompt Engineering',
  'development-environments': 'Development Environments',
  'libraries': 'Libraries & Frameworks',
  'cloud-platforms': 'Cloud Platforms'
};

export const tutorials: Tutorial[] = [
  {
    id: 'deeplearningai',
    title: 'Deep Learning Specialization',
    description: 'Andrew Ng\'s deep learning course, systematically introducing the foundations and applications of deep learning',
    link: 'https://www.deeplearning.ai/',
    tags: ['Deep Learning', 'CNN', 'RNN', 'Neural Networks'],
    category: 'Deep Learning',
    difficulty: 'intermediate',
    type: 'course',
    isFree: false
  },
  {
    id: 'fastai',
    title: 'Practical Deep Learning for Coders',
    description: 'Practical deep learning course provided by fast.ai, focusing on practical applications',
    link: 'https://course.fast.ai/',
    tags: ['Practical', 'PyTorch', 'Computer Vision', 'NLP'],
    category: 'Deep Learning',
    difficulty: 'intermediate',
    type: 'course',
    isFree: true
  },
  {
    id: 'cs231n',
    title: 'CS231n: Deep Learning for Computer Vision',
    description: 'Stanford University\'s computer vision course, comprehensively explaining computer vision and deep learning from basics to cutting-edge',
    link: 'http://cs231n.stanford.edu/',
    tags: ['Computer Vision', 'CNN', 'Image Recognition', 'Object Detection'],
    category: 'Computer Vision',
    difficulty: 'advanced',
    type: 'course',
    isFree: true
  },
  {
    id: 'kaggle-intro-ml',
    title: 'Intro to Machine Learning',
    description: 'Introductory machine learning course by Kaggle, learn fundamental concepts through practice',
    link: 'https://www.kaggle.com/learn/intro-to-machine-learning',
    tags: ['Machine Learning', 'Beginners', 'Practical', 'Python'],
    category: 'Machine Learning',
    difficulty: 'beginner',
    type: 'course',
    isFree: true
  },
  {
    id: 'pytorch-tutorial',
    title: 'PyTorch Official Tutorials',
    description: 'Official PyTorch tutorials from beginner to advanced levels with rich example code',
    link: 'https://pytorch.org/tutorials/',
    tags: ['PyTorch', 'Deep Learning', 'Python', 'Framework'],
    category: 'Programming Basics',
    difficulty: 'intermediate',
    type: 'article',
    isFree: true
  },
  {
    id: 'tensorflow-tutorial',
    title: 'TensorFlow Official Tutorials',
    description: 'Official TensorFlow tutorials for various skill levels and application scenarios, suitable for learners with different backgrounds',
    link: 'https://www.tensorflow.org/tutorials',
    tags: ['TensorFlow', 'Deep Learning', 'Python', 'Framework'],
    category: 'Programming Basics',
    difficulty: 'intermediate',
    type: 'article',
    isFree: true
  },
  {
    id: '3blue1brown-neural-networks',
    title: 'Neural Networks Series - 3Blue1Brown',
    description: 'Explains the basic principles of neural networks through vivid visualizations, making complex concepts intuitive',
    link: 'https://www.youtube.com/playlist?list=PLZHQObOWTQDNU6R1_67000Dx_ZCJB-3pi',
    tags: ['Neural Networks', 'Visualization', 'Math Principles', 'Intuitive Explanation'],
    category: 'AI Fundamentals',
    difficulty: 'beginner',
    type: 'video',
    isFree: true
  },
  {
    id: 'linear-algebra-khan',
    title: 'Linear Algebra - Khan Academy',
    description: 'Basic linear algebra course provided by Khan Academy, covering topics from vectors to eigenvalue decomposition',
    link: 'https://www.khanacademy.org/math/linear-algebra',
    tags: ['Math', 'Linear Algebra', 'Vectors', 'Matrices'],
    category: 'Math Fundamentals',
    difficulty: 'beginner',
    type: 'video',
    isFree: true
  },
  {
    id: 'huggingface-course',
    title: 'Hugging Face NLP Course',
    description: 'Learn to use the Hugging Face ecosystem for NLP tasks, from Transformers to practical applications',
    link: 'https://huggingface.co/course',
    tags: ['NLP', 'Transformer', 'BERT', 'Pre-trained Models'],
    category: 'NLP',
    difficulty: 'intermediate',
    type: 'course',
    isFree: true
  },
  {
    id: 'stable-diffusion-tutorial',
    title: 'Stable Diffusion from Beginner to Expert',
    description: 'Comprehensive guide to Stable Diffusion usage, prompt engineering, and model fine-tuning',
    link: 'https://stable-diffusion-art.com/',
    tags: ['Stable Diffusion', 'Generative AI', 'Image Generation', 'Prompt Engineering'],
    category: 'Generative AI',
    difficulty: 'intermediate',
    type: 'article',
    isFree: true
  },
  {
    id: 'mlops-course',
    title: 'MLOps Zoomcamp',
    description: 'Free course teaching MLOps practices and tools for deploying, versioning, monitoring, and maintaining ML models in production',
    link: 'https://github.com/DataTalksClub/mlops-zoomcamp',
    tags: ['MLOps', 'Deployment', 'Model Monitoring', 'Production ML'],
    category: 'AI Fundamentals',
    difficulty: 'advanced',
    type: 'course',
    isFree: true
  },
  {
    id: 'mit-intro-deep-learning',
    title: 'MIT Introduction to Deep Learning',
    description: 'MIT\'s introductory course to deep learning methods with applications to computer vision, NLP, biology, and more',
    link: 'http://introtodeeplearning.com/',
    tags: ['Deep Learning', 'MIT', 'Computer Vision', 'NLP', 'Applications'],
    category: 'Deep Learning',
    difficulty: 'intermediate',
    type: 'course',
    isFree: true
  },
  {
    id: 'cs224n',
    title: 'CS224N: Natural Language Processing with Deep Learning',
    description: 'Stanford\'s premier course on NLP with deep learning, covering from word vectors to transformers and pretraining',
    link: 'https://web.stanford.edu/class/cs224n/',
    tags: ['NLP', 'Stanford', 'RNN', 'Transformers', 'BERT'],
    category: 'NLP',
    difficulty: 'advanced',
    type: 'course',
    isFree: true
  },
  {
    id: 'cs285',
    title: 'CS285: Deep Reinforcement Learning',
    description: 'UC Berkeley\'s graduate course in deep reinforcement learning, covering both fundamentals and advanced topics',
    link: 'https://rail.eecs.berkeley.edu/deeprlcourse/',
    tags: ['Reinforcement Learning', 'Berkeley', 'Policy Gradients', 'Q-Learning'],
    category: 'Reinforcement Learning',
    difficulty: 'advanced',
    type: 'course',
    isFree: true
  },
  {
    id: 'coursera-ml',
    title: 'Machine Learning by Andrew Ng',
    description: 'Classic machine learning course that covers the basics of supervised learning, unsupervised learning, and best practices',
    link: 'https://www.coursera.org/learn/machine-learning',
    tags: ['Machine Learning', 'Andrew Ng', 'Supervised Learning', 'Algorithms'],
    category: 'Machine Learning',
    difficulty: 'beginner',
    type: 'course',
    isFree: false
  },
  {
    id: 'python-datascience-handbook',
    title: 'Python Data Science Handbook',
    description: 'Comprehensive guide to the scientific Python ecosystem, including NumPy, Pandas, Matplotlib, and scikit-learn',
    link: 'https://jakevdp.github.io/PythonDataScienceHandbook/',
    tags: ['Python', 'Data Science', 'NumPy', 'Pandas', 'scikit-learn'],
    category: 'Programming Basics',
    difficulty: 'beginner',
    type: 'book',
    isFree: true
  },
  {
    id: 'dive-into-deep-learning',
    title: 'Dive into Deep Learning',
    description: 'Interactive book teaching deep learning through theory, code examples, and exercises using PyTorch, TensorFlow, and NumPy',
    link: 'https://d2l.ai/',
    tags: ['Deep Learning', 'PyTorch', 'TensorFlow', 'Interactive'],
    category: 'Deep Learning',
    difficulty: 'intermediate',
    type: 'book',
    isFree: true
  },
  {
    id: 'hands-on-ml-book',
    title: 'Hands-On Machine Learning with Scikit-Learn and TensorFlow',
    description: 'Bestselling machine learning introductory book, learn machine learning and deep learning through practical projects.',
    link: 'https://www.oreilly.com/library/view/hands-on-machine-learning/9781492032632/',
    tags: ['Machine Learning', 'Book', 'Scikit-Learn', 'TensorFlow'],
    category: 'Machine Learning',
    difficulty: 'intermediate',
    type: 'book',
    isFree: false
  },
  {
    id: 'pumpkin-book-formula',
    title: 'Pumpkin Book - Detailed Formula Derivation for Zhou Zhihua\'s ML Book',
    description: 'Detailed mathematical derivations for formulas in Zhou Zhihua\'s "Machine Learning" book, helping understand the mathematical principles of machine learning.',
    link: 'https://github.com/datawhalechina/pumpkin-book',
    tags: ['Machine Learning', 'Mathematics', 'Formula Derivation', 'Open Source'],
    category: 'Machine Learning',
    difficulty: 'intermediate',
    type: 'book',
    isFree: true
  },
  {
    id: 'yolo-object-detection',
    title: 'Learn YOLO Object Detection in 1 Hour',
    description: 'Quick tutorial on implementing YOLO object detection for beginners, with step-by-step implementation',
    link: 'https://www.youtube.com/watch?v=yFon0gHopc8',
    tags: ['YOLO', 'Object Detection', 'Computer Vision', 'Practical'],
    category: 'Computer Vision',
    difficulty: 'intermediate',
    type: 'video',
    isFree: true
  },
  {
    id: 'llm-course',
    title: 'Building LLM Powered Applications',
    description: 'Course on how to use large language models to build practical applications with real-world use cases',
    link: 'https://fullstackdeeplearning.com/llm-bootcamp/',
    tags: ['LLM', 'NLP', 'GPT', 'Applications', 'Practical'],
    category: 'NLP',
    difficulty: 'intermediate',
    type: 'course',
    isFree: true
  },
  {
    id: 'kaggle-pandas',
    title: 'Pandas Tutorial - Kaggle',
    description: 'Practical introduction to the most popular Python library for data analysis and manipulation',
    link: 'https://www.kaggle.com/learn/pandas',
    tags: ['Pandas', 'Data Analysis', 'Python', 'Data Manipulation'],
    category: 'Programming Basics',
    difficulty: 'beginner',
    type: 'course',
    isFree: true
  },
  {
    id: 'probability-statistics-ml',
    title: 'Probability and Statistics for Data Science',
    description: 'Course covering essential probability and statistics concepts needed for machine learning',
    link: 'https://www.edx.org/learn/probability/columbia-university-probability-and-statistics-for-data-science',
    tags: ['Probability', 'Statistics', 'Data Science', 'Mathematics'],
    category: 'Math Fundamentals',
    difficulty: 'intermediate',
    type: 'course',
    isFree: false
  },
  {
    id: 'statistical-learning',
    title: 'Statistical Learning with R',
    description: 'Stanford course based on the "Introduction to Statistical Learning" book, teaching machine learning from a statistical perspective',
    link: 'https://online.stanford.edu/courses/sohs-ystatslearning-statistical-learning',
    tags: ['Statistics', 'R', 'Machine Learning', 'Statistical Methods'],
    category: 'Machine Learning',
    difficulty: 'intermediate',
    type: 'course',
    isFree: true
  },
  {
    id: 'deep-learning-book',
    title: 'Deep Learning Book',
    description: 'Comprehensive textbook on deep learning by Ian Goodfellow, Yoshua Bengio, and Aaron Courville',
    link: 'https://www.deeplearningbook.org/',
    tags: ['Deep Learning', 'Theory', 'Neural Networks', 'Advanced Concepts'],
    category: 'Deep Learning',
    difficulty: 'advanced',
    type: 'book',
    isFree: true
  },
  {
    id: 'reinforcement-learning-intro',
    title: 'Introduction to Reinforcement Learning with David Silver',
    description: 'Classic lecture series on reinforcement learning fundamentals by DeepMind\'s David Silver',
    link: 'https://www.youtube.com/watch?v=2pWv7GOvuf0&list=PLqYmG7hTraZDM-OYHWgPebj2MfCFzFObQ',
    tags: ['Reinforcement Learning', 'DeepMind', 'MDPs', 'Q-learning'],
    category: 'Reinforcement Learning',
    difficulty: 'intermediate',
    type: 'video',
    isFree: true
  },
  {
    id: 'deep-rl-bootcamp',
    title: 'Deep Reinforcement Learning Bootcamp',
    description: 'Berkeley bootcamp lectures on deep reinforcement learning, including policy gradients and model-based RL',
    link: 'https://sites.google.com/view/deep-rl-bootcamp/lectures',
    tags: ['Deep RL', 'Policy Gradients', 'Model-based RL', 'Advanced'],
    category: 'Reinforcement Learning',
    difficulty: 'advanced',
    type: 'video',
    isFree: true
  },
  {
    id: 'prompting-guide',
    title: 'Prompt Engineering Guide',
    description: 'Comprehensive prompt engineering guide covering techniques from basics to advanced applications with multiple LLM models.',
    link: 'https://www.promptingguide.ai/',
    tags: ['Prompt Engineering', 'LLM', 'ChatGPT', 'Application Techniques'],
    category: 'Generative AI',
    difficulty: 'intermediate',
    type: 'article',
    isFree: true
  },
  {
    id: 'gpt-from-scratch',
    title: 'Building GPT From Scratch',
    description: 'Tutorial on implementing a GPT model from scratch with PyTorch, explaining the transformer architecture step by step',
    link: 'https://www.youtube.com/watch?v=kCc8FmEb1nY',
    tags: ['GPT', 'Transformer', 'PyTorch', 'Implementation', 'Andrej Karpathy'],
    category: 'NLP',
    difficulty: 'advanced',
    type: 'video',
    isFree: true
  },
  // AI基础知识资源
  {
    id: 'thats-ai-fundamental',
    title: 'That\'s AI - Artificial Intelligence Fundamentals',
    description: 'An introductory AI course for beginners, explaining basic AI concepts in a simple and understandable way.',
    link: 'https://www.microsoft.com/en-us/research/project/thats-ai/',
    tags: ['AI Fundamentals', 'Beginners', 'Concept Explanation'],
    category: 'AI Fundamentals',
    difficulty: 'beginner',
    type: 'course',
    isFree: true
  },
  {
    id: 'microsoft-ai-fundamentals',
    title: 'Microsoft AI Fundamentals Course',
    description: 'Official Microsoft AI introductory course covering basic concepts and core ideas, suitable for beginners with no prior background.',
    link: 'https://learn.microsoft.com/zh-cn/training/paths/get-started-with-artificial-intelligence-on-azure/',
    tags: ['AI Fundamentals', 'Microsoft', 'Cloud Computing'],
    category: 'AI Fundamentals',
    difficulty: 'beginner',
    type: 'course',
    isFree: true
  },
  {
    id: 'google-ai-fundamentals',
    title: 'Google AI Essentials Course',
    description: 'Essential AI knowledge provided by Google, including practical skills and AI ethics content.',
    link: 'https://grow.google/intl/zh-CN/aiessentials/',
    tags: ['AI Fundamentals', 'Google', 'AI Ethics'],
    category: 'AI Fundamentals',
    difficulty: 'beginner',
    type: 'course',
    isFree: true
  },
  {
    id: 'mozilla-ai-guide',
    title: 'Mozilla AI Guide - Fundamentals',
    description: 'Comprehensive AI guide launched by Mozilla Foundation, covering basic knowledge and key concepts.',
    link: 'https://ai-guide.future.mozilla.org/zh-CN/content/ai-basics/',
    tags: ['AI Fundamentals', 'Mozilla', 'Beginner Guide'],
    category: 'AI Fundamentals',
    difficulty: 'beginner',
    type: 'article',
    isFree: true
  },
  {
    id: 'elements-of-ai',
    title: 'Elements of AI - University of Helsinki Course',
    description: 'Free AI introductory course produced by the University of Helsinki in Finland, providing easy-to-understand explanations of AI.',
    link: 'https://www.elementsofai.com/',
    tags: ['AI Fundamentals', 'Beginners', 'University Course'],
    category: 'AI Fundamentals',
    difficulty: 'beginner',
    type: 'course',
    isFree: true
  },
  {
    id: 'ai-for-everyone',
    title: 'AI For Everyone - Andrew Ng Introductory Course',
    description: 'AI introductory course designed by Professor Andrew Ng specifically for non-technical professionals, explaining AI basic principles and applications.',
    link: 'https://www.coursera.org/learn/ai-for-everyone',
    tags: ['AI Fundamentals', 'Andrew Ng', 'Non-technical'],
    category: 'AI Fundamentals',
    difficulty: 'beginner',
    type: 'course',
    isFree: false
  },
  {
    id: 'isaca-ai-fundamentals',
    title: 'ISACA AI Fundamentals Certification Course',
    description: 'Professional AI fundamentals certification course, focusing on AI governance, risk management, and compliance.',
    link: 'https://www.isaca.org/credentialing/artificial-intelligence-fundamentals-certificate',
    tags: ['AI Fundamentals', 'Certification', 'AI Governance'],
    category: 'AI Fundamentals',
    difficulty: 'intermediate',
    type: 'course',
    isFree: false
  },
  // 机器学习资源
  {
    id: 'andrew-ng-ml',
    title: 'Andrew Ng\'s Machine Learning Course',
    description: 'World-renowned introductory machine learning course, systematically explaining machine learning theory and practice.',
    link: 'https://www.coursera.org/learn/machine-learning',
    tags: ['Machine Learning', 'Andrew Ng', 'Supervised Learning', 'Algorithms'],
    category: 'Machine Learning',
    difficulty: 'beginner',
    type: 'course',
    isFree: false
  },
  {
    id: 'google-ml-crash-course',
    title: 'Google Machine Learning Crash Course',
    description: 'Machine learning introductory course developed by Google, containing practical machine learning concepts and TensorFlow introduction.',
    link: 'https://developers.google.com/machine-learning/crash-course',
    tags: ['Machine Learning', 'Google', 'TensorFlow', 'Practical'],
    category: 'Machine Learning',
    difficulty: 'beginner',
    type: 'course',
    isFree: true
  },
  {
    id: 'scikit-learn-tutorial',
    title: 'Scikit-learn Machine Learning Library Introduction',
    description: 'Introductory guide to Python\'s most popular machine learning library, including a rich set of algorithms and tools.',
    link: 'https://scikit-learn.org/stable/getting_started.html',
    tags: ['Machine Learning', 'Python', 'Scikit-learn', 'Algorithms'],
    category: 'Machine Learning',
    difficulty: 'beginner',
    type: 'article',
    isFree: true
  },
  // 深度学习资源
  {
    id: '3blue1brown-nn-visual',
    title: '3Blue1Brown Neural Networks Visual Tutorial',
    description: 'Intuitively understand the mathematical principles of neural networks through beautiful animations, suitable for visual learners.',
    link: 'https://www.youtube.com/playlist?list=PLZHQObOWTQDNU6R1_67000Dx_ZCJB-3pi',
    tags: ['Deep Learning', 'Neural Networks', 'Visualization', 'Mathematical Principles'],
    category: 'Deep Learning',
    difficulty: 'beginner',
    type: 'video',
    isFree: true
  },
  {
    id: 'd2l-zh',
    title: 'Dive into Deep Learning (Chinese Version)',
    description: 'Interactive deep learning tutorial created by Mu Li\'s team, combining theory with code practice.',
    link: 'https://zh.d2l.ai/',
    tags: ['Deep Learning', 'Interactive Tutorial', 'PyTorch', 'TensorFlow'],
    category: 'Deep Learning',
    difficulty: 'intermediate',
    type: 'book',
    isFree: true
  },
  {
    id: 'deeplearning-ai-courses',
    title: 'Deep Learning Specialization - DeepLearning.AI',
    description: 'Series of deep learning courses by Professor Andrew Ng, covering neural networks, CNN, RNN, and multiple specialized topics.',
    link: 'https://www.deeplearning.ai/courses/',
    tags: ['Deep Learning', 'Andrew Ng', 'CNN', 'RNN'],
    category: 'Deep Learning',
    difficulty: 'intermediate',
    type: 'course',
    isFree: false
  },
  {
    id: 'fastai-practical-dl',
    title: 'Fast.ai Practical Deep Learning Course',
    description: 'Practical deep learning course from fast.ai, focusing on practical applications rather than theory, suitable for quick entry.',
    link: 'https://course.fast.ai/',
    tags: ['Deep Learning', 'Practical', 'PyTorch', 'Application'],
    category: 'Deep Learning',
    difficulty: 'intermediate',
    type: 'course',
    isFree: true
  },
  {
    id: 'pytorch-official-tutorials',
    title: 'PyTorch Official Tutorials',
    description: 'From beginner to advanced PyTorch official guide, including rich example code and best practices.',
    link: 'https://pytorch.org/tutorials/',
    tags: ['Deep Learning', 'PyTorch', 'Framework', 'Tutorial'],
    category: 'Deep Learning',
    difficulty: 'intermediate',
    type: 'article',
    isFree: true
  },
  {
    id: 'tensorflow-official-tutorials',
    title: 'TensorFlow Official Tutorials',
    description: 'Google TensorFlow team tutorials and examples, covering various aspects from beginner to advanced applications.',
    link: 'https://tensorflow.google.cn/tutorials',
    tags: ['Deep Learning', 'TensorFlow', 'Framework', 'Tutorial'],
    category: 'Deep Learning',
    difficulty: 'intermediate',
    type: 'article',
    isFree: true
  },
  {
    id: 'mit-deep-learning',
    title: 'MIT Deep Learning Introduction Course',
    description: 'MIT introductory course to deep learning methods with applications to computer vision, NLP, biology, and more',
    link: 'http://introtodeeplearning.com/',
    tags: ['Deep Learning', 'MIT', 'Introduction', 'University Course'],
    category: 'Deep Learning',
    difficulty: 'intermediate',
    type: 'course',
    isFree: true
  },
  {
    id: 'cs231n-cv-dl',
    title: 'CS231n: Computer Vision and Deep Learning',
    description: 'Stanford University\'s classic course, deeply explaining the principles and applications of computer vision and deep learning.',
    link: 'http://cs231n.stanford.edu/',
    tags: ['Deep Learning', 'Computer Vision', 'CNN', 'Stanford'],
    category: 'Computer Vision',
    difficulty: 'advanced',
    type: 'course',
    isFree: true
  },
  // 生成式AI资源
  {
    id: 'chatgpt-prompt-engineering',
    title: 'ChatGPT Prompt Engineering',
    description: 'Prompt engineering course from DeepLearning.AI and OpenAI, learning how to effectively use ChatGPT.',
    link: 'https://www.deeplearning.ai/short-courses/chatgpt-prompt-engineering-for-developers/',
    tags: ['Generative AI', 'ChatGPT', 'Prompt Engineering', 'LLM'],
    category: 'Generative AI',
    difficulty: 'intermediate',
    type: 'course',
    isFree: true
  },
  {
    id: 'llm-gen-ai-intro',
    title: 'LLM Generative AI Introduction',
    description: 'Beginner course on large language models and generative AI on Coursera, including practical projects.',
    link: 'https://www.coursera.org/learn/generative-ai-with-llms',
    tags: ['Generative AI', 'LLM', 'Large Language Model', 'Introduction'],
    category: 'Generative AI',
    difficulty: 'beginner',
    type: 'course',
    isFree: false
  },
  {
    id: 'ms-gen-ai-intro-guide',
    title: 'Microsoft Generative AI Introduction Course',
    description: 'Microsoft official generative AI training course, covering technology principles and business application scenarios, suitable for developers and business personnel to understand the potential of generative AI.',
    link: 'https://learn.microsoft.com/zh-cn/training/modules/introduction-generative-ai/',
    tags: ['Generative AI', 'Microsoft', 'Introduction', 'LLM'],
    category: 'Generative AI',
    difficulty: 'beginner',
    type: 'course',
    isFree: true
  },
  {
    id: 'awesome-llm',
    title: 'Awesome-LLM Resource Collection',
    description: 'Selected large language model related resources on GitHub, including research papers, tools, and tutorials.',
    link: 'https://github.com/Hannibal046/Awesome-LLM',
    tags: ['LLM', 'Resource Collection', 'Large Language Model', 'GitHub'],
    category: 'Generative AI',
    difficulty: 'intermediate',
    type: 'article',
    isFree: true
  },
  {
    id: 'stable-diffusion-github-repo',
    title: 'Stable Diffusion Resource',
    description: 'Official Stable Diffusion resource from Stability AI, including code library, model download, and usage documentation, supporting local or cloud deployment.',
    link: 'https://github.com/Stability-AI/stablediffusion',
    tags: ['Generative AI', 'Stable Diffusion', 'Image Generation', 'Open Source', 'AI Tool'],
    category: 'Generative AI',
    difficulty: 'intermediate',
    type: 'article',
    isFree: true
  },
  {
    id: 'langchain-dev-framework-guide',
    title: 'LangChain - LLM Application Development Framework',
    description: 'Framework designed for LLM application development, allowing developers to create complex applications based on large language models, providing chain call, tool integration, and memory management features.',
    link: 'https://python.langchain.com/docs/get_started/introduction',
    tags: ['LangChain', 'LLM', 'Application Development', 'Framework', 'Python'],
    category: 'Generative AI',
    difficulty: 'intermediate',
    type: 'article',
    isFree: true
  },
  
  // AI工具与平台
  {
    id: 'huggingface-ai-platform',
    title: 'Hugging Face - AI Model and Dataset Platform',
    description: 'Community platform providing open source AI models, datasets, and interactive demos, especially rich resources in NLP and generative AI fields, supporting model training and deployment.',
    link: 'https://huggingface.co/',
    tags: ['Tool', 'Model Library', 'NLP', 'Pre-trained Model', 'AI Platform'],
    category: 'Machine Learning',
    difficulty: 'intermediate',
    type: 'article',
    isFree: true
  },
  {
    id: 'papers-with-code',
    title: 'Papers with Code - Research Papers and Code Implementation',
    description: 'Free open resource for machine learning papers and their code implementation, convenient for reproducing latest research results.',
    link: 'https://paperswithcode.com/',
    tags: ['Research', 'Code', 'Paper', 'Latest Progress'],
    category: 'Machine Learning',
    difficulty: 'advanced',
    type: 'article',
    isFree: true
  },
  
  // Python和数据科学资源
  {
    id: 'python-getting-started',
    title: 'Python Official Introduction Guide',
    description: 'Python official website provides an introduction tutorial for beginners.',
    link: 'https://www.python.org/about/gettingstarted/',
    tags: ['Python', 'Programming Basics', 'Introduction'],
    category: 'Programming Basics',
    difficulty: 'beginner',
    type: 'article',
    isFree: true
  },
  {
    id: 'kaggle-python-course',
    title: 'Kaggle Python Course',
    description: 'Free Python course provided by Kaggle, for teaching data science applications.',
    link: 'https://www.kaggle.com/learn/python',
    tags: ['Python', 'Data Science', 'Practice'],
    category: 'Programming Basics',
    difficulty: 'beginner',
    type: 'course',
    isFree: true
  },
  {
    id: 'pandas-tutorial',
    title: 'Pandas Official Tutorial',
    description: 'Introduction tutorial to data operation and analysis from Pandas official documentation, explaining data operation and analysis basics.',
    link: 'https://pandas.pydata.org/docs/getting_started/index.html',
    tags: ['Python', 'Pandas', 'Data Analysis', 'Data Science'],
    category: 'Programming Basics',
    difficulty: 'beginner',
    type: 'article',
    isFree: true
  },
  {
    id: 'numpy-quickstart',
    title: 'NumPy Quick Introduction Tutorial',
    description: 'Quick introduction guide from NumPy official documentation, introducing scientific calculation basics.',
    link: 'https://numpy.org/doc/stable/user/quickstart.html',
    tags: ['Python', 'NumPy', 'Scientific Calculation', 'Data Science'],
    category: 'Programming Basics',
    difficulty: 'beginner',
    type: 'article',
    isFree: true
  },
  {
    id: 'matplotlib-tutorials',
    title: 'Matplotlib Data Visualization',
    description: 'Matplotlib official tutorial, learning how to create various types of charts and visualizations.',
    link: 'https://matplotlib.org/stable/tutorials/index.html',
    tags: ['Python', 'Matplotlib', 'Data Visualization', 'Data Science'],
    category: 'Programming Basics',
    difficulty: 'beginner',
    type: 'article',
    isFree: true
  },
  
  // 数学与统计资源
  {
    id: 'khan-academy-math',
    title: 'Khan Academy Math Course',
    description: 'Free Khan Academy math course, from basic to advanced, including rich videos and exercises.',
    link: 'https://www.khanacademy.org/math',
    tags: ['Math', 'Basic', 'Statistics', 'Linear Algebra'],
    category: 'Math Fundamentals',
    difficulty: 'beginner',
    type: 'course',
    isFree: true
  },
  {
    id: 'mit-linear-algebra',
    title: 'MIT Linear Algebra Open Course',
    description: 'Classic linear algebra course from MIT, taught by Professor Gilbert Strang.',
    link: 'https://ocw.mit.edu/courses/mathematics/18-06-linear-algebra-spring-2010/',
    tags: ['Math', 'Linear Algebra', 'MIT'],
    category: 'Math Fundamentals',
    difficulty: 'intermediate',
    type: 'course',
    isFree: true
  },
  {
    id: 'coursera-statistics-specialization',
    title: 'Coursera Statistics Specialization Course',
    description: 'Series of statistics courses on Coursera platform, covering concepts from basic to advanced statistics.',
    link: 'https://www.coursera.org/specializations/statistics',
    tags: ['Statistics', 'Data Analysis', 'Probability Theory'],
    category: 'Math Fundamentals',
    difficulty: 'intermediate',
    type: 'course',
    isFree: false
  },
  {
    id: 'statlearning-ebook',
    title: 'Introduction to Statistical Learning (Free eBook)',
    description: 'Free eBook version of "Introduction to Statistical Learning", introducing basic concepts and applications of statistical learning.',
    link: 'https://www.statlearning.com/',
    tags: ['Statistics', 'Machine Learning', 'Ebook'],
    category: 'Math Fundamentals',
    difficulty: 'intermediate',
    type: 'book',
    isFree: true
  },
  {
    id: 'mml-book',
    title: 'Machine Learning Mathematical Basics (Free Book)',
    description: 'Free online book, systemically introducing mathematical basics needed for machine learning.',
    link: 'https://mml-book.github.io/',
    tags: ['Math', 'Machine Learning', 'Linear Algebra', 'Probability Theory'],
    category: 'Math Fundamentals',
    difficulty: 'intermediate',
    type: 'book',
    isFree: true
  },
  
  // AI推荐书籍资源 - 入门书籍
  {
    id: 'deep-learning-goodfellow',
    title: 'Deep Learning - Ian Goodfellow Classic Textbook',
    description: 'Classic textbook by Deep Learning field authority scholars Ian Goodfellow et al., comprehensively introducing the theoretical basis and main models of deep learning, essential for deep learning beginners.',
    link: 'https://mitpress.mit.edu/9780262035613/deep-learning/',
    tags: ['Deep Learning', 'Book', 'Theory', 'Neural Networks', 'Introduction'],
    category: 'Deep Learning',
    difficulty: 'intermediate',
    type: 'book',
    isFree: false
  },
  {
    id: 'python-ds-handbook',
    title: 'Python Data Science Handbook - Free Online Version',
    description: 'Comprehensive practical guide to Python data science ecosystem, including usage of NumPy, Pandas, Matplotlib, and scikit-learn.',
    link: 'https://jakevdp.github.io/PythonDataScienceHandbook/',
    tags: ['Python', 'Data Science', 'Book', 'NumPy', 'Pandas'],
    category: 'Programming Basics',
    difficulty: 'beginner',
    type: 'book',
    isFree: true
  },
  {
    id: 'zhou-ml-book',
    title: 'Machine Learning - Zhou Zhihua (Watermelon Book)',
    description: 'Chinese classic machine learning textbook, systemically introducing basic concepts and methods of machine learning.',
    link: 'https://book.douban.com/subject/33414479/',
    tags: ['Machine Learning', 'Book', 'Theory', 'Chinese Resource'],
    category: 'Machine Learning',
    difficulty: 'intermediate',
    type: 'book',
    isFree: false
  },
  
  // AI推荐书籍资源 - 进阶书籍
  {
    id: 'd2l-book-multi',
    title: 'Dive into Deep Learning - Mu Li (Multi-Framework Version)',
    description: 'Interactive deep learning tutorial created by Mu Li\'s team, combining theory with code practice, supporting multiple frameworks including PyTorch, TensorFlow, and MXNet.',
    link: 'https://d2l.ai/index.html',
    tags: ['Deep Learning', 'Book', 'PyTorch', 'TensorFlow', 'Practice'],
    category: 'Deep Learning',
    difficulty: 'intermediate',
    type: 'book',
    isFree: true
  },
  {
    id: 'nlp-transformers-book',
    title: 'Natural Language Processing and Transformers - Latest Edition',
    description: 'Comprehensive professional book on modern NLP technology and Transformer models, including principles and applications of BERT, GPT, etc., suitable for in-depth learning of NLP.',
    link: 'https://www.oreilly.com/library/view/natural-language-processing/9781098136789/',
    tags: ['NLP', 'Transformers', 'Book', 'BERT', 'GPT'],
    category: 'NLP',
    difficulty: 'advanced',
    type: 'book',
    isFree: false
  },
  {
    id: 'rl-introduction-book',
    title: 'Introduction to Reinforcement Learning - Sutton & Barto',
    description: 'Classic textbook in reinforcement learning field, written by the founding fathers Richard S. Sutton and Andrew G. Barto, systemically introducing basic principles and methods of reinforcement learning.',
    link: 'https://www.amazon.com/Reinforcement-Learning-Introduction-Adaptive-Computation/dp/0262039249/',
    tags: ['Reinforcement Learning', 'Book', 'Theory', 'Algorithm', 'Advanced'],
    category: 'Reinforcement Learning',
    difficulty: 'advanced',
    type: 'book',
    isFree: false
  },
  {
    id: 'llm-theory-practice-book',
    title: 'Large Language Model: Theoretical Basis and Practical Application',
    description: 'Specialized book focusing on large language models, covering the theoretical basis, training methods, and practical application cases of LLM, suitable for readers who want to deeply understand LLM technology.',
    link: 'https://leanpub.com/ll-nlp-with-transformers',
    tags: ['LLM', 'Large Language Model', 'Book', 'NLP', 'Application'],
    category: 'Generative AI',
    difficulty: 'advanced',
    type: 'book',
    isFree: false
  },
  
  // 生成式AI学习资源 - 大型语言模型
  {
    id: 'chatgpt-prompt-eng',
    title: 'ChatGPT Prompt Engineering for Developers',
    description: 'Course from DeepLearning.AI and OpenAI, teaching developers how to use LLM API to create advanced applications, including key techniques of prompt engineering.',
    link: 'https://www.deeplearning.ai/short-courses/chatgpt-prompt-engineering-for-developers/',
    tags: ['LLM', 'ChatGPT', 'Prompt Engineering', 'Generative AI', 'Development'],
    category: 'Generative AI',
    difficulty: 'intermediate',
    type: 'course',
    isFree: true
  },
  {
    id: 'coursera-llm-gen-ai',
    title: 'LLM Generative AI Introduction Course - Coursera',
    description: 'Generative AI professional course on Coursera platform, introducing the working principles, training methods, and application development of large language models, including practical cases and projects.',
    link: 'https://www.coursera.org/learn/generative-ai-with-llms',
    tags: ['LLM', 'Generative AI', 'Large Language Model', 'Introduction'],
    category: 'Generative AI',
    difficulty: 'intermediate',
    type: 'course',
    isFree: false
  },
  {
    id: 'awesome-llm-resources',
    title: 'Awesome-LLM Resource Collection',
    description: 'Comprehensive large language model resource collection on GitHub, including research papers, open source models, tool libraries, tutorials, and application examples, very suitable for LLM research and practice.',
    link: 'https://github.com/Hannibal046/Awesome-LLM',
    tags: ['LLM', 'Resource Collection', 'Large Language Model', 'GitHub', 'Open Source'],
    category: 'Generative AI',
    difficulty: 'intermediate',
    type: 'article',
    isFree: true
  },
  {
    id: 'prompt-engineering-zh',
    title: 'Prompt Engineering Guide (Chinese Version)',
    description: 'Comprehensive prompt engineering technology guide in Chinese version, covering from basic prompt writing to advanced application cases, including multiple LLM model prompt strategies and techniques.',
    link: 'https://www.promptingguide.ai/zh',
    tags: ['Prompt Engineering', 'LLM', 'Chinese Resource', 'ChatGPT', 'Application Techniques'],
    category: 'Generative AI',
    difficulty: 'intermediate',
    type: 'article',
    isFree: true
  },
  
  // 生成式AI学习资源 - 生成式AI工具与应用
  {
    id: 'stable-diffusion-webui',
    title: 'Stable Diffusion WebUI Local Deployment',
    description: 'Popular Stable Diffusion WebUI interface tool, providing simple and easy-to-use graphical interface to use Stable Diffusion model, supporting multiple advanced features and plugin extensions.',
    link: 'https://github.com/AUTOMATIC1111/stable-diffusion-webui',
    tags: ['Stable Diffusion', 'WebUI', 'Image Generation', 'Deployment', 'AI Tool'],
    category: 'Generative AI',
    difficulty: 'intermediate',
    type: 'article',
    isFree: true
  },
  {
    id: 'gpt4-technical-report',
    title: 'GPT-4 Technical Report and Paper Interpretation',
    description: 'Technical report from OpenAI about GPT-4, detailing the technical details, capabilities, and limitations of this large language model, including various application scenario analysis.',
    link: 'https://openai.com/research/gpt-4',
    tags: ['GPT-4', 'OpenAI', 'Technical Report', 'Large Language Model', 'Research'],
    category: 'Generative AI',
    difficulty: 'advanced',
    type: 'article',
    isFree: true
  },
  
  // AI实用工具与平台 - 开发工具
  {
    id: 'jupyter-notebook-tool',
    title: 'Jupyter Notebook - Interactive Programming Environment',
    description: 'Interactive computing notebook tool, allowing you to create and share documents containing code, text, mathematical formulas, and visualizations, ideal for data science and AI learning, visualizing code, charts, and rich text.',
    link: 'https://jupyter.org/',
    tags: ['Tool', 'Python', 'Interactive', 'Data Science', 'AI Tool'],
    category: 'Programming Basics',
    difficulty: 'beginner',
    type: 'article',
    isFree: true
  },
  {
    id: 'anaconda-platform',
    title: 'Anaconda - Data Science Platform',
    description: 'Integrated data science platform with Python and R language, containing rich scientific calculation and data analysis libraries, convenient for environment management and package dependency processing.',
    link: 'https://www.anaconda.com/download',
    tags: ['Tool', 'Python', 'Data Science', 'Environment Management', 'AI Tool'],
    category: 'Programming Basics',
    difficulty: 'beginner',
    type: 'article',
    isFree: true
  },
  
  // AI实用工具与平台 - 实践平台
  {
    id: 'kaggle-platform',
    title: 'Kaggle Competition Platform - Machine Learning Practice',
    description: 'World-class data science and machine learning competition platform, providing rich data sets, tutorials, and computing environments, ideal for learning and practicing AI skills.',
    link: 'https://www.kaggle.com/competitions',
    tags: ['Practice', 'Competition', 'Data Set', 'Machine Learning', 'AI Platform'],
    category: 'Machine Learning',
    difficulty: 'intermediate',
    type: 'article',
    isFree: true
  },
  {
    id: 'github-ai-projects',
    title: 'GitHub - Open Source AI Project and Code Repository',
    description: 'Comprehensive collection of open source AI projects, tools, and resources contributed by global developers, allowing you to learn, use, and contribute various AI codes and models.',
    link: 'https://github.com/explore',
    tags: ['Open Source', 'Code Library', 'Project', 'Community', 'AI Tool'],
    category: 'Machine Learning',
    difficulty: 'intermediate',
    type: 'article',
    isFree: true
  },
  // 添加AI推荐书籍资源 - 基础类别
  {
    id: 'ai-beginners-handbook',
    title: 'AI Introduction Guide: Principles, Applications, and Ethics',
    description: 'Specialized introductory book for AI beginners, explaining the basic principles, application scenarios, and ethical issues of artificial intelligence in a simple and understandable way, without prior professional background.',
    link: 'https://www.amazon.com/Artificial-Intelligence-Basics-Simplified-Approach/dp/1484252322',
    tags: ['Book', 'AI Introduction', 'Principle', 'Ethics', 'Basic Knowledge'],
    category: 'AI Fundamentals',
    difficulty: 'beginner',
    type: 'book',
    isFree: false
  },
  {
    id: 'data-science-handson',
    title: 'Data Science Practice: Python and Analytical Thinking',
    description: 'Learning data science basics and practical skills through actual projects, using Python tool stack for data collection, cleaning, analysis, and visualization, suitable for programming beginners.',
    link: 'https://www.oreilly.com/library/view/data-science-from/9781492041122/',
    tags: ['Book', 'Data Science', 'Python', 'Practice', 'Analysis'],
    category: 'Programming Basics',
    difficulty: 'beginner',
    type: 'book',
    isFree: false
  },
  {
    id: 'math-for-ai-book',
    title: 'AI Mathematical Basics: Intuitive Understanding of Applied Mathematics',
    description: 'Application mathematics guide for AI learners, explaining linear algebra, probability statistics, calculus, etc., AI needed mathematical knowledge in an intuitive way, reducing theoretical difficulty, highlighting application scenarios.',
    link: 'https://www.amazon.com/Mathematics-Machine-Learning-Peter-Deisenroth/dp/110845514X',
    tags: ['Book', 'Mathematics', 'AI Basics', 'Linear Algebra', 'Statistics'],
    category: 'Math Fundamentals',
    difficulty: 'intermediate',
    type: 'book',
    isFree: false
  },
  {
    id: 'text-book-info-retrieval',
    title: 'Information Retrieval Introduction',
    description: 'Classic textbook from Stanford University, systemically introducing the principles and algorithms of information retrieval and search engines.',
    link: 'https://nlp.stanford.edu/IR-book/',
    tags: ['Information Retrieval', 'Search Engine', 'Text Processing', 'Natural Language Processing'],
    category: 'NLP',
    difficulty: 'intermediate',
    type: 'book',
    isFree: false
  },
]; 