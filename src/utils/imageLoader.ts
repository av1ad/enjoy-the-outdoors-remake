// Image loader utility to optimize image loading
export const importImage = async (imageName: string): Promise<string> => {
  try {
    const imageModule = await import(`../images/${imageName}`);
    return imageModule.default;
  } catch (error) {
    console.error(`Failed to load image: ${imageName}`, error);
    return '/images/placeholder.jpg'; // fallback image
  }
};

// Create image map for preloading
export const createImageMap = (images: string[]): Record<string, Promise<string>> => {
  const imageMap: Record<string, Promise<string>> = {};
  
  images.forEach(imageName => {
    imageMap[imageName] = importImage(imageName);
  });
  
  return imageMap;
};

// Preload images for better performance
export const preloadImages = async (imageNames: string[]): Promise<Record<string, string>> => {
  const imagePromises = imageNames.map(async (imageName) => {
    const imageSrc = await importImage(imageName);
    return { imageName, imageSrc };
  });
  
  const loadedImages = await Promise.allSettled(imagePromises);
  const imageMap: Record<string, string> = {};
  
  loadedImages.forEach((result, index) => {
    if (result.status === 'fulfilled') {
      const { imageName, imageSrc } = result.value;
      imageMap[imageName] = imageSrc;
    } else {
      console.error(`Failed to preload image: ${imageNames[index]}`);
      imageMap[imageNames[index]] = '/images/placeholder.jpg';
    }
  });
  
  return imageMap;
};