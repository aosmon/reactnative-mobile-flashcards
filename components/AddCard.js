import React, { Component } from 'react'
import { View, TouchableOpacity, Text, StyleSheet, Platform } from 'react-native'
import { connect } from 'react-redux'

class AddCard extends Component {

	render() {

		return(
      <View style={styles.container}>
        <Text>AddQuestion</Text>
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
  },
});

export default AddCard
//export default connect(mapStateToProps)(AddQuestion)