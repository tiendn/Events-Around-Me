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
  constructor(props) {
    super(props);
    console.log(this.props.type);
    this.state = ({
      eventsData: [],
      type: this.props.type
    })
    console.log(this.state.type)
    // this._shareText = this._shareText.bind(this);
  }
  componentWillMount() {
    switch (this.state.type) {
      case TYPE_EVENT.Popular:
        console.log(pathEventsSearch)
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
  _getData(responseData) {
    

    // If not my events, filter events has expired
    if (this.state.type != TYPE_EVENT.MyEvent) {
      // Sort data by near time
      var data = responseData.data.sort((a, b) => {
        let last = new Date(a.start_time);
        let current = new Date(b.start_time);
        return last - current;
      });
      data = data.filter((item) => {
        let currentDate = new Date();
        let endTime = new Date(item.end_time);
        let startTime = new Date(item.start_time);
        return currentDate < startTime ? item.end_time != undefined ? endTime > currentDate ? item : undefined : undefined : undefined;
      });
    }
    else if (this.state.type == TYPE_EVENT.MyEvent){
      // Sort data by newest time
      var data = responseData.data.sort((a, b) => {
        let last = new Date(a.start_time);
        let current = new Date(b.start_time);
        return current - last;
      });
    }
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
      console.log('Success fetching ddata: ', responseData);
      if (error === null)
        this._getData(responseData);
      
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
