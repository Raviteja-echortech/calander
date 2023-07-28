import {View, Text, TouchableOpacity,StyleSheet} from 'react-native';
import React, {useState} from 'react';
import {routes} from './../routes/routes';
import {monthsNames} from './PublicHolidays';

const FullyearCalender = props => {
  const SelectingMonth = el => {
   props?.navigation?.navigate(routes.calender,{el})
  };
  return (
    <View>
      <Text
        style={styles.CalenderHeader}>
        Calender
      </Text>
      <View
        style={styles.MonthDisplayBoard}>
        {monthsNames.map((el, i) => {
          return (
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => SelectingMonth(el)}
              key={i}
              style={styles.MonthBtn}>
              <Text style={{fontSize: 17, color: 'blue'}}>{el.monthName}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};
export default FullyearCalender;
const styles = StyleSheet.create({
  MonthBtn: {
    width: '30%',
    height: '5%',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 20,
    marginBottom: 20,
    backgroundColor: 'pink',
    borderRadius: 20,
  },
  MonthDisplayBoard:{
    height: '100%',
    width: '100%',
    backgroundColor: 'white',
    justifyContent: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignContent: 'center',
  },
  CalenderHeader:{
    fontSize: 25,
    fontFamily: 'Roboto-Bold',
    textAlign: 'center',
    color: 'black',
    backgroundColor:"white",
  }
});
