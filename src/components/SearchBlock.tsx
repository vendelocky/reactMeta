import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, TextInput } from 'react-native';

type Props = {
    onBtnPress: (block: string) => void,
};

const SearchBlock = ({ onBtnPress }: Props) => {
    const [block, setBlock] = useState('');
    return (
        <View style={styles.header}>
            <Text style={styles.title}>Etherscan Sepolia Testnet</Text>
            <View style={styles.subHeader}>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="block no."
                        placeholderTextColor="lightblue"
                        value={block}
                        onChangeText={setBlock}
                    />
                    <TouchableOpacity style={styles.inputButton} onPress={() => onBtnPress(block)}>
                        <Text style={styles.text}>{'Search'}</Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity style={styles.button} onPress={onBtnPress}>
                    <Text style={styles.text}>{'Get latest block'}</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default SearchBlock;

const styles = StyleSheet.create({
    header: {
        alignItems: 'center',
        paddingVertical: 16,
    },
    subHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 8,
    },
    inputButton: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#0074D9',
        paddingVertical: 8,
        borderRadius: 4,
        paddingHorizontal: 8,
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 8,
        paddingHorizontal: 10,
        borderRadius: 5,
        backgroundColor: '#0074D9',
        flex: 1,
        marginLeft: 8,
    },
    text: {
        fontSize: 14,
        lineHeight: 20,
        fontWeight: 'bold',
        color: 'white',
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        flex: 1,
    },
    input: {
        flex: 1,
        padding: 6,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
        color: 'black',
    },
});
