import React, { useState, useCallback } from "react";
import "./App.css";
import {
  UserDataProvider,
  useUserDataDispatch,
  useUserData
} from "./lib/userData/userDataContext";
import Library from "./components/library";
import { Layout, Menu, Button, Icon } from "antd";
import CardSearch from "./components/cardSearch";
import { Card } from "scryfall-sdk";
import styles from "./lib/styles";
import CardDetail from "./components/cardDetail";
const { Header, Content } = Layout;

function AppWithUserData() {
  const userData = useUserData();
  const dispatch = useUserDataDispatch();
  const [selectedCard, setSelectedCard] = useState<Card | null>(null);

  return (
    <Layout className="layout">
      <Header
        style={{
          background: styles.darkBg,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "1rem"
        }}
      >
        <CardSearch onSelectCard={setSelectedCard} />
      </Header>
      <Layout>
        <Layout.Sider width={200}>
          <Menu
            mode="inline"
            defaultSelectedKeys={["1"]}
            defaultOpenKeys={["decks"]}
            style={{ height: "100%", borderRight: 0 }}
          >
            <Menu.SubMenu
              key="decks"
              title={
                <span>
                  <Icon type="folder-open" />
                  Decks
                </span>
              }
            >
              {userData.decks.map(x => (
                <Menu.Item key={x.name}>{x.name}</Menu.Item>
              ))}

              <Menu.Divider />
              <Menu.Item
                key="addDeck"
                onClick={() => {
                  const name = prompt("What should we call it?");
                  if (!name) return;
                  dispatch({ type: "addDeck", name });
                }}
              >
                <span>
                  <Icon type="plus" />
                  Neues Deck
                </span>
              </Menu.Item>
            </Menu.SubMenu>
            <Menu.SubMenu
              key="sub2"
              title={
                <span>
                  <Icon type="laptop" />
                  subnav 2
                </span>
              }
            >
              <Menu.Item key="5">option5</Menu.Item>
              <Menu.Item key="6">option6</Menu.Item>
              <Menu.Item key="7">option7</Menu.Item>
              <Menu.Item key="8">option8</Menu.Item>
            </Menu.SubMenu>
            <Menu.SubMenu
              key="sub3"
              title={
                <span>
                  <Icon type="notification" />
                  subnav 3
                </span>
              }
            >
              <Menu.Item key="9">option9</Menu.Item>
              <Menu.Item key="10">option10</Menu.Item>
              <Menu.Item key="11">option11</Menu.Item>
              <Menu.Item key="12">option12</Menu.Item>
            </Menu.SubMenu>
          </Menu>
        </Layout.Sider>
        <Content
          style={{
            background: "#fff",
            padding: 24,
            margin: 0,
            minHeight: 280
          }}
        >
          <>{selectedCard && <CardDetail card={selectedCard} />}</>
        </Content>
      </Layout>
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
