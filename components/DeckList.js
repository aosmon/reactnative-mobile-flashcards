import React, { Component } from 'react'
import { View, TouchableOpacity, Text, StyleSheet, Platform } from 'react-native'
import { connect } from 'react-redux'
import { AppLoading} from 'expo'
import { getDecks } from '../utils/api'
import { receiveDecks } from '../actions/index'

class DeckList extends Component {

  state = {
    ready: false
  }

  componentDidMount () {
    const { dispatch } = this.props

    getDecks()
    .then((decks) => dispatch(receiveDecks(decks)))
    .then(() => this.setState(() => ({ready: true})))
  }

	render() {

    const { noDecks } = this.props

    if(noDecks){
      return (
        <View style={styles.container}>
          <Text style={styles.deckCardsAmount}>No decks</Text>
        </View>
      )
    }

		return(

      <View style={styles.container}>

        <TouchableOpacity 
        	onPress={() => this.props.navigation.navigate(
            'DeckDetails',
            { deckId: '1' }
          )}>
          <View key='1' style={styles.deckContainer}>
	        	<Text style={styles.deckTitle}>Deck 1</Text>
	        	<Text style={styles.deckCardsAmount}>3 cards</Text>
        	</View>

          <View key='2' style={styles.deckContainer}>
	        	<Text style={styles.deckTitle}>Deck 2</Text>
	        	<Text style={styles.deckCardsAmount}>3 cards</Text>
        	</View>
        </TouchableOpacity>
      </View>  
		)
	}
}

function mapStateToProps (decks) {
  if(!Object.keys(decks).length){
    return {
      noDecks: true
    }
  }
  return {
    decks
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  deckContainer: {
  	flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderColor: '#999',
    width: '100%'
  },
    deckTitle: {
		fontSize: 30,
		textAlign: 'center',
		fontWeight: 'bold'
  },
  deckCardsAmount: {
		fontSize: 30,
		color: '#666',
		textAlign: 'center',
		margin: 20
  },

});

export default connect(mapStateToProps)(DeckList)