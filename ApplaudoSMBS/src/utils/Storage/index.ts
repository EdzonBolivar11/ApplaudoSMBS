import AsyncStorage from '@react-native-community/async-storage';

const LocalStorage = {
  async getItem(key: string) {
    try {
      const serieJson = await AsyncStorage.getItem(key);
      return serieJson != null ? JSON.parse(serieJson) : null;
    } catch (err) {
      console.log(err);
      throw err;
    }
  },
  async getAllKeys() {
    let keys = [];
    try {
      keys = await AsyncStorage.getAllKeys();
      return keys;
    } catch (err) {
      console.log('err get getAllKeys', err);
      throw err;
    }
  },
  async getAllSeries() {
    let keys = [];
    try {
      keys = await AsyncStorage.getAllKeys();
      return await AsyncStorage.multiGet(keys).then((res) =>
        res?.map((item: any) => JSON.parse(item[1])),
      );
    } catch (err) {
      console.log('err get getAllSeries', err);
      throw err;
    }
  },
  async setItem(key: string, value: string) {
    try {
      const serieJson = JSON.stringify(value);
      await AsyncStorage.setItem(key, serieJson);
      return true;
    } catch (err) {
      console.log(err);
      throw err;
    }
  },
  async removeItem(key: string) {
    try {
      return await AsyncStorage.removeItem(key);
    } catch (err) {
      console.log(err);
      throw err;
    }
  },
  async removeAll() {
    try {
      await AsyncStorage.clear();
    } catch (e) {
      // clear error
    }
  },
};

export default LocalStorage;
