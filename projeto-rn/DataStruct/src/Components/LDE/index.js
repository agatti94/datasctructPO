import React, {useState} from "react"
import {View, Text, TextInput, TouchableOpacity, Animated} from "react-native"
import LDE from "./lde"

import styles from "./styles.js"

export default function Lde(){
    
    let lde = new LDE()

    const [value, setvalue] = useState(null);
    const [array, setarray] = useState([]);
    const [size, setsize] = useState(0);
    const [indexOfSearch, setindexOfSearch] = useState(null)
    const [del, setdel] = useState(false)
    const [color, setcolor] = useState(new Animated.Value(0))
    const [opacity, setopacity] = useState(new Animated.Value(1))
    const [colorTrue, setcolorTrue] = useState(new Animated.Value(0))
    const [colorFalse, setcolorFalse] = useState(new Animated.Value(0))

    const trueColor = colorTrue.interpolate({
        inputRange:[0,1],
        outputRange:["purple", "lightgreen"]
    })

    const falseColor = colorFalse.interpolate({
        inputRange:[0,1],
        outputRange:["purple", "orange"]
    })

    const searchTrue=(x)=>{
        Animated.timing(colorTrue, {
            toValue: x,
            duration: x === 1 ? 1000 : 0,
            useNativeDriver: false
        }).start()
    }

    const searchFalse=x=>{
        Animated.timing(colorFalse, {
            toValue: x,
            duration: x === 1 ? 1000 : 0,
            useNativeDriver: false
        }).start()
    }

    const deleting =  color.interpolate({
        inputRange: [0, 1],
        outputRange:["purple" , "red"]
    })

    const animateDelete = (x, y) => {
        Animated.sequence([
            Animated.timing(color, {
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

    function insert(value){
        array.push(value)
        setarray(array)
        setsize(size+1)
    }

    function remove(value){
        searchFalse(0)
        searchTrue(0)
        setdel(true)
        array.forEach((item, index)=>{
            if (item === value){
                setindexOfSearch(index)
                animateDelete(1,0)
                setTimeout(() => {
                    setdel(false)
                    array.splice(index, 1)
                    setarray(array)
                    setindexOfSearch(null)
                    animateDelete(0,1)
                }, 1300);
            }
            else{
                return false;
            }
        })
    }

    function search(value){
        searchTrue(0)
        searchFalse(0)
        array.forEach(async (element, index)=>{
            if(element===value){
                await setTimeout(async () => {
                    await setindexOfSearch(index)
                    await console.warn(index)
                    await searchTrue(1)
                }, 1000*(index+1));
            }
            else{
                await setTimeout(async () => {
                    await setindexOfSearch(index)
                    await console.warn("index:", indexOfSearch)
                    await console.warn(index)
                    await searchFalse(1)
                }, 1000*(index+1));
            }
        })
    }

    return(
        <View style={styles.container}>
            <View style={styles.list}>
                {array.map((item, index)=>{
                    if(del && index === indexOfSearch){
                        return(
                            <View style={styles.itemComposition} key={index} >
                                <Animated.View style={[styles.item, {backgroundColor: deleting, opacity: opacity}]}>
                                    <Text style={styles.text}>
                                        {item}
                                    </Text>
                                </Animated.View>
                                <Text>
                                    i:{index}
                                </Text>
                            </View>
                        )
                    }else{
                        return(
                            <View style={styles.itemComposition} key={index} >
                                <Animated.View style={index <= indexOfSearch && indexOfSearch != null ? [styles.item, {backgroundColor: indexOfSearch === index ? trueColor : falseColor }] : [styles.item]}>
                                    <Text style={styles.text}>
                                        {item}
                                    </Text>
                                </Animated.View>
                                <Text>
                                    i:{index}
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
                        Remove by value
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