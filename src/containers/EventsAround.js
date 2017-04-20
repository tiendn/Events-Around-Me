import React from 'react';
import { View, Text } from 'react-native'
import { getFbRequest, postFbRequest } from '../providers/FBRequest.js';
import { Events } from '../components/Events';
import  SearchBar  from '../components/SearchBar';
import { connect } from 'react-redux';

/**
 * 
 */
const TYPE_EVENT = {
  MyEvent: 1,
  Popular: 2
}

/**
 * Config 
 */

const latitude = 0;
const longtitude = 0;
const keyword = 'Hanoi';
/**
 * Path event send to service and request to Facebook GraphAPI
 */
const fields = 'id,name,place,start_time,end_time,rsvp_status,cover,category,attending_count,description,ticket_uri';
/**
 * 
 */

class EventsAround extends React.Component {
  constructor(props) {
    super(props);
    console.log(props)
    this.state = ({
      eventsData: [],
      type: this.props.type,
      query: '',
    })
  }
  componentDidMount(){
    this.switchEvent();
  }
  componentWillReceiveProps(props){
    console.log("WWW")
    this.setState({
      type: props.type
    })
    this.switchEvent(props);
  }
  switchEvent(props : ?Object = {query: 'Hanoi'}){
    console.log(props);
    console.log(this.state)
    let keyword = props.query;
    let pathLocationSearch = 'search?q=' + keyword + '&type=event&center=' + latitude + ',' + longtitude + '&distance=10000&fields=' + fields + '&limit=50';
    let pathEventsSearch = 'search?q=' + keyword + '&type=event&fields=' + fields + '&limit=50';
    let pathMyEvents = 'me/events?fields=' + fields + '&limit=50';
    switch (this.state.type) {
      case TYPE_EVENT.Popular:
        this._getEvents(pathEventsSearch);
        break;
      case TYPE_EVENT.MyEvent:
        console.log("My event")
        this._getEvents(pathMyEvents);
        break;
      default:
        this._getEvents(pathEventsSearch);
    }
  }
  /**
   * Sort data
   * @param {*} responseData 
   */
  sortDataByNearTime(responseData) {
    let data = Object.assign([], responseData.data);
    if (this.state.type !== TYPE_EVENT.MyEvent) {
      data = data.sort((a, b) => {
        let last = new Date(a.start_time);
        let current = new Date(b.start_time);
        return last - current;
      });
    }
    else if (this.state.type === TYPE_EVENT.MyEvent) {
      data = data.sort((a, b) => {
        let last = new Date(a.start_time);
        let current = new Date(b.start_time);
        return current - last;
      });
    }
    return data;
  }
  /**
   * Check expired
   * @param {*} data 
   */
  checkExpired(inputData) {
    let outputData = Object.assign([], inputData);
    if (this.state.type !== TYPE_EVENT.MyEvent) {
      // Sort data by near time
      outputData = outputData.filter((item) => {
        let currentDate = new Date();
        let endTime = new Date(item.end_time);
        let startTime = new Date(item.start_time);
        return currentDate < startTime ? item.end_time != undefined ?
          endTime > currentDate ? item : undefined : undefined : undefined;
      });
    }
    return outputData;
  }
  /**
   * Format time -- mutate value 
   * @param {*} data 
   */
  formatTime(inputData) {
    let outputData = Object.assign([], inputData);
    let start_time;
    const options = {
      weekday: 'short', month: 'short', day: 'numeric',
      hour: 'numeric', minute: 'numeric'
    };
    options.timeZone = 'UTC';
    options.timeZoneName = 'short';
    if (outputData.start_time !== "")
      outputData.start_time = new Date(outputData.start_time).toLocaleDateString('en-US', options)
        .slice(0, -3).toUpperCase();
    return outputData;
  }
  /**
   * Store data
   * @param {*} responseData 
   */
  _getData(responseData) {
    console.log(responseData)

    let data = this.sortDataByNearTime(responseData); // Sort data by near time

    data = this.checkExpired(data); // If not my events, filter events has expired

    data = data.map(item => this.formatTime(item)); // Format time

    this.setState({
      eventsData: data
    }) // Set data to state
  }

  /**
   * Get GraphAPI from service
   * @param {*} path 
   */
  _getEvents(path) {
    getFbRequest(path, (error, responseData) => {
      // console.log('Success fetching ddata: ', responseData);
      if (error === null)
        this._getData(responseData);
    });
  }

  /**
   * Render
   */
  render() {
      return (
        <View>
          { this.state.type !== TYPE_EVENT.MyEvent && <SearchBar /> }
          { this.state.eventsData.length !== 0 
            ? <Events eventsData={this.state.eventsData} {...this.props} /> 
            : <Text style={{ marginTop: 100 }}> Nothing </Text>
          }
        </View>
      )

  }
}

mapStateToProps = (state) => {
  return {
    query: state.search.query
  }
}

export default connect (mapStateToProps)(EventsAround)