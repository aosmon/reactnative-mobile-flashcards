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

		return(
			<View style={styles.container}>
	      <View style={styles.container}>
	        	<Text style={styles.deckTitle}>Deck Title</Text>
	        	<Text style={styles.deckCardsAmount}>3 cards</Text>
	      </View>			
	      <View style={styles.container}>
	        <TouchableOpacity
	          style = {styles.addCardButton}
						onPress={() => this.props.navigation.navigate(
            	'AddCard',
            	{ deckId: '1' }
          	)}
	        >
	           <Text style={styles.addCardButtonText}> Add Card </Text>
	        </TouchableOpacity>
	        <TouchableOpacity
	  	      style = {styles.startQuizButton}
		        onPress={() => this.props.navigation.navigate(
            	'Quiz',
            	{ deckId: '1' }
          	)}
	        >
	           <Text style={styles.startQuizButtonText}> Start Quiz </Text>
	        </TouchableOpacity>
	      </View>		
      </View>	
		)
	}
}

function mapStateToProps (state) {

  return {
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
		textAlign: 'center'
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

export default DeckDetails
//export default connect(mapStateToProps)(DeckDetails)