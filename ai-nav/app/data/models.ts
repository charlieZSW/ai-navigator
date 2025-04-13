export interface Model {
  id: string;
  title: string;
  description: string;
  link: string;
  tags: string[];
  category: string;
  isFree: boolean;
}

export const modelCategories = [
  'All',
  'Computer Vision',
  'Natural Language Processing',
  'Multimodal',
  'Reinforcement Learning',
  'Generative AI'
];

export const models: Model[] = [
  {
    id: 'gpt4',
    title: 'GPT-4',
    description: 'Advanced large language model developed by OpenAI, the most sophisticated model in the GPT series with powerful natural language understanding and generation capabilities',
    link: 'https://openai.com/gpt-4',
    tags: ['LLM', 'Text Generation', 'API Available'],
    category: 'Natural Language Processing',
    isFree: false
  },
  {
    id: 'llama2',
    title: 'LLaMA 2',
    description: 'Open-source large language model developed by Meta, supporting multiple languages and available in various model sizes',
    link: 'https://ai.meta.com/llama/',
    tags: ['LLM', 'Open Source', 'Multilingual'],
    category: 'Natural Language Processing',
    isFree: true
  },
  {
    id: 'stable-diffusion',
    title: 'Stable Diffusion',
    description: 'Open-source image generation model developed by Stability AI, capable of generating high-quality images from text descriptions',
    link: 'https://stability.ai/stable-diffusion',
    tags: ['Image Generation', 'Open Source', 'AI Art'],
    category: 'Generative AI',
    isFree: true
  },
  {
    id: 'yolov8',
    title: 'YOLOv8',
    description: 'Real-time object detection model developed by Ultralytics, the latest version in the YOLO series, offering higher accuracy and faster inference speed',
    link: 'https://github.com/ultralytics/ultralytics',
    tags: ['Object Detection', 'Real-time', 'Computer Vision'],
    category: 'Computer Vision',
    isFree: true
  },
  {
    id: 'resnet',
    title: 'ResNet',
    description: 'Deep residual network proposed by Microsoft Research, solving the vanishing gradient problem in deep neural networks, widely used for image classification tasks',
    link: 'https://github.com/KaimingHe/deep-residual-networks',
    tags: ['Image Classification', 'Deep Learning', 'CNN'],
    category: 'Computer Vision',
    isFree: true
  },
  {
    id: 'bert',
    title: 'BERT',
    description: 'Pre-trained language representation model developed by Google, learning context-dependent word embeddings using bidirectional Transformer structure',
    link: 'https://github.com/google-research/bert',
    tags: ['NLP', 'Pre-trained Model', 'Text Embeddings'],
    category: 'Natural Language Processing',
    isFree: true
  },
  {
    id: 'clip',
    title: 'CLIP',
    description: 'Multimodal model developed by OpenAI that can understand the relationship between images and text, widely used for image search and zero-shot image classification',
    link: 'https://github.com/openai/CLIP',
    tags: ['Multimodal', 'Zero-shot Learning', 'Image Understanding'],
    category: 'Multimodal',
    isFree: true
  },
  {
    id: 'ppo',
    title: 'PPO',
    description: 'Proximal Policy Optimization algorithm developed by OpenAI, a reinforcement learning algorithm widely used for game AI and robot control',
    link: 'https://github.com/openai/baselines',
    tags: ['Reinforcement Learning', 'Policy Optimization', 'Game AI'],
    category: 'Reinforcement Learning',
    isFree: true
  },
  {
    id: 'dqn',
    title: 'DQN',
    description: 'Deep Q-Network developed by DeepMind, combining deep learning with Q-learning, achieving superhuman performance in Atari games',
    link: 'https://github.com/deepmind/dqn',
    tags: ['Reinforcement Learning', 'Q-Learning', 'Game AI'],
    category: 'Reinforcement Learning',
    isFree: true
  },
  {
    id: 'chatgpt',
    title: 'ChatGPT',
    description: 'Conversational AI developed by OpenAI based on the GPT model series, capable of understanding and generating human language, supporting multi-turn dialogue',
    link: 'https://chat.openai.com',
    tags: ['Conversational AI', 'Chatbot', 'API Available'],
    category: 'Natural Language Processing',
    isFree: false
  },
  {
    id: 'claude',
    title: 'Claude',
    description: 'Advanced AI assistant developed by Anthropic, designed to be helpful, harmless, and honest, with strong capabilities in text understanding and generation',
    link: 'https://claude.ai/',
    tags: ['AI Assistant', 'Text Generation', 'Helpful AI'],
    category: 'Natural Language Processing',
    isFree: false
  },
  {
    id: 'gemini',
    title: 'Gemini',
    description: 'Google\'s multimodal AI model family designed to understand and generate text, images, audio and more, with capabilities across a wide range of tasks',
    link: 'https://deepmind.google/technologies/gemini/',
    tags: ['Multimodal', 'Google', 'Advanced AI'],
    category: 'Multimodal',
    isFree: false
  },
  {
    id: 'sora',
    title: 'Sora',
    description: 'OpenAI\'s text-to-video AI model capable of generating realistic and creative videos from text prompts with high visual quality',
    link: 'https://openai.com/sora',
    tags: ['Text-to-Video', 'Generative AI', 'Video Generation'],
    category: 'Generative AI',
    isFree: false
  },
  {
    id: 'dalle3',
    title: 'DALL-E 3',
    description: 'Advanced text-to-image model by OpenAI that generates detailed images from text descriptions with high fidelity and creative interpretation',
    link: 'https://openai.com/dall-e-3',
    tags: ['Text-to-Image', 'AI Art', 'Image Generation'],
    category: 'Generative AI',
    isFree: false
  },
  {
    id: 'midjourney',
    title: 'Midjourney',
    description: 'AI image generation model creating artistic and photorealistic images from text descriptions, popular for creative and commercial applications',
    link: 'https://www.midjourney.com/',
    tags: ['Text-to-Image', 'AI Art', 'Creative Tool'],
    category: 'Generative AI',
    isFree: false
  },
  {
    id: 'mistral',
    title: 'Mistral AI',
    description: 'Family of open and efficient large language models designed for high-performance and specialized domain applications',
    link: 'https://mistral.ai/',
    tags: ['LLM', 'Open Weights', 'Efficient Models'],
    category: 'Natural Language Processing',
    isFree: true
  },
  {
    id: 'diffusers',
    title: 'Hugging Face Diffusers',
    description: 'Library for state-of-the-art diffusion models for image and audio generation in PyTorch, offering pre-trained models and easy customization',
    link: 'https://huggingface.co/docs/diffusers/index',
    tags: ['Diffusion Models', 'Image Generation', 'Audio Generation', 'Library'],
    category: 'Generative AI',
    isFree: true
  },
  {
    id: 'whisper',
    title: 'Whisper',
    description: 'Automatic speech recognition system by OpenAI trained on diverse audio with robust performance across languages and domains',
    link: 'https://github.com/openai/whisper',
    tags: ['Speech Recognition', 'ASR', 'Multilingual', 'Audio Processing'],
    category: 'Natural Language Processing',
    isFree: true
  },
  {
    id: 'segment-anything',
    title: 'Segment Anything (SAM)',
    description: 'Meta AI\'s foundation model for image segmentation that can identify objects in images with minimal prompting',
    link: 'https://segment-anything.com/',
    tags: ['Image Segmentation', 'Computer Vision', 'Foundation Model'],
    category: 'Computer Vision',
    isFree: true
  },
  {
    id: 'vision-transformer',
    title: 'Vision Transformer (ViT)',
    description: 'Transformer-based architecture applied to image recognition tasks, offering competitive performance to CNNs with transfer learning benefits',
    link: 'https://github.com/google-research/vision_transformer',
    tags: ['Image Classification', 'Transformer', 'Computer Vision'],
    category: 'Computer Vision',
    isFree: true
  },
  {
    id: 'swin-transformer',
    title: 'Swin Transformer',
    description: 'Hierarchical vision transformer using shifted windows for more efficient modeling of visual data at multiple scales',
    link: 'https://github.com/microsoft/Swin-Transformer',
    tags: ['Computer Vision', 'Transformer', 'Hierarchical'],
    category: 'Computer Vision',
    isFree: true
  },
  {
    id: 'mamba',
    title: 'Mamba',
    description: 'State space model architecture offering efficient sequence modeling through selective state space integration with strong performance on long contexts',
    link: 'https://github.com/state-spaces/mamba',
    tags: ['State Space Models', 'Sequence Modeling', 'Long Context'],
    category: 'Natural Language Processing',
    isFree: true
  },
  {
    id: 'graphcast',
    title: 'GraphCast',
    description: 'DeepMind\'s ML weather forecasting system using graph neural networks to provide accurate forecasts up to 10 days ahead',
    link: 'https://www.deepmind.com/blog/graphcast-ai-model-for-faster-and-more-accurate-global-weather-forecasting',
    tags: ['Weather Forecasting', 'GNN', 'Scientific ML'],
    category: 'Multimodal',
    isFree: false
  },
  {
    id: 'musiclm',
    title: 'MusicLM',
    description: 'Google\'s text-to-music generation model capable of creating high-fidelity music from text descriptions',
    link: 'https://google-research.github.io/seanet/musiclm/examples/',
    tags: ['Text-to-Music', 'Audio Generation', 'Creative AI'],
    category: 'Generative AI',
    isFree: false
  },
  {
    id: 'gato',
    title: 'Gato',
    description: 'DeepMind\'s generalist AI agent capable of performing hundreds of different tasks across various domains from playing games to controlling robotic arms',
    link: 'https://www.deepmind.com/publications/a-generalist-agent',
    tags: ['Generalist Agent', 'Multi-task', 'Robotics', 'Games'],
    category: 'Multimodal',
    isFree: false
  },
  {
    id: 'alphafold',
    title: 'AlphaFold',
    description: 'DeepMind\'s AI system for protein structure prediction that revolutionized the field of computational biology',
    link: 'https://github.com/deepmind/alphafold',
    tags: ['Protein Folding', 'Biology', 'Scientific ML'],
    category: 'Multimodal',
    isFree: true
  }
]; 