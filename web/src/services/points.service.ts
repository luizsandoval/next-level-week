import api from './api';

import { Point } from 'models/point.model';

export const create = async (point: Point) => await api
    .post<Point>('points', point)
    .then(response => response.data);
