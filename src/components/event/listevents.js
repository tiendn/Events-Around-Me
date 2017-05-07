import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableHighlight,
  NavigatorIOS,
  TouchableOpacity,
  PixelRatio,
  TextInput,
  Share
} from 'react-native';
import CardContent from './cardcontent';
import CardFooter from './cardfooter';
// import EventDetail from './detail/eventdetail';


export default class ListEvents extends React.Component {
  constructor(props) {
    super(props);
    console.log(props)
    this.onEventClick = this.onEventClick.bind(this);
  }
  componentWillMount() {
    // if (eventsData.length > 0)
    //   this.setState({
    //   })
  }
  
  onEventClick(event, item) {
    event.preventDefault();
    this.props.navigator.push({
      component: EventDetail,
      title: item.name,
      passProps: item,
    })
    // console.log(id);
  }
  // 

  /**
   * Render result
   * @param {*} item 
   */
  _renderItem(item) {
    if (item !== undefined && item !== null) {
      // Cover
      const cover = Object.assign({}, item.cover);
      // Render
      return (
        <View style={styles.card} key={item.id} >
          <TouchableOpacity onPress={(event) => this.onEventClick(event, item)} activeOpacity={0.7} >
            {/*Image*/}
            {/*<Image
              style={styles.image}
              source={{ uri: cover.source }}
              defaultSource={require('./img/not-available.png')}
            />*/}
            <CardContent {...item} />
            {/*<CardFooter {...item} />*/}
          </TouchableOpacity>
        </View>
      )
    }
  }

  render() {
    return (
      <View style = {styles.container}>
        {this.props.data.length !== 0 &&
           <FlatList
            data={this.props.data}
            renderItem={({item}) => this._renderItem(item)}
            style={styles.body}
          />
        }
      </View>
    );
  }


}

const styles = StyleSheet.create({
  container:{
    paddingBottom: 30
  },
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
  image: {
    flex: 1,
    resizeMode: 'cover',
    height: 160,
    // resizeMode: 'stretch'
  },
});