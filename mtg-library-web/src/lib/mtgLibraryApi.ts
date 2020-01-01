import { Card } from "scryfall-sdk";
import { TSStringKeyword } from "@babel/types";

interface Hash<T> {
  [id: string]: T;
}

export type CardInCollection = Card & {
  quantity: number;
};

export type CardCollection = Hash<CardInCollection>;

export type Deck = {
  name: string;
  lastUpdated: Date;
  cards: CardCollection;
};

export interface IUserData {
  library: CardCollection;
  decks: Deck[];
  wishlist: CardCollection;
}

const localStorageKey = "userData";

const initialUserData: IUserData = {
  library: {},
  decks: [],
  wishlist: {}
};

export function getUserData(): Promise<IUserData> {
  return new Promise(resolve => {
    const userData: IUserData = {
      ...initialUserData,
      ...(localStorage[localStorageKey]
        ? JSON.parse(localStorage[localStorageKey])
        : {})
    };
    setTimeout(() => resolve(userData), 500);
  });
}

export function setUserData(userData: IUserData): Promise<IUserData> {
  return new Promise(resolve => {
    setTimeout(() => {
      localStorage[localStorageKey] = JSON.stringify(userData);
    }, 500);
  });
}
