import React, { Component, PropTypes } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TouchableHighlight,
  MapView,
  ScrollView,
  Modal,
  Linking
} from 'react-native';
// import UIExplorerBlock from './UIExplorerBlock';
import { RSVP_STATUS } from '../containers/common';
import RsvpButton from './RsvpButton';
import DetailModal from './ModalDescription';
import MapModal from './ModalMap';
const styles = StyleSheet.create({
  textContent: {
    paddingHorizontal: 15,
    // justifyContent: 'center',
    // alignItems: 'center',
    // alignSelf: 'center',
  },
  image: {
    resizeMode: 'cover',
    height: 160,
    marginBottom: 15,
    // resizeMode: 'stretch'
  },
  startTime: {
    fontSize: 13,
    marginBottom: 5,
    alignSelf: 'center'
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  ticketUri: {
    fontSize: 13,

  },
  location: {
    paddingHorizontal: 13,
    flex: 1,
    flexDirection: 'row'
  },
  placeContent: {
    flex: 3,
  },
  placeName: {
    fontWeight: 'bold',
    fontSize: 15,

  },
  placeDistance: {
    flex: 1
  },
  rsvpBtnContainer: {
    marginVertical: 10,
    flexDirection: 'row',
    paddingVertical: 8,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5
  },
  rsvpBtnItem: {

  }
})

export default class EventDetail extends Component {
  constructor(props) {
    super(props);
    // console.log(props);
    this.state = {
      modalVisible: false,
    }
  }

  render() {
    const dataDetail = this.props;
    const cover = Object.assign({}, dataDetail.cover);
    // if (!dataDetail.description) {
    //   alert("No des")
    //   dataDetail.description = "No description";
    // }
    // handleClick = () => {
    //   Linking.canOpenURL(this.props.url).then(supported => {
    //     if (supported) {
    //       Linking.openURL(this.props.url);
    //     } else {
    //       console.log('Don\'t know how to open URI: ' + this.props.url);
    //     }
    //   });
    // };

    return (
      <View >
        <ScrollView>
          <Image
            style={styles.image}
            source={{ uri: cover.source, cache: 'only-if-cached' }}
            defaultSource={require('./img/not-available.png')}
          />
          <View style={styles.textContent}>
            <Text style={styles.startTime}>{dataDetail.start_time}</Text>
            <Text style={styles.title} >{dataDetail.name} </Text>
            <Text style={styles.ticketUri}>Ticket: {dataDetail.ticket_uri} </Text>
            <Text style={styles.ticketUri}>Link: facebook.com/{dataDetail.id} </Text>
            <View style={styles.rsvpBtnContainer}>
              <RsvpButton
                style={styles.rsvpBtnItem}
                eventId={dataDetail.id}
                rsvp_status={RSVP_STATUS.Interested}
                currentStatus = {dataDetail.rsvp_status}
              >
                Interested
              </RsvpButton>
              <RsvpButton
                style={styles.rsvpBtnItem}
                eventId={dataDetail.id}
                rsvp_status={RSVP_STATUS.Attending}
                currentStatus = {dataDetail.rsvp_status}
              >
                Going
              </RsvpButton>
              <RsvpButton
                style={styles.rsvpBtnItem}
                eventId={dataDetail.id}
                rsvp_status={RSVP_STATUS.Declined}
                currentStatus = {dataDetail.rsvp_status}
              >
                Ignored
              </RsvpButton>
              <RsvpButton
                style={styles.rsvpBtnItem}
                eventId={dataDetail.id}
                rsvp_status={RSVP_STATUS.More}
                currentStatus = {dataDetail.rsvp_status}
              >
                More
              </RsvpButton>
            </View>
            {/* Modal description*/}
            <DetailModal
              content={dataDetail.description ? dataDetail.description : 'No description'}
            />
          </View>
          {/* Map location*/}
          {dataDetail.place.location.street && <MapModal
            location={dataDetail.place.location}
          />}
          <View style={styles.location}>
            <Text style={styles.placeContent}>
              <Text style={styles.placeName}>{dataDetail.place.name} </Text>
              {"\n"}
              {dataDetail.place.location.street}
            </Text>
            <Text style={styles.placeDistance}> ???? </Text>
          </View>
        </ScrollView>
      </View>
      //  Thieesu cho hien thi cho phep tuong tac de goi tuong thay doi trang thai rsvp
      /**
       *  EventDetail
        Include: Image , title, start, end, place, description,
       */
    )
  }
}

EventDetail.propTypes = {

};
