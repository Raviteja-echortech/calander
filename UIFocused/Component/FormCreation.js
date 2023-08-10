import {View,Text, TextInput,StyleSheet, TouchableOpacity} from "react-native"
//import Plus from "../assets/svg/Plus.svg"
import React, { useState } from "react"
const FormCreation=()=>{
  //  const[form,setForm]=useState([{ title:"raviteja",option:[{note:"rahul"}] }])

    return(
        <View>
           <View>
            {
                form.map((el,i)=>{
              return (
                <View key={i}>
                    <Text>{el.title}</Text>
                    {
                        el.option.map((el,index)=>{
                            return(
                                <View key={index} > 
                                    <Text>{el.note}</Text>
                                </View>
                            )
                        })
                    }
                </View>
              )
                })
            }

           </View>
          
        </View>
    )
}
export default FormCreation
const styles=StyleSheet.create({

})