export const fetcher = async (url: string, init?: RequestInit) =>
  await fetch(url, init).then(async (res) => {
    if (!res.ok) {
      const text = await res.text();
      throw new Error(`${res.status}: ${text}`);
    }

    return res.json();
  });
