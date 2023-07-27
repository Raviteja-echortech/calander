import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

const date = new Date();
const month = date.getMonth() + 1; //add  here
const day = date.getDate();
const year = date.getFullYear();//add here for year change
const firstDayOfMonth = new Date(year, month, 1);
const weeks = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const months = {
  0: 'Jan',
  1: 'Feb',
  2: 'Mar',
  3: 'Apr',
  4: 'May',
  5: 'Jun',
  6: 'Jul',
  7: 'Aug',
  8: 'Sep',
  9: 'Oct',
  10: 'Nov',
  11: 'Dec',
};
const numberDays = new Date(date.getFullYear(),date.getMonth() + 2, 0,).getDate(); //add here default 1 and add 1 from there
const Calender = props => {
  const box = [];
  const filledBox = Array(numberDays)
    .fill('')
    .map((_, i) => box.push(i));
  const EmptySpace = Array(firstDayOfMonth.getDay()).fill('');
  const handleDate = i => {
    console.log(i);
  };
  EmptySpace.push(...filledBox);

  return (
    <View style={styles.container}>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <TouchableOpacity
          onPress={() => props?.navigation?.navigate('FullCalender')}
          style={styles.monthYearDisplay}>
          <Text style={styles.yearsFont}>{year}</Text>
          <Text style={styles.monthFont}>{months[month]}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            marginRight: 30,
            marginTop: 10,
            backgroundColor: 'red',
            padding: 10,
          }}>
          <Text style={{color: 'white'}}>Raviteja</Text>
        </TouchableOpacity>
      </View>
      {/* <Text>{new Date(year, month,1).toDateString()}</Text> */}
      {/* <Text>{date.getMonth()}</Text> */}
      <View style={styles.calenderMonthly}>
        <View style={styles.datesBox}>
          <ScrollView
            contentContainerStyle={styles.DatesArr}
            showsVerticalScrollIndicator={false}>
            <View style={styles.weeksArr}>
              {weeks.map((el, index) => {
                return (
                  <View key={index}>
                    <Text style={styles.TxtStyles}>{el}</Text>
                  </View>
                );
              })}
            </View>
            {EmptySpace.map((el, i) => {
              return (
                <View key={i}>
                  <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() => handleDate(el)}
                    style={[
                      styles.requriedTxt,
                      {
                        marginLeft: 20,
                        borderWidth: el === '' ? 0 : 0.5,
                        backgroundColor:
                          months[date.getMonth()] === months[month] &&
                          day === el
                            ? 'blue'
                            : 'white',
                      },
                    ]}>
                    <Text
                      style={{
                        color:
                          months[date.getMonth()] === months[month] &&
                          day === el
                            ? 'white'
                            : 'black',
                        fontSize: 14,
                      }}>
                      {el}
                    </Text>
                  </TouchableOpacity>
                </View>
              );
            })}
          </ScrollView>
        </View>
      </View>
      { months[date.getMonth()] === months[month]?
       <View
        style={styles.dateShowBox}>
        <View style={styles.innerBox} >
          <Text style={{color:"black",fontSize:16,fontFamily:"Roboto-Bold"}} >{day}</Text>
        </View>
      </View>:null}
    </View>
  );
};
export default Calender;
const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
  },
  TxtStyles: {
    fontSize: 16,
    color: 'black',
    fontFamily: 'Roboto-Bold',
  },
  monthYearDisplay: {
    flexDirection: 'row',
    marginLeft: 20,
    marginTop: 10,
    backgroundColor: 'white',
  },
  yearsFont: {
    fontSize: 20,
    color: 'black',
    fontFamily: 'Roboto-Medium',
  },
  datesBox: {
    height: '85%',
    width: '95%',
    alignSelf: 'center',
    marginTop: 10,
  },
  monthFont: {
    fontSize: 18,
    fontFamily: 'Roboto-Italic',
    color: 'black',
    marginLeft: 10,
  },
  calenderMonthly: {
    borderWidth: 0.5,
    alignSelf: 'center',
    marginTop: '30%',
    backgroundColor: 'white',
    borderRadius: 10,
    width: '90%',
    height: '55%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
    borderColor: 'yellow',
  },
  requriedTxt: {
    width: 25,
    height: 25,
    borderRadius: 12,
    justifyContent: 'center',
    marginTop: 35,
    alignItems: 'center',
  },
  weeksArr: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 10,
    width: '100%',
  },
  DatesArr: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  dateShowBox:{
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 30,
    width: '90%',
    borderRadius: 10,
  },
  innerBox:{
    height:40,
    width:40,
    justifyContent:"center",
    alignItems:"center",
    borderRadius:20,
    backgroundColor:"pink"
  }
});
