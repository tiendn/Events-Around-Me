import React from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ListView,
  Image,
  TouchableHighlight,
  NavigatorIOS,
  Button
} from 'react-native';
import {getFbRequest,postFbRequest} from '../providers/FBRequest.js';
const Status = {
  Attending : 'attending',
  Declined : 'declined'
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
var pathLocationSearch = 'search?q=hanoi&type=event&center='+latitude+','+longtitude+'&distance=10000&fields=id,name,place,start_time,end_time,rsvp_status,cover&limit=50';
var pathEventsSearch = 'search?q='+keyword+'&type=event&fields=id,name,place,start_time,end_time,rsvp_status,cover&limit=50';
var pathMyEvents = 'me/events?fields=id,name,place,start_time,end_time,rsvp_status,cover&limit=50';
export default class EventsAround extends React.Component{
  constructor(){
    super();
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });
    this.state = ({
      dataSource: ds.cloneWithRows(['row1', 'row2']),
      eventsData : []
    })
  }
  componentWillMount(){
    this._getEvents(pathMyEvents);
  }
  /**
   * Change status in event
   * @param {*} eventId 
   * @param {*} param 
   */
  changeRSVPStatus(eventId,param){
    let path = eventId + param;
    postFbRequest(path, (error, responseData) => {
        if (error) {
          console.log('Error fetching data: ' , error);
        } else {
          console.log('Success fetching ddata: ' , responseData);
        }
    });
  }
  /**
   * Store data
   * @param {*} error 
   * @param {*} responseData 
   */
  _getData(error,responseData){
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(responseData.data),
      eventsData : responseData
    })
  }
  /**
   * Get GraphAPI from service
   * @param {*} path 
   */
  _getEvents(path){
    getFbRequest(path,(error,responseData) => {this._getData(error,responseData)});
  }
  
  /**
   * Render result
   * @param {*} rowData 
   */
  _renderRow(rowData){
    var cover = Object.assign({},rowData.cover);
        return(
          <View>
            <Image
              style = {{ width: 100 , height: 100}}
              source={{uri: cover.source}}
              defaultSource = {require('.././assets/img/blank-event.png')}
            />
            <Text>
              {rowData.name}
            </Text>
            <Button
              onPress = {() => this.changeRSVPStatus(rowData.id,Status.Attending)}
              title = "Attending"
              color ="#841584"
              accessbilityLabel = " Attending this event"
            />
          </View>

        )
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
  render(){
    return (
      <View>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={(rowData) => this._renderRow(rowData)}
         />
      </View>
    )
  }

}
