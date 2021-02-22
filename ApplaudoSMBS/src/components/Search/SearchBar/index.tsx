import React, {FunctionComponent} from 'react';
import PropTypes from 'prop-types';
import {View, StyleSheet} from 'react-native';
import {Input, Button} from 'native-base';
import RNPickerSelect from 'react-native-picker-select';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {SearchBarProps} from '../../../utils/Types';
import Colors from '../../../utils/Theme/Colors';

const SearchBar: FunctionComponent<SearchBarProps> = (props) => {
  const {searchText, setSearchText, selectedItem, onChangeSelectedItem} = props;

  const handleValueChange = (value: string) => {
    if (value !== 'tipo') {
      setSearchText('');
      onChangeSelectedItem(value);
    }
  };

  return (
    <View style={styles.searchBar}>
      <View style={styles.pickerWrapper}>
        <RNPickerSelect
          style={{
            inputAndroid: styles.inputPicker,
            inputIOS: styles.inputPicker,
            iconContainer: styles.pickerIcon,
          }}
          onValueChange={(value) => handleValueChange(value)}
          value={selectedItem}
          placeholder={{label: 'Tipo', value: 'tipo'}}
          items={[
            {label: 'Anime', value: 'anime'},
            {label: 'Manga', value: 'manga'},
          ]}
          useNativeAndroidPickerStyle={false}
          textInputProps={{underlineColorAndroid: 'cyan'}}
          Icon={() => {
            return <Ionicons name="chevron-down-sharp" color="gray" />;
          }}
        />
      </View>
      <Input
        style={styles.input}
        placeholder="Buscar serie"
        placeholderTextColor={Colors.gray1}
        onChangeText={(t: string) => setSearchText(t)}
        value={searchText}
      />
      {searchText !== '' ? (
        <Button style={styles.clearButton} onPress={() => setSearchText('')}>
          <AntDesign name="close" style={styles.icon} />
        </Button>
      ) : (
        <View style={styles.clearButton}>
          <AntDesign name="search1" style={styles.icon} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'center',
    height: 50,
    marginHorizontal: 15,
    marginVertical: 5,
    backgroundColor: Colors.gray,
  },
  icon: {
    color: Colors.gray1,
    alignSelf: 'center',
    textAlignVertical: 'center',
    textAlign: 'center',
    fontSize: 30,
  },
  input: {
    paddingLeft: 10,
    fontSize: 14,
  },
  clearButton: {
    backgroundColor: 'transparent',
    elevation: 0,
    width: 65,
    height: 50,
    justifyContent: 'center',
    padding: 0,
  },
  pickerWrapper: {
    marginHorizontal: 10,
  },
  pickerIcon: {
    right: -15,
    height: '100%',
    justifyContent: 'center',
    alignSelf: 'center',
    color: Colors.gray2,
  },
  inputPicker: {
    backgroundColor: 'transparent',
    fontSize: 14,
    color: Colors.gray2,
  },
});

SearchBar.defaultProps = {
  searchText: '',
  setSearchText: () => {},
  selectedItem: 'anime',
  onChaneSelectedItem: () => {},
};

SearchBar.propTypes = {
  searchText: PropTypes.string,
  setSearchText: PropTypes.func,
  selectedItem: PropTypes.string,
  onChangeSelectedItem: PropTypes.func,
};

export default SearchBar;
