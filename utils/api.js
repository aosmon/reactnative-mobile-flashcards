import { AsyncStorage } from 'react-native'
import DECKS_STORAGE_KEY from './helpers'

export function getDecks () {
  return AsyncStorage.getItem(DECKS_STORAGE_KEY)
    .then((results) => JSON.parse(results))
}

export function getDeck (title) {
  return AsyncStorage.getItem(DECKS_STORAGE_KEY)
    .then((results) => {
      const data = JSON.parse(results)
      return data[title]
    })
}

export function saveDeckTitle (title) {
  return AsyncStorage.mergeItem(DECKS_STORAGE_KEY, JSON.stringify({
    [title]: { title: title, questions: [] } 
  }))
}

export function addCardToDeck (title, card) {
  return AsyncStorage.getItem(DECKS_STORAGE_KEY)
    .then((results) => {
      const data = JSON.parse(results)
      if(data[title]){
        data[title].questions.push(card);
        AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(data))
      }
    })
}

export function deleteDeck (title) {
  return AsyncStorage.getItem(DECKS_STORAGE_KEY)
    .then((results) => {
      const data = JSON.parse(results)
      if(data[title]){
        data[title] = undefined
        delete data[title]
        AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(data))
      }
    })
}
