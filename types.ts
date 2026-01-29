
export interface User {
  id: string;
  name: string;
  email: string;
  password?: string;
}

export interface AnalysisResult {
  id: string;
  timestamp: number;
  imageUrl: string;
  report: string;
  summary: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}
