import React from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ListView,
  Image,
  TouchableHighlight
} from 'react-native';
const FBSDK = require('react-native-fbsdk');
const {
  GraphRequest,
  GraphRequestManager,
} = FBSDK;
const graphRequestManager = new GraphRequestManager();
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
    // this._renderRow = this._renderRow.bind(this);
    // this._getData = this._getData.bind(this);
    // this._getEventsAround = this._getEventsAround.bind(this);
  }
  _getData(responseData){
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(responseData.data),
      eventsData : responseData
    })
  }
  // _getEvents(pathEvents){
  //   graphRequestManager.addRequest(new GraphRequest(
  //     pathEvents,
  //     null,
  //     function(error: ?Object, responseData: ?Object) {
  //       if (error) {
  //         console.log(pathEvents)
  //         console.log('Error fetching data: ' , error);
  //       } else {
  //         console.log('Success fetching ddata: ' , responseData);
  //         // Return data to state
  //         return responseData;
  //         // $scope._getData(responseData);
  //       }
  //     },
  //   )).start();
  // }
  _getEventsAround(){
    var $scope = this;
    // var pathEvents = '/search?q=Hanoi&type=event';
    // var pathEvents = 'me/events';
// &fields=id,name,place,start_time,end_time,cover
    var pathEvents = 'search?q=Hanoi&type=event&fields=id,name,place,start_time,end_time,rsvp_status,cover';
    graphRequestManager.addRequest(new GraphRequest(
      pathEvents,
      null,
      function(error: ?Object, responseData: ?Object) {
        if (error) {
          console.log(pathEvents)
          console.log('Error fetching data: ' , error);
        } else {
          console.log('Success fetching ddata: ' , responseData);
          // Return data to state
          $scope._getData(responseData);
        }
      },
    )).start();

  }

  componentWillMount(){
    this._getEventsAround();

  }
  _renderRow(rowData){
    var cover = Object.assign({},rowData.cover);
    // console.log(cover.source);
        return(

          <View >
            <Image
              style = {{ width: 100 , height: 100}}
              source={{uri: cover.source}}
            />
            <Text>
              {rowData.name}
            </Text>
          </View>

        )

  }

  render(){
    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={(rowData) => this._renderRow(rowData)}
       />
    )
  }

}
