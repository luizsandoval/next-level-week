import api from './api';

import { Item } from '../models/item.model';

export const index = async () => await api
    .get<Item[]>('items')
    .then(response => response.data);
