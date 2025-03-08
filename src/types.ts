export interface Analysis {
  grade: string;
  probability: number;
  recommendations: string[];
}

export interface Doctor {
  id: string;
  name: string;
  licenseNumber: string;
  contributionCount: number;
  institution: string;
}

export interface ContributedImage {
  id: string;
  doctorId: string;
  imageUrl: string;
  grade: string;
  timestamp: string;
}