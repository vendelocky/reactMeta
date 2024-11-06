import React, { Suspense, useState } from 'react';
import { ActivityIndicator, StyleSheet, SafeAreaView } from 'react-native';
import './global';
import '@ethersproject/shims';
import BlockData from './src/components/BlockData';
import SearchBlock from './src/components/SearchBlock';
import { fetchBlockData } from './src/fetchData';
import { ResourceType } from './src/types/types';

const App = () => {
  const [blockResourceData, setBlockResourceData] = useState<ResourceType | null>(null);

  const onBtnPress = (blockNo: string) => {
    setBlockResourceData(fetchBlockData(parseInt(blockNo, 10)));
  };

  return (
    <SafeAreaView style={styles.container}>
      <SearchBlock onBtnPress={onBtnPress} />
      {blockResourceData && (
        <Suspense
          fallback={
            <ActivityIndicator size="large" color="lightblue" style={styles.indicator} />
          }
        >
          <BlockData resource={blockResourceData} />
        </Suspense >
      )}
    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  indicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
});
