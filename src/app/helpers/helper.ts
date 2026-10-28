export const isValidImageUrl = (url: string | null | undefined): url is string => {
  if (!url || url.trim() === '') return false;
  if (url.startsWith("/")) return true;
  try {
    const parsed = new URL(url);
    return parsed.protocol === "http:" || parsed.protocol === "https:";
  } catch {
    return false;
  }
};

// next/image does not prefix basePath for local paths, so do it manually
export const withBasePath = (path: string): string =>
  path.startsWith("/") ? `${process.env.NEXT_PUBLIC_BASE_PATH || ""}${path}` : path;
