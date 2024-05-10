import {  StyleSheet } from 'react-native';
import MapView from 'react-native-maps';
import Header from '@/components/Header';
export default function Map() {
  return (
    <>
      <Header title={'Map'} />
      <MapView style={styles.map} />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
});
