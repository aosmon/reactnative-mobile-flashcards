import React, { Component } from 'react'
import { View, TouchableOpacity, Text, StyleSheet, Platform } from 'react-native'
import { connect } from 'react-redux'
import { white, black } from '../utils/colors'
import { clearLocalNotification, setLocalNotification } from '../utils/helpers'

class Quiz extends Component {

	state = {
		currentCardIndex: 0,
		showBackside: false,
		showResults: false,
		answersCorrect: 0
	}

	componentDidMount () {
			clearLocalNotification()
      .then(setLocalNotification)
	}

	flipCard = () => {
		this.setState((state)=>({
			showBackside: !state.showBackside
		}))
	}

	showNextCard = () => {
		const { questions } = this.props
		const { currentCardIndex } = this.state

		currentCardIndex === questions.length-1
		?
			this.setState((state)=>({
				showResults: true
			}))			
		:
			this.setState((state)=>({
				currentCardIndex: state.currentCardIndex+1,
				showBackside: false
			}))		
	}

	markCorrect = () => {
			this.setState((state)=>({
				answersCorrect: state.answersCorrect+1
			}))
		this.showNextCard()
	}

	markIncorrect = () => {
		this.showNextCard()		
	}

	restartQuiz = () => {
		this.setState({
			currentCardIndex: 0,
			showResults: false,
			answersCorrect: 0,
			showBackside: false
		})
	}

	goBack = () => {
		this.props.navigation.goBack()
	}

	render() {

		const { title, questions } = this.props
		const { showBackside, currentCardIndex, showResults, answersCorrect } = this.state

		return(
			<View style={styles.container}> 
	    {showResults
	     	?
	     	<View style={styles.container}>

	     		<Text style={styles.quizResults}>Quiz Results</Text>
	     		<Text style={styles.quizScore}>{ answersCorrect/questions.length*100 }%</Text>

	     		<View style={styles.resultsContainer}>
	     			<Text style={styles.half}> Correct: </Text>
	     			<Text style={styles.half}> { answersCorrect}/{questions.length } </Text>
	     			<Text style={styles.half}> Incorrect: </Text>
	     			<Text style={styles.half}> { (questions.length-answersCorrect)}/{questions.length } </Text>
					</View>

					<View style = {styles.buttonsContainer}>
		        <TouchableOpacity
		           style = {styles.restartQuizButton}
		           onPress = {() => this.restartQuiz()}
		        >
		           <Text style={styles.buttonTextBlack}> Restart Quiz </Text>
		        </TouchableOpacity>

		        <TouchableOpacity
		           style = {styles.backButton}
		           onPress = {() => this.goBack()}
		        >
		           <Text style={styles.buttonText}> Back to Deck </Text>
		        </TouchableOpacity>
	        </View>

	     	</View>
				:
	      <View style={styles.container}>      
		      <Text style={styles.cardIndex}>{currentCardIndex+1}/{questions.length}</Text>

		      {!showBackside
		      	?
		      	<View>
			        <Text style={styles.cardText}>{questions[currentCardIndex].question}</Text>
			        <TouchableOpacity 
			        	style = {styles.flipCardButton}
			        	onPress = {() => this.flipCard()}>
			           <Text style={styles.flipCardText}> See Answer </Text>
			        </TouchableOpacity>
		      	</View>
		    	:
		      	<View>
			        <Text style={styles.cardText}>{questions[currentCardIndex].answer}</Text>
			        <TouchableOpacity 
			        	style = {styles.flipCardButton}
			        	onPress = {() => this.flipCard()}>
			           <Text style={styles.flipCardText}> See Question </Text>
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
    	}
    	</View>
		)
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
  },
  quizResults: {
		fontSize: 40,
		textAlign: 'center',
		fontWeight: 'bold',
  },
  quizScore: {
		fontSize: 30,
		textAlign: 'center',
		margin: 0,
		fontWeight: 'bold',
	},
	resultsContainer: {
		flexDirection: 'row',
		flexWrap: 'wrap'
	},
  half: {
  	textAlign: 'center',
    margin: 0,
    width: '50%',
    height: 40,
    fontSize: 30,
    padding: 0
  },
  restartQuizButton: {
    backgroundColor: '#fff',
    padding: 20,
    margin: 15,
    borderRadius: 10,
    borderColor: '#000',
    width: 300,
		borderWidth: 1
	},
  backButton: {
    backgroundColor: black,
    padding: 20,
    margin: 15,
    borderRadius: 10,
    width: 300,    
  },
  buttonTextBlack:{
    color: black,
    fontSize: 24,
    textAlign: 'center',
  },
});

function mapStateToProps (decks, { navigation }) {

  const { deckId } = navigation.state.params

  return {
    title: decks[deckId].title,
    questions: decks[deckId].questions
  }
}

export default connect(mapStateToProps)(Quiz)