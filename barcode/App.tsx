import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native';
import { CameraView, ScanningResult, useCameraPermissions } from 'expo-camera';
import { useState } from 'react';


export default function App() {
  const [permission, requestPermission] = useCameraPermissions()
  const [scanned, setScanned] = useState<boolean>(false)
  const [barCode, setBarCode] = useState<string>('')
  
  const handleScanned = ({ data }: ScanningResult) => {
    setBarCode(data)
    setScanned(true);
  };


  return (
    
    <View style={styles.container}>
      {!permission && 
        <Text>Loading...</Text>
      }
      {!permission?.granted && 
        <>
          <Text>Allow this app to use camera?</Text>
          <Button onPress={requestPermission} title='Allow'/>
        </> 
      }
      {permission?.granted && 
      <>
        <CameraView 
          style={styles.camera}
          onBarcodeScanned={scanned ? undefined : handleScanned}
          barcodeScannerSettings={{
            barcodeTypes: ['ean8', 'ean13'],
          }}
        >
        </CameraView>
      </>
      }
      {scanned && 
        <View style={styles.buttoncontainer}>
          <Text style={styles.result}>Barcode is {barCode}</Text>
          <TouchableOpacity style={styles.button} onPress={() => setScanned(false)}>
            <Text>Scan Again</Text>
          </TouchableOpacity>
        </View>
      }
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  camera: {
    width: '100%',
    height: '100%'
  },
  button: {
    backgroundColor: '#0bed56',
  },
  buttoncontainer: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute'
  },
  result:{
    margin:16,
    fontSize:16,
    fontWeight: '500',
    color: '#f606ca',
    backgroundColor: '#f0f007',
  }
});
