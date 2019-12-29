import React from "react";
import { useUserData } from "../lib/userData/userDataContext";

const Library: React.FC = () => {
  const { library } = useUserData();

  return (
    <>
      <h2>Library</h2>
      {Object.values(library).map(card => (
        <div>
          {card.name} ({card.quantity})
        </div>
      ))}
    </>
  );
};

export default Library;
