// Sort
// Fetch
import React from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import { connect } from 'react-redux';
import { getQuerySearch } from '../actions/eventActions';
import Icon from 'react-native-vector-icons/Ionicons';

const Search = (props) => {
    console.log(props);
    let { dispatch, navigator } = props;
    return (
        <View style={styles.pageSearch}>
            <View style={styles.searchContainer}>
                <View style={styles.icon}>
                    <Icon name="ios-search" size={25} color='rgb(175,174,175)'  style = {{textAlign: 'center'}}/>
                </View>
                <TextInput
                    autoFocus={true}
                    autoCapitalize="none"
                    placeholder="Enter text to see events"
                    autoCorrect={false}
                    onEndEditing={(event) => dispatch(getQuerySearch(event.nativeEvent.text))}
                    clearButtonMode={'while-editing'}
                    maxLength={40}
                    onBlur={() => navigator.pop()}
                    style={styles.searchInput}
                />
            </View>
        </View>


    )
}

const styles = StyleSheet.create({
    // Should edit css
    pageSearch: {
        flex: 1,
    },
    searchContainer: {
        flexDirection: 'row',
        marginTop: 50,
        backgroundColor: 'rgb(175,174,175)',
        paddingVertical: 4,
        paddingHorizontal: 4
    },
    icon: {
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        flex: 1,
        // borderBottomWidth : 0.3,
        // borderLeftWidth: 0.3,
        // borderTopWidth: 0.3,
        // borderColor: '#0f0f0f',
        backgroundColor: 'white'
    },
    searchInput: {
        flex: 7,
        backgroundColor: 'white',
        height: 40,
        // borderWidth: 0.3,
        // borderLeftWidth: 0,
        // borderBottomColor: '#0f0f0f',
        fontSize: 13,
        paddingHorizontal: 10

    },
})

const mapStateToProps = (state) => {
    return {
        query: state.eventState.query
    }
}


export default connect(mapStateToProps)(Search);