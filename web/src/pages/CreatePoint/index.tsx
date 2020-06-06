import React, { useEffect, useState, ChangeEvent, FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { LeafletMouseEvent } from 'leaflet';
import { Map, TileLayer, Marker } from 'react-leaflet';

import { FiArrowLeft } from 'react-icons/fi';

import { create } from 'services/points.service';
import { get as getItems } from 'services/items.service';
import { getCities, getStates } from 'services/ibge.service';

import { Item } from 'models/item.model';
import { Point } from 'models/point.model';

import logo from 'assets/logo.svg';

import './styles.css';

const CreatePoint = () => {
    const [items, setItems] = useState<Item[]>([]);
    const [ufs, setUfs] = useState<string[]>([]);
    const [cities, setCities] = useState<string[]>([]);

    const [initialPosition, setInitialPosition] = useState<[number, number]>([0, 0]);

    const [selectedUf, setSelectedUF] = useState('0');
    const [selectedCity, setSelectedCity] = useState('0');
    const [selectedItems, setSelectedItems] = useState<number[]>([]);
    const [selectedPosition, setSelectedPosition] = useState<[number, number]>([0, 0]);

    const [formData, setFormData] = useState<Point>({} as Point);

    useEffect(() => {
        navigator
            .geolocation
            .getCurrentPosition(position => {
                const { latitude, longitude } = position.coords;

                setInitialPosition([latitude, longitude])
            });
    }, []);

    useEffect(() => {
        getItems()
            .then(setItems);
    }, []);

    useEffect(() => {
        getStates()
            .then(setUfs)
    }, []);

    useEffect(() => {
        if (selectedUf !== '0') {
            getCities(selectedUf)
                .then(setCities)
        }
    }, [selectedUf]);

    const handleSelectedUF = (event: ChangeEvent<HTMLSelectElement>) => {
        event.preventDefault();
        event.stopPropagation();

        const UF = event.target.value;

        setSelectedUF(UF);
    };

    const handleSelectedCity = (event: ChangeEvent<HTMLSelectElement>) => {
        event.preventDefault();
        event.stopPropagation();

        const city = event.target.value;

        setSelectedCity(city);
    };

    const handleMapClick = (event: LeafletMouseEvent) => {
        const { lat, lng } = event.latlng;

        setSelectedPosition([lat, lng]);
    };

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;

        setFormData({ ...formData, [name]: value });
    };

    const handleSelectedItem = (id: number) => {
        !isItemSelected(id)
            ? setSelectedItems([...selectedItems, id])
            : setSelectedItems(selectedItems.filter(item => item !== id));
    };

    const isItemSelected = (id: number) => selectedItems.includes(id);

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();

        const [latitude, longitude] = selectedPosition;

        const point: Point = {
            name: formData.name,
            email: formData.email,
            whatsapp: formData.whatsapp,
            city: selectedCity,
            uf: selectedUf,
            items: selectedItems,
            latitude,
            longitude,
        };

        create(point);
    };

    return (        
        <div id="page-create-point">
            <header>
                <img src={logo} alt="Ecoleta" />
                <Link to="/">
                    <FiArrowLeft />
                    Voltar para home
                </Link>
            </header>
            <form onSubmit={handleSubmit}>
                <h1>Cadastro do <br/> ponto de coleta</h1>

                <fieldset>
                    <legend>
                        <h2>Dados</h2>
                    </legend>

                    <div className="field">
                        <label htmlFor="name">
                            Nome da entidade*
                        </label>
                        <input
                            type="text"
                            name="name"
                            id="text"
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="field-group">
                        <div className="field">
                            <label htmlFor="email">
                                E-mail*
                            </label>
                            <input
                                type="email"
                                name="email"
                                id="email"
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="field">
                            <label htmlFor="whatsapp">
                                WhatsApp*
                            </label>
                            <input
                                type="text"
                                name="whatsapp"
                                id="whatsapp"
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                    </div>
                </fieldset>
                <fieldset>
                    <legend>
                        <h2>Endereço</h2>
                        <span>Selecione o endereço no mapa</span>
                    </legend>

                    <Map center={initialPosition} zoom={15} onClick={handleMapClick}>
                        <TileLayer
                            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <Marker position={selectedPosition} />
                    </Map>

                    <div className="field-group">
                        <div className="field">
                            <label htmlFor="uf">
                                Estado (UF)*
                            </label>
                            <select 
                                name="uf" 
                                id="uf" 
                                value={selectedUf}
                                onChange={handleSelectedUF}
                                required
                            >
                                <option value="0">
                                    Selecione uma UF
                                </option>
                                {
                                    ufs
                                        .map(uf => <option key={uf} value={uf}>{uf}</option>)
                                }
                            </select>
                        </div>
                        <div className="field">
                            <label htmlFor="city">
                                Cidade*
                            </label>
                            <select 
                                name="city" 
                                id="city"
                                value={selectedCity}
                                onChange={handleSelectedCity}
                                required
                            >
                                <option value="0">
                                    Selecione uma cidade
                                </option>
                                {
                                    cities
                                        .map(city => (
                                            <option key={city} value={city}>
                                                {city}
                                            </option>
                                        ))
                                }
                            </select>
                        </div>
                    </div>
                </fieldset>
                <fieldset>
                    <legend>
                        <h2>Itens de coleta</h2>
                        <span>Selecione um ou mais itens abaixo*</span>
                    </legend>

                    <ul className="items-grid">
                        {
                            items
                                .map(item => (
                                    <li 
                                        key={item.id}
                                        className={isItemSelected(item.id) ? 'selected' : ''} 
                                        onClick={() => handleSelectedItem(item.id)}>
                                        <img src={item.image_url} alt={item.title} />
                                        <span>{item.title}</span>
                                    </li>   
                                ))
                        }
                    </ul>
                </fieldset>
                <button type="submit">
                    Cadastrar ponto de coleta
                </button>
            </form>
        </div>
    );
};

export default CreatePoint;
