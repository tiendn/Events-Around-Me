import React from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  Text
}
  from 'react-native'
import { connect } from 'react-redux';
import { getQuerySearch } from '../actions/';

const SearchBar = (props) => {
  function dispatchText(text){
    // console.log(text)
    // props.dispatch(getQuerySearch(text));
  }
  return (
    <TextInput
      autoCapitalize="none"
      placeholder="Enter text to see events"
      autoCorrect={true}
      onBlur={(text) => console.log("a",text)}
      onChangeText={(text) => dispatchText(text)}
      onSubmitEditing={(text) => console.log("a")}
      clearButtonMode = {'while-editing'}
      maxLength={40}
      style={styles.searchInput}
    />
  )
}

const styles = StyleSheet.create({
  searchInput: {
    height: 40,
    borderWidth: 0.5,
    borderColor: '#0f0f0f',
    fontSize: 13,
    paddingVertical: 4,
    paddingHorizontal: 12
  },
})

export default connect()(SearchBar)
// export default SearchBar;