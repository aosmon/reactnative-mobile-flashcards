import { AsyncStorage } from 'react-native'

const DECKS_STORAGE_KEY = 'MobileFlashcards:decks'

export function createStorage (title) {
  console.log(DECKS_STORAGE_KEY)
  return AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify({
    [title]: { title: title, questions: [] } 
  }))
  .catch((error)=>{
    console.log(error)
  })
}

export function clearStorage () {
  return AsyncStorage.clear()
}

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
  .catch((error)=>{
    console.log(error)
  })
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
