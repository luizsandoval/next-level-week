import api from './api';

import { Point } from '../models/point.model';
import { PointDetail } from '../models/point-detail.model';

export const index = async (city = '', uf = '', items: number[] = []) => await api
    .get<Point[]>('points', {
        params: {
            city,
            uf,
            items,
        },
    })
    .then(response => response.data);

export const show = async (id: number) => await api
    .get<PointDetail>(`points/${id}`,)
    .then(response => response.data);
