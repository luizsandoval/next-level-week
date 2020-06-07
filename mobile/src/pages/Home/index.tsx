import React, { useState, useEffect } from 'react';
import { Feather as Icon } from '@expo/vector-icons';

import { RectButton } from 'react-native-gesture-handler';

import { View, ImageBackground, Image, StyleSheet, Text, } from 'react-native';

import { useNavigation } from '@react-navigation/native';

import PickerSelect from 'react-native-picker-select';

import { getCities, getStates } from '../../services/ibge.service';

import Loading from '../../components/Loading';

const Home = () => {
    const [ufs, setUfs] = useState<string[]>([]);
    const [cities, setCities] = useState<string[]>([]);
    const [selectedUf, setSelectedUf] = useState<string>('');
    const [selectedCity, setSelectedCity] = useState<string>('');

    const navigation = useNavigation();

    const handleNavigationToPoints = () => navigation
        .navigate('Points', 
            { 
                city: selectedCity,
                uf: selectedUf, 
            }
        );

    const isLoading = () => selectedUf && !cities?.length;

    const isValid = () => !!(selectedCity && selectedUf);

    useEffect(() => {
        getStates()
            .then(setUfs)
    }, []);

    useEffect(() => {
        setCities([]);
        if (selectedUf) {
            getCities(selectedUf)
                .then(setCities)
        }
    }, [selectedUf]);

    if (!ufs?.length) return <Loading />;

    return (
        <ImageBackground  
            source={require('../../assets/home-background.png')} 
            style={styles.container}
            imageStyle={{ width: 274, height: 368 }}
        >
            <View style={styles.main}>
                <Image source={require('../../assets/logo.png')} />
                <Text style={styles.title}>
                    Seu marketplace de coleta de resíduos
                </Text>
                <Text style={styles.description}>
                    Ajudamos pessoas a encontrarem pontos de coleta de forma eficiente.
                </Text>
            </View>

            <View>
                <View style={styles.inputsContainer}>
                    <Text>
                        Estado (UF)*
                    </Text>
                    <PickerSelect
                        onValueChange={(uf: string) => setSelectedUf(uf)}
                        value={selectedUf}
                        doneText="Finalizar"
                        placeholder={
                            {
                                label: 'Selecione um Estado (UF)',
                                color: '#6C6C80',
                                value: ''
                            }
                        }
                        items={ufs
                            .map(uf => (
                                {
                                    label: uf,
                                    value: uf,
                                }
                            ))
                        }
                    />
                    <Text>
                        Cidade*
                    </Text>
                    {
                        isLoading() 
                        ? (
                            <PickerSelect 
                                onValueChange={(city: string) => setSelectedCity(city)}
                                value={selectedCity}
                                doneText="Finalizar"
                                placeholder={
                                    {
                                        label: 'Selecione uma cidade',
                                        color: '#6C6C80',
                                        value: ''
                                    }
                                }
                                items={cities.map(city => (
                                        {
                                            label: city,
                                            value: city,
                                        }
                                    ))
                                }
                            />
                        )
                        : <Loading size="small" />
                    }
                </View>
                <RectButton style={styles.button} onPress={handleNavigationToPoints} enabled={isValid()}>
                    <View style={styles.buttonIcon}>
                        <Text>
                            <Icon name="arrow-right" color="#fff" size={24} />
                        </Text>
                    </View>
                    <Text style={styles.buttonText}>
                        Entrar
                    </Text>
                </RectButton>
            </View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 32,
    },
  
    main: {
      flex: 1,
      justifyContent: 'center',
    },
  
    title: {
      color: '#322153',
      fontSize: 32,
      fontFamily: 'Ubuntu_700Bold',
      maxWidth: 260,
      marginTop: 72,
    },
  
    description: {
      color: '#6C6C80',
      fontSize: 16,
      marginTop: 16,
      fontFamily: 'Roboto_400Regular',
      maxWidth: 260,
      lineHeight: 24,
    },
  
    inputsContainer: {
        paddingBottom: 24,
    },

    input: {
      height: 60,
      backgroundColor: '#FFF',
      borderRadius: 10,
      marginBottom: 8,
      paddingHorizontal: 24,
      fontSize: 16,
    },
  
    button: {
      backgroundColor: '#34CB79',
      height: 60,
      flexDirection: 'row',
      borderRadius: 10,
      overflow: 'hidden',
      alignItems: 'center',
      marginTop: 8,
    },
  
    buttonIcon: {
      height: 60,
      width: 60,
      backgroundColor: 'rgba(0, 0, 0, 0.1)',
      justifyContent: 'center',
      alignItems: 'center'
    },
  
    buttonText: {
      flex: 1,
      justifyContent: 'center',
      textAlign: 'center',
      color: '#FFF',
      fontFamily: 'Roboto_500Medium',
      fontSize: 16,
    }
  });

export default Home;
