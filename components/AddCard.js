import React, { Component } from 'react'
import { View, TouchableOpacity, Text, StyleSheet, Platform, KeyboardAvoidingView, ScrollView} from 'react-native'
import { TextInput} from 'react-native'
import { connect } from 'react-redux'
import { addCard } from '../actions'
import { addCardToDeck} from '../utils/api'

class AddCard extends Component {

	state = {
		question: '',
		answer: ''
	}

	onChangeQuestion = (question) => {
		this.setState({question})
	}

	onChangeAnswer = (answer) => {
		this.setState({answer})
	}

	addCard = () => {

    const card = {
      question: this.state.question,
      answer: this.state.answer
    }
    const { dispatch, title } = this.props

    dispatch(addCard(title, card))
    addCardToDeck(title, card)
    this.props.navigation.goBack()

		this.setState({
			question: '',
			answer: ''
		})

	}


	render() {

		return(
      <ScrollView keyboardShouldPersistTaps='never' contentContainerStyle={styles.contentContainer}>
      <KeyboardAvoidingView behavior='padding' style={styles.container}>
        <Text style={styles.label}>Question:</Text>
        <TextInput 
        	style={styles.input}
        	value={this.state.question}
        	placeholder='Question'
        	multiline={true}
        	underlineColorAndroid="transparent" 
        	onChangeText={(q) => this.onChangeQuestion(q)}
        	autoCorrect={false}
        />
        <Text style={styles.label}>Answer</Text>
        <TextInput 
        	style={styles.input}
        	value={this.state.answer}
        	placeholder='Answer'
        	multiline={true}
        	underlineColorAndroid="transparent" 
        	onChangeText={(a) => this.onChangeAnswer(a)}
        	autoCorrect={false}
        />


        <TouchableOpacity
           style = {styles.submitButton}
           onPress = {() => this.addCard()}
           disabled={this.state.question==='' || this.state.answer===''}
        >
           <Text style={styles.submitButtonText}> Submit </Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
      </ScrollView>		
    )
	}
}

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    paddingTop: 30,
    backgroundColor: '#fff',
  },
  container: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingLeft: 20,
    paddingRight: 20
  },
  labelContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
		fontSize: 30,
		textAlign: 'center',
		fontWeight: 'bold'
  },
	input: {
      margin: 15,
      height: 120,
      borderColor: '#7a42f4',
      borderWidth: 1,
      width: 300,
      padding: 10,
      fontSize: 24,
      borderRadius: 10
  },
  submitButton: {
      backgroundColor: '#000',
      padding: 20,
      margin: 15,
      borderRadius: 10,
  },
  submitButtonText:{
      color: '#fff',
      fontSize: 24,
  }
});

function mapStateToProps (decks, { navigation }) {

  const { deckId } = navigation.state.params

  return {
    title: deckId,
  }
}

export default connect(mapStateToProps)(AddCard)