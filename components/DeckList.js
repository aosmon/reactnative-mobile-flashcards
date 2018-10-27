import React, { Component } from 'react'
import { View, TouchableOpacity, Text, StyleSheet, Platform } from 'react-native'
import { connect } from 'react-redux'
import { AppLoading} from 'expo'
import { getDecks, clearStorage } from '../utils/api'
import { receiveDecks } from '../actions/index'

class DeckList extends Component {

  state = {
    ready: false
  }

  componentDidMount () {
    const { dispatch } = this.props

    //clearStorage()

    getDecks()
    .then((decks) => dispatch(receiveDecks(decks)))
    .then(() => this.setState(() => ({ready: true})))

  }

	render() {

    const { noDecks } = this.props
    const { ready } = this.state

    if (ready === false) {
      return <AppLoading />
    }


    if(noDecks){
      return (
        <View style={styles.container}>
          <Text style={styles.deckCardsAmount}>No decks</Text>
        </View>
      )
    }

    const { decks, deckIds } = this.props

		return(

      <View style={styles.container}>
        {deckIds.map((deck)=>(
          <View key={decks[deck].title} style={styles.deckContainer}>
            <TouchableOpacity 
              onPress={() => this.props.navigation.navigate(
                'DeckDetails',
                { deckId: decks[deck].title }
            )}>              
            <Text style={styles.deckTitle}>{decks[deck].title}</Text>
            <Text style={styles.deckCardsAmount}>{decks[deck].questions.length}</Text>            
            </TouchableOpacity>
          </View>
        ))}

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
    decks,
    deckIds: Object.keys(decks),
    noDecks: false
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  deckContainer: {
    paddingTop: 40,
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