import React, { useState, useCallback } from "react";
import "./App.css";
import {
  UserDataProvider,
  useUserDataDispatch,
  useUserData
} from "./lib/userData/userDataContext";
import Library from "./components/library";
import { Layout, Menu, Button } from "antd";
import CardSearch from "./components/cardSearch";
import { Card } from "scryfall-sdk";
import { CardCollection } from "./lib/mtgLibraryApi";
const { Header, Content } = Layout;

function AppWithUserData() {
  const { library } = useUserData();
  const dispatch = useUserDataDispatch();

  const [selectedCard, setSelectedCard] = useState<Card | null>(null);

  const addSelectedCardToLibrary = () =>
    selectedCard && dispatch({ type: "addCardToLibrary", card: selectedCard });

  return (
    <Layout className="layout">
      <Header>
        <div className="logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={["2"]}
          style={{ lineHeight: "64px" }}
        >
          <Menu.Item key="1">nav 1</Menu.Item>
          <Menu.Item key="2">nav 2</Menu.Item>
          <Menu.Item key="3">nav 3</Menu.Item>
        </Menu>
      </Header>
      <Content>
        <div style={{ background: "#fff", padding: 24, minHeight: 280 }}>
          <CardSearch onSelectCard={setSelectedCard} />
          {selectedCard && (
            <>
              <Button
                type="primary"
                onClick={addSelectedCardToLibrary}
                autoFocus
              >
                Zu Bibliothek hinzufügen
              </Button>
            </>
          )}
          <Library />
        </div>
      </Content>
    </Layout>
  );
}

const App: React.FC = () => {
  return (
    <UserDataProvider>
      <AppWithUserData />
    </UserDataProvider>
  );
};

export default App;
