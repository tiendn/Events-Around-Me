import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ListView,
  Image,
  TouchableHighlight,
  NavigatorIOS,
  TouchableOpacity,
  PixelRatio,
  TextInput,
  Share
} from 'react-native';
import CardContent from './CardContent';
import CardFooter from './CardFooter';
import EventDetail from './EventDetail';

const ds = new ListView.DataSource({
  rowHasChanged: (r1, r2) => r1 !== r2
});
export class Events extends React.Component {
  constructor(props) {
    super(props);
    console.log(props)
    this.onEventClick = this.onEventClick.bind(this);
    this.state = ({
      dataSource: []
    })
  }
  componentDidMount(){
    let eventsData = this.props.eventsData
    if (eventsData.length > 0 )
       this.setState({
          dataSource: ds.cloneWithRows(eventsData),
        })
  }
  /**
   * 
   */
  componentWillReceiveProps(props) {
    console.log(props)
    
    const eventsData = props.eventsData;
    this.setState({
      dataSource: ds.cloneWithRows(eventsData),
    })
  }
  onEventClick(event, rowData) {
    event.preventDefault();
    this.props.navigator.push({
      component: EventDetail,
      title: rowData.name,
      passProps: rowData,
    })
    // console.log(id);
  }
  // 
  
  /**
   * Render result
   * @param {*} rowData 
   */
  _renderRow(rowData) {
    if (rowData !== undefined && rowData !== null) {
      // Cover
      const cover = Object.assign({}, rowData.cover);
      // Render
      return (
        <View style={styles.card} key={rowData.id} >
          <TouchableOpacity onPress={(event) => this.onEventClick(event, rowData)} activeOpacity = {0.7} >
            {/*Image*/}
            <Image
              style={styles.image}
              source={{ uri: cover.source}}
              defaultSource={require('./img/not-available.png')}
            />
            <CardContent {...rowData} />
            <CardFooter {...rowData} />
          </TouchableOpacity>
        </View>
      )
    }
  }

  render() {
      return (
        <View>
          { this.state.dataSource.length !== 0 
            ? <ListView
              dataSource={this.state.dataSource}
              renderRow={(rowData) => this._renderRow(rowData)}
              style={styles.body}
            />
            : <Text> Loading </Text>
          }
          </View>
      );
  }


}

const styles = StyleSheet.create({
  body: {
    backgroundColor: '#dddddd'
  },
  button: {
    borderLeftWidth: 1,
    borderLeftColor: '#ccc',
    alignItems: 'center',
    justifyContent: 'center'
  },
  card: {
    marginVertical: 10,
    marginHorizontal: 6,
    flex: 1,
    borderRadius: 2,
    flexWrap: 'wrap',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    backgroundColor: '#fff',
    borderWidth: (1 / PixelRatio.getPixelSizeForLayoutSize(1)),
    shadowOpacity: 0.1,
    shadowRadius: 1.5,
    elevation: 3,
    borderColor: '#ccc'

  },
  cardContent: {
    position: 'relative',
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  cardFooter: {

    flexDirection: 'row'
  },
  // searchInput:{
  //   height: 40,
  //   borderWidth: 0.5,
  //   borderColor: '#0f0f0f',
  //   fontSize: 13,
  //   paddingVertical: 4,
  //   paddingHorizontal: 12
  // },
  icon: {
    height: 32,
    width: 32
  },
  interested: {
    flex: 1
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
    height: 160,
    // resizeMode: 'stretch'
  },
  share: {
    flex: 1
  },
  startTime: {
    fontSize: 14
  },
  title: {
    fontSize: 16,
    fontWeight: "bold"
  },
  text: {
    paddingVertical: 2,
  },
  textFooter: {
    flex: 4,
    paddingVertical: 16,
    paddingHorizontal: 12,
  },
  place: {
    fontSize: 14
  },


});