import React, { Component } from 'react'
import { View, TouchableOpacity, Text, StyleSheet, Platform } from 'react-native'
import { connect } from 'react-redux'

class DeckPreview extends Component {

	render() {

		const { title, questions } = this.props

		return (
			<View  style={styles.deckContainer}>
        <Text style={styles.deckTitle}>{title}</Text>
        <Text style={styles.deckCardsAmount}>{questions.length} cards</Text>            
      </View>
		)
	}
}

const styles = StyleSheet.create({
  deckContainer: {
    paddingTop: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
   deckTitle: {
		fontSize: 30,
		textAlign: 'left',
		fontWeight: 'bold',
  },
  deckCardsAmount: {
		fontSize: 20,
		color: '#666',
		textAlign: 'right',
		marginBottom: 40,
  },

});

function mapStateToProps (decks, {title}) {
  return {
    title: decks[title].title,
    questions: decks[title].questions
  }
}

export default connect(mapStateToProps)(DeckPreview)