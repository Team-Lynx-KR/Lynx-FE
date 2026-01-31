export interface GitHubRelease {
  tag_name: string;
  name: string;
  published_at: string;
  assets: Array<{
    name: string;
    browser_download_url: string;
    size: number;
  }>;
}

export interface GetLatestReleaseParams {
  owner: string; // GitHub 사용자명 또는 조직명
  repo: string;  // 저장소 이름
}

/**
 * GitHub에서 최신 릴리즈 정보를 가져옵니다
 */
export const getLatestRelease = async (
  params?: GetLatestReleaseParams
): Promise<GitHubRelease | null> => {
  try {
    // 환경 변수에서 가져오거나 기본값 사용
    const owner = params?.owner || import.meta.env.VITE_GITHUB_OWNER || 'Team-Lynx-KR';
    const repo = params?.repo || import.meta.env.VITE_GITHUB_REPO || 'Lynx-FE';
    
    const response = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/releases/latest`
    );

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status}`);
    }

    const data: GitHubRelease = await response.json();
    return data;
  } catch (error) {
    console.error('[GitHub] 최신 릴리즈 조회 실패:', error);
    return null;
  }
};

/**
 * OS에 맞는 다운로드 파일을 찾습니다
 */
export const getDownloadUrlForOS = (
  release: GitHubRelease,
  os: 'windows' | 'mac' | 'linux' = 'windows'
): string | null => {
  const fileExtensions = {
    windows: ['.exe', '.msi'],
    mac: ['.dmg'],
    linux: ['.AppImage', '.deb', '.rpm'],
  };

  const extensions = fileExtensions[os];
  
  for (const asset of release.assets) {
    if (extensions.some((ext) => asset.name.toLowerCase().endsWith(ext))) {
      return asset.browser_download_url;
    }
  }

  // OS별 파일이 없으면 첫 번째 asset 반환
  return release.assets.length > 0 ? release.assets[0].browser_download_url : null;
};

/**
 * OS 감지
 */
export const detectOS = (): 'windows' | 'mac' | 'linux' => {
  const userAgent = navigator.userAgent.toLowerCase();
  if (userAgent.includes('win')) return 'windows';
  if (userAgent.includes('mac')) return 'mac';
  return 'linux';
};

