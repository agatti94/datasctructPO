import React, {useState} from "react"
import {View, Text, TouchableOpacity} from "react-native"

import styles from "./styles.js"

export default function Menu({navigation}){
    const [button, setButton] = useState(0)
    return(
        <View style={styles.menu}>
            <TouchableOpacity style={button === 0 ? styles.selectedTab : styles.button} onPress={()=>{setButton(0); navigation.navigate("FDE")}}>
                <Text style={button === 0 ? styles.clickedButton : styles.text }>LDE</Text>
            </TouchableOpacity>
            <TouchableOpacity style={button === 1 ? styles.selectedTab : styles.button} onPress={()=>{setButton(1); navigation.navigate("HEAP")}}>
                <Text style={button === 1 ? styles.clickedButton : styles.text }>LL</Text>
            </TouchableOpacity>
            <TouchableOpacity style={button === 2 ? styles.selectedTab : styles.button} onPress={()=>{setButton(2); navigation.navigate("HASH")}}>
                <Text style={button === 2 ? styles.clickedButton : styles.text }>HASH</Text>
            </TouchableOpacity>
        </View>
    )
}