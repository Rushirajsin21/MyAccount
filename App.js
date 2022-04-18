import { StatusBar } from 'expo-status-bar';
import React, { useState,Component, useEffect } from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Register from './Register';
import { Image } from 'react-native';
import {SafeAreaView} from 'react-native';
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
          <Stack.Screen
          options={{headerShown:false}}
          name='Forgotpassword'
          component={Forgotpassword}
          />
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
  
    <>
    

    <View style={styles.Ellipse1} />
    <View style={{position:"absolute",alignSelf:"center",marginTop:50}}>
    <Text style={{ fontSize: 40, 
    fontFamily: "Inter, sans-serif",
    fontWeight: "700",
    color: "rgba(255, 255, 255, 1)", }}>Log In</Text>      
    </View>
   <View style={styles.login}>
   
     
      <TextInput
        
        placeholderTextColor={"black"}
        placeholder='Mobile No'
        onChangeText={(text) => { setmobile(text); } }
        value={mobile}
        style={{
          
          borderBottomWidth: 1,
          fontSize:16,
          backgroundColor: "white",
          width: 230,
          height: 40,
         
        }}
      >

      </TextInput>
      <Text></Text>
      <TextInput
        placeholderTextColor={"black"}
        placeholder='Password'
        secureTextEntry={true}
        onChangeText={(text) => { setpassword(text); } }
        value={password}
        style={{
         
          borderBottomWidth: 1,
          fontSize:16,
          backgroundColor: "white",
          width: 230,
          height: 40,
         
        }}
      >

      </TextInput>
      <TouchableOpacity style={styles.forgotbtn}
          onPress={()=>{navigation.navigate('Forgotpassword');}}
      >
        <Text style={{ color: "blue", fontSize: 20 }}>Forgot Password?</Text>
      </TouchableOpacity>
     
        <TouchableOpacity style={styles.loginbtn}
          onPress={() => { selectData(); } }
        >
          <Text style={{  fontSize: 20,
    fontFamily: "Inter, sans-serif",
    fontWeight: "700",
    color: "rgba(255, 255, 255, 1)", }}>Log In </Text>
        </TouchableOpacity>
        
     

      <TouchableOpacity style={styles.registerbtn}
        onPress={() => { navigation.navigate('Register'); } }
      >
        <Text style={{ color: "black", fontSize: 16,fontWeight:"bold" }}>Don't Have Account? Signup Here </Text>
      </TouchableOpacity>
    </View>
    </> 

    
     
    
  );
}
const Forgotpassword=({navigation})=>{
  return(
    <View>
      <Text>forgot passowrd text</Text>
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
  Ellipse1: {
    backgroundColor: "rgba(9,198,249,1)",
    width: 807,
    alignSelf:"center",
    
    height: 400,
    borderBottomLeftRadius: 403.5,
    borderBottomRightRadius:403.5,
  },
  login:{
    position:"absolute",
    alignSelf:"center",
    marginTop:130,
    backgroundColor:'white',
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
    color:'black',
    fontSize:20,
    
  },
  mlno1:{
    color:'black',
    fontSize:20,
    paddingTop:10,
  },
  btn:{
    paddingTop:20,
    
    flexDirection:"column",
    
  },
  loginbtn:{
    backgroundColor:"rgba(0,180,216,1)",
    alignItems:"center",
    
    padding:10,
    width:230,
    alignSelf:"center",
    borderRadius:8,
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
    
    
   
    

    
  }
});
