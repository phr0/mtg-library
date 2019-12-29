import * as React from "react";
import {
  IUserData,
  getUserData,
  setUserData,
  CardCollection
} from "../mtgLibraryApi";
import { useAsyncData } from "../useAsyncData";
import { Suspense } from "../../components/suspense";
import { Card } from "scryfall-sdk";

type UserDataAction = UserDataSetAction | UserDataAddCardToLibraryAction;
type UserDataSetAction = {
  type: "set";
  userData: IUserData;
};
type UserDataAddCardToLibraryAction = {
  type: "addCardToLibrary";
  card: Card;
};

type UserDataDispatch = (action: UserDataAction) => void;
type UserDataState = IUserData;
type UserDataProviderProps = {
  children: React.ReactNode;
};
const UserDataStateContext = React.createContext<UserDataState | null>(null);
const UserDataDispatchContext = React.createContext<
  UserDataDispatch | undefined
>(undefined);

const stateMustBeDefinedError = new Error("State must be defined");

function addCardToCollection(card: Card, collection: CardCollection) {
  const cardAlreadyExistingInLibrary = collection[card.id];
  if (cardAlreadyExistingInLibrary) {
    cardAlreadyExistingInLibrary.quantity++;
    return { ...collection };
  }
  collection[card.id] = { ...card, quantity: 1 };
  return { ...collection };
}

function userDataReducer(
  state: UserDataState | null,
  action: UserDataAction
): IUserData | null {
  switch (action.type) {
    case "set":
      return action.userData;
    case "addCardToLibrary":
      if (!state) throw stateMustBeDefinedError;
      return {
        ...state,
        library: addCardToCollection(action.card, state.library)
      };
  }
}

function useUserDataSync(
  userDataInLocalState: IUserData | null,
  persistedUserData: IUserData | null,
  dispatch: React.Dispatch<UserDataAction>
) {
  React.useEffect(() => {
    if (!userDataInLocalState) return;
    setUserData(userDataInLocalState);
  }, [userDataInLocalState]);

  React.useEffect(() => {
    if (!persistedUserData) return;
    dispatch({
      type: "set",
      userData: persistedUserData
    });
  }, [persistedUserData, dispatch]);
}

function UserDataProvider({ children }: UserDataProviderProps) {
  const asyncData = useAsyncData(getUserData, null);
  const [state, dispatch] = React.useReducer(userDataReducer, null);

  useUserDataSync(state, asyncData.data, dispatch);

  return (
    <UserDataStateContext.Provider value={state}>
      <UserDataDispatchContext.Provider value={dispatch}>
        <Suspense promise={[asyncData.promise]}>{children}</Suspense>
      </UserDataDispatchContext.Provider>
    </UserDataStateContext.Provider>
  );
}
function useUserData() {
  const context = React.useContext(UserDataStateContext);
  if (!context) {
    throw new Error("useUserData must be used within a UserDataProvider");
  }
  return context;
}
function useUserDataDispatch() {
  const context = React.useContext(UserDataDispatchContext);
  if (!context) {
    throw new Error(
      "useUserDataDispatch must be used within a UserDataProvider"
    );
  }
  return context;
}
export { UserDataProvider, useUserData, useUserDataDispatch };
