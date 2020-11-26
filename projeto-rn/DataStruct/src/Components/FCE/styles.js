import {StyleSheet} from "react-native"

export default styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingVertical: 40,
    },
    lista:{
        justifyContent: 'flex-end',
        alignItems: 'center',
        flexDirection: "row"
    },
    itemComposition:{
        flexDirection: "column",
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 20,
    },
    item:{
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "purple",
        borderRadius: 20,
    },
    text:{
        color: "white"
    },
    menu: {
        width: "80%",
        borderRadius: 10,
        height: "auto",
        paddingVertical: 10,
        marginTop: 40,
        borderWidth: 2,
        borderColor: "purple",
        overflow: 'hidden',
    },
    insert: {
        width: "100%",
        height: 40,
        flexDirection: "row",
        justifyContent: 'space-around',
    },
    input: {
        borderWidth: 2,
        width: "50%",
        borderRadius: 5,
        paddingHorizontal: 10,
        borderColor: "purple"
    },
    button: {
        backgroundColor: "purple",
        width: "auto",
        height: 40,
        borderRadius: 5,
        justifyContent: 'center',
        paddingHorizontal: 15,
    }, 
    buttons: {
        backgroundColor: "purple",
        width: "90%",
        marginLeft: "5%",
        marginTop: 20,
        height: 40,
        borderRadius: 5,
        justifyContent: 'center',
        paddingHorizontal: 15,
        justifyContent: 'center',
        alignItems: 'center',
    }
})