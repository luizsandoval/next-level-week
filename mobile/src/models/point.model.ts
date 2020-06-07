import { Item } from './item.model';

export interface Point {
    id: number;
    image?: string;
    name: string;
    latitude: number;
    longitude: number;
    uf: string;
    city: string;
    whatsapp: string;
    email: string;
    items?: Item[];
}
