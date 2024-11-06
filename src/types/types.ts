import { StyleProp, ViewStyle } from 'react-native';

export type BlockDetailsType = {
    title: string,
    value: string,
    extraStyle?: StyleProp<ViewStyle>,
    children?: React.ReactNode
};

export type BlockType = {
    gasUsed: bigint;
    baseFeePerGas: bigint;
    transactions: string[];
    timestamp: number;
};

export type TransactionDataType = {
    [hash: string]: {
        txnFee: number | null;
        disabled: boolean;
    };
};

export type ResourceType = {
    read: () => {
        blockNumber: number;
        block: BlockType;
    };
};
