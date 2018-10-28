import React, { Component } from 'react'
import { View, TouchableOpacity, Text, StyleSheet, Platform } from 'react-native'
import { TextInput} from 'react-native'
import { connect } from 'react-redux'

class DeckDetails extends Component {

  static navigationOptions = ({ navigation }) => {
    const { deckId } = navigation.state.params

    return {
      title: deckId
    }
  }

	render() {

    const { title, questions } = this.props

		return(
			<View style={styles.container}>
	      <View style={styles.container}>
	        	<Text style={styles.deckTitle}>{title}</Text>
	        	<Text style={styles.deckCardsAmount}>{questions.length} cards</Text>
	      </View>			
	      <View style={styles.container}>
	        <TouchableOpacity
	          style = {styles.addCardButton}
						onPress={() => this.props.navigation.navigate(
            	'AddCard',
            	{ deckId: title }
          	)}
	        >
	           <Text style={styles.addCardButtonText}> Add Card </Text>
	        </TouchableOpacity>
	        <TouchableOpacity
	  	      style = {styles.startQuizButton}
		        onPress={() => this.props.navigation.navigate(
            	'Quiz',
            	{ deckId: title }
          	)}
	        >
	           <Text style={styles.startQuizButtonText}> Start Quiz </Text>
	        </TouchableOpacity>
	      </View>		
      </View>	
		)
	}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 20,
    paddingRight: 20
  },
  deckTitle: {
		fontSize: 50,
		textAlign: 'center',
		fontWeight: 'bold'
  },
  deckCardsAmount: {
		fontSize: 30,
		color: '#666',
		textAlign: 'center',
		margin: 20
  },
	input: {
      margin: 15,
      height: 60,
      borderColor: '#7a42f4',
      borderWidth: 1,
      width: 300,
      padding: 10,
      fontSize: 24,
      borderRadius: 10
  },
  addCardButton: {
      backgroundColor: '#fff',
      padding: 20,
      margin: 15,
      borderRadius: 10,
      borderColor: '#000',
      width: 300,
  		borderWidth: 1
  },
  addCardButtonText:{
      color: '#000',
      fontSize: 24,
      textAlign: 'center'
  },
  startQuizButton: {
      backgroundColor: '#000',
      padding: 20,
      margin: 15,
      borderRadius: 10,
      width: 300
  },
  startQuizButtonText:{
      color: '#fff',
      fontSize: 24,
      textAlign: 'center'
  }
});

function mapStateToProps (decks, { navigation }) {

  const { deckId } = navigation.state.params

  return {
    title: decks[deckId].title,
    questions: decks[deckId].questions
  }
}

export default connect(mapStateToProps)(DeckDetails)