import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { BlockDetailsType } from '../types/types';

const BlockDetails = ({ title, value, extraStyle, children }: BlockDetailsType) => {
  return (
    <View style={[styles.blockContainer, extraStyle]}>
      <Text>{title}</Text>
      <View style={styles.blockDetails}>
        <Text style={styles.blockNumber}>{value}</Text>
        {children}
      </View>
    </View>
  );
};

export default BlockDetails;

const styles = StyleSheet.create({
  blockContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: 'lightblue',
    borderRadius: 5,
    padding: 8,
    marginBottom: 10,
    marginHorizontal: 8,
  },
  blockDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 6,
  },
  blockNumber: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});
