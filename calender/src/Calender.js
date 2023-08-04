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
import WeeksSelected from '../assets/svg/WeeksSelected.svg';
import EventsSelected from '../assets/svg/EventsSelected.svg';
import {Publicholidays, months} from './PublicHolidays';
import {eventsArrange, routes} from '../routes/routes';
import Plus from '../assets/svg/Plus.svg';
import Dates from './WeeklyDays';
// import AsyncStorage from '@react-native-async-storage/async-storage';

const Calender = props => {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [Check, setCheck] = useState(new Date().getDate());
  const [select, setSelected] = useState('Month');
  const [weekly, setWeekly] = useState();
  const Num = props?.route?.params?.el?.incrementNum;
  const date = new Date();
  const month = Num ? date.getMonth() + Num : date.getMonth(); //add  here
  const day = date.getDate();
  const year = date.getFullYear(); //add here for year change
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
    //StoreData()
  }, []);
  emptySpace.push(...box);

  const GoToDay = () => {
    setCheck(day);
    setSelected('Month');
  };
  const eventFun = el => {
    setSelected(el);
    setIsCollapsed(!isCollapsed)
  };
  const movetoEvents = () => {
    props.navigation.navigate(routes.CreateEvents, {
      datenow: Check,
      monthNum: month,
    });
  };

  const eventsofDay = [
    {
      vectorImage: <Months />,
      selected: <MonthsSelected />,
      monthSort: 'Month',
    },
    {
      vectorImage: <Weeks />,
      selected: <WeeksSelected />,
      monthSort: 'Week',
    },
    {
      vectorImage: <Days />,
      selected: <DaysSelected />,
      monthSort: 'Day',
    },
    {
      vectorImage: <Events />,
      selected: <EventsSelected />,
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
                                  ? 'blue'
                                  : 'white',
                            },
                          ]}>
                          <Text
                            style={{
                              fontFamily: 'Roboto-Bold',
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
                              fontSize: 14,
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
              <View key={i} style={{marginTop: 5}}>
                {months[month] === el.eventMonth
                  ? el.events.map((el, i) => {
                      return (
                        <View key={i} style={styles.eventCards}>
                          <Text style={styles.eventText}>
                            {el.date == Check ? el.des : "No events in this On this Day"}
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
        <View style={styles.Weeks}>
          {Publicholidays.map((el, i) => {
            return (
              <View key={i} style={{marginTop: 5}}>
                {months[month] === el.eventMonth
                  ? el.events.map((el, i) => {
                      return (
                        <View key={i} style={styles.eventCards}>
                          <Text style={styles.eventText}>
                            {el.date == 0 ? 'No events Inthis month' : el.date}{' '}
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
    width: '90%',
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
    width: 25,
    height: 25,
    borderRadius: 12,
    justifyContent: 'center',
    borderColor: 'grey',
    marginTop: 25,
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
    justifyContent: 'space-evenly',
  },
  showEvents: {
    marginRight: 30,
    marginTop: 10,
    padding: 10,
  },
  eventCards: {
    width: Dimensions.get('window').width * 0.9,
    marginLeft: 10,
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
    fontFamily: 'Roboto-Bold',
    color: 'black',
  },
});
