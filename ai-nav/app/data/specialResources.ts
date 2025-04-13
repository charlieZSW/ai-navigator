export interface SpecialResource {
  id: string;
  title: string;
  description: string;
  link: string;
  tags: string[];
  category: 'beginner' | 'compute' | 'research' | 'other';
}

export const specialCategories = [
  'All',
  'Beginner Guide',
  'Compute Resources',
  'Research Tracking'
];

export const specialResources: SpecialResource[] = [
  // Beginner resources
  {
    id: 'beginners-guide',
    title: 'Complete AI Beginner Guide',
    description: 'A comprehensive roadmap for learning AI and machine learning from scratch, including resource recommendations and practical projects',
    link: 'https://www.fast.ai/posts/your-ai-starter-guide/',
    tags: ['Beginner Guide', 'Learning Path', 'Resource Collection'],
    category: 'beginner'
  },
  {
    id: 'python-for-ai',
    title: 'Python Basics for AI/ML',
    description: 'Python tutorial specifically designed for AI/ML learners, focusing on data processing and scientific computing',
    link: 'https://www.kaggle.com/learn/python',
    tags: ['Python', 'Programming Basics', 'Data Science'],
    category: 'beginner'
  },
  {
    id: 'math-for-ai',
    title: 'Math Foundations for Machine Learning',
    description: 'Essential linear algebra, calculus, and probability & statistics knowledge for machine learning, with intuitive explanations and code examples',
    link: 'https://mml-book.github.io/',
    tags: ['Mathematics', 'Linear Algebra', 'Probability & Statistics', 'Calculus'],
    category: 'beginner'
  },
  {
    id: 'first-ml-project',
    title: 'Your First Machine Learning Project',
    description: 'Step-by-step guide to complete your first machine learning project, from data processing to model evaluation',
    link: 'https://machinelearningmastery.com/machine-learning-in-python-step-by-step/',
    tags: ['Practical', 'Beginner Project', 'scikit-learn', 'Data Analysis'],
    category: 'beginner'
  },
  {
    id: 'ml-crash-course',
    title: 'Google Machine Learning Crash Course',
    description: 'Free course from Google covering machine learning fundamentals with TensorFlow, featuring interactive visualizations and practical exercises',
    link: 'https://developers.google.com/machine-learning/crash-course',
    tags: ['Machine Learning', 'TensorFlow', 'Interactive', 'Google'],
    category: 'beginner'
  },
  {
    id: 'ai-for-everyone',
    title: 'AI For Everyone',
    description: 'Non-technical course designed by Andrew Ng to help anyone understand AI technologies and how to apply them in business',
    link: 'https://www.coursera.org/learn/ai-for-everyone',
    tags: ['Non-technical', 'Business Applications', 'AI Concepts', 'Andrew Ng'],
    category: 'beginner'
  },
  {
    id: 'stanford-ml-youtube',
    title: 'Stanford Machine Learning Course on YouTube',
    description: 'Full Stanford machine learning course lectures available for free, taught by Andrew Ng',
    link: 'https://www.youtube.com/playlist?list=PLoROMvodv4rMiGQp3WXShtMGgzqpfVfbU',
    tags: ['Stanford', 'Academic Course', 'Video Lectures', 'Comprehensive'],
    category: 'beginner'
  },
  {
    id: 'kaggle-competitions',
    title: 'Kaggle Competitions for Beginners',
    description: 'List of entry-level data science competitions on Kaggle, great for practical learning and portfolio building',
    link: 'https://www.kaggle.com/competitions?listOption=145',
    tags: ['Competition', 'Practice', 'Portfolio Building', 'Community'],
    category: 'beginner'
  },
  
  // Compute resources
  {
    id: 'colab',
    title: 'Google Colab',
    description: 'Free cloud-based Jupyter notebook environment provided by Google with free GPU/TPU support',
    link: 'https://colab.research.google.com/',
    tags: ['Free GPU', 'Jupyter', 'Cloud Environment', 'Python'],
    category: 'compute'
  },
  {
    id: 'kaggle-kernels',
    title: 'Kaggle Kernels',
    description: 'Free computing environment provided by Kaggle, supporting GPU acceleration and including popular datasets',
    link: 'https://www.kaggle.com/code',
    tags: ['Free GPU', 'Data Science', 'Competitions', 'Community'],
    category: 'compute'
  },
  {
    id: 'lambda-labs',
    title: 'Lambda Cloud',
    description: 'GPU cloud service designed specifically for AI research and development, providing high-performance computing resources',
    link: 'https://lambdalabs.com/service/gpu-cloud',
    tags: ['Paid GPU', 'High Performance', 'AI Training', 'Pay-as-you-go'],
    category: 'compute'
  },
  {
    id: 'vast-ai',
    title: 'Vast.ai',
    description: 'Decentralized GPU rental platform allowing low-cost rentals of others\' idle GPU resources',
    link: 'https://vast.ai/',
    tags: ['GPU Marketplace', 'Low Cost', 'Pay-as-you-go', 'Various Configurations'],
    category: 'compute'
  },
  {
    id: 'aws-sagemaker',
    title: 'Amazon SageMaker',
    description: 'Fully managed machine learning service that enables developers to build, train, and deploy ML models on AWS',
    link: 'https://aws.amazon.com/sagemaker/',
    tags: ['AWS', 'Cloud Service', 'MLOps', 'Enterprise'],
    category: 'compute'
  },
  {
    id: 'azure-ml',
    title: 'Azure Machine Learning',
    description: 'Enterprise-grade service from Microsoft for the end-to-end machine learning lifecycle',
    link: 'https://azure.microsoft.com/en-us/services/machine-learning/',
    tags: ['Microsoft', 'Cloud Service', 'MLOps', 'Enterprise'],
    category: 'compute'
  },
  {
    id: 'gcp-vertex',
    title: 'Google Cloud Vertex AI',
    description: 'Unified platform for building, deploying, and scaling ML models on Google Cloud',
    link: 'https://cloud.google.com/vertex-ai',
    tags: ['Google Cloud', 'MLOps', 'Enterprise', 'AutoML'],
    category: 'compute'
  },
  {
    id: 'paperspace',
    title: 'Paperspace Gradient',
    description: 'Platform for building, training and deploying machine learning models with powerful GPUs and a collaborative workspace',
    link: 'https://gradient.paperspace.com/',
    tags: ['Cloud GPU', 'Notebooks', 'Pay-as-you-go', 'Team Collaboration'],
    category: 'compute'
  },
  {
    id: 'runpod',
    title: 'RunPod',
    description: 'Cloud computing platform providing GPU resources for AI and machine learning applications at competitive prices',
    link: 'https://www.runpod.io/',
    tags: ['GPU Cloud', 'Cost-effective', 'Customizable', 'Developer Tools'],
    category: 'compute'
  },
  
  // Research tracking
  {
    id: 'arxiv-cs-ai',
    title: 'arXiv CS.AI',
    description: 'Preprint repository for artificial intelligence research papers, stay updated with the latest research developments',
    link: 'https://arxiv.org/list/cs.AI/recent',
    tags: ['Papers', 'Preprints', 'Research Frontier', 'Academic Resources'],
    category: 'research'
  },
  {
    id: 'paperswithcode',
    title: 'Papers with Code',
    description: 'Collection of machine learning papers and code implementations, including state-of-the-art models across various domains',
    link: 'https://paperswithcode.com/',
    tags: ['Papers', 'Code Implementation', 'SOTA', 'Benchmarks'],
    category: 'research'
  },
  {
    id: 'ai-conferences',
    title: 'AI Academic Conference Calendar',
    description: 'Schedule and important dates for major AI academic conferences, including NeurIPS, ICML, ICLR, CVPR, etc.',
    link: 'https://aideadlin.es/',
    tags: ['Conferences', 'Deadlines', 'Academic Events', 'CFP'],
    category: 'research'
  },
  {
    id: 'ai-research-labs',
    title: 'Global Top AI Research Labs',
    description: 'Collection of links to major AI research institutions and laboratories around the world',
    link: 'https://github.com/jasonwei20/ai-research-labs',
    tags: ['Research Institutions', 'Labs', 'Academic Organizations', 'Industry Research'],
    category: 'research'
  },
  {
    id: 'arxiv-sanity',
    title: 'Arxiv Sanity',
    description: 'Web interface for browsing, searching and filtering arXiv papers with a clean UI and recommendation system',
    link: 'https://arxiv-sanity-lite.com/',
    tags: ['Paper Search', 'Recommendations', 'Research Tool', 'Literature Review'],
    category: 'research'
  },
  {
    id: 'connectedpapers',
    title: 'Connected Papers',
    description: 'Visual tool to help researchers find and explore papers relevant to their research field',
    link: 'https://www.connectedpapers.com/',
    tags: ['Visual Graph', 'Literature Review', 'Paper Discovery', 'Research Aid'],
    category: 'research'
  },
  {
    id: 'ml-subreddit',
    title: 'Machine Learning Subreddit',
    description: 'Active community on Reddit discussing ML research, implementations, and industry news',
    link: 'https://www.reddit.com/r/MachineLearning/',
    tags: ['Community', 'Discussion', 'News', 'Implementation Questions'],
    category: 'research'
  },
  {
    id: 'ai-alignment-forum',
    title: 'AI Alignment Forum',
    description: 'Forum dedicated to discussion of AI safety and alignment research',
    link: 'https://www.alignmentforum.org/',
    tags: ['AI Safety', 'Alignment', 'Research Discussion', 'Existential Risk'],
    category: 'research'
  },
  {
    id: 'ai-scholar',
    title: 'AI Scholar',
    description: 'Curated collection of high-quality AI research papers with summaries and visual explanations',
    link: 'https://www.ai-scholar.tech/en/',
    tags: ['Paper Summaries', 'Visual Explanation', 'Research Digests', 'Learning Resource'],
    category: 'research'
  },
  {
    id: 'elicit-ai',
    title: 'Elicit AI Research Assistant',
    description: 'AI-powered literature review tool that helps researchers find relevant papers and answer research questions',
    link: 'https://elicit.org/',
    tags: ['Literature Review', 'AI Tool', 'Paper Discovery', 'Research Helper'],
    category: 'research'
  }
]; 