import React from 'react';
import {View, StyleSheet, Image, Linking} from 'react-native';
import {Button, Text, Icon} from 'native-base';
import LinearGradient from 'react-native-linear-gradient';
import Screen from '../../components/Screen';
import Section from './../../components/Profile/Section';
import Colors from '../../utils/Theme/Colors';

//Info
import PersonalInformation from './info';

const Profile = () => {
  const onPressWhatsapp = () => {
    Linking.openURL(
      `whatsapp://send?text='Perfil de Edzon Bolivar'&phone=${PersonalInformation.phone}`,
    );
  };

  const renderPersonalInfo = () => {
    return PersonalInformation.data.map((section) => (
      <Section key={section.id} section={section} />
    ));
  };

  return (
    <Screen safeArewViewColor={true}>
      <LinearGradient
        locations={[0, 0.2, 0.4, 0.55, 0.8]}
        colors={Colors.perfilGradientColors}
        style={styles.photoGradient}>
        <Image style={styles.photo} source={PersonalInformation.photo} />
        <Text style={styles.title}>{PersonalInformation.name}</Text>
        <Text style={styles.smallTitle}>{PersonalInformation.email}</Text>
      </LinearGradient>
      <Button iconLeft onPress={() => onPressWhatsapp()} style={styles.button}>
        <Icon name="logo-whatsapp" style={{color: Colors.white}} />
        <Text style={{color: Colors.white}}>Contactar</Text>
      </Button>
      <View style={styles.infoWrapper}>{renderPersonalInfo()}</View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  photoGradient: {
    height: 300,
    paddingVertical: 30,
    justifyContent: 'center',
  },
  photo: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignSelf: 'center',
  },
  title: {
    color: Colors.white,
    fontSize: 24,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginTop: 15,
    marginBottom: 10,
  },
  smallTitle: {
    color: Colors.white,
    alignSelf: 'center',
  },
  infoWrapper: {
    paddingHorizontal: 30,
    paddingVertical: 20,
  },
  button: {
    marginTop: -22.5,
    width: 150,
    height: 60,
    borderRadius: 30,
    alignSelf: 'center',
    backgroundColor: Colors.whatsapp,
  },
  nextButton: {
    alignSelf: 'flex-end',
    marginRight: 30,
    marginBottom: 30,
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignContent: 'center',
    backgroundColor: Colors.gradient1,
  },
  iconNext: {
    color: Colors.white,
    fontSize: 24,
    marginRight: 0,
    marginLeft: 0,
  },
});

export default Profile;
