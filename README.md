# Mobile Flashcards Project

A Redux/ReactNative mobile application (for Android and iOS) that allows users to create different categories of flashcards called "decks", add flashcards to those decks, then take quizzes on those decks. No starter code was provided. The project emphasizes using React Native and Redux to build an iOS and Android native application, including handling infinite lists, routing, and user input.

# App Functionality

## Views

An application has five views.

Deck List View (Default View)
- displays the title of each Deck
- displays the number of cards in each deck

Individual Deck View
- displays the title of the Deck
- displays the number of cards in the deck
- displays an option to start a quiz on this specific deck
- An option to add a new question to the deck

Quiz View
-  displays a card question
- an option to view the answer (flips the card)
- a "Correct" button
- an "Incorrect" button
- the number of cards left in the quiz
- Displays the percentage correct once the quiz is complete

New Deck View
- An option to enter in the title for the new deck
- An option to submit the new deck title

New Question View
- An option to enter in the question
- An option to enter in the answer
- An option to submit the new question

## Data
AsyncStorage is used to store decks and flashcards locally.

```{
  React: {`
    title: 'React',
    questions: [`
      {
        question: 'What is React?',
        answer: 'A library for managing user interfaces'
      },
      {
        question: 'Where do you make Ajax requests in React?',
        answer: 'The componentDidMount lifecycle event'
      }
    ]
  },
  JavaScript: {
    title: 'JavaScript',
    questions: [
      {
        question: 'What is a closure?',
        answer: 'The combination of a function and the lexical environment within which that function was declared.'
      }
    ]
  }
}```

## API

Helper methods used to manage AsyncStorage database
`getDecks`: return all of the decks along with their titles, questions, and answers. 
`getDeck`: take in a single `id` argument and return the deck associated with that id. 
`saveDeckTitle`: take in a single `title` argument and add it to the decks. 
`addCardToDeck`: take in two arguments, `title` and `card`, and will add the card to the list of questions for the deck with the associated title. 

## Installation and Launch Instructions

- Clone or download the repo.
- Open a terminal in project directory.
- Install Node.js. You can download it here: https://www.npmjs.com/get-npm
- Install npm
- `npm install`
Install all project dependencies with npm install or yarn add
- `npm install expo-cli --global`
- `npm install --save react`
- `npm install --save react-native`
- `npm install --save react-redux`
- `npm install --save react-navigation`
- `npm install --save redux`
- Start with expo start
Install Simulators to preview app on computer
- iOS:
  - Download Xcode
  - Open Xcode and go to "Preferences."
  - Go to the "Locations" panel and select the most recent version in the "Command Line Tools" drop-down list.
- Android:
  - Install a recent version of the Java SE Development Kit(JDK)
  - Install Android Studio
  - Launch Android Studio
  - Click "Start a new Android Studio project". Click "Finish".
  - Select "Tools" --> "AVD Manager". Ensure that there's a checkmark next to "Enable ADB Integration"
  - Click "Create Virtual Device"
  - Select the system image you want and click "Download"
  - Once the download completes, click "Next" and "Finish"
  - Click the play button
