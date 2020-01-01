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
import { setUserDataState, addCardToLibrary, addDeck } from "./actions";
import { UserDataAction } from "./actionTypes";

type UserDataDispatch = (action: UserDataAction) => void;
export type UserDataState = IUserData;
type UserDataProviderProps = {
  children: React.ReactNode;
};
const UserDataStateContext = React.createContext<UserDataState | null>(null);
const UserDataDispatchContext = React.createContext<
  UserDataDispatch | undefined
>(undefined);

function userDataReducer(
  state: UserDataState | null,
  action: UserDataAction
): IUserData | null {
  switch (action.type) {
    case "set":
      return setUserDataState(state, action);
    case "addCardToLibrary":
      return addCardToLibrary(state, action);
    case "addDeck":
      return addDeck(state, action);
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
