import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity
} from 'react-native';
import { connect } from 'react-redux';
import Login from '../components/login';
class Settings extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity
                    style={[styles.about, styles.btn]}
                >
                    <Text style={styles.text}>About</Text>
                </TouchableOpacity>
                <Login  />
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 60,
        backgroundColor: '#e9ebee'
    },
    login: {
        // paddingTop: 100,
    },
    btn: {
        backgroundColor: 'white',
        width: '100%',
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: '#dfe0e4',
        paddingVertical: 10,
        justifyContent: 'center',
        alignSelf: 'center',
        alignItems: 'center',
        marginBottom: '5%'
    },
    text: {
        color: '#5890ff'
    },
})
export default connect()(Settings)