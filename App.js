import { StatusBar } from 'expo-status-bar';
import React, { useState,Component, useEffect } from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Register from './Register';
import { Image } from 'react-native';
import { openDatabase } from 'react-native-sqlite-storage';
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

const Stack = createNativeStackNavigator();
var db=openDatabase({
    name:'Register.db'

});
export default function App() {
        return (
<NavigationContainer>
      <Stack.Navigator initialRouteName="Splash">
      <Stack.Screen 
          name='Splash'
          options={
            {headerShown: false}}
          component={Splash} />
      <Stack.Screen 
          name='Login'
          options={
            {headerShown: false}}
          component={Login} />
        <Stack.Screen
         options={
          {headerShown: false}}
        
          name='Register'
          component={Register} />
          <Stack.Screen
         options={
          {headerShown: false}}
        
          name='Main'
          component={Main} />
      </Stack.Navigator>
    </NavigationContainer>
        );
}

const Splash=({navigation})=>{
 useEffect(()=>{
    setTimeout(() => {
      navigation.replace('Login');
    }, 3000);
 },[]);
  
  return(
    <View>
      <Image  source={require('C:/Users/RUSHIRAJSINH/Videos/ReactNative/Account/myaccount/AndroidLarge-6.png')} style={{height:470, width:360,resizeMode:"cover",position:'absolute'}}/>
    </View>
  );
}
const Login=({navigation})=>{
  const [mobile,setmobile]=useState('');
  const [password,setpassword]=useState('');
  const selectData =()=>{
    if (mobile == '' || password == '') {
       Alert.alert('Please Enter All the Values');
     }
     else {
        db.transaction(function(txn1){
          txn1.executeSql("SELECT * FROM reg WHERE mobile =(?) AND password =(?)",
          [mobile,password],
          (_txn1,results)=>{
             if (results.rows.length>=1)
             {
                Alert.alert("you are logedin");
                navigation.navigate('Main');

             }
             else{
                Alert.alert("you are not registered");
             }
          }
          );
        }
        )
     }
 }
  return(    
  <View style={styles.container}>
        <Text style={{ fontSize: 30, }}>Login</Text>
        <View style={styles.login}>
          <Text style={styles.mlno}>Mobile No.</Text>
          <TextInput
            textAlign='center'
            placeholder='(Username)'
            onChangeText={(text)=>{setmobile(text)}}
            value={mobile}
            style={{
              borderRadius: 10,
              borderWidth: 0,

              backgroundColor: "white",
              width: 230,
              height: 40,
              shadowColor: 'white',
              shadowOffset: { width: -2, height: 4 },
              shadowOpacity: 10,
              shadowRadius: 3,
              elevation: 6,
            }}
          >

          </TextInput>
          <Text style={styles.mlno1}>Password</Text>
          <TextInput
            textAlign='center'
            placeholder='Password'
            onChangeText={(text)=>{setpassword(text)}}
            value={password}
            style={{
              borderRadius: 10,
              borderWidth: 0,

              backgroundColor: "white",
              width: 230,
              height: 40,
              shadowColor: 'white',
              shadowOffset: { width: -2, height: 4 },
              shadowOpacity: 10,
              shadowRadius: 3,
              elevation: 6,
            }}
          >

          </TextInput>
          <TouchableOpacity style={styles.forgotbtn}>
            <Text style={{ color: "blue", fontSize: 20 }}>Forgot Password ? </Text>
          </TouchableOpacity>
          <View style={styles.btn}>
            <TouchableOpacity style={styles.loginbtn}
              onPress={()=>{selectData()}}
            >
              <Text style={{ color: "white", fontSize: 20 }}>Login </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.clearbtn}>
              <Text style={{ color: "white", fontSize: 20 }}>Clear </Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.registerbtn}
              onPress={()=>{navigation.navigate('Register')}}
          >
            <Text style={{ color: "white", fontSize: 20, fontWeight: "bold" }}>Register Here </Text>
          </TouchableOpacity>
        </View>

      </View>
  );
}
const Main=()=>{
  return(
    <View>
      <Text style={{fontWeight:"bold" ,color:"black"}}>Welcome</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textcolor:{
    color:'white',
  },
  login:{
    backgroundColor:'grey',
    justifyContent:"space-between",
    padding:50,
    borderRadius:30,
    shadowColor: 'blue',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 10,
    shadowRadius: 3,
    
    elevation: 6,
    
  },
  mlno:{
    color:'white',
    fontSize:20,
    
  },
  mlno1:{
    color:'white',
    fontSize:20,
    paddingTop:10,
  },
  btn:{
    paddingTop:20,
    
    flexDirection:"row",
    
  },
  loginbtn:{
    backgroundColor:"green",
    alignItems:"center",
    padding:10,
    width:100,
    alignSelf:"flex-start",
    borderRadius:5,
    shadowColor: 'white',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 10,
    shadowRadius: 3,
    elevation: 6,
  },
  clearbtn:{
    backgroundColor:"red",
    alignItems:"center",
    padding:10,
    width:100,
    marginStart:30,
    alignSelf:"flex-end",
    borderRadius:5,
    shadowColor: 'white',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 10,
    shadowRadius: 3,
    elevation: 6,
  },
  forgotbtn:{
    alignItems:"flex-end",
    marginTop:10,
    borderRadius:5,
    
    padding:5,
    borderWidth:0,
    borderColor:"#03BBF9",
    // shadowColor: 'white',
    // shadowOffset: {width: -2, height: 4},
    // shadowOpacity: 10,
    // shadowRadius: 3,
    // elevation: 2,
    

  },
  registerbtn:{
    alignItems:"center",
    marginTop:10,
    borderRadius:50,
    padding:10,
    borderWidth:1,
    
    borderColor:"red",
    shadowColor: 'white',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 10,
    shadowRadius: 3,
    elevation: 6,
  }
});
