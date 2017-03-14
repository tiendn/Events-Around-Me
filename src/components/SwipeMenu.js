import React from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';

/**
 * Third party UI/UX
 * https://github.com/oliviertassinari/react-swipeable-views
 */
import SwipeableViews from 'react-swipeable-views-native';

const styles = StyleSheet.create({
  slideContainer: {
    height: 100,
  },
  slide: {
    padding: 15,
    height: 100,
  },
  slide1: {
    backgroundColor: '#FEA900',
  },
  slide2: {
    backgroundColor: '#B3DC4A',
  },
  slide3: {
    backgroundColor: '#6AC0FF',
  },
  slide4: {
    backgroundColor: '#6AC0FF',
  },
  text: {
    color: '#fff',
    fontSize: 16,
  },
});
const SwipeMenu = React.createClass ({
    render(){
        return(
            <Text>
                </Text>
        )
    }
    
})
export default SwipeMenu;