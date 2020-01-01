import { Card } from "scryfall-sdk";
import { IUserData } from "../mtgLibraryApi";

export type UserDataAction = SetAction | AddCardToLibraryAction | AddDeckAction;

export type SetAction = {
  type: "set";
  userData: IUserData;
};

export type AddCardToLibraryAction = {
  type: "addCardToLibrary";
  card: Card;
};

export type AddDeckAction = {
  type: "addDeck";
  name: string;
};
