import {StyleSheet} from "react-native"

export default styles = StyleSheet.create({
    menu:{
        width: "100%",
        flexDirection: 'row',
    },
    button: {
        flex: 1,
        alignItems: 'center',
        height: 50,
        justifyContent: 'center',
    },
    text: {
        fontSize: 15,
        color: "black"
    },
    clickedButton: {
        color: "purple"
    },
    selectedTab: {
        flex: 1,
        alignItems: 'center',
        height: 50,
        justifyContent: 'center',
        borderTopWidth: 2,
        borderTopColor: "purple",
    }

})