import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface XRayImage {
  id: string;
  file: File;
  preview: string;
  grade: string;
  confidence: number;
  status: 'pending' | 'approved' | 'rejected';
  uploadedBy: string;
  uploadedAt: string;
  annotations: Array<{
    x: number;
    y: number;
    label: string;
    description: string;
  }>;
  heatmapUrl: string;
}

export interface Doctor {
  id: string;
  name: string;
  email: string;
  institution: string;
  licenseNumber: string;
  specialization: string;
  contributionCount: number;
  accuracy: number;
  verified: boolean;
}

interface AdminState {
  isAuthenticated: boolean;
  pendingImages: XRayImage[];
  approvedImages: XRayImage[];
  doctors: Doctor[];
  login: (password: string) => boolean;
  logout: () => void;
  addPendingImage: (image: XRayImage) => void;
  approveImage: (id: string) => void;
  rejectImage: (id: string) => void;
  addDoctor: (doctor: Doctor) => void;
}

const ADMIN_PASSWORD = 'admin123'; // In a real app, this would be properly hashed and stored securely

export const useAdminStore = create<AdminState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      pendingImages: [],
      approvedImages: [],
      doctors: [],
      login: (password) => {
        if (password === ADMIN_PASSWORD) {
          set({ isAuthenticated: true });
          return true;
        }
        return false;
      },
      logout: () => set({ isAuthenticated: false }),
      addPendingImage: (image) =>
        set((state) => ({
          pendingImages: [...state.pendingImages, image],
        })),
      approveImage: (id) =>
        set((state) => {
          const image = state.pendingImages.find((img) => img.id === id);
          if (!image) return state;

          return {
            pendingImages: state.pendingImages.filter((img) => img.id !== id),
            approvedImages: [...state.approvedImages, { ...image, status: 'approved' }],
          };
        }),
      rejectImage: (id) =>
        set((state) => ({
          pendingImages: state.pendingImages.filter((img) => img.id !== id),
        })),
      addDoctor: (doctor) =>
        set((state) => ({
          doctors: [...state.doctors, doctor],
        })),
    }),
    {
      name: 'knee-oa-admin-storage',
    }
  )
);