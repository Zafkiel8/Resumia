export interface Article {
  id: string;
  title: string;
  canonical_url: string;
  published_at: string;
  summary_bullets: string[];
  summary_paragraph: string;
  topics: string[];
  country?: string;
  source: {
    name: string;
    url: string;
    logo?: string;
  };
  lang: string;
  reading_time: number;
}

export interface Source {
  id: string;
  name: string;
  url: string;
  rss_url: string;
  lang: string;
  country: string;
  source_score: number;
  active: boolean;
}

export type FilterCategory = 'todas' | 'tecnologia' | 'deportes' | 'espana' | 'mundo' | 'economia' | 'ciencia';