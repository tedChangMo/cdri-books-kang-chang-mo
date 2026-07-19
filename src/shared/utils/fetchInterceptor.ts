export const fetchInterceptor = () => {
  if (typeof window === 'undefined') return;
  const originalFetch = window.fetch;

  window.fetch = async (...args) => {
    const [resource, config] = args;

    const urlString =
      resource instanceof Request ? resource.url : resource.toString();

    let modifiedConfig: RequestInit = { ...config };

    if (urlString.includes('kakao.com')) {
      const existingHeaders =
        resource instanceof Request
          ? Object.fromEntries(resource.headers.entries())
          : config?.headers;

      modifiedConfig = {
        ...config,
        headers: {
          'Content-Type': 'application/json',
          ...existingHeaders,
          Authorization: `KakaoAK ${process.env.NEXT_PUBLIC_KAKAO_REST_KEY || ''}`,
        },
      };
    }

    const response = await originalFetch(resource, modifiedConfig);

    if (!response.ok) {
      throw new Error(
        `[HTTP ERROR] ${response.status} : ${response.statusText}`,
      );
    }

    return response;
  };
};
