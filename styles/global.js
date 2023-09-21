import { StyleSheet} from 'react-native';

export const globalStyles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        paddingVertical: 30,
        backgroundColor: '#fff'
    },
    titleText:{
        fontFamily: 'opensans-regular',
        fontSize: 20,
        color: '#333'
    },
    textInput: {
        flex: 1,
        marginTop: -12,
        paddingLeft: 10,
        color: '#05375a',
    },
    bigText:{
        fontWeight: "bold",
        textAlign: "center",
        alignContent: "center",
        fontSize: 24,
        justifyContent: "center",
        color: "black",
        alignItems: "center",
    },
    words: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center",
        fontSize: 16,
    },
    button: {
        backgroundColor: "#748BA7",
        borderRadius: 20,
        padding: 20,
        marginTop: 25,
        marginRight: 10,
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
      },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center",
        fontWeight: "bold",
    },
    openButton: {
        backgroundColor: "#F194FF",
        borderRadius: 20,
        padding: 10,
        elevation: 2
    },
    translate: {
        borderColor: '#535A92',
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        borderWidth: 1,
        marginTop: 16,
    },
    textTranslate: {
        fontSize: 18,
        fontWeight: 'bold',
        color: "#05375a"
    },
    textInput1: {
        flex: 1,
        paddingLeft: 10,
        borderColor: '#05375a',
        borderWidth: 1,
        margin: 15,
        height: 40,
        borderRadius: 5,
    },
    action: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 5,
        alignContent: "center",
        justifyContent: "center",
        alignItems: "center",
    },
    transText:{
        fontWeight: "normal",
        textAlign: "center",
        alignContent: "center",
        fontSize: 18,
        justifyContent: "center",
        color: "black",
        alignItems: "center",
        marginTop: 25,
    },
    container1: {
        flex: 1,
        backgroundColor: '#535A92'
      },
});