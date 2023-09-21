import React, {useState} from 'react';
import { View, Text, Modal, TouchableOpacity, TouchableHighlight} from 'react-native';
import { globalStyles } from '../styles/global';
import { AuthContext } from '../routes/AuthProvider';
import { useContext } from 'react';
import { useEffect } from 'react';
import { deleteChosenWord, getAllWords } from '../database/controller';
import { useTranslation } from 'react-i18next';
import '../i18n';

export default function Library({navigation}){

    const { t, i18n } = useTranslation();

    const [ word, setWords ] = useState({
        words: [],
        empty: true,
    })

    const [translator, setTranslator] = useState({
        url: 'https://translation.googleapis.com/language/translate/v2?key=&source=en&target=sk',
    })

    const [ translatedWord, setTranslatedWord] = useState({
        tword: 'Welcome',
        originalWord: '',
    })

    const [modalVisible, setModalVisible] = useState(false);

    const openModal = (text) => {
        fetch(translator.url+ '&q=' + text)
          .then(res => res.json())
          .then(
            ( res ) => {
              let translated = res.data.translations[0].translatedText
              setTranslatedWord({
                tword: translated,
                originalWord: text,
            })
            }
          ) .catch(
              ( error ) => {
                console.log(t("There was an error: "), error);
              }
            )
        setModalVisible(!modalVisible);
    }

    const getWords = () => {
        getAllWords(user.email).then(({ result, empty}) => setWords({
            words: result,
            empty: empty,
        }) )
    }

    const deleteWord = (text) => {
        deleteChosenWord(user.email, text).then(({ result }) => {
            if(result){
                setModalVisible(!modalVisible);
            }
        })
    }

    const { user, logout } = useContext(AuthContext);

    useEffect(() => {
        getWords();
    });

    function hasWhiteSpace(s) {
        return s.indexOf(' ') >= 0;
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
                        { hasWhiteSpace(translatedWord.tword) ?
                        <React.Fragment>
                            <Text style={globalStyles.modalText}>{t("Translation of the sentence is")}:</Text>
                            <Text style={{...globalStyles.modalText, fontWeight: 'normal'}}>{translatedWord.tword}</Text>
                        </React.Fragment>
                        :
                        <React.Fragment>
                            <Text style={globalStyles.modalText}>{t("Translation of the word is")}:</Text>
                            <Text style={{...globalStyles.modalText, fontWeight: 'normal'}}>{translatedWord.tword}</Text>
                        </React.Fragment>
                        }
                        <TouchableHighlight
                        style={{ ...globalStyles.openButton, backgroundColor: "#2196F3", marginTop: 10, color: "white" }}
                        onPress={() => {
                            setModalVisible(!modalVisible);
                        }}
                        >
                        <Text style={{color: "white"}}>{t("Hide")}</Text>
                        </TouchableHighlight>
                        <TouchableHighlight
                        style={{ ...globalStyles.openButton, backgroundColor: "red", marginTop: 10, color: "white" }}
                        onPress={() => deleteWord(translatedWord.originalWord) }
                        >
                        { hasWhiteSpace(translatedWord.tword) ?
                        <Text style={{color: "white"}}>{t("Remove sentence from library")}</Text>
                        :
                        <Text style={{color: "white"}}>{t("Remove word from library")}</Text>
                        }
                        </TouchableHighlight>
                    </View>
                </View>
            </Modal>
            { word.empty ?
            <Text style={globalStyles.bigText}> {t("You have not learned a word yet !")}</Text>
            :
            <React.Fragment>
                <Text style={globalStyles.bigText}> {t("You have learned this vocabulary so far !")}</Text>
                <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
                { word.words && word.words.map((item, key) => {  return (
                            <TouchableOpacity style={globalStyles.button} key={key} onPress={() => openModal(item)}>
                                <Text style={globalStyles.words}> {item} </Text>
                            </TouchableOpacity>

                    )})
                }
                </View>
            </React.Fragment>
            }
        </View>
    )
}
