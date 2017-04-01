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
  Share
} from 'react-native';
import CardContent from './CardContent';
import CardFooter from './CardFooter';

export class Events extends React.Component {
  constructor(props) {
    super(props);
    this.onEventClick = this.onEventClick.bind(this);
  }
  /**
   * 
   */
  componentWillMount(){
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });
    const eventsData = this.props.eventsData;
    this.setState({
      dataSource: ds.cloneWithRows(eventsData),
      eventsData: eventsData
    })
  }
  onEventClick(event,{id}){
    event.preventDefault();
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
      const content = {
        name : rowData.name,
        startTime : rowData.start_time,
        place : rowData.place
      }
      const footer = {
        id: rowData.id,
        name : rowData.name,
        attending : rowData.attending_count,
        category: rowData.category
      }
      // Render
      return (
        <View style={styles.card} key={rowData.id} >
          <TouchableOpacity onPress = {(event) => this.onEventClick(event,rowData)} >
            {/*Image*/}
            <Image
              style={styles.image}
              source={{ uri: cover.source, cache: 'only-if-cached' }}
              defaultSource={require('./img/not-available.png')}
            />
            <CardContent rowData = {content} />
            <CardFooter rowData = {footer} />
          </TouchableOpacity>
        </View>
      )
    }
  }
  
  render() {
    if (this.state.dataSource.length !== 0) {
      return (
        <ListView
          dataSource={this.state.dataSource}
          renderRow={(rowData) => this._renderRow(rowData)}
          style={styles.body}
        />
      );
    }
    else
      return (
        <Text> Nothing here </Text>
      )
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
    borderColor: '#ccc',
    borderWidth: (1 / PixelRatio.getPixelSizeForLayoutSize(1)),
    shadowOpacity: 0.1,
    shadowRadius: 1.5,
    elevation: 3,

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