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
      <><View style={styles.Ellipse1} /><Text style={{ fontSize: 30, position:"absolute",alignSelf:"center", 
      marginTop:50,
      fontFamily: "Inter, sans-serif",
      fontWeight: "700",
      color: "rgba(255, 255, 255, 1)",}}>Register </Text><View style={styles.login}>

        <TextInput
          placeholderTextColor={"black"}
          placeholder='Name'
          onChangeText={(text) => { setname(text); } }
          value={name}
          style={{
            borderBottomWidth: 1,
            fontSize: 16,
            backgroundColor: "white",
            width: 230,
            height: 40,
          }}
        >

        </TextInput>

        <TextInput
          placeholderTextColor={"black"}
          placeholder='Mobile No'
          keyboardType="numeric"
          onChangeText={(text) => { setmobileno(text); } }
          value={mobileno}
          style={{
            borderBottomWidth: 1,
            fontSize: 16,
            backgroundColor: "white",
            width: 230,
            height: 40,
          }}
        >

        </TextInput>

        <TextInput
          placeholderTextColor={"black"}
          placeholder='Password'
          secureTextEntry={true}
          onChangeText={(text) => { setpassword(text); } }
          value={password}
          style={{
            borderBottomWidth: 1,
            fontSize: 16,
            backgroundColor: "white",
            width: 230,
            height: 40,
          }}
        >
        </TextInput>

        <TextInput
          placeholderTextColor={"black"}
          placeholder='Retype Password'
          secureTextEntry={true}

          onChangeText={(text) => { checkpwd(text); setretypepassword(text); } }
          value={retypepassword}
          style={{
            borderBottomWidth: 1,
            fontSize: 16,
            backgroundColor: "white",
            width: 230,
            height: 40,
          }}
        ></TextInput>
        <Text style={{ color: 'red', fontStyle: 'italic', fontWeight: 'bold' }}>{pwdmsg}</Text>

        <TextInput
          placeholderTextColor={"black"}
          placeholder='City'
          onChangeText={(text) => { setcity(text); } }
          value={city}
          style={{
            borderBottomWidth: 1,
            fontSize: 16,
            backgroundColor: "white",
            width: 230,
            height: 40,
          }}
        ></TextInput>


        <View>
<Text></Text>
          <TouchableOpacity style={styles.regbtn}
            onPress={() => { registerdata(); } }
            disabled={showpwdmsg}
            >
            <Text style={{  fontSize: 20,
    fontFamily: "Inter, sans-serif",
    fontWeight: "700",
    color: "rgba(255, 255, 255, 1)", }}>Sign Up </Text>
          </TouchableOpacity>
          <Text></Text>
          <TouchableOpacity style={styles.clearbtn}
          onPress={()=>{navigation.navigate('Login')}}
          >
            <Text style={{ color: "black", fontSize: 20,fontWeight:"bold" }}>Have Account? Login Here </Text>
          </TouchableOpacity>
            </View>
        


      </View></>
      
  
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
    backgroundColor:'white',
    position:"absolute",
    alignSelf:"center",
    marginTop:100,
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
   
    alignSelf:"center",
   
  },
  Ellipse1: {
    backgroundColor: "rgba(9,198,249,1)",
    width: 807,
    alignSelf:"center",
    
    height: 400,
    borderBottomLeftRadius: 403.5,
    borderBottomRightRadius:403.5,
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
