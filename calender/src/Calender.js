import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import Collapsible from 'react-native-collapsible';
import Weeks from '../assets/svg/Weeks.svg';
import Events from '../assets/svg/Events.svg';
import Days from '../assets/svg/Days.svg';
import Options from '../assets/svg/Options.svg';
import Months from '../assets/svg/Months.svg';
import MonthsSelected from '../assets/svg/MonthsSelected.svg';
import DaysSelected from '../assets/svg/DaysSelected.svg';
import AsyncStorage from '@react-native-async-storage/async-storage';
import WeeksSelected from '../assets/svg/WeeksSelected.svg';
import EventsSelected from '../assets/svg/EventsSelected.svg';
import {Publicholidays, months} from './PublicHolidays';
import {eventsArrange, routes} from '../routes/routes';
import Plus from '../assets/svg/Plus.svg';
import Dates from './WeeklyDays';
import {useIsFocused} from '@react-navigation/native';
// import AsyncStorage from '@react-native-async-storage/async-storage';

const Calender = props => {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [Check, setCheck] = useState(new Date().getDate());
  const [select, setSelected] = useState('Month');
  const [Data, setData] = useState([]);
  const [weekly, setWeekly] = useState();
  const Num = props?.route?.params?.el?.incrementNum;
  const date = new Date();
  const month = Num ? date.getMonth() + Num : date.getMonth(); //add  here
  const day = date.getDate();
  const year = date.getFullYear(); //add here for year change
  const isFocused = useIsFocused();
  const firstDayOfMonth = new Date(year, month, 1);
  const weeks = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const numberDays = new Date(
    date.getFullYear(),
    Num ? date.getMonth() + 1 + Num : date.getMonth() + 1,
    0,
  ).getDate(); //add here default 1 and add 1 from there
  const box = [];
  for (let i = 1; i <= numberDays; i++) {
    box.push({noofDays: i, weekNum: new Date(year, month, i).getDay()});
  }
  const emptySpace = Array(firstDayOfMonth.getDay()).fill('');

  const handleDate = i => {
    setCheck(i.noofDays);
  };

  useEffect(() => {
    const getData = async () => {
      let res = await AsyncStorage.getItem('eventOfDay');
      res = JSON.parse(res);
      setData(res);
    };
    getData();
  }, [isFocused]);
  //console.log(Data);
  emptySpace.push(...box);

  const GoToDay = () => {
    setCheck(day);
    setSelected('Month');
  };
  const eventFun = el => {
    setSelected(el);
    setIsCollapsed(!isCollapsed);
  };
  const movetoEvents = () => {
    props.navigation.navigate(routes.CreateEvents, {
      datenow: Check,
      monthNum: month,
    });
  };

  const eventsofDay = [
    {
      vectorImage: <Months marginLeft={10} />,
      selected: <MonthsSelected marginLeft={10} />,
      monthSort: 'Month',
    },
    {
      vectorImage: <Weeks marginLeft={10} />,
      selected: <WeeksSelected marginLeft={10} />,
      monthSort: 'Week',
    },
    {
      vectorImage: <Days />,
      selected: <DaysSelected />,
      monthSort: 'Day',
    },
    {
      vectorImage: <Events marginLeft={10} />,
      selected: <EventsSelected marginLeft={10} />,
      monthSort: 'Events',
    },
  ];

  return (
    <View style={styles.mainConatiner}>
      <View style={styles.collabsableContainer}>
        <TouchableOpacity
          onPress={() => props?.navigation?.navigate('FullCalender')}
          style={styles.monthYearDisplay}>
          <Text style={styles.yearsFont}>{date.getFullYear()}</Text>
          {/* add above for the year change */}
          <Text style={styles.monthFont}>{months[month]}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setIsCollapsed(!isCollapsed)}
          style={styles.showEvents}>
          <Options />
        </TouchableOpacity>
      </View>
      {/* collapsible */}
      <Collapsible collapsed={isCollapsed}>
        <View style={styles.collabsable}>
          {eventsofDay.map((el, i) => {
            return (
              <TouchableOpacity
                key={i}
                activeOpacity={0.7}
                onPress={() => eventFun(el.monthSort)}>
                {el.monthSort == select ? el.selected : el.vectorImage}
                <Text style={styles.monthName}>{el.monthSort}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </Collapsible>
      <ScrollView contentContainerStyle={styles.container}>
        {select === eventsArrange.Month ? (
          <View style={styles.MonthNam}>
            <View style={styles.calenderMonthly}>
              <View style={styles.datesBox}>
                <View style={styles.DatesArr}>
                  <View style={styles.weeksArr}>
                    {weeks.map((el, index) => {
                      return (
                        <View key={index}>
                          <Text style={styles.TxtStyles}>{el}</Text>
                        </View>
                      );
                    })}
                  </View>
                  {emptySpace.map((el, i) => {
                    return (
                      <View key={i}>
                        <TouchableOpacity
                          activeOpacity={0.7}
                          onPress={() => handleDate(el)}
                          style={[
                            styles.requriedTxt,
                            {
                              marginLeft: 20,
                              borderWidth:
                                el.noofDays === ''
                                  ? 0
                                  : Check === el.noofDays
                                  ? 0.5
                                  : 0,
                              backgroundColor:
                                months[date.getMonth()] === months[month] &&
                                day === el.noofDays &&
                                Check === el.noofDays
                                  ? '#5987f2'
                                  : 'white',
                            },
                          ]}>
                          <Text
                            style={{
                              fontFamily: 'Roboto-Regular',
                              color:
                                months[date.getMonth()] === months[month] &&
                                day === el.noofDays &&
                                Check === el.noofDays
                                  ? 'white'
                                  : day === el.noofDays &&
                                    months[date.getMonth()] === months[month]
                                  ? 'blue'
                                  : el.weekNum == 0 || el.weekNum == 6
                                  ? 'red'
                                  : 'black',
                              fontSize: 16,
                            }}>
                            {el.noofDays}
                          </Text>
                        </TouchableOpacity>
                      </View>
                    );
                  })}
                </View>
              </View>
            </View>
            {/* days condition */}
          </View>
        ) : null}
      </ScrollView>
      {select === eventsArrange.Week ? (
        <View style={styles.Weeks}>
          <Dates year={year} month={month} check={Check} />
        </View>
      ) : select === eventsArrange.Day ? (
        <View style={styles.Weeks}>
          <View style={styles.singleDay}>
            <Text style={styles.dayTxt}>{Check}</Text>
          </View>
          {Publicholidays.map((el, i) => {
            return (
              <View key={i} style={{marginTop: 10}}>
                {months[month] === el.eventMonth
                  ? el.events.map((el, i) => {
                      return (
                        <View key={i} style={styles.eventCards}>
                          <Text style={styles.eventText}>
                            {el.date === Check
                              ? el.date
                              : el.date !== Check
                              ? ''
                              : ''}
                            {el.date === Check
                              ? '------->'
                              : el.date !== Check
                              ? ''
                              : ''}
                            {el.date === Check
                              ? el.des
                              : el.date !== Check
                              ? ''
                              : 'No events in this On this Day'}
                          </Text>
                        </View>
                      );
                    })
                  : null}
              </View>
            );
          })}
        </View>
      ) : select === eventsArrange.Events ? (
        <View style={styles.eventsRequried}>
          <View style={styles.eventarr}>
            {/* publicholidays */}
            <Text style={styles.headingTxt}>Publicholidays</Text>
            {Publicholidays.map((el, i) => {
              return (
                <View key={i} style={{marginLeft: 20}}>
                  {months[month] === el.eventMonth
                    ? el.events.map((el, i) => {
                        return (
                          <View key={i} style={styles.eventCards1}>
                            <Text style={styles.eventText}>
                              {el.date == 0
                                ? 'No events Inthis month'
                                : el.date}
                              {'-------->'} {el.des}
                            </Text>
                          </View>
                        );
                      })
                    : null}
                </View>
              );
            })}
          </View>
          <Text style={styles.headingTxt}>User Events</Text>
          <ScrollView contentContainerStyle={styles.userEvents} >
            <View >
              {/* user Events */}
              {Data?.map((el, i) => {
                return (
                  <View key={i}>
                    {months[el.month] === months[month] ? (
                      <View style={{margin:20}} >
                        <View style={{flexDirection: 'row'}}>
                          <Text>{el.date}</Text>
                          <Text style={{marginLeft: 20}}>{el.event}</Text>
                        </View>
                        <Text>{months[el.month]}</Text>
                        <Text>{el.description}</Text>
                      </View>
                    ) : null}
                  </View>
                );
              })}
            </View>
          </ScrollView>
        </View>
      ) : null}
      <View style={{flexDirection: 'row'}}>
        {months[date.getMonth()] === months[month] && Check === day ? null : (
          <TouchableOpacity
            onPress={GoToDay}
            activeOpacity={0.7}
            style={styles.dateShowBox}>
            <Text style={styles.dayTxt}>{day}</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.plusSymbol}
          onPress={movetoEvents}>
          <Plus />
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default Calender;
const styles = StyleSheet.create({
  collabsableContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  mainConatiner: {
    width: '100%',
    backgroundColor: 'white',
    height: '100%',
  },
  container: {
    height: '75%',
    width: '100%',
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
    height: '75%',
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
    marginTop: '20%',
    backgroundColor: 'white',
    borderRadius: 10,
    width: '98%',
    height: '75%',
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
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    borderColor: 'grey',
    marginTop: 30,
    alignItems: 'center',
  },

  weeksArr: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 5,
    width: '100%',
  },
  DatesArr: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  dateShowBox: {
    borderRadius: 10,
    right: 100,
    bottom: 20,
    position: 'absolute',
    height: 50,
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
    backgroundColor: '#5987f2',
  },
  collabsable: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  showEvents: {
    marginRight: 30,
    marginTop: 10,
    padding: 10,
  },
  eventCards: {
    width: Dimensions.get('window').width * 0.9,
    //height:Dimensions.get('window').height*0.7,
    marginLeft: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  eventCards1: {
    width: Dimensions.get('window').width * 0.9,
  },
  plusSymbol: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
    elevation: 5,
    position: 'absolute',
    bottom: 20,
    right: 20,
    height: 50,
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
    backgroundColor: 'white',
  },
  Weeks: {
    backgroundColor: 'white',
    width: '100%',
    height: '85%',
  },
  MonthNam: {
    width: '100%',
    height: '100%',
  },
  eventsBox: {
    flexDirection: 'row',
    marginLeft: 20,
    width: '100%',
    marginTop: 30,
  },
  eventText: {
    color: 'black',
    marginTop: 20,
    fontFamily: 'Roboto-Bold',
    fontSize: 16,
  },

  singleDay: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
    backgroundColor: '#5987f2',
    marginLeft: 15,
  },
  dayTxt: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'Roboto-Bold',
  },
  monthName: {
    fontFamily: 'Roboto-Italic',
    color: 'black',
    alignSelf: 'center',
  },
  eventsRequried: {
    backgroundColor: 'white',
    width: '100%',
    height: '85%',
  },
  eventarr: {
    height: '40%',
    width: '99%',
    backgroundColor: 'white',
    borderWidth:0.5,
   borderColor:"#ffef00",
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    alignSelf: 'center',
    borderRadius: 10,
  },
  headingTxt: {
    fontSize: 20,
    color: 'black',
    marginLeft: 20,
    marginTop: 10,
  },

  userEvents: {
    height: '95%',
    width: '98%',
   alignSelf:"center",
   borderWidth:0.5,
   borderColor:"#ffef00",
   borderRadius:10,
    backgroundColor:"white",
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.17,
    shadowRadius: 2.84,
    elevation: 4,
    
  },
});
