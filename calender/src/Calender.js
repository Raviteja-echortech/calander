import React, {useState} from 'react';
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
import Weeks from "../assets/svg/Weeks.svg";
import Vector  from "../assets/svg/Vector.svg";
import Events from "../assets/svg/Events.svg"
import Days from "../assets/svg/Days.svg";
import { Publicholidays } from './PublicHolidays';
import { routes } from '../routes/routes';
const Calender = props => {
  const[isCollapsed,setIsCollapsed]=useState(true)
  const[Check,setCheck]=useState( new Date().getDate())
  const[getBack,setGetBack]=useState(0)
  const  Num=props?.route?.params?.el?.incrementNum
  const date = new Date();
  const month = Num? date.getMonth()+Num: date.getMonth(); //add  here
  const day = date.getDate();
  const year = date.getFullYear();//add here for year change
  const firstDayOfMonth = new Date(year, month, 1);
  const weeks = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const months = { 0: 'Jan', 1: 'Feb', 2: 'Mar', 3: 'Apr', 4: 'May', 5: 'Jun', 6: 'Jul', 7: 'Aug', 8: 'Sep', 9: 'Oct', 10: 'Nov', 11: 'Dec',};
  const numberDays = new Date(date.getFullYear(),Num?date.getMonth()+1+Num:date.getMonth()+1, 0,).getDate(); //add here default 1 and add 1 from there
  const box = [];
  for(let i=1;i<=numberDays;i++){
      box .push({noofDays:i,weekNum:firstDayOfMonth.getDate()})
  }
  const EmptySpace = Array(firstDayOfMonth.getDay()).fill('');
  const handleDate = (i)=> {
      setCheck(i)
  };
  EmptySpace.push(...box);
  const GoToDay=()=>{

    setCheck(day)
  }
  // console.log(new Date(date.getFullYear(),Num?date.getMonth()+1+Num:date.getMonth()+1, 0,).getDate())
  //  console.log(EmptySpace)

   {/* <Text>{new Date(year, month,1).toDateString()}</Text> */}
      {/* <Text>{date.getMonth()}</Text> */}
      {/* <TouchableOpacity onPress={()=>setNextMonth(NextMonth+1)} >
        <Text>Next Month</Text>
      </TouchableOpacity> */}
     const EventsofDay=[
      {
        vectorImage: <Vector/>,
        monthSort:"Month"
      },
      {
        vectorImage:<Weeks/>,
        monthSort:"Week"
      },
      {
        vectorImage:   <Days/>,
        monthSort:"Day"
      },
      {
        vectorImage: <Events/> ,
        monthSort:"Events"
      },
     ]

  return (
  
    < View style={styles.container}>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <TouchableOpacity
          onPress={() => props?.navigation?.navigate('FullCalender')}
          style={styles.monthYearDisplay}>
          <Text style={styles.yearsFont}>{date.getFullYear()}</Text> 
            {/* add above for the year change */}
          <Text style={styles.monthFont}>{months[month]}</Text>
        </TouchableOpacity>
        <TouchableOpacity 
        onPress={()=>setIsCollapsed(!isCollapsed)}
          style={styles.showEvents}>
         <Vector/>
        </TouchableOpacity>
      </View>
      
      {/* collapsible */}
      <Collapsible collapsed={isCollapsed}>
      <View style={styles.collabsable} >
           {EventsofDay.map((el,i)=>{
            return(
              <TouchableOpacity key={i} activeOpacity={0.7} onPress={()=> props?.navigation.navigate(routes.EventsDisplay,{sortName:el.monthSort})} >
                  {el.vectorImage}
                  <Text>{el.monthSort}</Text>
              </TouchableOpacity>
            )
           })}
     
        </View> 
      </Collapsible>
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
                    onPress={() => handleDate(el.noofDays)}
                    style={[
                      styles.requriedTxt,
                      {
                        marginLeft: 20,
                        borderWidth: el.noofDays  === "" ? 0 : Check===el.noofDays ?0.5:0,
                        backgroundColor:months[date.getMonth()] === months[month] &&day ===el.noofDays && Check===el.noofDays  ? 'blue' : 'white',}]}>
                    <Text
                      style={{
                        color:months[date.getMonth()] === months[month] &&day === el.noofDays &&Check===el.noofDays ? 'white'  :day === el.noofDays &&months[date.getMonth()] === months[month]?"blue": "black",
                        fontSize: 14,
                      }}>
                      {el.noofDays }
                    </Text>
                  </TouchableOpacity>
                </View>
              );
            })}
          </ScrollView>
        </View>
      </View>
      { months[date.getMonth()] === months[month]&&Check===day?null:
       <TouchableOpacity
       onPress={GoToDay}
       activeOpacity={0.7}
        style={styles.dateShowBox}>
        <View style={styles.innerBox} >
          <Text style={{color:"black",fontSize:16,fontFamily:"Roboto-Bold"}} >{day}</Text>
        </View>
      </TouchableOpacity>}
      < View  style={{flexDirection:"row",marginLeft:20,width:"100%",marginTop:30,}} >
        {/* list Events here */}
        {  Publicholidays.map((el,i)=>{
          return(
            < View key={i}  >
              <View  >{months[month]===el.eventMonth?el.events.map((el,i)=>{
                return(
                  <View key={i} style={styles.eventCards}   >
                    <Text >{el.date==0?"No events Inthis month":el.date}{"-------->"}{el.des}</Text>
                  </View>    
                )
              }):<Text>{""}</Text>}</View>
            </View>
          )
        })}
      </View>
    </View>
  );
};
export default Calender;
const styles = StyleSheet.create({
  container: {
   flexGrow:1,
    width:"100%",
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
    borderColor:"grey",
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
  },
  collabsable:{
    flexDirection:"row",justifyContent:"space-evenly"
  },
  showEvents:{
    marginRight: 30,
    marginTop: 10,
    padding: 10,
  },
  eventCards:{
    width:Dimensions.get("window").width*0.9,
    borderWidth:0.5,
    borderColor:"red"
  }
});
