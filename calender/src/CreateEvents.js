import {Modal, TouchableOpacity, View, StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';
import {TextInput} from 'react-native-gesture-handler';
import {months} from './PublicHolidays';
import {Calendar, LocaleConfig} from 'react-native-calendars';
import AsyncStorage, {
  useAsyncStorage,
} from '@react-native-async-storage/async-storage';
import {Text} from 'react-native';
import {useIsFocused} from '@react-navigation/native';
const CreateEvents = props => {
  const data = props?.route?.params;
  // const isFocused=useIsFocused()
  const [isVisible, setVisible] = useState(false);
  const [userEvents, setUserEvents] = useState({
    month: data.monthNum,
    date: data.datenow,
    event: "",
  });
  const [dayString,setDayString]=useState("")
  const [Data,setData]=useState([])
  const date = new Date(
    new Date().getFullYear(),
    new Date().getMonth(),
    data?.datenow,
  ).toLocaleDateString();

  const Handledate = (key, text) => {
    setUserEvents({...userEvents, [key]: text});
  };

  useEffect(()=>{
    (async()=>{
      let res = await AsyncStorage.getItem('eventOfDay');
      res = JSON.parse(res);
      setData(res||[])
    })()
  },[])

  const handleSubmit = async () => {
    if(userEvents.event!==""){
    try{
      let res = await AsyncStorage.getItem('eventOfDay');
      res = JSON.parse(res)||[];
     // await AsyncStorage.clear(res);
      if (!res) {
        res=await AsyncStorage.setItem('eventOfDay', JSON.stringify([userEvents]));
         
      } else {
       await AsyncStorage.setItem('eventOfDay',JSON.stringify([...res, userEvents]),);
        
      }
     
      setData([...res,userEvents])
      props?.navigation?.goBack()
      setUserEvents({
        month: '',
        date: 0,
        event: '',
      });
    }catch(err){
      console.log(err)
    }
  }
  };
 
  return (
    <View style={styles.container}>
     
      <TextInput
        placeholder="Enter_the_event"
        placeholderTextColor={'rgba(0,0,0,0.5)'}
        style={styles.TxtInput}
        value={userEvents.event}
        onChangeText={text => Handledate('event', text)}
      />
      

      {/* event naming */}
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <TouchableOpacity
          style={styles.dateChange}
          activeOpacity={0.7}
          onPress={() => setVisible(!isVisible)}>
          <Text
            style={{color: 'white', fontSize: 14, fontFamily: 'Roboto-Bold'}}>
            {' '}
            Date Change{' '}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.dateChange1}
          onPress={handleSubmit}>
          <Text style={styles.submitTxt}>Submit</Text>
        </TouchableOpacity>
      </View>
      <Modal visible={isVisible} animationType="fade">
        <View style={styles.modalContainer}>
          <Calendar
             style={{borderRadius: 10, elevation: 4, margin: 40}}
            onDayPress={date => {
              setDayString(date.dateString);
              setVisible(false);
            }}
            initialDate={date}
          />
        </View>
      </Modal>
      <View>
     {/* { Data.map((el,i)=>{
    return(
      <View key={i}  style={{flexDirection:"row",justifyContent:"space-evenly"}}   >
       <Text style={styles.TxtColor} >{el.date}</Text>
       <Text style={styles.TxtColor} >{months[el.month]}</Text>
       <Text style={styles.TxtColor} >{el.event}</Text>
      </View>
    )
     })} */}
     {/* <Text>{dayString}</Text> */}
      </View>
    </View>
  );
};
export default CreateEvents;
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flexGrow: 1,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  TxtInput: {
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.5)',
    width: '50%',
    marginTop: 20,
    alignSelf:"center",
    borderRadius: 10,
    paddingLeft: 20,
  },
  dateChange: {
    width: 150,
    padding: 10,
    alignItems: 'center',
    margin: 30,
    backgroundColor: 'black',
    borderRadius: 5,
  },
  dateChange1: {
    width: 100,
    padding: 9,
    alignItems: 'center',
    margin: 30,
    backgroundColor: 'rgb(250, 200, 152)',
    borderRadius: 5,
  },
  submitTxt: {
    color: 'black',
    fontSize: 14,
    fontFamily: 'Roboto-Bold',
  },
  TxtColor:{
    color:"black",fontSize:16,fontFamily:"Roboto-Medium"
  }
});
