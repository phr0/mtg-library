import React from "react";
import {
  useUserDataDispatch,
  useUserData
} from "../lib/userData/userDataContext";
import Scryfall from "scryfall-sdk";
import {
  PageHeader,
  Menu,
  Dropdown,
  Icon,
  Button,
  Tag,
  Typography,
  Row,
  Card,
  Col
} from "antd";
import styled from "styled-components";

const CardDetailView = styled.div`
  padding: 2rem;
  margin: 2rem;
  border: 1px solid lightgray;
  border-radius: 1rem;
`;

const CardDetail = (props: { card: Scryfall.Card }) => {
  const dispatch = useUserDataDispatch();
  const userData = useUserData();
  const addSelectedCardToLibrary = () =>
    dispatch({ type: "addCardToLibrary", card: props.card });

  return (
    <CardDetailView>
      <Row gutter={32}>
        <Col xs={18} sm={12} md={8} lg={6}>
          <img
            style={{ maxWidth: "100%" }}
            src={(props.card.image_uris as any)["normal"]}
          />
        </Col>
        <Col>
          <h2>{props.card.name}</h2>
          <h3>{props.card.type_line}</h3>
          <p>
            <em>{props.card.flavor_text}</em>
          </p>
          <Row>
            <Col>
              <Button
                type="primary"
                onClick={addSelectedCardToLibrary}
                autoFocus
              >
                Zu Bibliothek hinzufügen
              </Button>
            </Col>
          </Row>
        </Col>
      </Row>
    </CardDetailView>
  );
};

export default CardDetail;
