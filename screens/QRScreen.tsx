import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { Table, Row, Rows } from 'react-native-table-component';
import {useNavigation} from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';
export default function App() {

  const navigation = useNavigation();
  const [hasPermission, setHasPermission] = useState<boolean>(false);
  const [scanned, setScanned] = useState(false);
  const [headingNav,setheadingNav]=useState(['Home', 'QRscan', 'Details', 'Take Pic'])

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = async({ type, data }) => {
    setScanned(true);
    console.log(data)
    try{
     await AsyncStorage.setItem('qrCode', JSON.stringify(data))
    
      navigation.navigate("FoodRegistrationScreen")
   } catch (e){
     console.log("error",e)
    //  navigation.navigate("LoginScreen")
   }
    //alert(`Bar code with type ${type} and data ${data} has been scanned!`);
    
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
       
        <View style={styles.scanningView}>
                <BarCodeScanner
                onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                style={styles.absoluteFillObject}
                />
            {scanned && <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />}
        </View>
        <Text style={{top:80,left:140,fontSize:18,fontWeight:'bold'}}>Scan the barcode</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#ffff'
  },
  scanningView:{
    marginTop:50,
    alignItems:'center',


  },
  absoluteFillObject:{
      top:30,
      height:600,
      width:500,
      borderColor:'black',
      borderWidth:5
  },

  head: { height: 60, backgroundColor: '#0000' , width:375},
  text: { margin: 8 },
});
