import type { StaticImageData } from 'next/image';
import VanillaCountriesImage from '../../assets/images/vanilla-countries.png';
import TypoTuneImage from '../../assets/images/typotune.png';
import PrismImage from '../../assets/images/prism.png';

export type Project = {
  title: string;
  description: string;
  stack: string[];
  image: StaticImageData;
  repo: string;
  demo?: string;
};

export const projects: Project[] = [
  {
    title: 'Vanilla Countries',
    description:
      'Interactive world atlas with zoom, pan, country details, and a known-countries tracker — built with zero frameworks.',
    stack: ['HTML', 'CSS', 'JavaScript'],
    image: VanillaCountriesImage,
    repo: 'https://github.com/ericiannj/vanilla-countries',
    demo: 'https://countries.ericjunqueira.com',
  },
  {
    title: 'TypoTune',
    description:
      'AI-powered text editor that rewrites and explains English corrections via a server-side Groq integration.',
    stack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Groq AI'],
    image: TypoTuneImage,
    repo: 'https://github.com/ericiannj/typotune',
    demo: 'https://typotune.ericjunqueira.com',
  },
  {
    title: 'Prism',
    description:
      'Full-stack RAG platform where users upload documents and query a chat interface that retrieves from three sources: personal knowledge base, model training, and the web.',
    stack: [
      'React',
      'TypeScript',
      'Express',
      'PostgreSQL',
      'pgvector',
      'OpenRouter',
      'Tavily',
    ],
    image: PrismImage,
    repo: 'https://github.com/ericiannj/prism',
    demo: 'https://prism.ericjunqueira.com',
  },
];
