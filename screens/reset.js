import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StatusBar, TextInput} from 'react-native';
import * as Animatable from 'react-native-animatable';
import { LinearGradient } from 'expo-linear-gradient';
import { authStyles } from '../styles/authStyles';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { AuthContext } from '../routes/AuthProvider';
import { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import '../i18n';

export default function Reset({navigation}){

    const { reset } = useContext(AuthContext);

    const { t, i18n } = useTranslation();

    const [mailData, setMailData] = useState({
        email: '',
        inputChange: false,
    });

    const inputChange = (data) => {
        if( data.length == 0){
            setMailData({
                ...mailData,
                email: data,
                inputChange: false
            });
        } else {
            setMailData({
                ...mailData,
                email: data,
                inputChange: true
            });
        }
    }

    return (
        <View style={authStyles.container}>
            <StatusBar backgroundColor='#535A92' barStyle="light-content"/>
            <Animatable.View style={authStyles.header} animation="fadeInDownBig">
                <Text style={authStyles.text_header}>{t("Enter your email to reset your password")}</Text>
            </Animatable.View>
            <Animatable.View style={authStyles.footer} animation="fadeInUpBig">
                <Text style={authStyles.text_footer}> Email </Text>
                <View style={authStyles.action}>
                    <AntDesign
                        name="user"
                        color="black"
                        size={18}
                        />
                    <TextInput
                        placeholder={t("Your email")}
                        style={authStyles.textInput}
                        autoCapitalize="none"
                        onChangeText={(data) => inputChange(data)}
                        />
                    {mailData.inputChange ?
                    <AntDesign
                        name="checkcircleo"
                        color="#68B159"
                        size={20}/>
                    : null }
                </View>
                <View style={authStyles.button1}>
                    <TouchableOpacity onPress={() => reset(mailData.email)} style={authStyles.signIn}>
                        <LinearGradient
                            colors={['#7A80AD', '#323A75']}
                            style={authStyles.signIn}
                        >
                            <Text style={authStyles.textSign}> {t("Reset Password")} </Text>
                        </LinearGradient>
                    </TouchableOpacity>
                    <TouchableOpacity style={authStyles.signUp} onPress={() => navigation.navigate('Login')}>
                        <Text style={authStyles.textSignUp}> {t("Back to login")} </Text>
                    </TouchableOpacity>
                </View>
            </Animatable.View>
        </View>
    )
}