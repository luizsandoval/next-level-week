import axios from 'axios';

const BASE_URL = 'https://servicodados.ibge.gov.br/api/v1/localidades';

interface IBGEUFResponse {
    sigla: string;
}

interface IBGECityResponse {
    nome: string;
}

export const getStates = async () => await axios
    .get<IBGEUFResponse[]>(`${BASE_URL}/estados?orderBy=nome`)
    .then(response => {
        const stateInitials = response.data
            .map(state => state.sigla);

        return stateInitials;
    }); 
    
export const getCities = async (state: string) => await axios
    .get<IBGECityResponse[]>(`${BASE_URL}/estados/${state}/municipios?orderBy=nome`)
    .then(response => {
        const cities = response.data
            .map(city => city.nome);

        return cities;
    });