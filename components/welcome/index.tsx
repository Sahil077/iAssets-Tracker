import React , {useState , useEffect} from "react";
import {View , Text,  TextInput ,StyleSheet, TouchableOpacity, ScrollView,Alert , LogBox ,Button , Pressable  } from "react-native";
import Styles from "../welcome/styles";
import { AntDesign , FontAwesome , Entypo } from '@expo/vector-icons'; 
import {useNavigation,useIsFocused } from "@react-navigation/native";
import { Table, Row, Cell , TableWrapper , Rows } from 'react-native-table-component';
import DatePicker from 'react-native-datepicker'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios';

const welcome = () => {

    LogBox.ignoreLogs([
        'DatePickerIOS has been merged with DatePickerAndroid and will be removed in a future release.',
        'StatusBarIOS has been merged with StatusBar and will be removed in a future release.',
        'DatePickerAndroid has been merged with DatePickerIOS and will be removed in a future release.',
        'componentWillReceiveProps has been renamed, and is not recommended for use.'
      ]);

    const [headingNav,setheadingNav]=useState(['Date', 'PO', 'Status'])
    const [rowdata,setrowdata]= useState([])
    // const [innerData,setinnerData]=useState(['31/05/2021', '54852', 'Delivered', 'More'])
    const  [ data , setdata] = useState()
    const [ searchData , setsearchData ] = useState({})
    const navigation = useNavigation();
    const isFocused = useIsFocused();
    const onPress = async () => {
        navigation.navigate("PackagesumScreen")
    }

    const QRscan = async () =>{
        navigation.navigate("QRScreen")
    }

    useEffect(() => {
        LogBox.ignoreLogs(['Animated: `useNativeDriver` was not specified.']);
        const venID = async() =>{
            var venderID = await AsyncStorage.getItem('vendorId')
            var toSendVendorid = venderID.replace(/"/g,"")
           // console.log(toSendVendorid)
            try{
                axios.get(`http://136.232.40.34:8888/testingdb/rest/Nekkanti/getPouchTrackerDetailsForSupplier;VendorId=${toSendVendorid};FromDate=;ToDate=;`).then(resp=>{
                    setsearchData(resp.data)
                    var container_arr=[]
                    resp.data.object.map((elem)=>{
                        container_arr.push([elem.packageShippedDate.split("_")[0],elem.poid,elem.packageStatus])
                        // console.log(elem.packageReceivedDate)
                        // console.log(elem.vendor.split("_")[0])
                        // console.log(elem.poid)
                       
                       
                    })
                    setrowdata(container_arr)
                    // console.log(container_arr,"_____________________________________________")
                })
            }
            catch(err)
            {
            console.log(err)
            }   
        }
        venID()
    }, [isFocused])

    async function go(){
        // console.log("#########################")
        const from = data.from
        const to = data.to
        var venderID = await AsyncStorage.getItem('vendorId')
        var toSendVendorid = venderID.replace(/"/g,"")
        // console.log(toSendVendorid)
      await axios.get(`http://136.232.40.34:8888/testingdb/rest/Nekkanti/getPouchTrackerDetailsForSupplier;VendorId=${toSendVendorid};FromDate=${from};ToDate=${to};`).then(resp=>{
            //  console.log(resp.data)
            var container_arr=[]
            resp.data.object.map((elem)=>{
                container_arr.push([elem.packageShippedDate.split("_")[0],elem.poid,elem.packageStatus])
                // console.log(elem.packageReceivedDate)
                // console.log(elem.vendor.split("_")[0])
                // console.log(elem.poid)
               
               
            })
            setrowdata(container_arr)
        })    
        
    }

    function poSearch(id){
        // console.log("clicked",id)
        const ids = id
        const bb = searchData.object.filter( i => ids.includes( i.poid ) );
        //  const strfy = JSON.stringify(bb)
        //  const ab = JSON.parse(strfy)
        // console.log('######%$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$')
        //  console.log(bb[0])
        //  console.log("#############")
        const toSend = async () => {
            try
            {
                await AsyncStorage.setItem('PO_Order', JSON.stringify(bb[0].poid))
                await AsyncStorage.setItem('brandName', JSON.stringify(bb[0].brand))
                await AsyncStorage.setItem('packingStyle', JSON.stringify(bb[0].packingStyle))
                await AsyncStorage.setItem('varietyStyle', JSON.stringify(bb[0].variety))
                await AsyncStorage.setItem('gradeType', JSON.stringify(bb[0].grade))
                await AsyncStorage.setItem('PO_Quantity', JSON.stringify(bb[0].poQuantity))
                await AsyncStorage.setItem('poname', JSON.stringify(bb[0].poName))
                await AsyncStorage.setItem('plantid', JSON.stringify(bb[0].id))
                await AsyncStorage.setItem('Pack_Quantity', JSON.stringify(bb[0].packedQuantity))

                await AsyncStorage.setItem('packageDeliveredDate', JSON.stringify(bb[0].packageDeliveredDate))
                await AsyncStorage.setItem('packageReceivedDate', JSON.stringify(bb[0].packageReceivedDate))
                await AsyncStorage.setItem('packageShippedDate', JSON.stringify(bb[0].packageShippedDate))
                await AsyncStorage.setItem('packageStatus', JSON.stringify(bb[0].packageStatus))
                await AsyncStorage.setItem('qrcodeId', JSON.stringify(bb[0].qrcodeId))
                await AsyncStorage.setItem('receivedPlant', JSON.stringify(bb[0].receivedPlant))
                navigation.navigate('packageDetailsScreen')
            }
            catch(err)
            {
            console.log(err)
            }    
        }
        toSend()      
    }

    const Logout = () => {
        const sessionOver = async() => {
            await AsyncStorage.removeItem('status')
            await AsyncStorage.removeItem('vendorId')
            await AsyncStorage.removeItem('role')
            await AsyncStorage.removeItem('username')
            await AsyncStorage.removeItem('password')
            .then(()=>{
             //   Alert.alert('You are Logout.')
                navigation.navigate('LoginScreen')
            })
        }
        sessionOver()
    }

    

    return(
        <ScrollView>
        <View style={Styles.container}>

            <View style={Styles.heading}>
            {/* {navigations.getParam('paramKey') ? <Text style={{fontSize:20, fontWeight: 'bold', color:"Red"}} >Data Saved</Text> : */}
               {/* <Text style={{fontSize:20, fontWeight: 'bold', color:"green"}} >Login Successfull.</Text>     */}
            </View>


            <TouchableOpacity onPress={QRscan}>
                <View style={Styles.Uploadbutton}>
                    <Text style={Styles.buttonText}>
                      Upload New Package Details
                    </Text>
                </View>
            </TouchableOpacity>
            
            <View style={Styles.formArea}>

         
            <View style={{flexDirection:'row', marginTop:20}}>
                   
                    <DatePicker
                            style={Styles.buttonDate}
                            mode="date"
                            placeholder="From"
                            format="DD.MM.YYYY"
                            date={data && data.from? data.from : ''}
                            confirmBtnText="Confirm"
                            cancelBtnText="Cancel"
                            customStyles={{
                            dateIcon: {
                                position: 'absolute',
                                left: 0,
                                top: 4,
                                marginLeft: 0
                            },
                            dateInput: {
                                marginLeft: 36
                            }
                            }}
                            onDateChange={(text)=>setdata({...data,"from":text})}
                        />
             
                       <DatePicker
                            style={Styles.buttonDate}
                            mode="date"
                            placeholder="To"
                            format="DD.MM.YYYY"
                            date={data && data.to? data.to : ''}
                            confirmBtnText="Confirm"
                            cancelBtnText="Cancel"
                            customStyles={{
                            dateIcon: {
                                position: 'absolute',
                                left: 0,
                                top: 4,
                                marginLeft: 0
                            },
                            dateInput: {
                                marginLeft: 36
                            }
                            }}
                            onDateChange={(text)=>setdata({...data,"to":text})}
                        />       
                  
                <TouchableOpacity onPress={go}>
                <View style={Styles.Searchbutton}>
                    <Text style={Styles.buttonText}>
                      Go
                    </Text>
                </View>
                </TouchableOpacity>  
               
                </View>
           
            </View>
           
            <View style={{marginBottom:220}}>
             
                <Table borderStyle={{top:50}}>
                    <Row data={headingNav} style={Styles.head} textStyle={Styles.text}/>
                   
                   {
                    rowdata.map((rowData, index) => (
                    <TableWrapper key={index} style={Styles.row}>
                        {
                        rowData.map((cellData, cellIndex) => (
                            <Cell key={cellIndex} data={cellIndex === 1 ? <Text style={Styles.text1} onPress={()=>poSearch(cellData)}>{cellData}</Text> : cellData} 
                            textStyle={Styles.text1}
                            />
                        ))
                        }
                    </TableWrapper>
                    ))
                  }
                
           
                </Table>
              
            </View>

                  
            <View style={{flex:1,position:'relative',marginBottom:80}}>
                {/* <TouchableOpacity onPress={Logout}>
                    <View style={Styles.button}>
                        <Text style={Styles.buttonText}>
                        LogOut
                        </Text>
                    </View>
                </TouchableOpacity>  */}
                <Pressable style={Styles.button} onPress={Logout}>
                    <Text style={Styles.buttonText}>Logout</Text>
                </Pressable>
            </View>   
        </View>
        </ScrollView>
    )
}
  

export default welcome;