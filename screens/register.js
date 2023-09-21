import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StatusBar, TextInput, Alert} from 'react-native';
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

    const { register } = useContext(AuthContext);

    const [loginData, setLoginData] = useState({
        email: '',
        password: '',
        password_again: '',
        inputChange: false,
        hiddenText: true,
        hiddenPass: true,
    });

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

    const onSignupPress = () => {
        if(loginData.password !== loginData.password_again){
            Alert.alert(t("Passwords do not match"));
            return;
        }
        register(loginData.email, loginData.password);
    }

    const passwordChange = (data) => {
        setLoginData({
            ...loginData,
            password: data
        });
    }

    const passwordChange2 = (data) => {
        setLoginData({
            ...loginData,
            password_again: data
        });
    }

    const toggleHidden = () => {
        setLoginData({
            ...loginData,
            hiddenText: !loginData.hiddenText,
        });
    }

    const toggleHiddenPass = () => {
        setLoginData({
            ...loginData,
            hiddenPass: !loginData.hiddenPass,
        });
    }

    return (
        <View style={authStyles.container}>
            <StatusBar backgroundColor='#535A92' barStyle="light-content"/>
            <Animatable.View style={authStyles.header} animation="fadeInDownBig">
                <Text style={authStyles.text_header}>{t("Register a new account!")}</Text>
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

                <Text style={[authStyles.text_footer, authStyles.marg]}> {t("Re-enter password")} </Text>
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
                        secureTextEntry={loginData.hiddenPass ? true : false}
                        onChangeText={(data) => passwordChange2(data)}
                        />
                    <TouchableOpacity onPress={toggleHiddenPass}>
                        {loginData.hiddenPass ?
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

                <View style={authStyles.button1}>
                <TouchableOpacity onPress={onSignupPress} style={authStyles.signIn}>
                        <LinearGradient
                            colors={['#7A80AD', '#323A75']}
                            style={authStyles.signIn}
                        >
                            <Text style={authStyles.textSign}> {t("Sign up")} </Text>
                        </LinearGradient>
                    </TouchableOpacity>
                    <TouchableOpacity style={authStyles.signUp} onPress={() => navigation.navigate('Login')}>
                        <Text style={authStyles.textSignUp}> {t("Sign in")} </Text>
                    </TouchableOpacity>
                </View>
            </Animatable.View>
        </View>
    )
}