import React from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';

interface Props {
    size?: 'small' | 'large';
}

const Loading: React.FC<Props> = ({ size = 'large' }) => (
    <View style={styles.container}>
        <ActivityIndicator size={size} color="#34CB79" />
    </View>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default Loading;
