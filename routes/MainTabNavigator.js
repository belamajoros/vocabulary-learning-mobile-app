import React from 'react';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem } from 'react-navigation-drawer-no-warnings';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Ionicons'
import Home from '../screens/home';
import Upload from '../screens/upload';
import Library from '../screens/library';
import { View } from 'react-native';
import auth from '@react-native-firebase/auth';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'
import Feather from 'react-native-vector-icons/Feather';
import { useTranslation } from 'react-i18next';
import '../i18n';
import { AuthContext } from '../routes/AuthProvider';
import { useContext } from 'react';

const Drawer = createDrawerNavigator();
const BottomTab = createBottomTabNavigator();
const HomeStackNav = createStackNavigator();
const LibraryStackNav = createStackNavigator();
const UploadStackNav = createStackNavigator();

const MainTabNavigator = () => {
  return(
  <Drawer.Navigator drawerContent={props => <CustomDrawerContent {...props} />} initialRouteName="Home" >
    <Drawer.Screen name="HomeDrawer" component={MainTab} />
    <Drawer.Screen name="UploadDrawer" component={Upload} />
    <Drawer.Screen name="LibraryDrawer" component={Library} />
  </Drawer.Navigator>
  )
}

export default MainTabNavigator;

function CustomDrawerContent(props) {

  const { t, i18n } = useTranslation();
  const { user, logout } = useContext(AuthContext);

  return (
    <DrawerContentScrollView {...props}>
      <View style={{flex: 1}}>
        <View style={{
          borderBottomWidth: 0.5,
          borderColor: "#05375a",
          }}>
          <DrawerItem icon={ () => (
            <Feather name="user" size={25}/>
            )} label={user.email}/>
        </View>
        <DrawerItem icon={ () => (
          <AntDesign name="home" size={25}/>
        )} label={t("Home")} onPress={() => {props.navigation.navigate(t('Home'))}}/>
        <DrawerItem icon={ () => (
          <MaterialCommunityIcons name="ocr" size={25}/>
        )} label={t("Scan")} onPress={() => {props.navigation.navigate(t('Scan'))}}/>
        <DrawerItem icon={ () => (
          <Ionicons name="library-outline" size={25}/>
        )} label={t("Library")} onPress={() => {props.navigation.navigate(t('Library'))}}/>
        <DrawerItem icon={ () => (
          <MaterialIcon name="logout" size={25}/>
        )} label={t("Log out")} onPress={() => logout()}/>
      </View>
      </DrawerContentScrollView>
  );
}




const MainTab = (route) => {

  const { t, i18n } = useTranslation();

  return(
  <BottomTab.Navigator initialRouteName={route} activeColor="#05375a">
    <BottomTab.Screen
      name={t("Home")}
      component={HomeStackNavigator}
      options={{
        tabBarLaber: 'Home',
        tabBarIcon: () => (
          <AntDesign name="home" size={25}/>
        )
      }}
      />
    <BottomTab.Screen
      name={t("Scan")}
      component={UploadStackNavigator}
      options={{
        tabBarLaber: 'Scan',
        tabBarIcon: () => (
          <MaterialCommunityIcons name="ocr" size={25}/>
        )
      }}
      />
    <BottomTab.Screen
      name={t("Library")}
      component={LibraryStackNavigator}
      options={{
        tabBarLaber: 'Library',
        tabBarIcon: () => (
          <Ionicons name="library-outline" size={25}/>
        )
      }}
      />
  </BottomTab.Navigator>
  )
}


const HomeStackNavigator = ({navigation}) => {

  const { t, i18n } = useTranslation();

  return(

  <HomeStackNav.Navigator screenOptions={{
    headerTitleStyle: {
      fontWeight: 'bold'
    },
    headerStyle: {
      backgroundColor: "#05375a"
    },
    headerTintColor: '#fff',
  }}>
    <HomeStackNav.Screen name="Home" component={Home} options={{
      title:t("Home"),
      headerTitleAlign: 'center',
      headerLeft: () => (
        <Feather
          style={{ marginLeft: 15 }}
          color="white"
          name='menu'
          size={25}
          backgroundColor="white"
          onPress={() => navigation.openDrawer()}/>
      )
    }}
    />
  </HomeStackNav.Navigator>
  )

};

const UploadStackNavigator = ({navigation}) => {

  const { t, i18n } = useTranslation();

  return(

  <UploadStackNav.Navigator screenOptions={{
    headerTitleStyle: {
      fontWeight: 'bold'
    },
    headerStyle: {
      backgroundColor: "#05375a"
    },
    headerTintColor: '#fff',
  }}>
    <UploadStackNav.Screen name="Scan" component={Upload} options={{
      title:t("Scan"),
      headerTitleAlign: 'center',
      headerLeft: () => (
        <Feather
          style={{ marginLeft: 15 }}
          color="white"
          name='menu'
          size={25}
          backgroundColor="white"
          onPress={() => navigation.openDrawer()}/>
      )
    }}
    />
  </UploadStackNav.Navigator>
  )
};

const LibraryStackNavigator = ({navigation}) => {

  const { t, i18n } = useTranslation();

  return(

  <LibraryStackNav.Navigator screenOptions={{
    headerTitleStyle: {
      fontWeight: 'bold'
    },
    headerStyle: {
      backgroundColor: "#05375a"
    },
    headerTintColor: '#fff',
  }}>
    <LibraryStackNav.Screen name="Library" component={Library} options={{
      title:t("Library"),
      headerTitleAlign: 'center',
      headerLeft: () => (
        <Feather
          style={{ marginLeft: 15 }}
          color="white"
          name='menu'
          size={25}
          backgroundColor="white"
          onPress={() => navigation.openDrawer()}/>
      )
    }}
    />
  </LibraryStackNav.Navigator>
  )
};
