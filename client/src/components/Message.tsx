import React from "react";
import styled from "styled-components";

const ChatMessage = styled.div`
  display: flex;
  flex-direction: row;
  width: fit-content;
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
  justify-content: flex-end;
  align-items: flex-start;
  margin-right: 70px;
`;

const ChatName = styled.div`
  margin-left: 10px;
  margin-bottom: -3px;

  @media (max-width: 1100px) {
    font-size: 12px;
  }
`;

const ChatBody = styled.div`
  background-color: #e7ecf0;
  padding: 10px;
  padding-right: 13px;
  padding-left: 12px;
  border-radius: 18px 18px 18px 3px;
  margin: 5px;
  @media (max-width: 1100px) {
    font-size: 12px;
    padding: 6px;
  }
`;

export type XHRChatMessage = {
  id: number;
  name: string;
  message: string;
};

const Message: React.FC<{ message: XHRChatMessage }> = ({ message }) => {
  return (
    <ChatMessage key={message.id}>
      <ChatContent>
        <ChatName>{message.name}</ChatName>
        <ChatBody>{message.message}</ChatBody>
      </ChatContent>
    </ChatMessage>
  );
};

export default Message;
