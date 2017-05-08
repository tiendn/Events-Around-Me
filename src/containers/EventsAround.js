import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';
import { connect } from 'react-redux';
import { fetchData } from '../middleware/eventMiddleware';
import {
    ME,
    SETTINGS,
    EVENTS_SEARCH,
    MFETCH_DATA,
    SFETCH_DATA
} from '../commons/constants';
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
        global.currentEventType = ME;
    }
    componentWillMount() {
        this._getData();
    }
    componentWillReceiveProps(nextProps) {
        console.log("************* receivev Props *********** ", nextProps)
        if (nextProps.eventType !== global.currentEventType) {
            global.currentEventType = nextProps.eventType;
            this._getData(nextProps);
        }
    }
    _getData(props = this.props) {
        if (props.eventType === ME)
            props.dispatch(fetchData(MFETCH_DATA, 'me/events?'));
        else if (props.eventType === EVENTS_SEARCH)
            props.dispatch(fetchData(SFETCH_DATA, 'me/events?'));
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
        if (this.props.eventType === EVENTS_SEARCH && this.props.isLogin)
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
    _renderDataContent() {
        console.log(this.props.spayload)
        if (this.props.isLoadDone) {
            if (this.props.eventType === EVENTS_SEARCH) {
                if (this.props.spayload.data !== undefined)
                    if (this.props.spayload.data.length > 0) return (
                        <ListEvents data={this.props.spayload.data} navigator={this.props.navigator} />
                    )
            }
            else if (this.props.eventType === ME) {
                if (this.props.mpayload.data !== undefined)
                    if (this.props.mpayload.data.length > 0) return (
                        <ListEvents data={this.props.mpayload.data} navigator={this.props.navigator} />
                    )
            }
        }

    }
    render() {
        // console.log("********* Render *********8")
        return (
            <View style={styles.container}>
                <ActivityIndicator
                    style={styles.activityIndicator}
                    animating={!this.props.isLoadDone}
                    size="large"
                />
                {
                    !this.props.isLoadDone
                    && <View style={{ position: 'absolute', zIndex: 9999, opacity: 0.1, height: '100%', width: '100%' }} />
                }
                {this._renderLogin()}
                {this._renderBtnSearch()}
                {this._renderDataContent()}
                {/*<ListEvents navigator={this.props.navigator} />*/}
            </View>
        )
    }
}

mapStateToProps = (state) => {
    // console.log(state)
    return {
        query: state.eventState.query,
        eventType: state.appGlobalState.eventType,
        isLogin: state.appGlobalState.isLogin,
        isLoadDone: state.eventState.isLoadDone,
        spayload: state.eventState.spayload,
        mpayload: state.eventState.mpayload
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