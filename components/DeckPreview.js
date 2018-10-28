import React, { Component } from 'react'
import { View, TouchableOpacity, Text, StyleSheet, Platform } from 'react-native'
import { connect } from 'react-redux'

class DeckPreview extends Component {

	render() {

		const {deck} = this.props

		return (
      <View key={deck.title} style={styles.deckContainer}>
        <TouchableOpacity 
          onPress={() => this.props.navigation.navigate(
            'DeckDetails',
            { deckId: deck.title }
        )}>              
        <Text style={styles.deckTitle}>{deck.title}</Text>
        <Text style={styles.deckCardsAmount}>{deck.questions.length}</Text>            
        </TouchableOpacity>
      </View>
		)
	}
}

const styles = StyleSheet.create({
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

function mapStateToProps (decks, {title}) {
  return {
    deck: decks[title]
  }
}

export default connect(mapStateToProps)(DeckPreview)