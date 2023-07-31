import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Pressable,
  Dimensions,
} from 'react-native';
import Collapsible from 'react-native-collapsible';
import Weeks from '../assets/svg/Weeks.svg';
import Events from '../assets/svg/Events.svg';
import Days from '../assets/svg/Days.svg';
import Options from '../assets/svg/Options.svg';
import Months from '../assets/svg/Months.svg';
import MonthsSelected from "../assets/svg/MonthsSelected.svg"
import DaysSelected from "../assets/svg/DaysSelected.svg";
import WeeksSelected from "../assets/svg/WeeksSelected.svg"
import EventsSelected from "../assets/svg/EventsSelected.svg"
import {Publicholidays} from './PublicHolidays';
import { eventsArrange, routes } from '../routes/routes';
import Plus  from "../assets/svg/Plus.svg"
import { useIsFocused } from '@react-navigation/native';
const Calender = props => {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [Check, setCheck] = useState(new Date().getDate());
  const[select,setSelected]=useState("Month")
  const Num = props?.route?.params?.el?.incrementNum;
  const date = new Date();
  const isFocused=useIsFocused()
  const month = Num ? date.getMonth() + Num : date.getMonth(); //add  here
  const day = date.getDate();
  const year = date.getFullYear(); //add here for year change
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
  const numberDays = new Date(
    date.getFullYear(),
    Num ? date.getMonth() + 1 + Num : date.getMonth() + 1,
    0,
  ).getDate(); //add here default 1 and add 1 from there
  const box = [];
  for (let i = 1; i <= numberDays; i++) {
    box.push({noofDays: i, weekNum:new Date(year, month, i).getDay()});
  }
  const emptySpace = Array(firstDayOfMonth.getDay()).fill('');
  const handleDate = i => {
    setCheck(i);
  };
  emptySpace.push(...box);
  const GoToDay = () => {
    setCheck(day);
    setSelected("Month")
  };
  const eventFun=(el)=>{
    setSelected(el)
   
  }
  useEffect(()=>{
    
  },[isFocused])
 //console.log(new Date(date.getFullYear(),Num?date.getMonth()+1+Num:date.getMonth()+1, 0,).getDate())
//  console.log(emptySpace)
    //console.log(firstDayOfMonth.getDay())
  {
    /* <Text>{new Date(year, month,1).toDateString()}</Text> */
  }
  {
    /* <Text>{date.getMonth()}</Text> */
  }
  {
    /* <TouchableOpacity onPress={()=>setNextMonth(NextMonth+1)} >
        <Text>Next Month</Text>
      </TouchableOpacity> */
  }
 
  const eventsofDay = [
    {
      vectorImage: <Months />,
      selected:<MonthsSelected/>,
      monthSort: 'Month',
    },
    {
      vectorImage: <Weeks />,
      selected:<WeeksSelected />,
      monthSort: 'Week',
    },
    {
      vectorImage: <Days />,
      selected:<DaysSelected/>,
      monthSort: 'Day',
    },
    {
      vectorImage: <Events />,
      selected:<EventsSelected/>,
      monthSort: 'Events',
    },
  ];

  return (
    <View>
   <ScrollView contentContainerStyle={styles.container}>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
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
                onPress={() =>eventFun(el.monthSort)}>
                {el.monthSort==select?el. selected:el.vectorImage}
                <Text>{el.monthSort}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </Collapsible>
      {select===eventsArrange.Month? < ScrollView  contentContainerStyle={styles.MonthNam} >
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
            {emptySpace.map((el, i) => {
              return (
                <View key={i}>
                  <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() => handleDate(el.noofDays)}
                    style={[
                      styles.requriedTxt,
                      {
                        marginLeft: 20,
                        borderWidth:
                          el.noofDays === ''? 0  : Check === el.noofDays? 0.5: 0,
                        backgroundColor: months[date.getMonth()] === months[month] &&day === el.noofDays &&Check === el.noofDays ? 'blue': 'white',}
                    ]}>
                    <Text
                      style={{
                        fontFamily:"Roboto-Bold",
                        color:
                          months[date.getMonth()] === months[month] &&
                          day === el.noofDays &&
                          Check === el.noofDays? 'white': day === el.noofDays &&months[date.getMonth()] === months[month]? 'blue':el.weekNum==0||el.weekNum==6?"red":'black', fontSize: 14,
                      }}>
                      {el.noofDays}
                    </Text>
                  </TouchableOpacity>
                </View>
              );
            })}
          </ScrollView>
        </View>
      </View>
      {/* days condition */}
      <View
        style={styles.eventsBox}>
        {/* list Events here */}
        {Publicholidays.map((el, i) => {
          return (
            <ScrollView key={i}>
                {months[month] === el.eventMonth ? (
                  el.events.map((el, i) => {
                    return (
                      <View key={i} style={styles.eventCards}>
                        <Text style={{color:"black",fontFamily:"Roboto-Bold",fontSize:16}} >
                          {el.date == 0 ? 'No events Inthis month' : el.date}{' '}
                          {'-------->'} {el.des}
                        </Text>
                      </View>
                    );
                  })
                ) : (
                  <Text>{''}</Text>
                )}
            </ScrollView>
          );
        })}
      </View>
      </ScrollView>:null}
    </ScrollView>
    {select===eventsArrange.Week? <View style={styles.Weeks}>
      {/* <Text>raviteja</Text>
      <Text>raviteja</Text>
      <Text>raviteja</Text>
      <Text>raviteja</Text> */}

    </View>:select===eventsArrange.Day?<View style={styles.Weeks}  >
     <Text>Days</Text>
    </View>:select===eventsArrange.Events?<View style={styles.Weeks} >
       <Text>Events</Text>
    </View>:null
    }
    <View style={{flexDirection:"row"}} >
    {months[date.getMonth()] === months[month] && Check === day ? null : (
        <TouchableOpacity
          onPress={GoToDay}
          activeOpacity={0.7}
          style={styles.dateShowBox}>
            <Text
              style={{color: 'white', fontSize: 16, fontFamily: 'Roboto-Bold'}}>
              {day}
            </Text>
        </TouchableOpacity>
      )}
    <TouchableOpacity activeOpacity={0.7} style={styles.plusSymbol} onPress={()=>props?.navigation?.navigate(routes.CreateEvents)} >
       <Plus/>
    </TouchableOpacity>
    </View>
    </View>
  );
};
export default Calender;
const styles = StyleSheet.create({
  container: {
     flexGrow:1,
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
    height: '60%',
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
  dateShowBox: {
    borderRadius: 10,
    right:100,
    bottom:0,
   position:"absolute",
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
  },
plusSymbol:{
    shadowColor: "#000",
shadowOffset: {
	width: 0,
	height: 2,
},
shadowOpacity: 0.25,
shadowRadius: 3.84,

elevation: 5,
position:"absolute", 
bottom:0,
right:20,
height:50,
width:50,
justifyContent:"center",
alignItems:"center",
borderRadius:25,
backgroundColor:"white",
  },
  Weeks:{
    backgroundColor:"white",
    width:"100%",
    height:"85%"
  },
  MonthNam:{
    flexGrow:1, 
    width: '100%',
    height:"100%"

  },
  eventsBox:{
    flexDirection: 'row',
    marginLeft: 20,
    width: '100%',
    marginTop: 30,
  }

});
