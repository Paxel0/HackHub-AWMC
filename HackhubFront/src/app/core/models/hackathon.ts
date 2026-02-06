export interface Hackathon {
  id: number;
  name: string;
  creator: string;
  startDate: string;
  endDate: string;
  location: string;
  maxTeams: number;
  reward: number;
  description: string;
  isOnline: boolean;
  imageUrl?: string;
  status?: 'Aperto' | 'In corso' | 'Chiuso';
}
// Rappresenta un hackathon con tutte le sue proprietà, incluso lo stato calcolato in base alle date di inizio e fine 