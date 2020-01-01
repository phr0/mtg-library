import { UserDataState } from "./userDataContext";
import {
  SetAction,
  AddCardToLibraryAction,
  AddDeckAction
} from "./actionTypes";
import { Card } from "scryfall-sdk";
import { CardCollection } from "../mtgLibraryApi";

function addCardToCollection(card: Card, collection: CardCollection) {
  const cardAlreadyExistingInCollection = collection[card.id];
  if (cardAlreadyExistingInCollection) {
    cardAlreadyExistingInCollection.quantity++;
    return { ...collection };
  }
  collection[card.id] = { ...card, quantity: 1 };
  return { ...collection };
}
const stateMustBeDefinedError = new Error("State must be defined");

export const setUserDataState = (
  state: UserDataState | null,
  action: SetAction
): UserDataState => action.userData;

export const addCardToLibrary = (
  state: UserDataState | null,
  action: AddCardToLibraryAction
): UserDataState => {
  if (!state) throw stateMustBeDefinedError;
  return {
    ...state,
    library: addCardToCollection(action.card, state.library)
  };
};

export const addDeck = (
  state: UserDataState | null,
  action: AddDeckAction
): UserDataState => {
  if (!state) throw stateMustBeDefinedError;
  return {
    ...state,
    decks: [
      ...state.decks,
      {
        name: action.name,
        cards: {},
        lastUpdated: new Date()
      }
    ]
  };
};
