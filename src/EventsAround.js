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
      imagesData : [],
      eventsData : []
    })
  }
  _getData(responseData){
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(responseData.data),
      eventsData : responseData
    })
  }
  _addRequest(pathEvents){
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
          return responseData;
          // $scope._getData(responseData);
        }
      },
    )).start();
  }
  _getEventsAround(){
    var $scope = this;
    var pathEvents = '/search?q=Hanoi&type=event';
    // var pathEvents = '1898374417065874?fields=description,photos,images}'
    console.log(pathEvents)
    var responseData = this._addRequest(pathEvents)
    // var pathEvents = 'me/events';

  }
  _getImagesEvent(){

  }
  componentWillMount(){
    this._getEventsAround();
    this._getImagesEvent();
    this._renderRow = this._renderRow.bind(this)

  }
  _renderRow(rowData){
    // <TouchableHighlight onClick={ () => alert("Click")}>
        return(
          <View>

            <Text>
              {rowData.name}
            </Text>
          </View>
        )
    // </TouchableHighlight>

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
