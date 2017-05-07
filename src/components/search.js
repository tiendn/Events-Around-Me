// Sort
// Fetch
import React from 'react';
import { StyleSheet, TextInput } from 'react-native';
import { connect } from 'react-redux';
import { getQuerySearch } from '../actions/eventActions';


const Search = (props) => {

    return (
        <TextInput
            autoCapitalize="none"
            placeholder="Enter text to see events"
            autoCorrect={false}
            onEndEditing={(event) => props.dispatch(getQuerySearch(event.nativeEvent.text))}
            clearButtonMode={'while-editing'}
            maxLength={40}
            style={styles.searchInput}
        />
    )
}

const styles = StyleSheet.create({
    // Should edit css
  searchInput: {
    marginTop: 70,
    height: 40,
    borderWidth: 0.3,
    borderBottomColor: '#0f0f0f',
    fontSize: 13,
    paddingVertical: 4,
    paddingHorizontal: 12
  },
})


export default connect()(Search);