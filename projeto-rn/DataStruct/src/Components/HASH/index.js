import React, {useState} from "react"
import {View, Text, TouchableOpacity, TextInput, Animated} from "react-native"
import styles from "./styles.js"

export default function HashView(){

    const [array, setarray] = useState([])
    const [size, setsize] = useState(0)
    const [limit, setlimit] = useState(10)
    const [indexOfList, setindexOfList] = useState(0)
    const [value, setvalue] = useState("")
    const [color, setcolor] = useState(new Animated.Value(0))
    const [opacity, setopacity] = useState(new Animated.Value(1))
    const [del, setdel] = useState(false)

    const animateSearch = (x) => {
        Animated.sequence([
            Animated.timing(color, {
                toValue: x,
                duration: x === 1 ? 1000 : 0,
                useNativeDriver: false
            })
        ]).start()
    }

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

    const searching =  color.interpolate({
        inputRange: [0, 1],
        outputRange:["purple" , "orange"]
    })

    const deleting =  color.interpolate({
        inputRange: [0, 1],
        outputRange:["purple" , "red"]
    })

    function hash(value){
        return value % limit;
    }

    function insert(value){
        let index = hash(value);
        array[index] = value;
        console.warn([...array])
        setarray(array)
        setsize(size+1)
    }

    async function remove(value){
        console.warn(opacity, color)
        animateSearch(0)
        setdel(true)
        let index = hash(value);
        setindexOfList(index)
        setarray(array)
        if (array[index]){
            animateDelete(1, 0)
            setTimeout(() => {
                animateDelete(0,1)
                array.splice(index,1);
                setsize(size-1)
                setindexOfList(null)
                setdel(false)
            }, 1300);
            return true
        }
        else{
            return false;
        }
    }

    function search(value){
        animateSearch(0)
        let index = hash(value);
        setindexOfList(index)
        setarray(array)
        animateSearch(1)
        if (array[index]){
            console.warn(array[index])
            return true
        }
        else{
            return false;
        }
    }

    function getSize(){
        return size;
    }

    return(
        <View style={styles.container}>
            <View style={styles.lista}>
                {array.map((item, index)=>{
                    return(
                        <View style={styles.itemComposition}>
                            <Animated.View key={index} style={indexOfList === index && !del ? [styles.item, {backgroundColor: searching, opacity: 1}] : [styles.item, {backgroundColor: indexOfList === index &&  del ? deleting: "purple", opacity: indexOfList === index && del ? opacity : 1},]}>
                                <Text style={styles.text}>
                                    {item}
                                </Text>
                            </Animated.View>
                            <Text>
                                i:{index}, 
                            </Text>
                        </View>
                    )
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