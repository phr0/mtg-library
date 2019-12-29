import React, { useState } from "react";
import { AutoComplete } from "antd";
import { Cards, Card } from "scryfall-sdk";
import { SelectValue } from "antd/lib/select";

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
      <AutoComplete
        onSearch={searchCards}
        dataSource={suggestedCardNames}
        onSelect={selectCard}
      />
    </>
  );
};

export default CardSearch;
