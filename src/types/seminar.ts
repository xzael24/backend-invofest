export interface Seminar {
    id: number;
    title: string;
    description: string;
    date: Date;
    time: string;
    location: string;
    speaker: number; // ID pembicara
    category: number; // ID kategori
    maxParticipants: number;
    registeredParticipants: number;
}
