// 공통 타입 정의

export interface StockData {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  volume: number;
  timestamp: Date;
}

export interface ChartData {
  time: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

export interface AIAnalysis {
  id: string;
  symbol: string;
  recommendation: 'buy' | 'sell' | 'hold';
  confidence: number;
  reasoning: string;
  timestamp: Date;
}

export interface NewsItem {
  id: string;
  title: string;
  content: string;
  source: string;
  publishedAt: Date;
  sentiment: 'positive' | 'negative' | 'neutral';
}

