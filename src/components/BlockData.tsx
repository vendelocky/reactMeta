import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, Button, SafeAreaView, ListRenderItemInfo } from 'react-native';
import { ethers } from 'ethers';
import BlockDetails from './BlockDetails';
import { fetchTransactionData } from '../fetchData';
import { formattedNumber, MiddleEllipsis, timeAgo } from '../Utils';
import { ResourceType, TransactionDataType } from '../types/types';

const BlockData = ({ resource }: { resource: ResourceType }) => {
    const [transactionData, setTransactionData] = useState<TransactionDataType>({});
    const { blockNumber, block } = resource.read();
    const blockGasUsed = parseInt(ethers.formatUnits(block?.gasUsed, 'wei'), 10);
    const burntFee = parseInt(ethers.formatUnits(block?.gasUsed * block?.baseFeePerGas, 'gwei'), 10);

    const onTransactionPress = (hash: string) => {
        setTransactionData((prevData) => ({
            ...prevData,
            [hash]: { txnFee: null, disabled: true },
        }));

        fetchTransactionData(hash).then((transaction) => {
            const txnFee = parseInt(ethers.formatUnits(transaction.txnFee, 'gwei'), 10);
            setTransactionData((prevData) => ({
                ...prevData,
                [hash]: { txnFee: txnFee, disabled: false },
            }));
        });
    };

    const getTransactionFee = (txnFee: number | null) => {
        return (
            txnFee ? <Text style={styles.transactionFee}>{`${formattedNumber(txnFee)?.toString()} gwei`}</Text> : null
        );
    };

    const renderTransaction = ({ item }: ListRenderItemInfo<string>) => {
        return (
            <View style={styles.transactionList}>
                <MiddleEllipsis text={item} maxLength={24} />
                {
                    transactionData[item]?.txnFee ?
                        getTransactionFee(transactionData[item]?.txnFee) :
                        <Button
                            title={'Check Fee'}
                            onPress={() => onTransactionPress(item)}
                            disabled={transactionData[item]?.disabled}
                        />
                }
            </View>
        );
    };

    const transactionsData = (transactions: string[]) => {
        return (
            <FlatList
                data={transactions}
                renderItem={renderTransaction}
                keyExtractor={(item: string) => item}
                contentContainerStyle={{ paddingBottom: 16 }}
            />
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.blockContainerNoFlex}>
                <BlockDetails
                    title={'Block Number'}
                    value={blockNumber.toString()}
                    extraStyle={{ flex: 0 }}
                    children={<Text>{timeAgo(block.timestamp * 1000)}</Text>}
                />
            </View>
            <View style={styles.moreBlockDetails}>
                <BlockDetails
                    title={'Gas Used'}
                    value={`${formattedNumber(blockGasUsed).toString()} wei`}
                />
                <BlockDetails
                    title={'Burnt Fees'}
                    value={`${formattedNumber(burntFee).toString()} gwei`}
                />
            </View>
            <View style={styles.transactionContainer}>
                <Text style={styles.subtitle}>{`Transactions list (${block.transactions.length})`}</Text>
                {transactionsData(block.transactions)}
            </View>
        </SafeAreaView>
    );
};

export default BlockData;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        padding: 16,
        backgroundColor: 'white',
    },
    subtitle: {
        fontSize: 18,
        paddingVertical: 4,
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: 'lightblue',
    },
    blockContainerNoFlex: {
        width: '100%',
        flex: 0,
    },
    moreBlockDetails: {
        flexDirection: 'row',
        width: '100%',
    },
    transactionContainer: {
        flex: 1,
        width: '100%',
        paddingHorizontal: 8,
    },
    transactionList: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
    },
    transactionFee: {
        lineHeight: 38,
        fontWeight: 'bold',
    },
});
