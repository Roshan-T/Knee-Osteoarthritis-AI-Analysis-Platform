import { XRayImage } from './store';

// Simulated file system structure
const fileSystem = {
  pending: new Map<string, XRayImage>(),
  datasets: {
    normal: new Map<string, XRayImage>(),
    doubtful: new Map<string, XRayImage>(),
    minimal: new Map<string, XRayImage>(),
    moderate: new Map<string, XRayImage>(),
    severe: new Map<string, XRayImage>()
  }
};

export const FileSystem = {
  // Save image to pending folder
  savePending: (image: XRayImage) => {
    fileSystem.pending.set(image.id, image);
  },

  // Move from pending to appropriate dataset folder
  moveToDataset: (image: XRayImage) => {
    const grade = image.grade.toLowerCase() as keyof typeof fileSystem.datasets;
    fileSystem.pending.delete(image.id);
    fileSystem.datasets[grade].set(image.id, image);
  },

  // Delete from pending
  deletePending: (id: string) => {
    fileSystem.pending.delete(id);
  },

  // Get all images from a specific dataset
  getDataset: (grade: string) => {
    const gradeKey = grade.toLowerCase() as keyof typeof fileSystem.datasets;
    return Array.from(fileSystem.datasets[gradeKey].values());
  },

  // Get all pending images
  getPendingImages: () => {
    return Array.from(fileSystem.pending.values());
  },

  // Get statistics
  getStats: () => {
    return {
      pending: fileSystem.pending.size,
      datasets: Object.entries(fileSystem.datasets).reduce((acc, [grade, images]) => {
        acc[grade] = images.size;
        return acc;
      }, {} as Record<string, number>)
    };
  }
};