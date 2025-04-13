export interface Dataset {
  id: string;
  title: string;
  description: string;
  link: string;
  tags: string[];
  category: string;
  size?: string;
  format?: string;
  license?: string;
}

export const datasetCategories = [
  'All',
  'Image Datasets',
  'Text Datasets',
  'Audio Datasets',
  'Multimodal Datasets',
  'Tabular Datasets'
];

export const datasets: Dataset[] = [
  {
    id: 'imagenet',
    title: 'ImageNet',
    description: 'Large-scale visual recognition dataset containing over 14 million images across 20,000+ categories, one of the most important datasets in computer vision',
    link: 'https://www.image-net.org/',
    tags: ['Image Classification', 'Large-scale', 'Computer Vision'],
    category: 'Image Datasets',
    size: '~150GB',
    format: 'JPEG',
    license: 'Academic and Non-commercial Use'
  },
  {
    id: 'coco',
    title: 'COCO Dataset',
    description: 'Common Objects in Context dataset developed by Microsoft, providing object detection, segmentation, and captioning annotations, widely used as a benchmark for computer vision tasks',
    link: 'https://cocodataset.org/',
    tags: ['Object Detection', 'Image Segmentation', 'Scene Understanding'],
    category: 'Image Datasets',
    size: '~25GB',
    format: 'JSON+Images',
    license: 'Creative Commons'
  },
  {
    id: 'wikipedia',
    title: 'Wikipedia Corpus',
    description: 'Wikipedia text corpus containing encyclopedia articles in multiple languages, commonly used for training language models and knowledge extraction',
    link: 'https://dumps.wikimedia.org/',
    tags: ['Encyclopedia', 'Multilingual', 'Text Corpus'],
    category: 'Text Datasets',
    size: 'Variable (tens of GB)',
    format: 'XML/Text',
    license: 'Creative Commons'
  },
  {
    id: 'librispeech',
    title: 'LibriSpeech',
    description: 'English speech dataset derived from audiobooks, containing approximately 1000 hours of 16kHz English speech',
    link: 'https://www.openslr.org/12',
    tags: ['Speech Recognition', 'English', 'Audiobooks'],
    category: 'Audio Datasets',
    size: '~60GB',
    format: 'FLAC Audio',
    license: 'CC BY 4.0'
  },
  {
    id: 'common-crawl',
    title: 'Common Crawl',
    description: 'Large-scale web crawl data containing billions of web pages, a common data source for training large language models',
    link: 'https://commoncrawl.org/',
    tags: ['Web Data', 'Large-scale', 'Multilingual'],
    category: 'Text Datasets',
    size: 'Tens of PB',
    format: 'WARC/WET/WAT',
    license: 'Public Domain'
  },
  {
    id: 'ms-marco',
    title: 'MS MARCO',
    description: 'Large-scale search and question answering dataset developed by Microsoft, based on real Bing search queries',
    link: 'https://microsoft.github.io/msmarco/',
    tags: ['Question Answering', 'Search', 'Natural Language Processing'],
    category: 'Text Datasets',
    size: 'Several GB',
    format: 'JSON',
    license: 'MIT'
  },
  {
    id: 'voxceleb',
    title: 'VoxCeleb',
    description: 'Large-scale speaker identification dataset containing voice data from thousands of celebrities extracted from YouTube videos',
    link: 'https://www.robots.ox.ac.uk/~vgg/data/voxceleb/',
    tags: ['Speaker Recognition', 'Voice', 'Audio Processing'],
    category: 'Audio Datasets',
    size: '~150GB',
    format: 'WAV Audio',
    license: 'Creative Commons'
  },
  {
    id: 'conceptual-captions',
    title: 'Conceptual Captions',
    description: 'Large-scale image description dataset developed by Google, containing approximately 3.3 million pairs of images and descriptive texts',
    link: 'https://ai.google.com/research/ConceptualCaptions/',
    tags: ['Image Captioning', 'Multimodal', 'Vision-Language'],
    category: 'Multimodal Datasets',
    size: 'Unspecified (URLs only)',
    format: 'JSON',
    license: 'Research Use'
  },
  {
    id: 'cifar10',
    title: 'CIFAR-10',
    description: 'Small dataset of 60,000 32x32 color images across 10 categories, commonly used as a benchmark for image classification algorithms',
    link: 'https://www.cs.toronto.edu/~kriz/cifar.html',
    tags: ['Image Classification', 'Small-scale', 'Learning Benchmark'],
    category: 'Image Datasets',
    size: '~170MB',
    format: 'Binary/Python Pickle',
    license: 'Public Domain'
  },
  {
    id: 'glue',
    title: 'GLUE Benchmark',
    description: 'General Language Understanding Evaluation benchmark, a collection of tasks for evaluating the generalization capabilities of language models',
    link: 'https://gluebenchmark.com/',
    tags: ['Natural Language Understanding', 'Benchmark', 'NLP Evaluation'],
    category: 'Text Datasets',
    size: 'Hundreds of MB',
    format: 'TSV/JSON',
    license: 'CC BY-SA 4.0'
  },
  {
    id: 'audio-set',
    title: 'AudioSet',
    description: 'Large-scale dataset of manually annotated audio events from YouTube videos covering over 600 audio classes',
    link: 'https://research.google.com/audioset/',
    tags: ['Audio Classification', 'Sound Events', 'Audio Processing'],
    category: 'Audio Datasets',
    size: '~2TB',
    format: 'WAV/Features',
    license: 'Creative Commons'
  },
  {
    id: 'huggingface-datasets',
    title: 'Hugging Face Datasets Hub',
    description: 'Collection of thousands of ready-to-use datasets for machine learning and NLP, easily accessible through the datasets library',
    link: 'https://huggingface.co/datasets',
    tags: ['Multi-domain', 'NLP', 'Vision', 'Audio', 'Benchmarks'],
    category: 'Multimodal Datasets',
    size: 'Variable',
    format: 'Multiple formats',
    license: 'Various licenses'
  },
  {
    id: 'squad',
    title: 'SQuAD',
    description: 'Stanford Question Answering Dataset with 100,000+ questions posed on a set of Wikipedia articles, where answers are text segments from the corresponding passages',
    link: 'https://rajpurkar.github.io/SQuAD-explorer/',
    tags: ['Question Answering', 'Reading Comprehension', 'NLP'],
    category: 'Text Datasets',
    size: '~30MB',
    format: 'JSON',
    license: 'CC BY-SA 4.0'
  },
  {
    id: 'kaggle-datasets',
    title: 'Kaggle Datasets',
    description: 'Comprehensive platform hosting thousands of public datasets across various domains like finance, healthcare, image classification, and more',
    link: 'https://www.kaggle.com/datasets',
    tags: ['Multi-domain', 'Competitions', 'Various sizes'],
    category: 'Tabular Datasets',
    size: 'Variable',
    format: 'CSV/JSON/Images',
    license: 'Various licenses'
  },
  {
    id: 'celeba',
    title: 'CelebA',
    description: 'Large-scale face attributes dataset with more than 200K celebrity images, each with 40 attribute annotations and 5 landmark locations',
    link: 'https://mmlab.ie.cuhk.edu.hk/projects/CelebA.html',
    tags: ['Face Recognition', 'Attributes', 'Facial Landmarks'],
    category: 'Image Datasets',
    size: '~1.6GB',
    format: 'JPEG',
    license: 'Non-commercial Research'
  },
  {
    id: 'open-images',
    title: 'Open Images Dataset',
    description: 'Dataset consisting of ~9M images annotated with image-level labels, object bounding boxes, object segmentation masks, and visual relationships',
    link: 'https://storage.googleapis.com/openimages/web/index.html',
    tags: ['Object Detection', 'Segmentation', 'Visual Relationships'],
    category: 'Image Datasets',
    size: '~18TB (full)',
    format: 'JPEG/CSV',
    license: 'CC BY 4.0'
  },
  {
    id: 'lfw',
    title: 'Labeled Faces in the Wild',
    description: 'Database of face photographs designed for studying unconstrained face recognition, containing 13,000 images of faces collected from the web',
    link: 'http://vis-www.cs.umass.edu/lfw/',
    tags: ['Face Recognition', 'Faces', 'Benchmark'],
    category: 'Image Datasets',
    size: '~173MB',
    format: 'JPEG',
    license: 'Research Use'
  },
  {
    id: 'wikitext',
    title: 'WikiText',
    description: 'Collection of over 100 million tokens extracted from verified Good and Featured articles from Wikipedia, ideal for language modeling',
    link: 'https://blog.salesforceairesearch.com/the-wikitext-long-term-dependency-language-modeling-dataset/',
    tags: ['Language Modeling', 'Long-term dependencies', 'NLP'],
    category: 'Text Datasets',
    size: '~250MB',
    format: 'Text',
    license: 'Creative Commons'
  },
  {
    id: 'clevr',
    title: 'CLEVR',
    description: 'Diagnostic dataset for testing visual reasoning abilities, featuring 3D rendered objects with questions requiring compositional reasoning',
    link: 'https://cs.stanford.edu/people/jcjohns/clevr/',
    tags: ['Visual Reasoning', 'Question Answering', 'Compositional'],
    category: 'Multimodal Datasets',
    size: '~18GB',
    format: 'Images + JSON',
    license: 'MIT'
  },
  {
    id: 'nuscenes',
    title: 'nuScenes',
    description: 'Large-scale autonomous driving dataset with data from LIDAR, RADAR, and cameras with 1000 scenes fully annotated with 3D bounding boxes',
    link: 'https://www.nuscenes.org/',
    tags: ['Autonomous Driving', 'Object Detection', '3D Tracking'],
    category: 'Multimodal Datasets',
    size: '~300GB',
    format: 'Multiple formats',
    license: 'CC BY-NC-SA 4.0'
  },
  {
    id: 'billionwords',
    title: '1 Billion Word Benchmark',
    description: 'Large benchmark for measuring progress in statistical language modeling, focusing on English',
    link: 'https://github.com/ciprian-chelba/1-billion-word-language-modeling-benchmark',
    tags: ['Language Modeling', 'English', 'Benchmark'],
    category: 'Text Datasets',
    size: '~1.8GB',
    format: 'Text',
    license: 'Apache 2.0'
  },
  {
    id: 'youtube8m',
    title: 'YouTube-8M',
    description: 'Large-scale labeled video dataset consisting of millions of YouTube video IDs with annotations from over 3,800 visual entities',
    link: 'https://research.google.com/youtube8m/',
    tags: ['Video Classification', 'Multi-label', 'Large-scale'],
    category: 'Multimodal Datasets',
    size: '~1.5TB (features)',
    format: 'TensorFlow Records',
    license: 'Creative Commons'
  },
  {
    id: 'fashion-mnist',
    title: 'Fashion-MNIST',
    description: 'Dataset of Zalando\'s article images consisting of 70,000 28x28 grayscale images across 10 fashion categories, intended as a drop-in replacement for MNIST',
    link: 'https://github.com/zalandoresearch/fashion-mnist',
    tags: ['Image Classification', 'Fashion', 'Benchmark'],
    category: 'Image Datasets',
    size: '~30MB',
    format: 'Similar to MNIST',
    license: 'MIT'
  },
  {
    id: 'ucf101',
    title: 'UCF101',
    description: 'Action recognition dataset of realistic action videos collected from YouTube, with 101 action categories and 13,320 video clips',
    link: 'https://www.crcv.ucf.edu/data/UCF101.php',
    tags: ['Action Recognition', 'Video Classification', 'Human Actions'],
    category: 'Multimodal Datasets',
    size: '~6.5GB',
    format: 'AVI',
    license: 'Research Use'
  },
  {
    id: 'iwslt',
    title: 'IWSLT TED Talks',
    description: 'Collection of translated TED talks for machine translation research, covering multiple language pairs',
    link: 'https://wit3.fbk.eu/',
    tags: ['Machine Translation', 'Multilingual', 'Speech Transcripts'],
    category: 'Text Datasets',
    size: 'Hundreds of MB',
    format: 'XML/Text',
    license: 'CC BY-NC-ND 4.0'
  }
]; 