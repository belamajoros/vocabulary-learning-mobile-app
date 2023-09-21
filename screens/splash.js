import React from 'react';
import { View, Text, TouchableOpacity, Dimensions, StyleSheet, StatusBar} from 'react-native';
import * as Animatable from 'react-native-animatable';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { useTranslation } from 'react-i18next';
import '../i18n';

const SplashScreen = ({navigation}) => {
    const { colors } = useTheme();

    const { t, i18n } = useTranslation();

    return (
      <View style={styles.container}>
          <StatusBar backgroundColor='#535A92' barStyle="light-content"/>
         <Animatable.View style={styles.header} animation="fadeInDownBig">
            <Text style={styles.text_header}>{t("Welcome to")}</Text>
            <Text style={styles.text_header}>Readbud!</Text>
        </Animatable.View>
        <Animatable.View
            style={[styles.footer, {
                backgroundColor: colors.background
            }]}
            animation="fadeInUpBig"
        >
            <Text style={[styles.title, {
                color: colors.text
            }]}>{t("Let's get started!")}</Text>
            <Text style={styles.text}>{t("Please sign in")}</Text>
            <View style={styles.button}>
            <TouchableOpacity onPress={()=>navigation.navigate('Login')}>
            <LinearGradient
                    colors={['#7A80AD', '#323A75']}
                    style={styles.signIn}
                >
                    <Text style={styles.textSign}>{t("Sign in")}</Text>
                    <MaterialIcons
                        name="navigate-next"
                        color="#fff"
                        size={20}
                    />
                </LinearGradient>
            </TouchableOpacity>
            </View>
        </Animatable.View>
      </View>
    );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#535A92'
  },
  header: {
      flex: 2,
      justifyContent: 'center',
      alignItems: 'center'
  },
  text_header: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 70
  },
  footer: {
      flex: 1,
      backgroundColor: '#fff',
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,
      paddingVertical: 50,
      paddingHorizontal: 30
  },
  title: {
      color: '#05375a',
      fontSize: 40,
      fontWeight: 'bold'
  },
  text: {
      color: 'grey',
      marginTop:5,
      fontSize: 20
  },
  button: {
      alignItems: 'flex-end',
      marginTop: 30,
  },
  signIn: {
      width: 150,
      height: 40,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 20,
      flexDirection: 'row'
  },
  textSign: {
      color: 'white',
      fontWeight: 'bold'
  }
});