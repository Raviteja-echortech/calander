import {View,Text,TouchableOpacity}  from "react-native"
import React, { useState } from "react"


 
const monthsNames=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]
const FullyearCalender=(props)=>{
    
    return(
        <View style={{height:"100%",width:"100%",backgroundColor:"white",justifyContent:"center",flexDirection:"row",flexWrap:'wrap',alignContent:"center"}} >
          {monthsNames.map((el,i)=>{
            return(
                <TouchableOpacity activeOpacity={0.7} key={i} style={{borderWidth:1,borderColor:"red",width:"30%",height:"5%",justifyContent:"center",alignItems:"center",marginLeft:20,marginBottom:20}} >
                   <Text  style={{fontSize:17,color:"blue"}}>{el}</Text>
                </TouchableOpacity>
            )
          })}
        </View>
    )
}
export default FullyearCalender
