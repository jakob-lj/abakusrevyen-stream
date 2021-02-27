import React from "react";
import styled from "styled-components";
import { XHRChatMessage } from "./Message";

const ChatMessage = styled.div`
  display: flex;
  flex-direction: row-reverse;
  width: auto;
  margin: 2px;
  margin-top: 10px;
  @media (max-width: 1100px) {
    margin-top: 6px;
  }
`;

const ChatContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-end;
  margin-left: 70px;
`;

const ChatName = styled.div`
  margin-right: 10px;
  margin-bottom: -3px;
  @media (max-width: 1100px) {
    font-size: 12px;
  }
`;

const ChatBody = styled.div`
  background-color: #13c6fe;
  color: #ffffff;
  padding: 10px;
  padding-right: 13px;
  padding-left: 12px;
  border-radius: 18px 18px 3px 18px;
  margin: 5px;

  @media (max-width: 1100px) {
    font-size: 12px;
    padding: 6px;
  }
`;

const MyMessage: React.FC<{ message: XHRChatMessage }> = ({ message }) => {
  return (
    <ChatMessage key={message.id}>
      <ChatContent>
        <ChatName>{message.name}</ChatName>
        <ChatBody>{message.message}</ChatBody>
      </ChatContent>
    </ChatMessage>
  );
};

export default MyMessage;
