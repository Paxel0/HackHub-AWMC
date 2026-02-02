export interface Hackathon {
  id: number;
  title: string;
  organizer: string;
  startDate: string;
  endDate: string;
  location: string;
  partecipanti: number;
  premio: string;
  description: string;
  isOnline: boolean;
  imageUrl: string;
  status: 'Aperto' | 'In corso' | 'Chiuso';
}
