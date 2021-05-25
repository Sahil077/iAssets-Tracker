import React , {useState, useEffect} from "react";
import {View , Text,  TextInput ,StyleSheet, TouchableOpacity, ScrollView,Alert , Image } from "react-native";
import Styles from "../purchaseOrderDetail/styles";
import AsyncStorage from '@react-native-async-storage/async-storage'

import {useNavigation} from "@react-navigation/native";

const purchaseOrderDetail = () => {


     const [orderDetails , setorderDetails] = useState({})
   
     const navigation = useNavigation();

     useEffect(()=>{
        // console.log("useEffect........started.. Package...........Summary!!")
        const gettingData = async() =>{
            try{
                
              //  var VendorId =  JSON.parse(await AsyncStorage.getItem('vendorId'))
              //  var qrCode =  JSON.parse(await AsyncStorage.getItem('qrCode')) 
                var POid = (await AsyncStorage.getItem('PO_Order'))
                var brandName = await AsyncStorage.getItem('brandName')
                var packingStyle = await AsyncStorage.getItem('packingStyle')
                var varietyStyle = await AsyncStorage.getItem('varietyStyle')
                var gradeType = await AsyncStorage.getItem('gradeType')
                var poQuantity = (await AsyncStorage.getItem('PO_Quantity'))
                var packQuant = (await AsyncStorage.getItem('Pack_Quantity'))
                var poname = (await AsyncStorage.getItem('poname'))
              //  var podate = (await AsyncStorage.getItem('podate'))
                var plantid = (await AsyncStorage.getItem('plantid'))
        
                var packageDeliveredDate = await AsyncStorage.getItem('packageDeliveredDate')
                var packageReceivedDate = await AsyncStorage.getItem('packageReceivedDate')
                var packageShippedDate = await AsyncStorage.getItem('packageShippedDate')
                var packageStatus = await AsyncStorage.getItem('packageStatus')
                var qrcodeId = await AsyncStorage.getItem('qrcodeId')
                var receivedPlant = await AsyncStorage.getItem('receivedPlant')
                

                setorderDetails({'brandname':brandName.replace(/"/g,""),
                'packingStyle':packingStyle.replace(/"/g,""),
                'varietyStyle':varietyStyle.replace(/"/g,""),
                'gradeType':gradeType.replace(/"/g,""),
                'poQuantity':poQuantity.replace(/"/g,""),
                'packQuant':packQuant.replace(/"/g,""),
                 'packageDeliveredDate':packageDeliveredDate.replace(/"/g,""),
                 'packageReceivedDate':packageReceivedDate.replace(/"/g,""),
                'POid':POid.replace(/"/g,""),
                 'packageShippedDate':packageShippedDate.replace(/"/g,""),
                'poname':poname.replace(/"/g,""),
                // 'podate':podate.replace(/"/g,""),
                'plantid':plantid.replace(/"/g,""),
                'packageStatus':packageStatus.replace(/"/g,""),
                'qrcodeId':qrcodeId.replace(/"/g,""),
                'receivedPlant':receivedPlant.replace(/"/g,"")
                })      
                 
              }catch(e){
                console.log(e)
              }

         
        }
        gettingData() 
    },[])

    function backTowelcomePage(){
        navigation.navigate("WelcomeScreen")
    }

    return(
        <ScrollView>
        <View style={Styles.container}>

            <View style={Styles.heading}>

            <Text style={{fontSize:20, color:'#2B2A8C', fontWeight:'bold'}}>purchaseOrder Details</Text>
            </View>

            <View style={Styles.formArea}>

            <View style={{flexDirection:'row', marginTop:5}}>
             <Text style={{fontSize:20}}>Qr codeId          :</Text>   
            <TextInput
                style={Styles.inputField}
                placeholder=" Enter qrcodeId."
               value={orderDetails && orderDetails.qrcodeId ? orderDetails.qrcodeId: 'null'}
                
            />
            </View>

            <View style={{flexDirection:'row', marginTop:15}}>
             <Text style={{fontSize:20}}>plantid                :</Text>   
            <TextInput
                style={Styles.inputField}
                placeholder="   Enter PO"
                value={orderDetails && orderDetails.plantid ? orderDetails.plantid: 'null'}
                
            />
            </View>  
            <View style={{flexDirection:'row', marginTop:20}}>
             <Text style={{fontSize:20}}>POrder name    :</Text>   
            <TextInput
                style={Styles.inputField}
                placeholder="   Enter PO"
                value={orderDetails && orderDetails.poname ? orderDetails.poname: 'null'}
                
            />
            </View>  
             
            <View style={{flexDirection:'row', marginTop:20}}>
             <Text style={{fontSize:20}}>Purchase Order :</Text>   
            <TextInput
                style={Styles.inputField}
                placeholder="   Enter PO"
                value={orderDetails && orderDetails.POid ? orderDetails.POid: 'null'}
                
            />
            </View>    

            <View style={{flexDirection:'row', marginTop:20}}>
             <Text style={{fontSize:20}}>Brand                  :</Text>   
            <TextInput
                style={Styles.inputField}
                 placeholder="  Enter Brand Name"
                 value={orderDetails && orderDetails.brandname ? orderDetails.brandname: 'null'}
            />
            </View>
            {/* varietyStyle */}

            <View style={{flexDirection:'row', marginTop:20}}>
             <Text style={{fontSize:20}}>Variety                :</Text>   
            <TextInput
                style={Styles.inputField}
                 placeholder="  Enter Brand Name"
                value={orderDetails && orderDetails.varietyStyle ? orderDetails.varietyStyle: 'null'}
            />
            </View>

            <View style={{flexDirection:'row', marginTop:20}}>
             <Text style={{fontSize:20}}>Packing Style    :</Text>   
            <TextInput
                style={Styles.inputField}
                placeholder="    Enter Grade Type"
               // orderDetails && orderDetails.packingStyle ? orderDetails.packingStyle: ''
                value={ orderDetails && orderDetails.packingStyle ? orderDetails.packingStyle: 'null'}
            />
            </View>

            <View style={{flexDirection:'row', marginTop:20}}>
             <Text style={{fontSize:20}}>Grade Type        :</Text>   
            <TextInput
                style={Styles.inputField}
                placeholder="    Enter Grade Type"
                value={orderDetails && orderDetails.gradeType ? orderDetails.gradeType: 'null'}
            />
            </View>


            <View style={{flexDirection:'row', marginTop:20}}>
             <Text style={{fontSize:20}}>PO Quantity       :</Text>   
            <TextInput
                style={Styles.inputField}
                placeholder="   Enter PO Quantity"
                value={ orderDetails && orderDetails.poQuantity ? orderDetails.poQuantity: 'null'}
               
            />
            </View>

            <View style={{flexDirection:'row', marginTop:20}}>
             <Text style={{fontSize:20}}>Pac. Quantity    :</Text>   
            <TextInput
                style={Styles.inputField}
                placeholder=" Enter Package Quant."
               value={orderDetails && orderDetails.packQuant ? orderDetails.packQuant: 'null'}
                
            />
            </View>

{/* ......................................................................................................... */}
            <View style={{flexDirection:'row', marginTop:20}}>
             <Text style={{fontSize:20}}>packDelvr Date  :</Text>   
            <TextInput
                style={Styles.inputField}
                placeholder=" Enter packageDeliveredDate"
               value={orderDetails && orderDetails.packageDeliveredDate ? orderDetails.packageDeliveredDate: 'null'}
                
            />
            </View>

            <View style={{flexDirection:'row', marginTop:20}}>
             <Text style={{fontSize:20}}>packRec Date    :</Text>   
            <TextInput
                style={Styles.inputField}
                placeholder=" Enter packageReceivedDate."
               value={orderDetails && orderDetails.packageReceivedDate ? orderDetails.packageReceivedDate: 'null'}
                
            />
            </View>

            <View style={{flexDirection:'row', marginTop:20}}>
             <Text style={{fontSize:20}}>packShpd Date  :</Text>   
            <TextInput
                style={Styles.inputField}
                placeholder=" Enter packageShippedDate"
               value={orderDetails && orderDetails.packageShippedDate ? orderDetails.packageShippedDate: 'null'}
                
            />
            </View>

            <View style={{flexDirection:'row', marginTop:20}}>
             <Text style={{fontSize:20}}>pack Status        :</Text>   
            <TextInput
                style={Styles.inputField}
                placeholder=" Enter packageStatus."
               value={orderDetails && orderDetails.packageStatus ? orderDetails.packageStatus: 'null'}
                
            />
            </View>

            <View style={{flexDirection:'row', marginTop:20}}>
             <Text style={{fontSize:20}}>Rcvd Plant          :</Text>   
            <TextInput
                style={Styles.inputField}
                placeholder=" Enter receivedPlant."
               value={orderDetails && orderDetails.receivedPlant ? orderDetails.receivedPlant: 'null'}
                
            />
            </View>

            {/* ........................ */}

       

            </View>

             
       
               
            <TouchableOpacity onPress={backTowelcomePage}>
                <View style={Styles.button}>
                    <Text style={Styles.buttonText}>
                     Back
                    </Text>
                </View>
            </TouchableOpacity> 
        </View>
        </ScrollView>
    )
}
  

export default purchaseOrderDetail;