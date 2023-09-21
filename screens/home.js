import React, {useState, useEffect} from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Alert, Modal, TouchableHighlight} from 'react-native';
import { AuthContext } from '../routes/AuthProvider';
import { useContext } from 'react';
import { addChosenWord, getAllWords } from '../database/controller';
import { useTranslation } from 'react-i18next';
import { globalStyles } from '../styles/global'
import '../i18n';

export default function Home({navigation}){
   const { t, i18n } = useTranslation();

    const [translator, setTranslator] = useState({
        url: 'https://translation.googleapis.com/language/translate/v2?key=&source=en&target=sk',
    })

    const { user, logout } = useContext(AuthContext);

    const [modalVisible, setModalVisible] = useState(false);

    const [ allWords, setAllWords ] = useState({
        words: [],
        empty: true,
    });

    const [ word, setWord ] = useState({
        originalWord: '',
        word: '',
        translatedWord:'',
        inputChange: false,
        pressed: false,
    })

    const translateThis = (text) => {
        fetch(translator.url+ '&q=' + text)
          .then(res => res.json())
          .then(
            ( res ) => {
              let translated = res.data.translations[0].translatedText
              setWord({ word: text, translatedWord: translated, pressed: true });
            }
          ) .catch(
              ( error ) => {
                console.log(t("There was an error: "), error);
              }
            )
    }

    function hasWhiteSpace(s) {
        return s.indexOf(' ') >= 0;
    }

    useEffect(() => {
        getWords();
    });

    const inputChange = (data) => {
        if( data.length == 0){
            setWord({
                ...word,
                originalWord: data,
                inputChange: false
            });
        } else {
            setWord({
                ...word,
                originalWord: data,
                inputChange: true,
                pressed: false
            });
        }
    }

    const getWords = () => {
        getAllWords(user.email).then(({ result, empty }) => setAllWords({
                words: result,
                empty: empty,
            })
        );
    }

    const onAddPress = () => {
        getWords();

        if(!(allWords.words.includes(word.word))){
            addChosenWord(user.email, word.word).then(({ result}) => {
                if(result){
                    setModalVisible(!modalVisible);
                }
            })
        }
        else {
            Alert.alert(t("It already exists in the library"));
        }
    }

    return (
        <View style={globalStyles.container}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
            >
                <View style={globalStyles.centeredView}>
                    <View style={globalStyles.modalView}>
                        <Text style={globalStyles.modalText}>{t("Success!")}</Text>
                        <TouchableHighlight
                        style={{ ...globalStyles.openButton, backgroundColor: "#2196F3", marginTop: 10 }}
                        onPress={() => {
                            setModalVisible(!modalVisible);
                        }}
                        >
                        <Text style={globalStyles.textStyle}>{t("Okay")}</Text>
                        </TouchableHighlight>
                    </View>
                </View>
            </Modal>
            <Text style={globalStyles.bigText}>
                {t("Translator")}
            </Text>
            <View style={globalStyles.action}>
                <TextInput
                            placeholder= {t("Enter a word/sentence you wish to translate to Slovak")}
                            style={globalStyles.textInput1}
                            autoCapitalize='sentences'
                            onChangeText={(data) => inputChange(data)}
                            underlineColorAndroid={'transparent'}
                    />
            </View>
            <TouchableOpacity style={globalStyles.translate} onPress={() => /* translateWord() */ translateThis(word.originalWord)}>
                <Text style={globalStyles.textTranslate}> {t("Translate")} </Text>
            </TouchableOpacity>
            { word.pressed && hasWhiteSpace(word.word) == false ?
            <React.Fragment>
                <Text style={globalStyles.transText}> {t("Translation of the word")} "{word.word}" {t("is")}:</Text>
                <Text style={{...globalStyles.transText,marginTop: 5, fontWeight: 'bold'}}> {word.translatedWord} </Text>
                <TouchableOpacity style={globalStyles.translate} onPress={() => onAddPress()}>
                    <Text style={globalStyles.textTranslate}> {t("Add word")} "{word.word}" {t("to the library")} </Text>
                </TouchableOpacity>
            </React.Fragment>
            : word.pressed ?
            <React.Fragment>
                <Text style={globalStyles.transText}> {t("Translation of the sentence")} "{word.word}" {t("is")}:</Text>
                <Text style={{...globalStyles.transText,marginTop: 5, fontWeight: 'bold'}}> {word.translatedWord} </Text>
                <TouchableOpacity style={globalStyles.translate} onPress={() => onAddPress()}>
                    <Text style={globalStyles.textTranslate}> {t("Add sentence")} "{word.word}" {t("to the library")} </Text>
                </TouchableOpacity>
            </React.Fragment>
            : null
            }
        </View>
    )
}

