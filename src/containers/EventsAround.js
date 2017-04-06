import React from 'react';
import { View, Text } from 'react-native'
import { getFbRequest, postFbRequest } from '../providers/FBRequest.js';
import { Events } from '../components/Events';
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

var latitude = 0;
var longtitude = 0;
var keyword = 'BKHUP';
/**
 * Path event send to service and request to Facebook GraphAPI
 */
var fields = 'id,name,place,start_time,end_time,rsvp_status,cover,category,attending_count,description,ticket_uri';
var pathLocationSearch = 'search?q=hanoi&type=event&center=' + latitude + ',' + longtitude + '&distance=10000&fields=' + fields + '&limit=50';
var pathEventsSearch = 'search?q=' + keyword + '&type=event&fields=' + fields + '&limit=50';
var pathMyEvents = 'me/events?fields=' + fields + '&limit=50';

/**
 * 
 */
export default class EventsAround extends React.Component {
  constructor(props) {
    super(props);
    console.log(props)
    this.state = ({
      eventsData: [],
      type: this.props.type
    })
    // this._shareText = this._shareText.bind(this);
  }
  componentWillMount() {
    switch (this.state.type) {
      case TYPE_EVENT.Popular:
        this._getEvents(pathEventsSearch);
        break;
      case TYPE_EVENT.MyEvent:
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
checkExpired(inputData){
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
  console.log(this.state.eventsData);
  if (this.state.eventsData.length !== 0) {
    return (
      <Events eventsData={this.state.eventsData} {...this.props} />
    )
  } else {
    return (
      <Text style={{ marginTop: 100 }}> Nothing </Text>
    )
  }


}
}
