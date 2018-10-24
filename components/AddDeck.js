import React, { Component } from 'react'
import { View, TouchableOpacity, Text, StyleSheet, Platform, KeyboardAvoidingView } from 'react-native'
import { TextInput } from 'react-native'
import { connect } from 'react-redux'

class AddDeck extends Component {

	state = {
		text: ''
	}

	onChangeText = (text) => {
		this.setState({text})
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
        />
      </KeyboardAvoidingView>
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
      fontSize: 24
  },
  submitButton: {
      backgroundColor: '#7a42f4',
      padding: 10,
      margin: 15,
      height: 40,
  },
  submitButtonText:{
      color: 'white'
  }
});

export default AddDeck
// export default connect(mapStateToProps)(AddDeck)