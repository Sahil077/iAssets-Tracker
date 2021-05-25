import React , {useState, useEffect} from "react";
import {View , Text,  TextInput ,StyleSheet, TouchableOpacity, ScrollView,Alert , Image } from "react-native";
import Styles from "../packageDetails/styles";
import { AntDesign , FontAwesome , Entypo } from '@expo/vector-icons'; 
import { Table, Row, Rows } from 'react-native-table-component';
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'
import qs from "qs"
import {useNavigation} from "@react-navigation/native";

const Packagesum = () => {


    const [orderDetails , setorderDetails] = useState({})
    // const [newOrder , setnewOrder] = useState({})
    // const [brandName , setBrandName] = useState()
    // const [packingStyle , setpackingStyle] = useState()
    // const [varietyStyle , setvarietyStyle] = useState()
    // const [gradeType , setgradeType] = useState()
    // const [PO_Quantity , setPO_Quantity] = useState()
    // const [Pack_Quantity , setPack_Quantity] = useState()
    // const [POID , setPOID] = useState()
    const navigation = useNavigation();

    useEffect(()=>{
        console.log("useEffect........started.. Package...........Summary!!")
        const gettingData = async() =>{
            try{
                
                var VendorId =  JSON.parse(await AsyncStorage.getItem('vendorId'))
                var qrCode =  JSON.parse(await AsyncStorage.getItem('qrCode')) 
                var POid = (await AsyncStorage.getItem('PO_Order'))
                var brandName = await AsyncStorage.getItem('brandName')
                var packingStyle = await AsyncStorage.getItem('packingStyle')
                var varietyStyle = await AsyncStorage.getItem('varietyStyle')
                var gradeType = await AsyncStorage.getItem('gradeType')
                var poQuantity = (await AsyncStorage.getItem('PO_Quantity'))
                var packQuant = (await AsyncStorage.getItem('Pack_Quantity'))
                var poname = (await AsyncStorage.getItem('poname'))

                var podate = (await AsyncStorage.getItem('podate'))

                var plantid = (await AsyncStorage.getItem('plantid'))

                var yetToDeliverQuantity = (await AsyncStorage.getItem('yetToDeliverQuantity'))
                // console.log(VendorId)
                // console.log(qrCode)
                // console.log(POid)
                // console.log(brandName)
                // console.log(packingStyle)
                // console.log(varietyStyle)
                // console.log(gradeType)
                // console.log(poQuantity)
                //  console.log(packQuant)
                //  setPOID(POid)
                //  setBrandName(brandName) 
                //  setPO_Quantity(poQuantity)
                //  setPack_Quantity(packQuant)
                //  setgradeType(gradeType)
                //  setpackingStyle(packingStyle)
                //  setvarietyStyle(varietyStyle)

                setorderDetails({'brandname':brandName.replace(/"/g,""),
                'packingStyle':packingStyle.replace(/"/g,""),
                'varietyStyle':varietyStyle.replace(/"/g,""),
                'gradeType':gradeType.replace(/"/g,""),
                'poQuantity':poQuantity,
                'packQuant':packQuant,
                'VendorId':VendorId,
                'qrCode':qrCode,
                'POid':POid,
                'yetToDeliverQuantity':yetToDeliverQuantity.replace(/"/g,""),
                'poname':poname.replace(/"/g,""),
                'podate':podate.replace(/"/g,""),
                'plantid':plantid.replace(/"/g,"")
                })      
                 
              }catch(e){
                console.log(e)
              }

         
        }
        gettingData() 
    },[])

    const onPress = async () => {
     //   console.warn("clicked")
        const abc = JSON.stringify(orderDetails)
        const aa = JSON.parse(abc)
        // console.log("...................####################################")
        //var str = (aa.varietyStyle).replace(/"/g,"");
        // console.log(aa)
        // console.log("##################################...................................")
        const month = []
        const monthSelect = new Date().getMonth() + 1
        if(monthSelect > 9){
            month.push(new Date().getMonth() + 1)
        }else{
           month.push("0"+ (new Date().getMonth() + 1))
        }
        const date = []
        const dateSelect = new Date().getDate()
        if(dateSelect > 9){
           date.push(new Date().getDate())
        }else{
           date.push("0"+ (new Date().getDate()))
        }

        const minute = []
        const minuteSelect = new Date().getMinutes()
        if(minuteSelect > 9){
            minute.push(new Date().getMinutes())
        }else{
            minute.push("0"+ (new Date().getMinutes()))
        }
        
        const ab = date[0] + "." + month[0] + "." + new Date().getFullYear()+ "_" + new Date().getHours()+ ":" + minute[0] + ":"  + new Date().getSeconds()
        const packDate = ab.toString()
        // console.log(packDate + "................")
        // console.log("...........PLANTID..." + aa.plantid)
           axios({
            method: 'post',
            url: 'http://136.232.40.34:8888/testingdb/rest/Nekkanti/subscribePouchTrackerFromSupplier',
            data: qs.stringify({
                QRCode: aa.qrCode.replace(/"/g,""),
                PurchaseOrderId:parseInt(aa.POid),
                Brand:aa.brandname.replace(/"/g,""),
                PackingStyle:aa.packingStyle.replace(/"/g,""),
                Variety:aa.varietyStyle.replace(/"/g,""),
                Grade:aa.gradeType.replace(/"/g,""),
                PurchaseOrderQuantity:parseInt(aa.poQuantity),
                PackedQuantity:parseInt(aa.packQuant),
                VendorId:aa.VendorId.replace(/"/g,""),
                PackageShippedDate:packDate,
                PackageStatus:"InTransit",
                PurchaseOrderName:aa.poname,
                PurchaseOrderDate:aa.podate,
                PlantId:aa.plantid

                // yetToDeliverQuantity:aa.yetToDeliverQuantity.replace(/"/g,"")   
            }),
            headers: {
              'content-type': 'application/x-www-form-urlencoded'
            }
          }).then((resp)=>{
              console.log(resp.data)
              if(resp.data.status === true){
                Alert.alert(
                  "Alert Title",
                  "Data Saved..!!",
                  [
                    {
                      text: "Cancel",
                      onPress: () => console.log("Cancel Pressed"),
                      style: "cancel"
                    },
                    { text: "OK", onPress: () =>  navigation.navigate("WelcomeScreen", {
                                      paramKey: "saved",
                                    }) }
                  ]
                );
                  
              }else{
                Alert.alert(" Data NotSaved Successfully..!!")
              
              }
          }).catch((err)=>{
            
              console.log(err)
          })
    }

    return(
        <ScrollView>
        <View style={Styles.container}>

            <View style={Styles.heading}>

            <Text style={{fontSize:20, color:'#2B2A8C', fontWeight:'bold'}}>Package Summary Details</Text>
            </View>

            <View style={Styles.formArea}>
            <View style={{flexDirection:'row', marginTop:5}}>
             <Text style={{fontSize:20}}>plantid                :  </Text>   
            <TextInput
                style={Styles.inputField}
                placeholder="   Enter PO"
                value={orderDetails && orderDetails.plantid ? orderDetails.plantid: ''}
                
            />
            </View>  
            <View style={{flexDirection:'row', marginTop:20}}>
             <Text style={{fontSize:20}}>POrder name    :</Text>   
            <TextInput
                style={Styles.inputField}
                placeholder="   Enter PO"
                value={orderDetails && orderDetails.poname ? orderDetails.poname: ''}
                
            />
            </View>  
            <View style={{flexDirection:'row', marginTop:20}}>
             <Text style={{fontSize:20}}>POrder Date      :</Text>   
            <TextInput
                style={Styles.inputField}
                placeholder="   Enter PO"
                value={orderDetails && orderDetails.podate ? orderDetails.podate: ''}
                
            />
            </View>  
            <View style={{flexDirection:'row', marginTop:20}}>
             <Text style={{fontSize:20}}>Purchase Order :</Text>   
            <TextInput
                style={Styles.inputField}
                placeholder="   Enter PO"
                value={orderDetails && orderDetails.POid ? orderDetails.POid: ''}
                
            />
            </View>    

            <View style={{flexDirection:'row', marginTop:20}}>
             <Text style={{fontSize:20}}>Brand                  :</Text>   
            <TextInput
                style={Styles.inputField}
                // placeholder="  Enter Brand Name"
                 value={orderDetails && orderDetails.brandname ? orderDetails.brandname: ''}
            />
            </View>
            {/* varietyStyle */}

            <View style={{flexDirection:'row', marginTop:20}}>
             <Text style={{fontSize:20}}>Variety                :</Text>   
            <TextInput
                style={Styles.inputField}
                // placeholder="  Enter Brand Name"
                 value={orderDetails && orderDetails.varietyStyle ? orderDetails.varietyStyle: ''}
            />
            </View>

            <View style={{flexDirection:'row', marginTop:20}}>
             <Text style={{fontSize:20}}>Packing Style    :</Text>   
            <TextInput
                style={Styles.inputField}
                placeholder="    Enter Grade Type"
               // orderDetails && orderDetails.packingStyle ? orderDetails.packingStyle: ''
                value={ orderDetails && orderDetails.packingStyle ? orderDetails.packingStyle: ''}
            />
            </View>

            <View style={{flexDirection:'row', marginTop:20}}>
             <Text style={{fontSize:20}}>Grade Type        :</Text>   
            <TextInput
                style={Styles.inputField}
                placeholder="    Enter Grade Type"
                value={orderDetails && orderDetails.gradeType ? orderDetails.gradeType: ''}
            />
            </View>


            <View style={{flexDirection:'row', marginTop:20}}>
             <Text style={{fontSize:20}}>PO Quantity       :</Text>   
            <TextInput
                style={Styles.inputField}
                placeholder="   Enter PO Quantity"
                value={ orderDetails && orderDetails.poQuantity ? orderDetails.poQuantity: ''}
               
            />
            </View>

            <View style={{flexDirection:'row', marginTop:20}}>
             <Text style={{fontSize:20}}>Pac. Quantity    :</Text>   
            <TextInput
                style={Styles.inputField}
                placeholder=" Enter Package Quant."
                value={orderDetails && orderDetails.packQuant ? orderDetails.packQuant: ''}
                
            />
            </View>

            <View style={{flexDirection:'row', marginTop:10}}>
             <Text style={{fontSize:20}}>YetToDeliver      :{'\n'}  Quantity</Text>   
            <TextInput
                style={Styles.inputField}
              //  placeholder=" Enter Package Quant."
                value={orderDetails && orderDetails.yetToDeliverQuantity ? orderDetails.yetToDeliverQuantity: ''}
                
            />
            </View>
       

            </View>


           
            {/* <Image
                style={Styles.logo}
                source={{
                uri:
                    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADMAAAAzCAYAAAA6oTAqAAAAEXRFWHRTb2Z0d2FyZQBwbmdjcnVzaEB1SfMAAABQSURBVGje7dSxCQBACARB+2/ab8BEeQNhFi6WSYzYLYudDQYGBgYGBgYGBgYGBgYGBgZmcvDqYGBgmhivGQYGBgYGBgYGBgYGBgYGBgbmQw+P/eMrC5UTVAAAAABJRU5ErkJggg==',
                }}
            /> */}
             
       
               
            <TouchableOpacity onPress={onPress}>
                <View style={Styles.button}>
                    <Text style={Styles.buttonText}>
                     Submit
                    </Text>
                </View>
            </TouchableOpacity> 
        </View>
        </ScrollView>
    )
}
  

export default Packagesum;