import React , {useState, useEffect} from "react";
import {View , Text,  TextInput ,StyleSheet, TouchableOpacity, ScrollView,Alert,Button } from "react-native";
import Styles from "../foodForm/styles";
import { AntDesign , FontAwesome , Entypo } from '@expo/vector-icons'; 
import {useNavigation} from "@react-navigation/native";
import { Table, Row, Rows } from 'react-native-table-component';
import DropDownPicker from 'react-native-dropdown-picker';
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'
import qs from "qs"

const App = () => {

    const [headingNav,setheadingNav]=useState(['Home -->', 'QRscan -->', 'Details -->', 'Take Pic ->'])
    var [data,setdata]=useState()
    var [tempdata,settempdata]=useState({})
    var [selected,setselected] = useState([])
    var [qrCode , setQR] = useState("")
    const [POid , setPOid] = useState([])
    const [plantid , setplantid] = useState([])

    
    const navigation = useNavigation();
    const onPress = async () => {
        try
        {
         const saved_data = JSON.parse(await AsyncStorage.getItem('selected_data'))
  
         console.log("cheking dataaaaaaaaaaaaaa  " +typeof saved_data)
         console.log("brand name is ",saved_data)
         var VendorId =  JSON.parse(await AsyncStorage.getItem('vendorId'))
     //     var str1 = "EPC:";
         var qrCode =  JSON.parse(await AsyncStorage.getItem('qrCode')) 
        //  var finalQR = str1.concat(qrCode);
        // const toSendQR = finalQR[1]  
         console.log("/////////////QRRRR SENDING ............................................. " + qrCode)
         const av  = parseInt(saved_data.quantity.label)
         const pQuant = parseInt(saved_data.pacQuant)
         const poiD = parseInt(saved_data.poid.label)
         const venID = saved_data.vendorID
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
         const ab = date[0] + "." + month[0] + "." + new Date().getFullYear()+ "_" + new Date().getHours()+ ":" + new Date().getMinutes() + ":"  + new Date().getSeconds()
         const packDate = ab.toString()
         console.log(packDate)
        //  await AsyncStorage.setItem('QRCode', JSON.stringify(qrCode))
         await AsyncStorage.setItem('PO_Order', JSON.stringify(poiD))
         await AsyncStorage.setItem('brandName', JSON.stringify(saved_data.brand.label))
         await AsyncStorage.setItem('packingStyle', JSON.stringify(saved_data.packing.label))
         await AsyncStorage.setItem('varietyStyle', JSON.stringify(saved_data.variety.label))
         await AsyncStorage.setItem('gradeType', JSON.stringify(saved_data.grade.label))
         
         await AsyncStorage.setItem('PO_Quantity', JSON.stringify(av))
         await AsyncStorage.setItem('poname', JSON.stringify(saved_data.ordername.label))
         await AsyncStorage.setItem('podate', JSON.stringify(saved_data.orderdate.label))
         await AsyncStorage.setItem('plantid', JSON.stringify(saved_data.plantid.label))

         await AsyncStorage.setItem('Pack_Quantity', JSON.stringify(pQuant))
         await AsyncStorage.setItem('yetToDeliverQuantity', JSON.stringify(saved_data.yetToDeliverQuantity.label))
        
         navigation.navigate("PackagesumScreen")
        //  axios({
        //     method: 'post',
        //     url: 'http://ec2-13-127-91-132.ap-south-1.compute.amazonaws.com/testingdb/rest/Nekkanti/subscribePouchTrackerFromSupplier',
        //     data: qs.stringify({
        //         QRCode: qrCode,
        //         PurchaseOrderId:poiD,
        //         Brand:saved_data.brand.label,
        //         PackingStyle:saved_data.packing.label,
        //         Variety:saved_data.variety.label,
        //         Grade:saved_data.grade.label,
        //         PurchaseOrderQuantity:av,
        //         PackedQuantity:pQuant,
        //         VendorId:VendorId,
        //         PackageShippedDate:packDate,
        //         PackageStatus:"InTransit",   
        //     }),
        //     headers: {
        //       'content-type': 'application/x-www-form-urlencoded'
        //     }
        //   }).then((resp)=>{
        //       console.log(resp.data)
        //       if(resp.data.status === true){
        //         Alert.alert(
        //           "Alert Title",
        //           "Data Saved..!!",
        //           [
        //             {
        //               text: "Cancel",
        //               onPress: () => console.log("Cancel Pressed"),
        //               style: "cancel"
        //             },
        //             { text: "OK", onPress: () =>  navigation.navigate("PackagesumScreen", {
        //               paramKey: "saved",
        //             }) }
        //           ]
        //         );
                  
        //       }else{
        //         Alert.alert(" Data NotSaved Successfully..!!")
              
        //       }
        //   }).catch((err)=>{
            
        //       console.log(err)
        //   })
    
         
        }
        catch(err)
        {
          console.log(err)
        }
        // navigation.navigate("WelcomeScreen")
    }

    useEffect(()=>{

        console.log("##%%%%%%%%$$$$$$   " + qrCode)
         
        axios.get('http://ec2-13-127-91-132.ap-south-1.compute.amazonaws.com/testingdb/rest/Nekkanti/getPurchaseOrdersForLoosePouch;VendorId=6').then((resp)=>{
            console.log("#################################################################################3")
            // const PO_id = []
            // for(let i=0;i<(resp.data).length ; i++){
            //     PO_id.push(resp.data[i].purchaseOrderId)
            // }
            // const PO_ID = Array.from(new Set(PO_id))
            // console.log("_________________________")
            // console.log(JSON.stringify(PO_ID))
            // const op = JSON.stringify(PO_ID)
            // const tosend = JSON.parse(op)
            // setPOid(tosend)
            setdata(resp.data)
            // console.log(typeof(resp.data))
                let tempobj=[]
                let tempobj2=[]

                let chk_exist=[]
                let chk_exist2=[]

                let prod_id = resp.data.map(function(elem){
                let obj={label:elem.purchaseOrderId,value:elem.purchaseOrderId}
                let obj2={label:elem.plantId,value:elem.plantId}

                
                if(!chk_exist.includes(elem.purchaseOrderId))
                {
                tempobj.push(obj)
                }
                chk_exist.push(elem.purchaseOrderId)

                if(!chk_exist2.includes(elem.plantId))
                {
                tempobj2.push(obj2)
                }
                chk_exist2.push(elem.plantId)
                
                
                });
                // settempdata({'prod_id':prod_id})
                console.log(prod_id)
            
                setPOid(tempobj)
                setplantid(tempobj2)
                async function test()
                {
                    try
        {
        await AsyncStorage.setItem('selected_data',JSON.stringify(selected))
        await AsyncStorage.setItem('axios_data',JSON.stringify(resp.data))
       //  var str1 = "EPC:";
        var qrCode =  JSON.parse(await AsyncStorage.getItem('qrCode')) 
      //   var finalQR = str1.concat(qrCode);
        setQR(qrCode)
      //  console.log("$$$$$$$$.........." + await AsyncStorage.getItem('qrCode'))
        }
        catch(err)
        {
        console.log(err)
        }
                }
                test()

                
        }).catch(err=>{
            console.log("___________________________")
            console.log(err)
        }) 
        console.log("callled")
        },[tempdata,selected])

        const filterProductsbyplantId=async (text)=>{
          console.log(text)
                try{
                
                var qrCode =  JSON.parse(await AsyncStorage.getItem('qrCode'))    
                var VendorId =  JSON.parse(await AsyncStorage.getItem('vendorId'))
               
                console.log("######################veNDORRRR IDDDD##############################################")
                    console.log(VendorId)
                    setselected({...selected,'vendorID':VendorId,'QRcode':qrCode})
                } catch (e){
                console.log("error",e)
                
                }
          setselected({...selected,'plantid':text})
          var filtered_data=data.filter(e=>e.plantId == text.label)
          console.log(filtered_data)
          let tempobj=[]
          let chk_exist=[]
          let tempobj2=[]
          let chk_exist2=[]
          let tempobj3=[]
          let chk_exist3=[]
          let tempobj4=[]
          let chk_exist4=[]
          let tempobj5=[]
          let chk_exist5=[]
          let tempobj6=[]
          let chk_exist6=[]
          let tempobj7=[]
          let chk_exist7=[]
          let tempobj8=[]
          let chk_exist8=[]
          filtered_data.map(elem=>{
            //---------------------pushing to brand name-----------
              let obj={label:elem.brandName,value:elem.brandName}
        if(!chk_exist.includes(elem.brandName))
        {
           tempobj.push(obj)
        }
        chk_exist.push(elem.brandName)
        //-----------------------------pushing to varienty------------------
              let obj1={label:elem.variety,value:elem.variety}
        if(!chk_exist2.includes(elem.variety))
        {
           tempobj2.push(obj1)
        }
        chk_exist2.push(elem.variety)
        
        //------------------------pushin to packing style -----------------
              let obj2={label:elem.packingStyle,value:elem.packingStyle}
        if(!chk_exist3.includes(elem.packingStyle))
        {
           tempobj3.push(obj2)
        }
        chk_exist3.push(elem.packingStyle)
        
        //-----pushing grade style--------------
              let obj3={label:elem.grade,value:elem.grade}
        if(!chk_exist4.includes(elem.grade))
        {
           tempobj4.push(obj3)
        }
        chk_exist4.push(elem.grade)
        
        // ------------------pushing quantity-----------------
        
              let obj4={label:elem.quantity,value:elem.quantity}
        if(!chk_exist5.includes(elem.quantity))
        {
           tempobj5.push(obj4)
        }
        chk_exist5.push(elem.quantity)
        // ------------------pushing yetToDeliverQuantity-----------------
        
        let obj5={label:elem.yetToDeliverQuantity,value:elem.yetToDeliverQuantity}
        if(!chk_exist6.includes(elem.yetToDeliverQuantity))
        {
           tempobj6.push(obj5)
        }
        chk_exist6.push(elem.yetToDeliverQuantity)

        let obj6={label:elem.purchaseOrderName,value:elem.purchaseOrderName}
if(!chk_exist7.includes(elem.purchaseOrderName))
{
   tempobj7.push(obj6)
}
chk_exist7.push(elem.purchaseOrderName)

let obj7={label:elem.purchaseOrderDate,value:elem.purchaseOrderDate}
if(!chk_exist8.includes(elem.purchaseOrderDate))
{
   tempobj8.push(obj7)
}
chk_exist8.push(elem.purchaseOrderDate)
          })

          
          settempdata({...tempdata,'brandname':tempobj,'variety':tempobj2,'packingstyle':tempobj3,'grade':tempobj4,'quantity':tempobj5,'yetToDeliverQuantity':tempobj6,'ordername':tempobj7,'orderdate':tempobj8})
        console.log("+++++++++++++++++++++tempdata BRANDER.......................................",tempdata)
        
         
        
        }
const filterProductsbyId=async (text)=>{
  console.log(text)
        try{
        
        var qrCode =  JSON.parse(await AsyncStorage.getItem('qrCode'))    
        var VendorId =  JSON.parse(await AsyncStorage.getItem('vendorId'))
       
        console.log("######################veNDORRRR IDDDD##############################################")
            console.log(VendorId)
            setselected({...selected,'vendorID':VendorId,'QRcode':qrCode})
        } catch (e){
        console.log("error",e)
        
        }
  setselected({...selected,'poid':text})
//   var filtered_data=data.filter(e=>e.purchaseOrderId == text.label)
  var filtered_data=data.filter(function(e){
   return (selected['plantid'] ? e.plantId == selected['plantid'].label : true ) && e.purchaseOrderId == text.label
})
  console.log(filtered_data)
  let tempobj=[]
  let chk_exist=[]
  let tempobj2=[]
  let chk_exist2=[]
  let tempobj3=[]
  let chk_exist3=[]
  let tempobj4=[]
  let chk_exist4=[]
  let tempobj5=[]
  let chk_exist5=[]
  let tempobj6=[]
  let chk_exist6=[]
  let tempobj7=[]
  let chk_exist7=[]
  let tempobj8=[]
  let chk_exist8=[]
  filtered_data.map(elem=>{
    //---------------------pushing to brand name-----------
      let obj={label:elem.brandName,value:elem.brandName}
if(!chk_exist.includes(elem.brandName))
{
   tempobj.push(obj)
}
chk_exist.push(elem.brandName)
//-----------------------------pushing to varienty------------------
      let obj1={label:elem.variety,value:elem.variety}
if(!chk_exist2.includes(elem.variety))
{
   tempobj2.push(obj1)
}
chk_exist2.push(elem.variety)

//------------------------pushin to packing style -----------------
      let obj2={label:elem.packingStyle,value:elem.packingStyle}
if(!chk_exist3.includes(elem.packingStyle))
{
   tempobj3.push(obj2)
}
chk_exist3.push(elem.packingStyle)

//-----pushing grade style--------------
      let obj3={label:elem.grade,value:elem.grade}
if(!chk_exist4.includes(elem.grade))
{
   tempobj4.push(obj3)
}
chk_exist4.push(elem.grade)

// ------------------pushing quantity-----------------

      let obj4={label:elem.quantity,value:elem.quantity}
if(!chk_exist5.includes(elem.quantity))
{
   tempobj5.push(obj4)
}
chk_exist5.push(elem.quantity)
// ------------------pushing yetToDeliverQuantity-----------------

let obj5={label:elem.yetToDeliverQuantity,value:elem.yetToDeliverQuantity}
if(!chk_exist6.includes(elem.yetToDeliverQuantity))
{
   tempobj6.push(obj5)
}
chk_exist6.push(elem.yetToDeliverQuantity)
let obj6={label:elem.purchaseOrderName,value:elem.purchaseOrderName}
if(!chk_exist7.includes(elem.purchaseOrderName))
{
   tempobj7.push(obj6)
}
chk_exist7.push(elem.purchaseOrderName)

let obj7={label:elem.purchaseOrderDate,value:elem.purchaseOrderDate}
if(!chk_exist8.includes(elem.purchaseOrderDate))
{
   tempobj8.push(obj7)
}
chk_exist8.push(elem.purchaseOrderDate)
  })
  settempdata({...tempdata,'brandname':tempobj,'variety':tempobj2,'packingstyle':tempobj3,'grade':tempobj4,'quantity':tempobj5,'yetToDeliverQuantity':tempobj6,'ordername':tempobj7,'orderdate':tempobj8})
console.log("+++++++++++++++++++++tempdata BRANDER.......................................",tempdata)

 

}
const filterProductsbyOrderName=async (text)=>{
  console.log(text)
        try{
        
        var qrCode =  JSON.parse(await AsyncStorage.getItem('qrCode'))    
        var VendorId =  JSON.parse(await AsyncStorage.getItem('vendorId'))
       
        console.log("######################veNDORRRR IDDDD##############################################")
            console.log(VendorId)
            setselected({...selected,'vendorID':VendorId,'QRcode':qrCode})
        } catch (e){
        console.log("error",e)
        
        }
  setselected({...selected,'ordername':text})
//   var filtered_data=data.filter(e=>e.purchaseOrderId == text.label)
var filtered_data=data.filter(function(e){
   return (selected['poid'] ? e.purchaseOrderId == selected['poid'].label : true ) && e.purchaseOrderName == text.label && (selected['plantid'] ? e.plantId == selected['plantid'].label : true )
})
  console.log(filtered_data)
  let tempobj=[]
  let chk_exist=[]
  let tempobj2=[]
  let chk_exist2=[]
  let tempobj3=[]
  let chk_exist3=[]
  let tempobj4=[]
  let chk_exist4=[]
  let tempobj5=[]
  let chk_exist5=[]
  let tempobj6=[]
  let chk_exist6=[]
  let tempobj7=[]
  let chk_exist7=[]
  let tempobj8=[]
  let chk_exist8=[]
  filtered_data.map(elem=>{
    //---------------------pushing to brand name-----------
      let obj={label:elem.brandName,value:elem.brandName}
if(!chk_exist.includes(elem.brandName))
{
   tempobj.push(obj)
}
chk_exist.push(elem.brandName)
//-----------------------------pushing to varienty------------------
      let obj1={label:elem.variety,value:elem.variety}
if(!chk_exist2.includes(elem.variety))
{
   tempobj2.push(obj1)
}
chk_exist2.push(elem.variety)

//------------------------pushin to packing style -----------------
      let obj2={label:elem.packingStyle,value:elem.packingStyle}
if(!chk_exist3.includes(elem.packingStyle))
{
   tempobj3.push(obj2)
}
chk_exist3.push(elem.packingStyle)

//-----pushing grade style--------------
      let obj3={label:elem.grade,value:elem.grade}
if(!chk_exist4.includes(elem.grade))
{
   tempobj4.push(obj3)
}
chk_exist4.push(elem.grade)

// ------------------pushing quantity-----------------

      let obj4={label:elem.quantity,value:elem.quantity}
if(!chk_exist5.includes(elem.quantity))
{
   tempobj5.push(obj4)
}
chk_exist5.push(elem.quantity)
// ------------------pushing yetToDeliverQuantity-----------------

let obj5={label:elem.yetToDeliverQuantity,value:elem.yetToDeliverQuantity}
if(!chk_exist6.includes(elem.yetToDeliverQuantity))
{
   tempobj6.push(obj5)
}
chk_exist6.push(elem.yetToDeliverQuantity)


let obj6={label:elem.purchaseOrderName,value:elem.purchaseOrderName}
if(!chk_exist7.includes(elem.purchaseOrderName))
{
   tempobj7.push(obj6)
}
chk_exist7.push(elem.purchaseOrderName)

let obj7={label:elem.purchaseOrderDate,value:elem.purchaseOrderDate}
if(!chk_exist8.includes(elem.purchaseOrderDate))
{
   tempobj8.push(obj7)
}
chk_exist8.push(elem.purchaseOrderDate)

  })
  settempdata({...tempdata,'brandname':tempobj,'variety':tempobj2,'packingstyle':tempobj3,'grade':tempobj4,'quantity':tempobj5,'yetToDeliverQuantity':tempobj6,'ordername':tempobj7,'orderdate':tempobj8})
console.log("+++++++++++++++++++++tempdata BRANDER.......................................",tempdata)

 

}

const filterProductsbyOrderDate=async (text)=>{
  console.log(text)
        try{
        
        var qrCode =  JSON.parse(await AsyncStorage.getItem('qrCode'))    
        var VendorId =  JSON.parse(await AsyncStorage.getItem('vendorId'))
       
        console.log("######################veNDORRRR IDDDD##############################################")
            console.log(VendorId)
            setselected({...selected,'vendorID':VendorId,'QRcode':qrCode})
        } catch (e){
        console.log("error",e)
        
        }
  setselected({...selected,'orderdate':text})
//   var filtered_data=data.filter(e=>e.purchaseOrderId == text.label)
var filtered_data=data.filter(function(e){
   return (selected['poid'] ? e.purchaseOrderId == selected['poid'].label : true ) && e.purchaseOrderDate == text.label && (selected['plantid'] ? e.plantId == selected['plantid'].label : true )
})
  console.log(filtered_data)
  let tempobj=[]
  let chk_exist=[]
  let tempobj2=[]
  let chk_exist2=[]
  let tempobj3=[]
  let chk_exist3=[]
  let tempobj4=[]
  let chk_exist4=[]
  let tempobj5=[]
  let chk_exist5=[]
  let tempobj6=[]
  let chk_exist6=[]
  let tempobj7=[]
  let chk_exist7=[]
  let tempobj8=[]
  let chk_exist8=[]
  filtered_data.map(elem=>{
    //---------------------pushing to brand name-----------
      let obj={label:elem.brandName,value:elem.brandName}
if(!chk_exist.includes(elem.brandName))
{
   tempobj.push(obj)
}
chk_exist.push(elem.brandName)
//-----------------------------pushing to varienty------------------
      let obj1={label:elem.variety,value:elem.variety}
if(!chk_exist2.includes(elem.variety))
{
   tempobj2.push(obj1)
}
chk_exist2.push(elem.variety)

//------------------------pushin to packing style -----------------
      let obj2={label:elem.packingStyle,value:elem.packingStyle}
if(!chk_exist3.includes(elem.packingStyle))
{
   tempobj3.push(obj2)
}
chk_exist3.push(elem.packingStyle)

//-----pushing grade style--------------
      let obj3={label:elem.grade,value:elem.grade}
if(!chk_exist4.includes(elem.grade))
{
   tempobj4.push(obj3)
}
chk_exist4.push(elem.grade)

// ------------------pushing quantity-----------------

      let obj4={label:elem.quantity,value:elem.quantity}
if(!chk_exist5.includes(elem.quantity))
{
   tempobj5.push(obj4)
}
chk_exist5.push(elem.quantity)
// ------------------pushing yetToDeliverQuantity-----------------

let obj5={label:elem.yetToDeliverQuantity,value:elem.yetToDeliverQuantity}
if(!chk_exist6.includes(elem.yetToDeliverQuantity))
{
   tempobj6.push(obj5)
}
chk_exist6.push(elem.yetToDeliverQuantity)


let obj6={label:elem.purchaseOrderName,value:elem.purchaseOrderName}
if(!chk_exist7.includes(elem.purchaseOrderName))
{
   tempobj7.push(obj6)
}
chk_exist7.push(elem.purchaseOrderName)

let obj7={label:elem.purchaseOrderDate,value:elem.purchaseOrderDate}
if(!chk_exist8.includes(elem.purchaseOrderDate))
{
   tempobj8.push(obj7)
}
chk_exist8.push(elem.purchaseOrderDate)

  })
  settempdata({...tempdata,'brandname':tempobj,'variety':tempobj2,'packingstyle':tempobj3,'grade':tempobj4,'quantity':tempobj5,'yetToDeliverQuantity':tempobj6,'ordername':tempobj7,'orderdate':tempobj8})
console.log("+++++++++++++++++++++tempdata BRANDER.......................................",tempdata)

 

}

const filterProductsBrand=(text)=>{
//   console.log(text)
//   console.log("+++++++++++++++++++++++++++++++++++")
//   console.log(selected)
//   console.log("{{{{{{{{{{{{{{{{{{{{{",selected['poid'].label)

  setselected({...selected,'brand':text})
  var filtered_data=data.filter(function(e){
   return (selected['poid'] ? e.purchaseOrderId == selected['poid'].label : true ) && e.brandName == text.label &&(selected['ordername'] ? e.purchaseOrderName == selected['ordername'].label : true )&&(selected['orderdate'] ? e.purchaseOrderDate == selected['orderdate'].label : true ) && (selected['plantid'] ? e.plantId == selected['plantid'].label : true )
})
  var filtered_data=data.filter(function(e){
     return e.purchaseOrderId == selected['poid'].label && e.brandName == text.label 
  })
  //console.log(filtered_data)
  let tempobj=[]
  let chk_exist=[]
  let tempobj2=[]
  let chk_exist2=[]
  let tempobj3=[]
  let chk_exist3=[]
  let tempobj4=[]
  let chk_exist4=[]
    let tempobj5=[]
  let chk_exist5=[]
  let tempobj6=[]
  let chk_exist6=[]
  let tempobj7=[]
  let chk_exist7=[]
  let tempobj8=[]
  let chk_exist8=[]
  filtered_data.map(elem=>{
    //---------------------pushing to brand name-----------
      let obj={label:elem.brandName,value:elem.brandName}
if(!chk_exist.includes(elem.brandName))
{
   tempobj.push(obj)
}
chk_exist.push(elem.brandName)
//-----------------------------pushing to varienty------------------
      let obj1={label:elem.variety,value:elem.variety}
if(!chk_exist2.includes(elem.variety))
{
   tempobj2.push(obj1)
}
chk_exist2.push(elem.variety)

//------------------------pushin to packing style -----------------
      let obj2={label:elem.packingStyle,value:elem.packingStyle}
if(!chk_exist3.includes(elem.packingStyle))
{
   tempobj3.push(obj2)
}
chk_exist3.push(elem.packingStyle)

//-----pushing grade style--------------
      let obj3={label:elem.grade,value:elem.grade}
if(!chk_exist4.includes(elem.grade))
{
   tempobj4.push(obj3)
}
chk_exist4.push(elem.grade)

// ------------------pushing quantity-----------------

      let obj4={label:elem.quantity,value:elem.quantity}
if(!chk_exist5.includes(elem.quantity))
{
   tempobj5.push(obj4)
}
chk_exist5.push(elem.quantity)

// ------------------pushing yetToDeliverQuantity-----------------

let obj5={label:elem.yetToDeliverQuantity,value:elem.yetToDeliverQuantity}
if(!chk_exist6.includes(elem.yetToDeliverQuantity))
{
   tempobj6.push(obj5)
}
chk_exist6.push(elem.yetToDeliverQuantity)

let obj6={label:elem.purchaseOrderName,value:elem.purchaseOrderName}
if(!chk_exist7.includes(elem.purchaseOrderName))
{
   tempobj7.push(obj6)
}
chk_exist7.push(elem.purchaseOrderName)

let obj7={label:elem.purchaseOrderDate,value:elem.purchaseOrderDate}
if(!chk_exist8.includes(elem.purchaseOrderDate))
{
   tempobj8.push(obj7)
}
chk_exist8.push(elem.purchaseOrderDate)
  })
  settempdata({...tempdata,'brandname':tempobj,'variety':tempobj2,'packingstyle':tempobj3,'grade':tempobj4,'quantity':tempobj5,'yetToDeliverQuantity':tempobj6,'ordername':tempobj7,'orderdate':tempobj8})
//console.log("+++++++++++++++++++++tempdata",tempdata)

}
const filterProductsVariety=(text)=>{
 // console.log(text)
   setselected({...selected,'variety':text})
//    setselected({...selected,'brand':text})

   var filtered_data=data.filter(function(e){
      return e.purchaseOrderId == selected['poid'].label && (selected['brand'] ? e.brandName == selected['brand'].label : true) && e.variety == text.label &&(selected['ordername'] ? e.purchaseOrderName == selected['ordername'].label : true )&&(selected['orderdate'] ? e.purchaseOrderDate == selected['orderdate'].label : true ) && (selected['plantid'] ? e.plantId == selected['plantid'].label : true )
   })
 //  console.log(filtered_data)
   let tempobj=[]
   let chk_exist=[]
   let tempobj2=[]
   let chk_exist2=[]
   let tempobj3=[]
   let chk_exist3=[]
   let tempobj4=[]
   let chk_exist4=[]
     let tempobj5=[]
   let chk_exist5=[]
   let tempobj6=[]
   let chk_exist6=[]
   let tempobj7=[]
   let chk_exist7=[]
   let tempobj8=[]
   let chk_exist8=[]
   filtered_data.map(elem=>{
     //---------------------pushing to brand name-----------
       let obj={label:elem.brandName,value:elem.brandName}
 if(!chk_exist.includes(elem.brandName))
 {
    tempobj.push(obj)
 }
 chk_exist.push(elem.brandName)
 //-----------------------------pushing to varienty------------------
       let obj1={label:elem.variety,value:elem.variety}
 if(!chk_exist2.includes(elem.variety))
 {
    tempobj2.push(obj1)
 }
 chk_exist2.push(elem.variety)
 
 //------------------------pushin to packing style -----------------
       let obj2={label:elem.packingStyle,value:elem.packingStyle}
 if(!chk_exist3.includes(elem.packingStyle))
 {
    tempobj3.push(obj2)
 }
 chk_exist3.push(elem.packingStyle)
 
 //-----pushing grade style--------------
       let obj3={label:elem.grade,value:elem.grade}
 if(!chk_exist4.includes(elem.grade))
 {
    tempobj4.push(obj3)
 }
 chk_exist4.push(elem.grade)
 
 // ------------------pushing quantity-----------------
 
       let obj4={label:elem.quantity,value:elem.quantity}
 if(!chk_exist5.includes(elem.quantity))
 {
    tempobj5.push(obj4)
 }
 chk_exist5.push(elem.quantity)
 // ------------------pushing yetToDeliverQuantity-----------------

let obj5={label:elem.yetToDeliverQuantity,value:elem.yetToDeliverQuantity}
if(!chk_exist6.includes(elem.yetToDeliverQuantity))
{
   tempobj6.push(obj5)
}
chk_exist6.push(elem.yetToDeliverQuantity)
let obj6={label:elem.purchaseOrderName,value:elem.purchaseOrderName}
if(!chk_exist7.includes(elem.purchaseOrderName))
{
   tempobj7.push(obj6)
}
chk_exist7.push(elem.purchaseOrderName)

let obj7={label:elem.purchaseOrderDate,value:elem.purchaseOrderDate}
if(!chk_exist8.includes(elem.purchaseOrderDate))
{
   tempobj8.push(obj7)
}
chk_exist8.push(elem.purchaseOrderDate)
  })
  settempdata({...tempdata,'brandname':tempobj,'variety':tempobj2,'packingstyle':tempobj3,'grade':tempobj4,'quantity':tempobj5,'yetToDeliverQuantity':tempobj6,'ordername':tempobj7,'orderdate':tempobj8})
//console.log("+++++++++++++++++++++tempdata",tempdata)

}
const filterProductsPacking=(text)=>{
 // console.log(text)
   setselected({...selected,'packing':text})
   var filtered_data=data.filter(function(e){
    return e.purchaseOrderId == selected['poid'].label && (selected['brand']? e.brandName == selected['brand'].label: true) && (selected['variety'] ? e.variety == selected['variety'].label : true ) && e.packingStyle == text.label &&(selected['ordername'] ? e.purchaseOrderName == selected['ordername'].label : true )&&(selected['orderdate'] ? e.purchaseOrderDate == selected['orderdate'].label : true ) && (selected['plantid'] ? e.plantId == selected['plantid'].label : true )
 })
 //console.log(filtered_data)
 let tempobj=[]
 let chk_exist=[]
 let tempobj2=[]
 let chk_exist2=[]
 let tempobj3=[]
 let chk_exist3=[]
 let tempobj4=[]
 let chk_exist4=[]
   let tempobj5=[]
 let chk_exist5=[]
 let tempobj6=[]
 let chk_exist6=[]
 let tempobj7=[]
 let chk_exist7=[]
 let tempobj8=[]
 let chk_exist8=[]
 filtered_data.map(elem=>{
   //---------------------pushing to brand name-----------
     let obj={label:elem.brandName,value:elem.brandName}
if(!chk_exist.includes(elem.brandName))
{
  tempobj.push(obj)
}
chk_exist.push(elem.brandName)
//-----------------------------pushing to varienty------------------
     let obj1={label:elem.variety,value:elem.variety}
if(!chk_exist2.includes(elem.variety))
{
  tempobj2.push(obj1)
}
chk_exist2.push(elem.variety)

//------------------------pushin to packing style -----------------
     let obj2={label:elem.packingStyle,value:elem.packingStyle}
if(!chk_exist3.includes(elem.packingStyle))
{
  tempobj3.push(obj2)
}
chk_exist3.push(elem.packingStyle)

//-----pushing grade style--------------
     let obj3={label:elem.grade,value:elem.grade}
if(!chk_exist4.includes(elem.grade))
{
  tempobj4.push(obj3)
}
chk_exist4.push(elem.grade)

// ------------------pushing quantity-----------------

     let obj4={label:elem.quantity,value:elem.quantity}
if(!chk_exist5.includes(elem.quantity))
{
  tempobj5.push(obj4)
}
chk_exist5.push(elem.quantity)
 // ------------------pushing yetToDeliverQuantity-----------------

 let obj5={label:elem.yetToDeliverQuantity,value:elem.yetToDeliverQuantity}
 if(!chk_exist6.includes(elem.yetToDeliverQuantity))
 {
    tempobj6.push(obj5)
 }
 chk_exist6.push(elem.yetToDeliverQuantity)

 let obj6={label:elem.purchaseOrderName,value:elem.purchaseOrderName}
if(!chk_exist7.includes(elem.purchaseOrderName))
{
   tempobj7.push(obj6)
}
chk_exist7.push(elem.purchaseOrderName)

let obj7={label:elem.purchaseOrderDate,value:elem.purchaseOrderDate}
if(!chk_exist8.includes(elem.purchaseOrderDate))
{
   tempobj8.push(obj7)
}
chk_exist8.push(elem.purchaseOrderDate)
   })
   settempdata({...tempdata,'brandname':tempobj,'variety':tempobj2,'packingstyle':tempobj3,'grade':tempobj4,'quantity':tempobj5,'yetToDeliverQuantity':tempobj6,'ordername':tempobj7,'orderdate':tempobj8})
 //console.log("+++++++++++++++++++++tempdata",tempdata)
 
 }
const filterProductsGrade= async (text)=>{
  //  console.log("{}{}{}{}{}{}{}{")
 //     console.log(text)
    //   var test=JSON.parse(await AsyncStorage.getItem('axios_data'))
    //     var select_data=JSON.parse(await AsyncStorage.getItem('selected_data'))
    //     console.log(JSON.stringify(test))
    //     console.log(JSON.stringify(select_data))
      
    //   var chk_exist5=[]
    //   var tempobj5=[]
    //   test.map(elem=>{
    
    //      let obj4={label:elem.quantity,value:elem.quantity}
    //       console.log("__________________________++++++++++++++++++++++++}}}}}}}}")
    //       console.log(JSON.stringify(test))
    // if(!chk_exist5.includes(elem.quantity) && text.label == elem.grade)
    // {
    //    tempobj5.push(obj4)
    // }
    // chk_exist5.push(elem.quantity)
    
    
    //   })
    //   settempdata({...tempdata,'quantity':tempobj5})
       setselected({...selected,'grade':text})
       var filtered_data=data.filter(function(e){
        return e.purchaseOrderId == selected['poid'].label && (selected['brand']?  e.brandName == selected['brand'].label : true) && (selected['variety'] ? e.variety == selected['variety'].label : true) && (selected['packing'] ? e.packingStyle == selected['packing'].label :true) && e.grade == text.label&&(selected['ordername'] ? e.purchaseOrderName == selected['ordername'].label : true )&&(selected['orderdate'] ? e.purchaseOrderDate == selected['orderdate'].label : true ) && (selected['plantid'] ? e.plantId == selected['plantid'].label : true )
     })
  //   console.log(filtered_data)
     let tempobj=[]
     let chk_exist=[]
     let tempobj2=[]
     let chk_exist2=[]
     let tempobj3=[]
     let chk_exist3=[]
     let tempobj4=[]
     let chk_exist4=[]
       let tempobj5=[]
     let chk_exist5=[]
     let tempobj6=[]
     let chk_exist6=[]
     let tempobj7=[]
     let chk_exist7=[]
     let tempobj8=[]
     let chk_exist8=[]
     filtered_data.map(elem=>{
       //---------------------pushing to brand name-----------
         let obj={label:elem.brandName,value:elem.brandName}
    if(!chk_exist.includes(elem.brandName))
    {
      tempobj.push(obj)
    }
    chk_exist.push(elem.brandName)
    //-----------------------------pushing to varienty------------------
         let obj1={label:elem.variety,value:elem.variety}
    if(!chk_exist2.includes(elem.variety))
    {
      tempobj2.push(obj1)
    }
    chk_exist2.push(elem.variety)
    
    //------------------------pushin to packing style -----------------
         let obj2={label:elem.packingStyle,value:elem.packingStyle}
    if(!chk_exist3.includes(elem.packingStyle))
    {
      tempobj3.push(obj2)
    }
    chk_exist3.push(elem.packingStyle)
    
    //-----pushing grade style--------------
         let obj3={label:elem.grade,value:elem.grade}
    if(!chk_exist4.includes(elem.grade))
    {
      tempobj4.push(obj3)
    }
    chk_exist4.push(elem.grade)
    
    // ------------------pushing quantity-----------------
    
         let obj4={label:elem.quantity,value:elem.quantity}
    if(!chk_exist5.includes(elem.quantity))
    {
      tempobj5.push(obj4)
    }
    chk_exist5.push(elem.quantity)
      // ------------------pushing yetToDeliverQuantity-----------------

 let obj5={label:elem.yetToDeliverQuantity,value:elem.yetToDeliverQuantity}
 if(!chk_exist6.includes(elem.yetToDeliverQuantity))
 {
    tempobj6.push(obj5)
 }
 chk_exist6.push(elem.yetToDeliverQuantity)
 let obj6={label:elem.purchaseOrderName,value:elem.purchaseOrderName}
 if(!chk_exist7.includes(elem.purchaseOrderName))
 {
    tempobj7.push(obj6)
 }
 chk_exist7.push(elem.purchaseOrderName)
 
 let obj7={label:elem.purchaseOrderDate,value:elem.purchaseOrderDate}
 if(!chk_exist8.includes(elem.purchaseOrderDate))
 {
    tempobj8.push(obj7)
 }
 chk_exist8.push(elem.purchaseOrderDate)
   })
   settempdata({...tempdata,'brandname':tempobj,'variety':tempobj2,'packingstyle':tempobj3,'grade':tempobj4,'quantity':tempobj5,'yetToDeliverQuantity':tempobj6,'ordername':tempobj7,'orderdate':tempobj8})
 //console.log("+++++++++++++++++++++tempdata",tempdata)
 
 }
const filterProductsQuant=(text)=>{
 // console.log(text)
   setselected({...selected,'quantity':text})

}

const filteryetToDeliverQuantity=(text)=>{
//  console.log(text)
   setselected({...selected,'yetToDeliverQuantity':text})

}


const handleChange = async(text) => {
//  console.log("...............PackageQuantity ....")
 //   console.log(text)
    const saved_data = JSON.parse(await AsyncStorage.getItem('selected_data'))
    const av  = parseInt(saved_data.yetToDeliverQuantity.label)
 //   console.log(av)
    if(parseInt(text) > av){
      console.log("...............PackageQuantity Is more.!!!!!!1 ....")
      Alert.alert("Package Quantity can't be more than Yet to Deliver Quantity")
    }
    setselected({...selected,'pacQuant':text})
}

// const press =  ()=>
// {
 
//       try
//     {
//      const saved_data = JSON.parse(await AsyncStorage.getItem('selected_data'))
//      console.log(saved_data)
//      console.log("brand name is ",saved_data.brand.label)
//     //  console.log("variety name is ",saved_data.variety[0].label)
//     //  console.log("packingstyle is ",saved_data.packingstyle[0].label)
//     // //  console.log("grade is ",saved_data.grade[0].label)
//     //  saved_data.grade.map(elem=>{
//     //    console.log("grade are ",elem.label)
//     //  })

     
//     }
//     catch(err)
//     {
//       console.log(err)
//     }
  

// }

const summaryPage = () =>{
  navigation.navigate('PackagesumScreen')
}

return(

    <ScrollView>
{/* <Text>{JSON.stringify(tempdata)}</Text> */}
    <View style={Styles.container}>

        {/* <View style={Styles.heading}> */}
        {/* <Table borderStyle={{borderWidth: 2, borderColor: '#c8e1ff'}}>
            <Row data={headingNav} style={Styles.head} textStyle={Styles.text}/>
           
        </Table>  */}

        <Text style={{fontSize:20, left:65,marginTop:10, color:'#2B2A8C', fontWeight:'bold'}}>Select Package Information</Text>
        {/* </View> */}

        {/* <Text>{value}</Text> */}
        
        <View style={Styles.formArea}>
          {/* plant id added here---------------------------------- */}

          <View style={{flexDirection:'row', marginTop:15}}>
         <Text style={{fontSize:16}}>Plant ID      :</Text>   
        <DropDownPicker
            style={{left:17}}
            placeholder="plant id"
            items={ plantid }
          
           
             onChangeItem={(data)=>filterProductsbyplantId(data)}


            containerStyle={{height: 50, 
                width:"60%", 
                bottom:8,
                left:5
                
            }}
        />
        </View>

       <View style={{flexDirection:'row', marginTop:15}}>
         <Text style={{fontSize:16}}>QR Code        :{'\n'}</Text>   
         <TextInput
            style={Styles.inputFieldqr}
            placeholder="  Quantity"
            onChangeText={(data)=>handleChange(data)}
            value={qrCode ? qrCode : "null"} 
        />
        </View>   

        <View style={{flexDirection:'row', marginTop:15}}>
         <Text style={{fontSize:16}}>PO Select      :</Text>   
        <DropDownPicker
            style={{left:17}}
            placeholder="Select PO"
            items={ POid }
          
           
             onChangeItem={(data)=>filterProductsbyId(data)}


            containerStyle={{height: 50, 
                width:"60%", 
                bottom:8,
                left:5
                
            }}
        />
        </View>
        <View style={{flexDirection:'row', marginTop:15}}>
         <Text style={{fontSize:16}}>pOrder name  :</Text>   
        <DropDownPicker
            style={{left:17}}
            placeholder="purchase order name"
            items={tempdata && tempdata['ordername'] ? tempdata['ordername']:[
              {label: 'Sea Food1', value: 'Sea Food'},
              {label: 'Sea Food2', value: 'Sea Food'}
          ]}
          
           
             onChangeItem={(data)=>filterProductsbyOrderName(data)}


            containerStyle={{height: 50, 
                width:"60%", 
                bottom:8,
                left:5
                
            }}
        />
        </View>
        <View style={{flexDirection:'row', marginTop:15}}>
         <Text style={{fontSize:16}}>POrder date  :</Text>   
        <DropDownPicker
            style={{left:17}}
            placeholder="Purchase Order date "
            items={tempdata && tempdata['orderdate'] ? tempdata['orderdate']:[
              {label: 'Sea Food1', value: 'Sea Food'},
              {label: 'Sea Food2', value: 'Sea Food'}
          ]}
          
           
             onChangeItem={(data)=>filterProductsbyOrderDate(data)}


            containerStyle={{height: 50, 
                width:"60%", 
                bottom:8,
                left:5
                
            }}
        />
        </View>


        <View style={{flexDirection:'row', marginTop:10}}>
         <Text style={{fontSize:16}}>Brand Name  :</Text>   
        <DropDownPicker
            placeholder="Select Brand Name"
            onChangeItem={(data)=>filterProductsBrand(data)}
            items={tempdata && tempdata['brandname'] ? tempdata['brandname']:[
                {label: 'Sea Food1', value: 'Sea Food'},
                {label: 'Sea Food2', value: 'Sea Food'}
            ]}
            containerStyle={{height: 50, 
                width:"60%", 
                bottom:8,
                left:17,
                
                
            }}
        />
        </View>

        <View style={{flexDirection:'row', marginTop:10}}>
         <Text style={{fontSize:16}}>Variety           :</Text>   
        <DropDownPicker
            placeholder="Select Variety"
            onChangeItem={(data)=>filterProductsVariety(data)}
            items={tempdata && tempdata['variety'] ? tempdata['variety']:[
                {label: 'Sea Food1', value: 'Sea Food'},
                {label: 'Sea Food2', value: 'Sea Food'}
            ]}
            containerStyle={{height: 50, 
                width:"60%", 
                bottom:8,
                left:22,  
            }}
        />
        </View>

        <View style={{flexDirection:'row', marginTop:10}}>
         <Text style={{fontSize:16}}>Packing Style:</Text>   
        <DropDownPicker
            placeholder="Select Packing Style"
            onChangeItem={(data)=>filterProductsPacking(data)}
            items={tempdata && tempdata['packingstyle'] ? tempdata['packingstyle']:[
                {label: 'Sea Food1', value: 'Sea Food'},
                {label: 'Sea Food2', value: 'Sea Food'}
            ]}
            containerStyle={{height: 50, 
                width:"60%", 
                bottom:8,
                left:20,  
            }}
        />
        </View>

        <View style={{flexDirection:'row', marginTop:10}}>
         <Text style={{fontSize:16}}>Grade Style    :</Text>   
        <DropDownPicker
            placeholder="Select Grade Style"
            onChangeItem={(data)=>filterProductsGrade(data)}
            items={tempdata && tempdata['grade'] ? tempdata['grade']:[
                {label: 'Sea Food1', value: 'Sea Food'},
                {label: 'Sea Food2', value: 'Sea Food'}
            ]}

            containerStyle={{height: 50, 
                width:"60%", 
                bottom:8,
                left:20,  
            }}
        />
        </View>

        <View style={{flexDirection:'row', marginTop:10}}>
         <Text style={{fontSize:16}}>PO Quantity   :</Text>   
        {/* <TextInput
            style={Styles.inputField}
            placeholder="PO Quantity"
            value={tempdata && tempdata['quantity'] ? tempdata['quantity']:"null"}
        /> */}
         <DropDownPicker
          style={{left:5}}
            placeholder="Select PO Quantity"
            onChangeItem={(data)=>filterProductsQuant(data)}
            items={tempdata && tempdata['quantity'] ? tempdata['quantity']:[
                {label: 'Sea Food1', value: 'Sea Food'},
                {label: 'Sea Food2', value: 'Sea Food'}
            ]}
            containerStyle={{height: 50, 
                width:"60%", 
                bottom:8,
                left:15,
                
                
            }}
        />

          {/* <DropDownPicker
          style={{left:5}}
            placeholder="Select yetToDeliverQuantity"
            onChangeItem={(data)=>filteryetToDeliverQuantity(data)}
            items={tempdata && tempdata['yetToDeliverQuantity'] ? tempdata['yetToDeliverQuantity']:[
                {label: 'Sea Food1', value: 'Sea Food'},
                {label: 'Sea Food2', value: 'Sea Food'}
            ]}
            containerStyle={{height: 50, 
                width:"60%", 
                bottom:8,
                left:15,
                
                
            }}
        /> */}
        </View>    

        <View style={{flexDirection:'row', marginTop:10}}>
         <Text style={{fontSize:16}}>YetToDeliver  :</Text>   
        
          <DropDownPicker
          style={{left:5}}
            placeholder="Select yetToDeliver"
            onChangeItem={(data)=>filteryetToDeliverQuantity(data)}
            items={tempdata && tempdata['yetToDeliverQuantity'] ? tempdata['yetToDeliverQuantity']:[
                {label: 'Sea Food1', value: 'Sea Food'},
                {label: 'Sea Food2', value: 'Sea Food'}
            ]}
            containerStyle={{height: 50, 
                width:"60%", 
                bottom:8,
                left:15,
                
                
            }}
        />
        </View>   

        <View style={{flexDirection:'row', marginTop:5}}>
         <Text style={{fontSize:16}}>Packaged       :{'\n'} Quantity</Text>   
         <TextInput
            style={Styles.inputField}
            placeholder="  Quantity"
            onChangeText={(data)=>handleChange(data)}
        />
        </View>
        {/* <View style={{flexDirection:'row', marginTop:25}}>
         <Text style={{fontSize:20}}>Packaged :{'\n'} Quantity</Text>   
         <Text style={{fontSize:20}}></Text>
        </View> */}
      
   

        </View>
       
         
   
           
        <TouchableOpacity onPress={onPress}>
            <View style={Styles.button}>
                <Text style={Styles.buttonText}>
                    Summary
                  {/* <AntDesign name="arrowright" size={40} style={{marginTop:35}} color="#FFFF" /> */}
                </Text>
            </View>
        </TouchableOpacity> 
    </View>
    </ScrollView>
)
}
export default App;