import { Tutorial, TutorialNew, PRIMARY_CATEGORIES, SUB_CATEGORIES } from '../data/tutorials';

/**
 * 将旧的教程数据格式转换为新的数据格式
 * @param oldTutorials 旧格式的教程数据
 * @returns 新格式的教程数据
 */
export function migrateTutorialsData(oldTutorials: Tutorial[]): TutorialNew[] {
  return oldTutorials.map(tutorial => {
    // 确定主分类
    let primaryCategory = mapCategoryToPrimary(tutorial.category);
    
    // 确定子分类（基于标签和分类）
    const subCategories = inferSubCategories(primaryCategory, tutorial.tags);
    
    // 确定资源语言
    const language = inferLanguage(tutorial.tags);
    
    // 转换为新的数据模型
    return {
      id: tutorial.id,
      title: tutorial.title,
      description: tutorial.description,
      link: tutorial.link,
      primaryCategory: primaryCategory,
      subCategories: subCategories,
      topics: tutorial.tags,
      difficulty: tutorial.difficulty,
      type: tutorial.type,
      language: language,
      isFree: tutorial.isFree
    };
  });
}

/**
 * 将原始分类映射到新的主分类
 */
function mapCategoryToPrimary(category: string): string {
  const categoryMap: Record<string, string> = {
    'AI Fundamentals': PRIMARY_CATEGORIES.FOUNDATIONS,
    'Math Fundamentals': PRIMARY_CATEGORIES.FOUNDATIONS,
    'Programming Basics': PRIMARY_CATEGORIES.FOUNDATIONS,
    'Machine Learning': PRIMARY_CATEGORIES.MACHINE_LEARNING,
    'Deep Learning': PRIMARY_CATEGORIES.DEEP_LEARNING,
    'NLP': PRIMARY_CATEGORIES.NLP,
    'Computer Vision': PRIMARY_CATEGORIES.COMPUTER_VISION,
    'Reinforcement Learning': PRIMARY_CATEGORIES.REINFORCEMENT_LEARNING,
    'Generative AI': PRIMARY_CATEGORIES.GENERATIVE_AI,
    'Tools & Platforms': PRIMARY_CATEGORIES.TOOLS
  };
  
  return categoryMap[category] || PRIMARY_CATEGORIES.OTHER;
}

/**
 * 根据主分类和标签推断子分类
 */
function inferSubCategories(primaryCategory: string, tags: string[]): string[] {
  const subCategories: string[] = [];
  const tagIncludes = (keyword: string) => tags.some(tag => tag.toLowerCase().includes(keyword));
  
  // 匹配标签与子分类的映射关系
  const categoryMatchers: Record<string, Record<string, string[]>> = {
    [PRIMARY_CATEGORIES.FOUNDATIONS]: {
      'python-programming': ['python', 'programming', 'coding'],
      'mathematics': ['math', 'statistics', 'linear algebra'],
      'data-analysis': ['data analysis', 'data science', 'pandas', 'numpy'],
      'ai-basics': ['ai', 'basics', 'fundamental'],
      'tools-platforms': ['tool', 'platform', 'framework']
    },
    [PRIMARY_CATEGORIES.MACHINE_LEARNING]: {
      'supervised-learning': ['supervised', 'classification', 'regression'],
      'unsupervised-learning': ['unsupervised', 'clustering', 'dimensionality reduction'],
      'model-evaluation': ['evaluation', 'metrics', 'validation']
    },
    [PRIMARY_CATEGORIES.DEEP_LEARNING]: {
      'neural-networks': ['neural network', 'deep learning'],
      'cnn': ['cnn', 'convolutional'],
      'rnn': ['rnn', 'recurrent', 'lstm'],
      'transformers': ['transformer', 'attention'],
      'frameworks': ['tensorflow', 'pytorch', 'keras']
    },
    [PRIMARY_CATEGORIES.NLP]: {
      'text-processing': ['text processing'],
      'sentiment-analysis': ['sentiment'],
      'language-models': ['language model', 'gpt', 'bert'],
      'translation': ['translation']
    },
    [PRIMARY_CATEGORIES.COMPUTER_VISION]: {
      'image-classification': ['classification'],
      'object-detection': ['detection'],
      'segmentation': ['segmentation'],
      'face-recognition': ['face']
    },
    [PRIMARY_CATEGORIES.REINFORCEMENT_LEARNING]: {
      'q-learning': ['q-learning'],
      'policy-gradients': ['policy'],
      'deep-reinforcement-learning': ['deep reinforcement']
    },
    [PRIMARY_CATEGORIES.GENERATIVE_AI]: {
      'gans': ['gan', 'generative adversarial'],
      'diffusion-models': ['diffusion'],
      'text-to-image': ['text-to-image', 'text to image'],
      'prompt-engineering': ['prompt']
    },
    [PRIMARY_CATEGORIES.TOOLS]: {
      'development-environments': ['ide', 'environment'],
      'libraries': ['library', 'framework'],
      'cloud-platforms': ['cloud', 'platform']
    }
  };
  
  // 获取当前主分类的匹配器
  const matchers = categoryMatchers[primaryCategory];
  if (matchers) {
    // 遍历匹配器检查标签
    for (const [subCategory, keywords] of Object.entries(matchers)) {
      if (keywords.some(keyword => tagIncludes(keyword))) {
        subCategories.push(subCategory);
      }
    }
  }
  
  // 如果没有找到任何子分类，添加'all'作为默认值
  return subCategories.length > 0 ? subCategories : ['all'];
}

/**
 * 根据标签推断资源语言
 */
function inferLanguage(tags: string[]): string {
  const tagStr = tags.join(' ').toLowerCase();
  
  if (tagStr.includes('中文') || tagStr.includes('chinese') || tagStr.includes('mandarin')) {
    return 'zh';
  } else if (tagStr.includes('日语') || tagStr.includes('japanese')) {
    return 'jp';
  } else if (tagStr.includes('韩语') || tagStr.includes('korean')) {
    return 'kr';
  } else if (tagStr.includes('法语') || tagStr.includes('french')) {
    return 'fr';
  } else if (tagStr.includes('德语') || tagStr.includes('german')) {
    return 'de';
  } else if (tagStr.includes('西班牙语') || tagStr.includes('spanish')) {
    return 'es';
  } else if (tagStr.includes('俄语') || tagStr.includes('russian')) {
    return 'ru';
  }
  
  // 默认为英文
  return 'en';
} 