import React, { useEffect, useState } from "react";
import {openDatabase} from 'react-native-sqlite-storage'
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

var db=openDatabase({
  name:'Register.db',
});
const  Register=({navigation})=>{
  const [name,setname]=useState('');
  const [mobileno,setmobileno]=useState('');
  const [password,setpassword]=useState('');
  const [retypepassword,setretypepassword]=useState('');
  const [city,setcity]=useState('');
  const [showpwdmsg,setshowpwdmsg]=useState(false);
  const [pwdmsg,setpwdmsg]=useState('');

  useEffect(()=>{
    db.transaction(function(txns)
    {
      txns.executeSql("SELECT name FROM sqlite_master WHERE type='table' AND name='reg' ",[],
      function(txns,res)
      {
        console.log("item:",res.rows.length);

        if(res.rows.length == 0)
        {
          console.log("item:",res.rows.length);
          txns.executeSql("CREATE TABLE IF NOT EXISTS reg (name VARCHAR(60),  mobile INTEGER, password VARCHAR(30), city VARCHAR(30))",[],
            function(_txns,res1){
              if(res1.rowsAffected>0){
                console.log("Result:",res1.rowsAffected);
                console.log("Item:",res.rows.length);
              }
              console.log("item:",res.rows.length);

            });
        }
      });
    });
  },[]);
 
  const registerdata=()=>{
    if(name =='' || mobileno == ''|| password =='' || retypepassword =='' || city==''){
      Alert.alert("Please Enter All Values");
      
  
    }
    else{
      db.transaction(function(tx) {
        tx.executeSql("INSERT INTO reg (name,mobile,password,city) VALUES (?,?,?,?)",
        [name,mobileno,password,city],
        function(_tx,res3){
          console.log("else");
          console.log("results",res3.rowsAffected)
          if(res3.rowsAffected>0){
            Alert.alert("You are Registered");
              setname("")
              setmobileno("")
              setpassword("")
              setretypepassword("")
              setcity("");
              navigation.navigate('Login');
                                                    
          }
          else{
            Alert.alert("Failed to registered")
          }
  
        });
      });
    }
      
  }
  const checkpwd=(pwd1)=>{
    if(pwd1==password){
      setpwdmsg("");
      setshowpwdmsg(false);
    }
    else if(pwd1!=password){
      setpwdmsg("Password Mistmatch");
      setshowpwdmsg(true);
    }
  }

    return(
 <View style={styles.container}>
      <Text style={{fontSize:30, }}>Register </Text>
      <View style={styles.login}>
      <Text style={styles.mlno}>Name: </Text>
        <TextInput
        textAlign='center'
        placeholder='Name'
        onChangeText={(text)=>{setname(text)}}
        value={name}
          style={{
            borderRadius:10,
            borderWidth:0,
            
            backgroundColor:"white",
            width:230,
            height:40,
            shadowColor: 'white',
            shadowOffset: {width: -2, height: 4},
            shadowOpacity: 10,
            shadowRadius: 3,
            elevation: 6,
            
          }}
        >

        </TextInput>
        <Text style={styles.mlno}>Mobile No.: </Text>
        <TextInput
        textAlign='center'
        placeholder='(Username)'
        keyboardType="numeric"
        onChangeText={(text)=>{setmobileno(text)}}
        value={mobileno}
          style={{
            borderRadius:10,
            borderWidth:0,
            
            backgroundColor:"white",
            width:230,
            height:40,
            shadowColor: 'white',
            shadowOffset: {width: -2, height: 4},
            shadowOpacity: 10,
            shadowRadius: 3,
            elevation: 6,
            
          }}
        >

        </TextInput>
        <Text style={styles.mlno1}>Password: </Text>
        <TextInput
        textAlign='center'
        placeholder='Password'
        secureTextEntry={true}
        onChangeText={(text)=>{setpassword(text)}}
        value={password}
          style={{
            borderRadius:10,
            borderWidth:0,
       
            backgroundColor:"white",
            width:230,
            height:40,
            shadowColor: 'white',
            shadowOffset: {width: -2, height: 4},
            shadowOpacity: 10,
            shadowRadius: 3,
            elevation: 6,
            
        }}
        >
              </TextInput>
              <Text style={styles.mlno1}>Retype Password: </Text>
        <TextInput
        textAlign='center'
        placeholder='Retype Password'
        secureTextEntry={true}

        onChangeText={(text)=>{checkpwd(text);setretypepassword(text); }}
        value={retypepassword}
          style={{
            borderRadius:10,
            borderWidth:0,
       
            backgroundColor:"white",
            width:230,
            height:40,
            shadowColor: 'white',
            shadowOffset: {width: -2, height: 4},
            shadowOpacity: 10,
            shadowRadius: 3,
            elevation: 6,
            
        }}
        ></TextInput>
        <Text style={{color:'red' ,fontStyle:'italic',fontWeight:'bold'}}>{pwdmsg}</Text>
        <Text style={styles.mlno1}>City: </Text>
        <TextInput
        textAlign='center'
        placeholder='City'
        onChangeText={(text)=>{setcity(text); }}
        value={city}
          style={{
            borderRadius:10,
            borderWidth:0,
       
            backgroundColor:"white",
            width:230,
            height:40,
            shadowColor: 'white',
            shadowOffset: {width: -2, height: 4},
            shadowOpacity: 10,
            shadowRadius: 3,
            elevation: 6,
            
        }}
        ></TextInput>

        
        <View style={styles.btn}>
            <TouchableOpacity style={styles.regbtn} 
                onPress={()=>{registerdata()}}
                disabled={showpwdmsg}
            >
               <Text style={{color:"white", fontSize:19}}>Register </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.clearbtn}>
               <Text style={{color:"white", fontSize:20}}>Clear </Text>
            </TouchableOpacity>
        </View>
   
            
      </View>
      
    </View>
  );
}

export default Register;
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
    backgroundColor:'black',
    justifyContent:"space-between",
    padding:50,
    borderRadius:30,
    shadowColor: 'white',
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
  regbtn:{
    borderColor:"orange",
    alignItems:"center",
    borderWidth:1,
    padding:10,
    width:100,
    alignSelf:"flex-start",
    borderRadius:5,
    shadowColor: 'white',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 10,
    shadowRadius: 3,
    elevation: 2,
  },
  clearbtn:{
    borderColor:"red",
    alignItems:"center",
    padding:10,
    width:100,
    borderWidth:1,
    marginStart:30,
    alignSelf:"flex-end",
    borderRadius:5,
    shadowColor: 'white',
    shadowOffset: {width: -3, height: 4},
    shadowOpacity: 10,
    shadowRadius: 3,
    elevation: 2,
  },
  forgotbtn:{
    alignItems:"center",
    marginTop:10,
    borderRadius:5,
    padding:5,
    borderWidth:1,
    borderColor:"#03BBF9",
    shadowColor: 'white',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 10,
    shadowRadius: 3,
    elevation: 6,
    

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
