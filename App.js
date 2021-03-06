import React from 'react';
import { StyleSheet, Text, View, Platform, StatusBar } from 'react-native';
import DeckList from './components/DeckList'
import DeckDetails from './components/DeckDetails'
import AddDeck from './components/AddDeck'
import AddCard from './components/AddCard'
import { black, white } from './utils/colors'
import Quiz from './components/Quiz'
import { createMaterialTopTabNavigator, createStackNavigator } from 'react-navigation'
import { Constants } from 'expo'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers/index'
import { setLocalNotification } from './utils/helpers'

function MyStatusBar ({backgroundColor, ...props}) {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  )
}

const Tabs = createMaterialTopTabNavigator({
  DeckList: {
    screen: DeckList,
    navigationOptions: {
      tabBarLabel: 'Decks',
    },
  },
 NewDeck: {
    screen: AddDeck,
    navigationOptions: {
      tabBarLabel: 'New Deck',
    },
  },
}, {
  navigationOptions: {
    header: null
  },
  tabBarOptions: {
    activeTintColor:  white,
    style: {
      height: 56,
      backgroundColor: black,
      shadowColor: 'rgba(0, 0, 0, 0.24)',
      shadowOffset: {
        width: 0,
        height: 3
      },
      shadowRadius: 6,
      shadowOpacity: 1
    }
  }
})

const MainNavigator = createStackNavigator({
  Home: {
    screen: Tabs,
    navigationOptions: {
      header: null
    }
  },
  DeckDetails: {
    screen: DeckDetails,
    navigationOptions: {
      headerTintColor: white,
      headerStyle: {
        backgroundColor: black,
      }
    }
  },
  AddCard: {
    screen: AddCard,
    navigationOptions: {
      headerTitle: 'Add Card',
      headerTintColor: white,
      headerStyle: {
        backgroundColor: black,
      }
    }
  },
  Quiz: {
    screen: Quiz,
    navigationOptions: {
      headerTitle: 'Quiz',
      headerTintColor: white,
      headerStyle: {
        backgroundColor: black,
      }
    }
  }
})

export default class App extends React.Component {

  componentDidMount() {
    setLocalNotification()
  }

  render() {
    return (
      <Provider store={createStore(reducer)}>
        <View style={{flex: 1}}>
        <MyStatusBar backgroundColor={black} barStyle="light-content" />
          <MainNavigator />
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
