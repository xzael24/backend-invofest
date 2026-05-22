export interface Seminar {
    id: number;
    title: string;
    description: string;
    date: Date;
    time: string;
    location: string;
    speaker: number;
    category: number;
    maxParticipants: number;
    registeredParticipants: number;
}
