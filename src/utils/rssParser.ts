/* eslint-disable @typescript-eslint/no-explicit-any */

export interface RSSNewsItem {
  id: string;
  title: string;
  link: string;
  description?: string;
  publishedAt: string;
  source?: string;
  category?: string;
}

// CORS 프록시 목록 (여러 옵션 시도)
const PROXY_SERVICES = [
  {
    name: 'allorigins',
    buildUrl: (url: string) => `https://api.allorigins.win/get?url=${encodeURIComponent(url)}`,
    parseResponse: async (response: Response) => {
      const data = await response.json();
      return data.contents;
    },
  },
  {
    name: 'corsproxy',
    buildUrl: (url: string) => `https://corsproxy.io/?${encodeURIComponent(url)}`,
    parseResponse: async (response: Response) => {
      return await response.text();
    },
  },
  {
    name: 'cors-anywhere',
    buildUrl: (url: string) => `https://cors-anywhere.herokuapp.com/${url}`,
    parseResponse: async (response: Response) => {
      return await response.text();
    },
  },
];

// CORS 프록시를 통한 RSS 피드 가져오기 (여러 프록시 서비스 시도)
const fetchWithProxy = async (url: string): Promise<string> => {
  // 각 프록시 서비스를 순차적으로 시도
  for (const proxy of PROXY_SERVICES) {
    try {
      const proxyUrl = proxy.buildUrl(url);
      const response = await fetch(proxyUrl, {
        method: 'GET',
        headers: {
          'Accept': 'application/xml, text/xml, */*',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const content = await proxy.parseResponse(response);
      if (content && content.trim().length > 0) {
        console.log(`[RSS Parser] ${proxy.name} 프록시로 성공적으로 가져옴`);
        return content;
      }
    } catch (error: any) {
      // 개별 프록시 실패는 조용히 처리 (다음 프록시 시도)
      // 403, CORS 등의 에러는 예상 가능한 것이므로 로깅하지 않음
      continue;
    }
  }

  // 모든 프록시가 실패한 경우 (조용히 실패 - fetchMultipleRSSFeeds에서 처리)
  // 일부 피드는 성공할 수 있으므로 에러를 던지지 않고 빈 문자열 반환
  // 로깅하지 않음 (다른 피드가 성공할 수 있고, 너무 많은 로그를 방지하기 위해)
  return '';
};

// 브라우저 네이티브 DOMParser를 사용한 RSS 파싱
const parseRSSXML = (xmlString: string): RSSNewsItem[] => {
  try {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlString, 'text/xml');

    // 파싱 에러 확인
    const parseError = xmlDoc.querySelector('parsererror');
    if (parseError) {
      console.error('[RSS Parser] XML 파싱 에러:', parseError.textContent);
      return [];
    }

    // 채널 정보 가져오기
    const channel = xmlDoc.querySelector('channel');
    const channelTitle = channel?.querySelector('title')?.textContent || 'RSS Feed';

    // 아이템 가져오기
    const items = xmlDoc.querySelectorAll('item');
    const newsItems: RSSNewsItem[] = [];

    items.forEach((item) => {
      const title = item.querySelector('title')?.textContent || '';
      const link = item.querySelector('link')?.textContent || '';
      const description =
        item.querySelector('description')?.textContent ||
        item.querySelector('content\\:encoded, encoded')?.textContent ||
        '';
      const pubDate = item.querySelector('pubDate')?.textContent || '';
      const guid = item.querySelector('guid')?.textContent || '';
      const category = item.querySelector('category')?.textContent || '';

      // pubDate를 Date로 변환
      let publishedAt = new Date().toISOString();
      if (pubDate) {
        const date = new Date(pubDate);
        if (!isNaN(date.getTime())) {
          publishedAt = date.toISOString();
        }
      }

      newsItems.push({
        id: guid || link || Math.random().toString(),
        title: title.trim(),
        link: link.trim(),
        description: description.trim(),
        publishedAt,
        source: channelTitle,
        category: category || undefined,
      });
    });

    return newsItems;
  } catch (error) {
    console.error('[RSS Parser] XML 파싱 실패:', error);
    return [];
  }
};

// RSS 피드 파싱
export const parseRSSFeed = async (url: string): Promise<RSSNewsItem[]> => {
  try {
    const xmlString = await fetchWithProxy(url);
    
    // 빈 문자열인 경우 (모든 프록시 실패) 빈 배열 반환
    if (!xmlString || xmlString.trim().length === 0) {
      return [];
    }
    
    return parseRSSXML(xmlString);
  } catch (error) {
    // 개별 피드 실패는 조용히 처리 (다른 피드는 성공할 수 있음)
    console.warn('[RSS Parser] RSS 피드 가져오기 실패:', url, error);
    return [];
  }
};

// 여러 RSS 피드에서 뉴스 가져오기
export const fetchMultipleRSSFeeds = async (
  urls: string[]
): Promise<RSSNewsItem[]> => {
  try {
    const results = await Promise.allSettled(urls.map((url) => parseRSSFeed(url)));

    const allNews: RSSNewsItem[] = [];
    results.forEach((result) => {
      if (result.status === 'fulfilled') {
        allNews.push(...result.value);
      }
    });

    // 발행일 기준으로 정렬 (최신순)
    return allNews.sort((a, b) => {
      const dateA = new Date(a.publishedAt).getTime();
      const dateB = new Date(b.publishedAt).getTime();
      return dateB - dateA;
    });
  } catch (error) {
    console.error('[RSS Parser] 여러 피드 가져오기 실패:', error);
    return [];
  }
};

// 한국 주식 관련 RSS 피드 URL 목록
export const STOCK_RSS_FEEDS = [
  // 연합인포맥스 투자/증권 뉴스
  'https://www.yonhapinfomax.com/rss/invest.xml',
  // 한국경제 경제 뉴스
  'https://www.hankyung.com/feed/economy',
  // 추가 RSS 피드 URL을 여기에 추가할 수 있습니다
];

