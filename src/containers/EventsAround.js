import React from 'react';
import { View, Text } from 'react-native'
import { getFbRequest, postFbRequest } from '../providers/FBRequest.js';
import { Events } from '../components/Events';
const Status = {
  Attending: 'attending',
  Declined: 'declined'
}
/**
 * Config 
 */

var latitude = 0;
var longtitude = 0;
var keyword = 'Hanoi';
/**
 * Path event send to service and request to Facebook GraphAPI
 */
var fields = 'id,name,place,start_time,end_time,rsvp_status,cover,category,attending_count';
var pathLocationSearch = 'search?q=hanoi&type=event&center=' + latitude + ',' + longtitude + '&distance=10000&fields=' + fields + '&limit=50';
var pathEventsSearch = 'search?q=' + keyword + '&type=event&fields=' + fields + '&limit=50';
var pathMyEvents = 'me/events?fields=' + fields + '&limit=50';

/**
 * 
 */
export default class EventsAround extends React.Component {
  constructor() {
    super();
    this.state = ({
      eventsData: []
    })
    // this._shareText = this._shareText.bind(this);
  }
  componentWillMount() {
    // this._getEvents(pathMyEvents);
    this._getEvents(pathEventsSearch);
  }
  /**
   * Change status in event
   * @param {*} eventId 
   * @param {*} param 
   */
  changeRSVPStatus(eventId, param) {
    let path = eventId + param;
    postFbRequest(path, (error, responseData) => {
      if (error) {
        console.log('Error fetching data: ', error);
      } else {
        console.log('Success fetching ddata: ', responseData);
      }
    });
  }
  /**
   * Store data
   * @param {*} error 
   * @param {*} responseData 
   */
  _getData(error, responseData) {
    // Sort data by near time
    var data = responseData.data.sort((a, b) => {
      let last = new Date(a.start_time);
      let current = new Date(b.start_time);
      return last - current;
    });
    // If not my events, filter events has expired
    data = data.filter((item) => {
      let currentDate = new Date();
      let endTime = new Date(item.end_time);
      let startTime = new Date(item.start_time);
      console.log(currentDate > startTime);
      return  currentDate < startTime ? item.end_time != undefined ? endTime > currentDate ? item : undefined : undefined : undefined;
    });

    // Set data to state
    this.setState({
      // dataSource: this.state.dataSource.cloneWithRows(data),
      eventsData: data
    })
    console.log(this.state.eventsData);
  }

  /**
   * Get GraphAPI from service
   * @param {*} path 
   */
  _getEvents(path) {
    getFbRequest(path, (error, responseData) => {
      this._getData(error, responseData);
      // console.log('Success fetching ddata: ', responseData);
    });
  }
  /**
   * Push navigation to new detail page
   */
  _handleNavigationRequest() {
    this.refs.nav.push({
      component: EventDetail,
      title: 'Genius',
    });
  }

  /**
   * Render
   */
  render() {
    // console.log(this.state.eventsData.length != 0);
    if (this.state.eventsData.length !== 0) {
      return (
        <Events eventsData={this.state.eventsData} />
      )
    } else {
      return (
        <Text style={{ marginTop: 100 }}> Nothing </Text>
      )
    }


  }
}
