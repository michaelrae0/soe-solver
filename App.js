import React from 'react';
import { createStackNavigator, createAppContainer } from "react-navigation";
import { Provider, connect } from 'react-redux';
import { createStore } from 'redux';
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { PersistGate } from 'redux-persist/integration/react'

import rootReducer from './src/reducers/index';

import HomeScreen from './src/Screens/HomeScreen';
import SolverScreen from './src/Screens/SolverScreen';
import HistoryScreen from './src/Screens/HistoryScreen';

const persistConfig = {
  key: 'root',
  storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = createStore(persistedReducer);

const persistor = persistStore(store)

// Connect the screens to Redux
let HomeContainer = connect(state => ({ log: state.log }))(HomeScreen);
let SolverContainer = connect(state => ({ log: state.log }))(SolverScreen);
let HistoryContainer = connect(state => ({ log: state.log }))(HistoryScreen);

const RootStack = createStackNavigator(
  {
    Home: HomeContainer,
    Solver: SolverContainer,
    History: HistoryContainer,
  },
);

const AppContainer = createAppContainer(RootStack);

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <AppContainer />
        </PersistGate>
      </Provider>
    )
  }
}