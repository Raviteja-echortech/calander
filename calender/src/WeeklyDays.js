import React,{useState} from 'react';
import {View, Text, StyleSheet,TouchableOpacity} from 'react-native';
import { Publicholidays, months } from './PublicHolidays';


function Dates({year, month, check}) {
  const weeks = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
 const [eventChange,setEvent]=useState(check)
  const getWeekDates = current => {
    const weekBox = [];
    current.setDate(current.getDate() - current.getDay());
    for (let k = 0; k < 7; k++) {
      weekBox.push(new Date(current));
      current.setDate(current.getDate() + 1);
    }
    return weekBox;
  };

  const currentDate = new Date(year, month, check);
  const weekDates = getWeekDates(new Date(currentDate));
 for(let i=0;i<weekDates.length;i++){
    weekDates[i].getDate()
  }
  console.log(eventChange)
  return (
    <View>
      <View style={styles.weekDays}>
        {weeks.map((el, i) => {
          return (
            <View key={i}>
              <Text style={styles.weeksArr}>{el}</Text>
            </View>
          );
        })}
      </View>
      <View style={styles.container}>
        {weekDates.map((date, index) => (
          <TouchableOpacity
            key={index}
            onPress={()=>setEvent(date.getDate())}
            style={[
              styles.weeks,
              {backgroundColor: eventChange === date.getDate() ? '#F6C700' : 'white'},
            ]}>
            <Text style={styles.TxtArr}>{date.getDate()}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <View>
      {Publicholidays.map((el, i) => {
            return (
              <View key={i} style={{marginTop: 5}}>
                {months[month] === el.eventMonth
                  ? el.events.map((el, i) => {
                      return (
                        <View key={i} style={styles.eventCards}>
                          <Text style={styles.eventText}>
                       {el.date=== eventChange ?el.des:el.date!==check?"NoEvents on This Day":""}
                          </Text>
                        </View>
                      );
                    })
                  : null}
              </View>
            );
          })}
      </View>
    </View>
  );
}

export default Dates;
const styles = StyleSheet.create({
  weeks: {
    width: 40,
    height: 40,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  TxtArr: {
    color: 'black',
    fontFamily: 'Roboto-Bold',
  },
  weekDays: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginBottom: 20,
  },
  weeksArr: {
    color: 'black',
    fontFamily: 'Roboto-Bold',
    fontSize: 16,
  },
  eventText:{
    color:"black",
    fontFamily:"Roboto-Italic",
    fontSize:17,
    marginLeft:20
  }
});
