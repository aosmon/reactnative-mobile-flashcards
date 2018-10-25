import React, { Component } from 'react'
import { View, TouchableOpacity, Text, StyleSheet, Platform } from 'react-native'
import { connect } from 'react-redux'

class Quiz extends Component {

	state = {
		currentCardIndex: 0,
		showAnswer: false,
		showResults: false,
		answersCorrect: 0
	}

	flipCard = () => {
		this.setState((state)=>({
			showAnswer: !state.showAnswer
		}))
	}

	showNextCard = () => {
			this.setState((state)=>({
				currentCardIndex: state.currentCardIndex++,
				showAnswer: false
			}))		
	}

	markCorrect = () => {
			this.setState((state)=>({
				answersCorrect: state.answersCorrect++
			}))
		this.showNextCard()
	}

	markIncorrect = () => {
		this.showNextCard()		
	}

	render() {

		return(
      <View style={styles.container}>
	      <Text style={styles.cardIndex}>2/2</Text>


	      {this.state.showAnswer && 
	      	<View>
	        <Text style={styles.cardText}>Card Text</Text>
	        <TouchableOpacity 
	        	style = {styles.flipCardButton}
	        	onPress = {() => this.flipCard()}>
	           <Text style={styles.flipCardText}> See Question </Text>
	        </TouchableOpacity>
	      </View>
	    	}

	      {!this.state.showAnswer && 
	      	<View>
	        <Text style={styles.cardText}>Card Text</Text>
	        <TouchableOpacity 
	        	style = {styles.flipCardButton}
	        	onPress = {() => this.flipCard()}>
	           <Text style={styles.flipCardText}> See Answer </Text>
	        </TouchableOpacity>
	      </View>
	    	}

				<View style = {styles.buttonsContainer}>
	        <TouchableOpacity
	           style = {styles.correctButton}
	           onPress = {() => this.markCorrect()}
	        >
	           <Text style={styles.buttonText}> Correct </Text>
	        </TouchableOpacity>

	        <TouchableOpacity
	           style = {styles.incorrectButton}
	           onPress = {() => this.markIncorrect()}
	        >
	           <Text style={styles.buttonText}> Incorrect </Text>
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
    justifyContent: 'space-between',
    paddingTop: 20,
  },
  cardIndex: {
		fontSize: 20,
		color: '#666',
		textAlign: 'left',
		marginTop: 0,
		marginLeft: 20,
		alignSelf: 'flex-start'
  },
  cardText: {
		fontSize: 50,
		textAlign: 'center',
		fontWeight: 'bold',
		height: 200
  },
  flipCardText: {
		fontSize: 20,
		color: '#d60606',
		textAlign: 'center',
		margin: 20,
		fontWeight: 'bold'		
  },
  flipCardButton: {
    padding: 20,
    margin: 15,
  	width: 300     
  },
  buttonsContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 40,
  },
  correctButton: {
    backgroundColor: '#d60606',
    padding: 20,
    margin: 15,
    borderRadius: 10,
    width: 300      
},
  incorrectButton: {
    backgroundColor: '#01a324',
    padding: 20,
    margin: 15,
    borderRadius: 10,
    width: 300,    
  },
  buttonText:{
    color: '#fff',
    fontSize: 24,
    textAlign: 'center',
  }
});

export default Quiz
// export default connect(mapStateToProps)(Quiz)