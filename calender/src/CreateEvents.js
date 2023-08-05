import {
  Modal,
  TouchableOpacity,
  View,
  StyleSheet,
  Switch,
  TextInput,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {months} from './PublicHolidays';
import TickMark from '../assets/svg/TickMark';
import CrossMark from '../assets/svg/CrossMark';
import {Calendar} from 'react-native-calendars';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Calender from '../assets/svg/Calender.svg';
import {Text} from 'react-native';


const CreateEvents = props => {
  const data = props?.route?.params;
 
  const [isVisible, setVisible] = useState(false);
  const [userEvents, setUserEvents] = useState({  month:data?.monthNum ,  fullYear:new Date().getFullYear(),  date: data?.datenow,  allday:false, thisMonth:false, event: '',description:""});
  const date = new Date(new Date().getFullYear(),new Date().getMonth(),data?.datenow).toLocaleDateString();
  const Handledate = (key, text) => {
    setUserEvents({...userEvents, [key]: text}); 
  };

  useEffect(() => {
    (async () => {
      let res = await AsyncStorage.getItem('eventOfDay');
      res = JSON.parse(res);
    })();
  }, []);

  const handleSubmit = async () => {
    if (userEvents.event !== '') {
      try {
        let res = await AsyncStorage.getItem('eventOfDay');
        res = JSON.parse(res) || [];
       // await AsyncStorage.clear(res);
        if (!res) {
          res = await AsyncStorage.setItem(
            'eventOfDay',
            JSON.stringify([userEvents]),
          );
        } else {
          await AsyncStorage.setItem(
            'eventOfDay',
            JSON.stringify([...res, userEvents]),
          );
        }
        props?.navigation?.goBack();
        setUserEvents({
          month: '',
          date: 0,
          event: '',
        });
      } catch (err) {
        console.log(err);
      }
    } else {
      alert('please fill the event');
    }
  };
   //const Day=new Date(new Date().getFullYear(),userEvents.month,userEvents.date).toDateString()
   //console.log(userEvents)

 
  return (
    <View style={styles.container}>
      {/* event naming */}
      <View style={styles.submittionTxt}>
        <TouchableOpacity
          style={styles.dateChange}
          activeOpacity={0.7}
          onPress={() =>props.navigation.goBack() }>
          <CrossMark />
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.dateChange1}
          onPress={handleSubmit}>
          <TickMark />
        </TouchableOpacity>
      </View>
      <Text  style={styles.eventTxt}>Event</Text>
      <View style={styles.currentBox}>
      <Text style={styles.currentDate}> currentDate:-{' '}{new Date(new Date().getFullYear(),userEvents.month,userEvents.date,).toDateString()}</Text>
      <TouchableOpacity onPress={()=>setVisible(!isVisible)} activeOpacity={0.7} >
      <Calender/>
      </TouchableOpacity>
      </View>
     
      <TextInput
        placeholder="Enter_the_event"
        placeholderTextColor={'rgba(0,0,0,0.5)'}
        style={styles.TxtInput}
        value={userEvents.event}
        onChangeText={text => Handledate('event', text)}
      />
      <Modal visible={isVisible} animationType="fade">
        <View style={styles.modalContainer}>
          <Calendar
            style={{borderRadius: 10, elevation: 4, margin: 40}}
            onDayPress={date => {
              //console.log(date)
              setUserEvents({...userEvents,  month:date.month-1, date:date.day});
              setVisible(false);
            }}
          />
        </View>
      </Modal>
      <View>
        {/* <Text>{dayString}</Text> */}
        <View style={{marginTop: 20}}>
          <Text style={styles.description}>Description</Text>
          <View style={styles.inputTxt}>
            <TextInput
              multiline={true}
              placeholder="Enter Description"
              style={styles.desBox}
              value={userEvents.description}
              onChangeText={text=>Handledate("description",text)}
            />
          </View>
        </View>
        <View style={{width: '95%',alignSelf: 'center'}}>
          <View style={styles.allDay}>
            <Text style={styles.DayTxt} >All Day</Text>
            <Switch
              trackColor={{false: '#767577', true: '#81b0ff'}}
              thumbColor={userEvents.allday ? '#f5dd4b' : '#f4f3f4'}
              ios_backgroundColor="#3e3e3e"
              onValueChange={() => Handledate("allday",!userEvents.allday)}
              value={userEvents.allday}
            />
          </View>
          <View style={styles.thisMontsData}>
            <Text style={styles.thisMonthTxt}>This Month</Text>
            <Switch
              trackColor={{false: '#767577', true: '#81b0ff'}}
              thumbColor={ userEvents.thisMonth ? '#f5dd4b' : '#f4f3f4'}
              ios_backgroundColor="#3e3e3e"
              onValueChange={() => Handledate("thisMonth",!userEvents.thisMonth)}
              value={userEvents.thisMonth}
            />
          </View>
        </View>
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
    width: '80%',
    alignSelf: 'center',
    marginTop: 20,
    borderRadius: 10,
    paddingLeft: 20,
  },
  dateChange: {
    padding: 5,
    alignItems: 'center',
    margin: 30,
    borderRadius: 5,
  },
  dateChange1: {
    padding: 5,
    alignItems: 'center',
    margin: 30,
    borderRadius: 5,
  },
  submitTxt: {
    color: 'black',
    fontSize: 14,
    fontFamily: 'Roboto-Bold',
  },
  TxtColor: {
    color: 'black',
    fontSize: 16,
    fontFamily: 'Roboto-Medium',
  },
  description: {
    color: 'black',
    marginBottom: 20,
    marginLeft: 15,
    fontSize: 18,
    fontFamily: 'Roboto-Italic',
  },
  desBox: {
    // backgroundColor: 'rgb(222, 217, 217)',//#999DA0
    width: '90%',
    borderRadius: 5,
    //paddingBottom:"15%",
    alignSelf: 'center',
  },
  inputTxt: {
    width: '90%',
    height: '50%',
    borderRadius: 10,
    alignSelf: 'center',
    backgroundColor: 'rgb(222, 217, 217)',
  },
  DayTxt:{
    color:"black",fontSize:18,fontFamily:"Roboto-Italic"
  },
  allDay:{
    flexDirection: 'row', justifyContent: 'space-between'
  },
  submittionTxt:{
    flexDirection: 'row', justifyContent: 'space-between'
  },
  currentDate:{
    color: 'black',
    fontSize: 18,
    fontFamily: 'Roboto-Italic',
  },
  thisMontsData:{
    flexDirection: 'row', justifyContent: 'space-between',marginTop:10
  },
  thisMonthTxt:{
    color:"black",fontSize:18,fontFamily:"Roboto-Italic"
  },
  eventTxt:{
    color: 'black',fontSize: 20,fontFamily: 'Roboto-Italic',marginLeft: 10,
  },
  currentBox:{
    flexDirection:"row",justifyContent:"space-around",marginTop:20,marginBottom:10
  }
 
});
