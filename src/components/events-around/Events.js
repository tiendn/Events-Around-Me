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


/**
 * 
 * @param {*} rowData 
 */
const CardContent = (rowData) => (
  <View style={styles.cardContent}>

    <Text style={[styles.startTime, styles.text]}>
      {start_time}
    </Text>
    <Text numberOfLines={1} style={[styles.title, styles.text]} >
      {rowData.name}
    </Text>
    <Text style={[styles.place, styles.text]} >
      {rowData.place == undefined ? '' : rowData.place.name}
    </Text>
  </View>
);
/**
 * 
 * @param {*} rowData 
 */
const CardFooter = (rowData) => (
  <View style={styles.cardFooter}>
    <Text style={styles.textFooter} numberOfLines={1}>
      {rowData.attending_count == undefined ? '' : '#' + rowData.attending_count + ' '}
      {/*</Text>
              <Text>*/}
      {rowData.category == undefined ? '' : '#' + rowData.category}
    </Text>

    <TouchableOpacity
      style={[styles.share, styles.button]}
      onPress={() => { this._shareText(rowData.name) }}
    >
      {/*https://facebook.github.io/react-native/docs/share.html*/}
      <Image
        style={styles.icon}
        source={require('./img/share.png')}
      />
    </TouchableOpacity>
    <TouchableOpacity style={[styles.interested, styles.button]}>
      <Image
        style={styles.icon}
        source={require('./img/interested.png')}
      />
    </TouchableOpacity>
  </View>
)
export default class Events extends Component {
  constructor(props) {
    super(props);
    // const ds = new ListView.DataSource({
    //   rowHasChanged: (r1, r2) => r1 !== r2
    // });
    // console.log(this.props)
    // this.state = ({
    //   eventsData : this.props.eventsData,
    // })
  }
  // componentWillReceiveProps(nextProps) {
  //   this.setState({
  //     dataSource: this.state.dataSource.cloneWithRows(nextProps.eventsData),
  //   })
  // }
  /**
   * Render result
   * @param {*} rowData 
   */
  _renderRow(rowData) {
    if (rowData !== undefined && rowData !== null) {
      // Cover
      var cover = Object.assign({}, rowData.cover);
      // Datetime
      var options = {
        weekday: 'short', year: 'numeric', month: 'short', day: 'numeric',
        hour: 'numeric', minute: 'numeric'
      };
      options.timeZone = 'UTC';
      options.timeZoneName = 'short';
      if (rowData.start_time !== "")
        start_time = new Date(rowData.start_time).toLocaleDateString('en-US', options)
          .slice(0, -3).toUpperCase();
      // Render
      return (
        <View style={styles.card} key={rowData.id} >
          <TouchableOpacity >
            {/*Image*/}
            <Image
              style={styles.image}
              source={{ uri: cover.source, cache: 'only-if-cached' }}
              defaultSource={require('./img/no_available.png')}
            />
            {/*<CardContent rowData ={ ...rowData} />*/}
            {/*<CardFooter rowData = {...rowData} />*/}

          </TouchableOpacity>
        </View>
      )
    }
  }
  _shareText(name) {
    Share.share({
      message: 'What do you think ?',
      url: 'http://facebook.github.io/react-native/',
      title: name
    }, {
        dialogTitle: 'Share React Native website',
        excludedActivityTypes: [
          'com.apple.UIKit.activity.PostToTwitter'
        ],
        tintColor: 'green'
      })
      .then(() => { console.log("Share successful") })
      .catch((error) => { console.log("Share successful") });
  }
  render() {
    return (
      <View><Text>fddf</Text></View>
    );
  }

}

const styles = StyleSheet.create({
  // attending: {
  //   position: 'absolute',
  //   top:10,
  //   right: 10,
  //   backgroundColor: '#4080ff',
  //   zIndex : 99,

  //   borderRadius : 20 
  //   // flex: 0.6
  // },
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