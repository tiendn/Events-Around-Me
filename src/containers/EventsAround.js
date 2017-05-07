import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';
// import { getFbRequest, postFbRequest } from '../providers/FBRequest.js';
// import { Events } from '../components/Events';
// import SearchBar from '../components/SearchBar';
import { connect } from 'react-redux';
import { fetchData } from '../middleware/eventMid';
import { ME, SETTINGS, EVENTS_SEARCH } from '../commons/constants';
import ListEvents from '../components/event/listevents';
import Login from '../components/login';
import Search from '../components/search';
// import Events from './Events';
const latitude = 0;
const longtitude = 0;
const keyword = 'Hanoi';
/**
 * Path event send to service and request to Facebook GraphAPI
 */
// const fields = 'id,name,place,start_time,end_time,rsvp_status,cover,category,attending_count,description,ticket_uri';


class EventsAround extends React.Component {
    constructor(props) {
        super(props);
    }
    componentWillMount(){
        this._getData();
    }
    _getData(){
        if (this.props.eventType === ME)
            this.props.dispatch(fetchData('me/events?'));
    }
    openSearch() {
        this.props.navigator.push({
            component: Search,
            title: 'Search',
            // props: rowData,
        })
    }
    _renderLogin() {
        if (!this.props.isLogin)
            return <Login />
    }
    _renderBtnSearch() {
        if (this.props.eventType === EVENTS_SEARCH)
            return (
                <TouchableOpacity
                    onPress={() => this.openSearch()}
                    style={styles.btnSearch}
                >
                    <Icon
                        name="ios-search"
                        color='gray'
                        size={35}
                    />
                </TouchableOpacity>
            )
    }
    render() {
        return (
            <View style={styles.container}>
                {this._renderLogin()}
                {this._renderBtnSearch()}
                {/*<ListEvents navigator={this.props.navigator} />*/}
            </View>
        )
    }
}

mapStateToProps = (state) => {
    return {
        query: state.eventState.query,
        eventType: state.appGlobalState.eventType,
        isLogin: state.appGlobalState.isLogin
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    activityIndicator: {
        position: 'absolute',
        justifyContent: 'center',
        top: '50%',
        alignSelf: 'center',
        alignItems: 'center'
    },
    btnSearch: {
        position: 'absolute',
        // width: '10%',
        // height: '10%',
        right: '5%',
        bottom: '10%',
        // width: 50,
        // height: 50,
        // borderRadius : 50,
        // borderRadius: 100/2,
        // backgroundColor: 'green'
    }
})
export default connect(mapStateToProps)(EventsAround)