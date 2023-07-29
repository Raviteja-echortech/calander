import {View, Text, TouchableOpacity,StyleSheet,ScrollView} from 'react-native';
import React, {useState} from 'react';
import {routes} from './../routes/routes';
import {monthsNames} from './PublicHolidays';


const FullyearCalender = props => {
  const SelectingMonth = el => {
   props?.navigation?.navigate(routes.calender,{el})
  };
  const toDaydate=new Date().toDateString().slice(4,7)
  return (
    <View>
      <Text
        style={styles.CalenderHeader}>
        Calender
      </Text>
      <ScrollView contentContainerStyle={styles.MonthDisplayBoard}>
        {monthsNames.map((el, i) => {
          return (
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => SelectingMonth(el)}
              key={i}
              style={styles.MonthBtn}>
              <Text style={{fontSize: 17, color: 'blue'}}>{el.monthName}</Text>
             {toDaydate===el.monthName?<Text style={styles.Ground}>{new Date().toDateString()}</Text>:null} 
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};
export default FullyearCalender;
const styles = StyleSheet.create({
  MonthBtn: {
    width: '26%',
    height: '20%',
    marginLeft: 20,
    marginBottom: 20,
    justifyContent:"center",
    alignItems:"center",
    alignContent:"center",
    borderWidth:0.5,
    borderColor:"grey",
    backgroundColor: 'white',
    borderRadius: 10,
  },
  MonthDisplayBoard:{
    height: '100%',
    width: '100%',
    backgroundColor: 'white',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent:"center",
    alignItems:"center",
  },
  CalenderHeader:{
    fontSize: 25,
    fontFamily: 'Roboto-Bold',
    textAlign: 'center',
    color: 'black',
    backgroundColor:"white",
  },
  Ground:{
    color:"#454B1B",fontSize:15,fontFamily:"Roboto-Bold",marginLeft:5
  }
});
