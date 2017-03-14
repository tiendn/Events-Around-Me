import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ListView,
  Image,
  TouchableHighlight,
  NavigatorIOS,
  TouchableOpacity,
  PixelRatio
  // Button
} from 'react-native';
import { getFbRequest, postFbRequest } from '../providers/FBRequest.js';
// import { Container, Content, Card, CardItem, Left, Body, Thumbnail, Button, Icon, Right,Text } from 'native-base';
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
var pathLocationSearch = 'search?q=hanoi&type=event&center=' + latitude + ',' + longtitude + '&distance=10000&fields='+fields+'&limit=50';
var pathEventsSearch = 'search?q=' + keyword + '&type=event&fields='+fields+'&limit=50';
var pathMyEvents = 'me/events?fields='+fields+'&limit=50';
export default class EventsAround extends React.Component {
  constructor() {
    super();
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });
    this.state = ({
      dataSource: ds.cloneWithRows(['row1', 'row2']),
      eventsData: []
    })
  }
  componentWillMount() {
    console.log("1")
    this._getEvents(pathMyEvents);
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
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(responseData.data),
      eventsData: responseData
    })
  }
  /**
   * Get GraphAPI from service
   * @param {*} path 
   */
  _getEvents(path) {
    getFbRequest(path, (error, responseData) => {
      this._getData(error, responseData);
      console.log('Success fetching ddata: ', responseData);
    });
  }

  /**
   * Render result
   * @param {*} rowData 
   */
  _renderRow(rowData) {
    if (rowData !== undefined && rowData !== null) {
      // Cover
      var cover = Object.assign({}, rowData.cover);
      // Datetime
      var options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric' };
      options.timeZone = 'UTC';
      options.timeZoneName = 'short';
      let start_time = "";
      if (rowData.start_time !== "")
        start_time = new Date(rowData.start_time).toLocaleDateString('en-US', options).slice(0, -3).toUpperCase();
      // Place
      var place = rowData.place == undefined ? '' : rowData.place.name; 
      // Category
      // console.log(rowData.category)
      var category = rowData.category == undefined ? '' : '#'+rowData.category
      return (
        <View style={styles.card}>
          <TouchableOpacity >
            <Image
              style={styles.image}
              source={{ uri: cover.source }}
              defaultSource={require('.././assets/img/not_available.png')}
            />
            

            <View style={styles.cardContent}>
              <Text style = {styles.attending}>
                ##{rowData.attending_count}
              </Text>
              <Text style={[styles.startTime, styles.text]}>
                {start_time}
              </Text>
              <Text numberOfLines={1} style={[styles.title , styles.text]} >
                {rowData.name}
              </Text>
              <Text style={ [styles.place , styles.text]} >
                {place}
              </Text>
            </View>
            <View style = {styles.cardFooter}>
              <Text>
                {category}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      )
    }

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
    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={(rowData) => this._renderRow(rowData)}
        style={styles.body}
      />
    )
  }
}
const styles = StyleSheet.create({
  attending : {
    position: 'absolute',
    top : 20,
    right : 50,
    backgroundColor : '#4080ff',
    // flex: 0.6
  },
  body: {
    backgroundColor: '#dddddd'
  },
  text: {
    paddingVertical: 2,
  },
  card: {
    marginVertical: 15,
    marginHorizontal: 6,
    flex: 1,
    borderRadius: 2,
    flexWrap: 'wrap',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    backgroundColor: '#fff',
    borderColor: '#ccc',
    borderWidth: (1 / PixelRatio.getPixelSizeForLayoutSize(1)),
    shadowOpacity: 0.1,
    shadowRadius: 1.5,
    elevation: 3,

  },
  cardContent: {
    position : 'relative',
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor : '#ccc',
  },
  cardFooter :{
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  image : {
    flex: 1, 
    height: 140,
    resizeMode : 'stretch' 
  },
  startTime: {
    fontSize: 14
  },
  title: {
    fontSize: 16,
    fontWeight: "bold"
  },
  place: {
    fontSize: 14
  },


});
