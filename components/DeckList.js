import React, { Component } from 'react'
import { View, TouchableOpacity, Text, StyleSheet, Platform, ScrollView } from 'react-native'
import { connect } from 'react-redux'
import { AppLoading} from 'expo'
import { getDecks, clearStorage } from '../utils/api'
import { receiveDecks } from '../actions/index'
import DeckPreview from './DeckPreview'

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

    const { deckIds } = this.props

		return(

      <ScrollView>

        {deckIds.map((deck)=>(
          <TouchableOpacity 
            style={styles.deckContainer}
            key={deck} 
            onPress={() => this.props.navigation.navigate(
            'DeckDetails',
            { deckId: deck }
          )}>              

            <DeckPreview title={deck} />
          </TouchableOpacity>
        ))}

      </ScrollView> 
		)
	}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  deckCardsAmount: {
    fontSize: 30,
    color: '#666',
    textAlign: 'center',
    margin: 20
  },
  deckContainer: {
    borderBottomWidth: 1,
    borderColor: '#999',
    width: '100%'
  },

});

function mapStateToProps (decks) {
  if(!Object.keys(decks).length){
    return {
      noDecks: true
    }
  }
  return {
    deckIds: Object.keys(decks).sort(),
    noDecks: false
  }
}

export default connect(mapStateToProps)(DeckList)