export const debounce = (func: Function, delay: number) => {
  let timeoutId: ReturnType<typeof setTimeout>;

  return (...args: any[]) => {
    clearTimeout(timeoutId);

    timeoutId = setTimeout(() => {
      func(...args);
    }, delay);
  };
};

export const getImageUrl = (filename: string): string => {
  const path = `/src/assets/${filename}`;
  const imageModules = import.meta.glob(
    "/src/assets/**/*.{png,jpg,jpeg,svg,webp,gif}",
    { eager: true },
  ) as Record<string, { default: string }>;

  if (imageModules[path]) {
    return imageModules[path].default;
  }

  throw new Error(`Image not found: ${path}`);
};
