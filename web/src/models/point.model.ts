import { Item } from './item.model';

export interface Point {
    id?: number;
    image?: string;
    items?: number[];
    name: string;
    email: string;
    whatsapp: string;
    uf: string;
    city: string;
    latitude: number;
    longitude: number;
}
