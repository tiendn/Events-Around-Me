
import React from 'react';
import { View, StyleSheet, Text} from 'react-native';
import {connect} from 'react-redux';
import { } from '../actions/eventActions';
import { fetchData } from '../middleware/eventMid';
import ListEvents from '../components/event/listevents';
// Sort
// Fetch
class Events extends React.Component{
    constructor(props){
        super(props);
    }
    componentWillMount(){
        this._getData();
    }
    _getData(){
        if (this.props.eventType === )
        this.props.dispatch(fetchData('me/events?'));
    }
    render(){
        return(
            <ListEvents data = {this.props.mpayload} navigator = {this.props.navigator} />
        )
    }
    // render(){
    //     return(
    //         <Text> dsfsdf sd </Text>
    //     )
    // }
}

const mapStateToProps = (state) => {
    return {
        query: state.eventState.query,
        eventType : state.appGlobalState.eventType,
        mpayload: state.eventState.mpayload,
        spayload: state.eventState.spayload
    }
}

export default connect(mapStateToProps)(Events);