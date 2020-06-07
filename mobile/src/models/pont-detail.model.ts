import { Point } from './point.model';

export interface PointDetail {
    point: Point;
    items: {
        title: string;
    }[];
}
