import React, { useState } from "react";
import { AutoComplete } from "antd";
import { Cards, Card } from "scryfall-sdk";
import { SelectValue } from "antd/lib/select";
import styled from "styled-components";
import { lighten } from "polished";
import styles from "../lib/styles";

const StyledAutocomplete = styled(AutoComplete)`
  && {
    display: block;
    width: 600px;
    max-width: 100%;

    input[type="text"] {
      border: 0;
      color: white;
    }

    .ant-select-selection {
      background: ${lighten(0.1, styles.darkBg)};
      color: white;
    }
  }
`;

const CardSearch = (props: { onSelectCard: (card: Card) => void }) => {
  const [suggestedCardNames, setSuggestedCardNames] = useState<string[]>([]);

  function searchCards(searchText: string) {
    Cards.autoCompleteName(searchText).then(setSuggestedCardNames);
  }

  function selectCard(value: SelectValue) {
    Cards.byName(value.toString()).then(props.onSelectCard);
  }

  return (
    <>
      <StyledAutocomplete
        placeholder="Search for any card by name..."
        onSearch={searchCards}
        dataSource={suggestedCardNames}
        onSelect={selectCard}
      />
    </>
  );
};

export default CardSearch;
