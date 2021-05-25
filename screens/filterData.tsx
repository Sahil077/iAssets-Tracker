import React, { useState , useEffect} from "react";
//mport FoodForm from "../components/foodForm";
import {SafeAreaView, StyleSheet, View, Text} from 'react-native';

const filterDataScreen = ({}) => {
  const [data , setData] = useState()
  console.log("here.............")
  useEffect(() => {
  //   const finalOP = JSON.stringify(route)
  //   const pp = JSON.parse(finalOP)
  //   const ab = pp.params.paramKey
  //  console.log("here")
  //  console.log(Object.keys(ab))
  //  setData(ab)
  }, [])
    return (
        <SafeAreaView style={{flex: 1}}>
        <View style={styles.container}>
          <Text style={styles.heading}>
            React Native Pass Value From One Screen to Another
            Using React Navigation
          </Text>
          <Text style={styles.textStyle}>
          {/* {setData && setData['quantity'] ? setData['quantity']:"null"} */}
          </Text>
        </View>
        <Text style={{textAlign: 'center', color: 'grey'}}>
          www.aboutreact.com
        </Text>
      </SafeAreaView>
    )
}
  

export default filterDataScreen;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      padding: 20,
    },
    heading: {
      fontSize: 25,
      textAlign: 'center',
      marginVertical: 10,
    },
    textStyle: {
      textAlign: 'center',
      fontSize: 16,
      marginVertical: 10,
    },
  });