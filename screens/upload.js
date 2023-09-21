import React, { useState } from 'react';
import { StyleSheet, View, Text, Modal, TouchableOpacity, TouchableHighlight } from 'react-native';
import { globalStyles } from '../styles/global';
import ImageCropPicker from 'react-native-image-crop-picker';
import { addChosenWord, getAllWords } from '../database/controller';
import { AuthContext } from '../routes/AuthProvider';
import { useContext } from 'react';
import LottieView from 'lottie-react-native';
import { useTranslation } from 'react-i18next';
import '../i18n';

import TesseractOcr, {
  LANG_ENGLISH,
  useEventListener,
} from 'react-native-tesseract-ocr';
import { useEffect } from 'react/cjs/react.development';

const DEFAULT_HEIGHT = 500;
const DEFAULT_WITH = 600;
const defaultPickerOptions = {
  cropping: true,
  height: DEFAULT_HEIGHT,
  width: DEFAULT_WITH,
};

export default function Upload({navigation}){

    const { t, i18n } = useTranslation();

    const { user } = useContext(AuthContext);

    const [translator, setTranslator] = useState({
        url: 'https://translation.googleapis.com/language/translate/v2?key=&source=en&target=sk',
    })

    const [imgSrc, setImgSrc] = useState(null);
    const [text, setText] = useState({
        picText: '',
    });

    const [databaseWords, setDatabaseWords] = useState({
        words: [],
    })

    const [ word, setWord ] = useState({
        originalWord: '',
        translatedWord:'',
    })

    const [modalVisible, setModalVisible] = useState(false);
    const [loaderVisible, setloaderVisible] = useState(false);

    const [ textArray, setTextArray] = useState({
        arr: [],
        ready: false,
    })

    useEffect(() => {
        setTextArray({
            arr: [],
            ready: false,
        })
    }, []);

    const openModal = (text) => {
        fetch(translator.url+ '&q=' + text)
          .then(res => res.json())
          .then(
            ( res ) => {
              let translated = res.data.translations[0].translatedText
              setWord({ originalWord: text, translatedWord: translated});
            }
          ) .catch(
              ( error ) => {
                console.log(t("There was an error: "), error);
              }
            )
        setModalVisible(!modalVisible);
    }

    const getWords = () => {
        getAllWords(user.email).then(({ result, empty}) => setDatabaseWords({
            words: result,
        }) )
        var arr = databaseWords.words.map(function(value){ return value.toLowerCase()});
        var newArr = [];
        for(var x = 0; x < arr.length; x++){
            if(arr[x].length > 1){
                newArr.push(arr[x].charAt(0).toUpperCase() + arr[x].slice(1));
            }
        }
        setDatabaseWords({
            words: newArr,
        })
    }

    const recognizeTextFromImage = async (path) => {
        setloaderVisible(true);
        try {
        const tesseractOptions = {};
        const recognizedText = await TesseractOcr.recognize(
            path,
            LANG_ENGLISH,
            tesseractOptions,
        );
        setText({
            picText: recognizedText,
        });
        cleanup(recognizedText);
        } catch (err) {
        console.error(err);
        setText('');
        }
        setloaderVisible(false);
    };

    const cleanup = (text) => {
        getWords();
        const newD = text.replace(/[^a-zA-Z]/g,' ');
        var myArray = newD.split(' ').map(function(value) {
        return value.toLowerCase();
        });
        var newArray = [];
        var newArray = myArray.filter(function(elem, pos) {
        return myArray.indexOf(elem) == pos;
        });
        var newArray1 = [];
        for(var x = 0; x < newArray.length; x++){
            if(newArray[x].length > 1){
                if(!databaseWords.words.includes(newArray[x].charAt(0).toUpperCase() + newArray[x].slice(1))){
                    newArray1.push(newArray[x].charAt(0).toUpperCase() + newArray[x].slice(1));
                }
            }
        }
        console.log(newArray1);
        console.log(databaseWords.words);
        setTextArray({
            arr: newArray1,
            ready: true,
        })

    }

    const recognizeFromCamera = async (options = defaultPickerOptions) => {
        try {
            setTextArray({
                arr: [],
                ready: false,
            })
            const image = await ImageCropPicker.openCamera(options);
            setImgSrc({uri: image.path});
            await recognizeTextFromImage(image.path);
        } catch (err) {
        if (err.message !== 'User cancelled image selection') {
            console.error(err);
        }
        }
    };

    const onAddPress = (text) => {
        addChosenWord(user.email, text).then(({ result }) => {
            if(result){
                setModalVisible(!modalVisible);
            } else {
                Alert.alert(t("Word already exists in the library"));
            }
        })
    }



    return (
        <View style={globalStyles.container}>
            {   loaderVisible ?
            <LottieView
                source={require('../assets/loader2.json')}
                autoPlay
                loop
            />
            :
            <React.Fragment>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
            >
                <View style={globalStyles.centeredView}>
                    <View style={globalStyles.modalView}>
                        <React.Fragment>
                            <Text style={globalStyles.modalText}>{t("Translation of the word is")}</Text>
                            <Text style={{...globalStyles.modalText, fontWeight: 'normal'}}>{word.translatedWord}</Text>
                        </React.Fragment>
                        <TouchableHighlight
                        style={{ ...globalStyles.openButton, backgroundColor: "#2196F3", marginTop: 10, color: "white" }}
                        onPress={() => {
                            setModalVisible(!modalVisible);
                        }}
                        >
                        <Text style={{color: "white"}}>{t("Hide")}</Text>
                        </TouchableHighlight>
                        <TouchableHighlight
                        style={{ ...globalStyles.openButton, backgroundColor: "green", marginTop: 10, color: "white" }}
                        onPress={() => onAddPress(word.originalWord)}
                        >
                        <Text style={{color: "white"}}>{t("Add word to the library")}</Text>
                        </TouchableHighlight>
                    </View>
                </View>
            </Modal>
            { textArray.ready == false ?
            <View style={{ flex: 1, flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
                <Text style={globalStyles.bigText}>
                    {t("Scan english text and the system will extract unknown words from it!")}
                </Text>
                <TouchableOpacity style={globalStyles.translate} onPress={() => recognizeFromCamera()}>
                    <Text style={globalStyles.textTranslate}> {t("Scan text")} </Text>
                </TouchableOpacity>
            </View>
            :
            <React.Fragment>
                <Text style={globalStyles.bigText}> {t("The system has recognized the following words")} </Text>
                <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
                { textArray.arr && textArray.arr.map((item, key) => {  return (
                            <TouchableOpacity style={globalStyles.button} key={key} onPress={() => openModal(item)}>
                                <Text style={globalStyles.words}> {item} </Text>
                            </TouchableOpacity>

                    )})
                }
                </View>
                <TouchableOpacity style={globalStyles.translate} onPress={() => recognizeFromCamera()}>
                    <Text style={globalStyles.textTranslate}> {t("I want to scan another text!")} </Text>
                </TouchableOpacity>
            </React.Fragment>
            }
            </React.Fragment>
            }
        </View>
    )
}