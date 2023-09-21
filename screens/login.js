import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StatusBar, TextInput} from 'react-native';
import * as Animatable from 'react-native-animatable';
import { LinearGradient } from 'expo-linear-gradient';
import { authStyles } from '../styles/authStyles';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import { useTranslation } from 'react-i18next';
import '../i18n';
import { AuthContext } from '../routes/AuthProvider';
import { useContext } from 'react';

export default function Login({navigation}){

    const { t, i18n } = useTranslation();

    const [loginData, setLoginData] = useState({
        email: '',
        password: '',
        inputChange: false,
        hiddenText: true
    });

    const { login } = useContext(AuthContext);

    const inputChange = (data) => {
        if( data.length == 0){
            setLoginData({
                ...loginData,
                email: data,
                inputChange: false
            });
        } else {
            setLoginData({
                ...loginData,
                email: data,
                inputChange: true
            });
        }
    }

    const passwordChange = (data) => {
        setLoginData({
            ...loginData,
            password: data
        });
    }

    const toggleHidden = () => {
        setLoginData({
            ...loginData,
            hiddenText: !loginData.hiddenText,
        });
    }

    return (
        <View style={authStyles.container}>
            <StatusBar backgroundColor='#535A92' barStyle="light-content"/>
            <Animatable.View style={authStyles.header} animation="fadeInDownBig">
                <Text style={authStyles.text_header}>{t("Welcome!")}</Text>
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
                        placeholder= {t("Your email")}
                        style={authStyles.textInput}
                        autoCapitalize="none"
                        onChangeText={(data) => inputChange(data)}
                        />
                    {loginData.inputChange ?
                    <AntDesign
                        name="checkcircleo"
                        color="#68B159"
                        size={20}/>
                    : null }
                </View>
                <Text style={[authStyles.text_footer, authStyles.marg]}> {t("Password")} </Text>
                <View style={authStyles.action}>
                    <AntDesign
                        name="lock"
                        color="black"
                        size={20}
                        />
                    <TextInput
                        placeholder={t("Your password")}
                        style={authStyles.textInput}
                        autoCapitalize="none"
                        secureTextEntry={loginData.hiddenText ? true : false}
                        onChangeText={(data) => passwordChange(data)}
                        />
                    <TouchableOpacity onPress={toggleHidden}>
                        {loginData.hiddenText ?
                            <Feather
                                name="eye"
                                color="black"
                                size={20}
                            />
                        :
                            <Feather
                                name="eye-off"
                                color="black"
                                size={20}
                            />
                        }
                    </TouchableOpacity>
                </View>
                <TouchableOpacity onPress={() => navigation.navigate('ResetPassword')}>
                    <Text style={{marginTop: 15, color:"blue", textDecorationLine: 'underline'}}> {t("Forgot your password?")} </Text>
                </TouchableOpacity>

                <View style={authStyles.button}>
                    <TouchableOpacity onPress={() => login(loginData.email, loginData.password)} style={authStyles.signIn}>
                        <LinearGradient
                            colors={['#7A80AD', '#323A75']}
                            style={authStyles.signIn}
                        >
                            <Text style={authStyles.textSign}> {
                            t("Sign in")
                            } </Text>
                        </LinearGradient>
                    </TouchableOpacity>
                    <TouchableOpacity style={authStyles.signUp} onPress={() => navigation.navigate('Register')}>
                        <Text style={authStyles.textSignUp}> {t("Sign up")} </Text>
                    </TouchableOpacity>
                </View>
            </Animatable.View>
        </View>
    )
}