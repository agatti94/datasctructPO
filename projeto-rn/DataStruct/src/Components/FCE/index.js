import React, {useEffect, useState} from 'react'
import { View, Text, TextInput, TouchableOpacity, Animated } from 'react-native'

import LL from "./estatica"
import styles from "./styles"

export default function FCE() {
    const [value, setvalue] = useState(null)
    const [array, setarray] = useState([])
    const [size, setsize] = useState(0)
    const [del, setdel] = useState(false)
    const [indexOfSearch, setindexOfSearch] = useState(null)
    const [indexOfDelete, setindexOfDelete] = useState(null)
    const [color, setcolor] = useState(new Animated.Value(0))
    const [colorDel, setcolorDel] = useState(new Animated.Value(0))
    const [opacity, setopacity] = useState(new Animated.Value(0))
    
    function insert(value){
        array.push(value)
        setarray(array)
        setsize(size+1)
    }

    function remove(value){
        animateSearch(0)
        setdel(true)
        array.forEach((element, index)=>{
            if(element === value){
                animateDelete(1,0)
                setindexOfDelete(index)
                setTimeout(() => {
                    setdel(false)
                    setindexOfDelete(null)
                    animateDelete(0,1)
                    array.splice(index, 1)
                    setsize(size+1)
                }, 1300);
            }
        })
    }

    const animateDelete = (x, y) => {
        Animated.sequence([
            Animated.timing(colorDel, {
                toValue: x,
                duration: x === 1 ? 1000 : 0,
                useNativeDriver: false
            }),
            Animated.timing(opacity, {
                toValue: y,
                duration: y === 1 ? 0: 300,
                useNativeDriver: false
            })
        ]).start()
    }

    const animateSearch = x => {
        Animated.timing(color, {
            toValue: x,
            duration: x === 1 ? 1000 : 0,
            useNativeDriver: false
        }).start()
    }

    const searching = color.interpolate({
        inputRange: [0,1],
        outputRange: ["purple", "orange"]
    })

    const deleting =  colorDel.interpolate({
        inputRange: [0, 1],
        outputRange:["purple" , "red"]
    })

    function search(value){
        animateDelete(0 ,1)
        array.forEach((item, index)=>{
            if(item === value){
                setindexOfSearch(index)
                animateSearch(1)
            }
        })
    }

    return (
        <View style={styles.container}>
            <View style={styles.lista}>
                {array.map((item, index)=>{
                    if(indexOfSearch === index && indexOfSearch != null){
                        return(
                            <View key={index} style={styles.itemComposition}>
                            <Animated.View key={index} style={[styles.item, {backgroundColor: searching,}]}>
                                <Text style={styles.text}>
                                    {item}
                                </Text>
                            </Animated.View>
                            <Text>
                                i:{index}, 
                            </Text>
                        </View>
                        )
                    }else if(del && index === indexOfDelete){
                        return(
                            <View key={index} style={styles.itemComposition}>
                                <Animated.View key={index} style={[styles.item, {backgroundColor: deleting, opacity: opacity}]}>
                                    <Text style={styles.text}>
                                        {item}
                                    </Text>
                                </Animated.View>
                                <Text>
                                    i:{index}, 
                                </Text>
                            </View>
                        )
                    }else{
                        return(
                            <View key={index} style={styles.itemComposition}>
                                <Animated.View key={index} style={styles.item}>
                                    <Text style={styles.text}>
                                        {item}
                                    </Text>
                                </Animated.View>
                                <Text>
                                    i:{index}, 
                                </Text>
                            </View>
                        )
                    }
                })}
            </View>
            <View style={styles.menu}>
                <View style={styles.insert}>
                    <TextInput style={styles.input} value={value} onChangeText={text=>{setvalue(text)}} placeholder={"value"} />
                    <TouchableOpacity onPress={()=>{insert(value)}} style={styles.button}>
                        <Text style={{color: "white", fontSize: 18}}>
                            Insert
                        </Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity onPress={()=>{search(value)}} style={styles.buttons}>
                    <Text style={{color: "white", fontSize: 18}}>
                        Search by value
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>{remove(value)}} style={styles.buttons}>
                    <Text style={{color: "white", fontSize: 18}}>
                        Remove by index
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttons}>
                    <Text style={{color: "white", fontSize: 18}}>
                        Get size
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}
