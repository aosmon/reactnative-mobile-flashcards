import React, { Component } from 'react'
import { View, TouchableOpacity, Text, StyleSheet, Platform, KeyboardAvoidingView } from 'react-native'
import { TextInput} from 'react-native'
import { connect } from 'react-redux'
import { addDeck } from '../actions'
import { saveDeckTitle, createStorage } from '../utils/api'

class AddDeck extends Component {

	state = {
		text: ''
	}

	onChangeText = (title) => {
		this.setState({text: title})
	}

	addDeck = () => {
    const title = this.state.text
    this.props.dispatch(addDeck(title))
    saveDeckTitle(title)
    this.setState({text: ''})
    this.toHome()
	}

  toHome = () => {
    this.props.navigation.navigate('DeckList')
  }

	render() {

		return(
      <KeyboardAvoidingView behavior='padding' style={styles.container}>
      	<View style={styles.labelContainer}>
        	<Text style={styles.label}>What is the title of your new deck?</Text>
        </View>
        <TextInput 
        	style={styles.input}
        	value={this.state.text}
        	placeholder='Deck Title'
        	underlineColorAndroid="transparent" 
        	onChangeText={(text) => this.onChangeText(text)}
        	autoCorrect={false}
        />
        <TouchableOpacity
           style = {styles.submitButton}
           onPress = {() => this.addDeck()}
        >
           <Text style={styles.submitButtonText}> Submit </Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
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
    noDecks: false
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
  labelContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
		fontSize: 50,
		textAlign: 'center',
		fontWeight: 'bold'
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
  submitButton: {
      backgroundColor: '#000',
      padding: 20,
      margin: 15,
      borderRadius: 10
  },
  submitButtonText:{
      color: '#fff',
      fontSize: 24
  }
});

export default connect(mapStateToProps)(AddDeck)