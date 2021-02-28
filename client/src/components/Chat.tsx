import React, { FormEvent, useEffect, useState } from "react";
import styled from "styled-components";
import { get, post } from "../utils/network";
import Message, { XHRChatMessage } from "./Message";
import MyMessage from "./MyMessage";
import socketIOClient from "socket.io-client";

const Wrapper = styled.div`
  width: 400px;
  display: flex;
  flex-direction: column;

  border-radius: 5px;
`;

const Input = styled.input`
  outline: none;
  color: #555;
  font-size: 16px;
  padding: 10px;
  width: 80%;
  border: none;
  background-color: transparent;
`;

const Body = styled.div`
  position: relative;
  height: 650px;
  width: 400px;
  overflow-x: hidden;
  background-color: #fff;
  box-shadow: inset 0 11px 8px -10px #ccc, inset 0 -11px 8px -10px #ccc;
`;

const ChatHeader = styled.div`
  display: flex;
  flex-direction: row;
  height: 65px;
  background-color: #fff;
  border-radius: 30px 30px 0 0;
  justify-content: center;
  box-shadow: 0 0 11px rgba(33, 33, 33, 0.2);
`;

const Label = styled.label`
  width: 100%;
`;

const Button = styled.button`
  border: none;
  font-size: 1.1em;
  background: transparent;
  font-weight: bold;

  color: #555;
  &:hover {
    color: #333;
    cursor: pointer;
  }
`;

const InputWrapper = styled.div`
  height: 65px;
  width: 400px;
  border-radius: 0 0 30px 30px;
  background-color: #fff;
  box-shadow: 0 0 11px rgba(33, 33, 33, 0.2);
`;

const Form = styled.form`
  position: relative;
  top: 20%;
  background-color: #efefef;
  border: 1px solid #dfdfdf;
  border-radius: 30px;
  padding-left: 5px;
  padding-right: 5px;
  margin: 0 auto;
  width: 80%;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
`;
const socket = socketIOClient(process.env.REACT_APP_BACKEND!!);

const Chat = () => {
  type ExtendedMessage = XHRChatMessage & {
    status: string;
  };
  const [messages, setMessages] = useState<ExtendedMessage[]>([]);

  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    socket.on("chat", (e: any) => {
      console.log(messages);
      setMessages([...messages, e as ExtendedMessage]);
    });
    get("/chat")
      .then((r) => r.json())
      .then((r) => {
        setMessages([...messages, ...(r as ExtendedMessage[])]);
      });
  }, []);

  const msg = messages.map((message: ExtendedMessage) => {
    return message.status === "ingoing" ? (
      <Message message={message} />
    ) : (
      <MyMessage message={message} />
    );
  });

  const [input, setInput] = useState<string>("");

  const action = (e: FormEvent) => {
    e.preventDefault();
    post("/chat", {
      message: input,
    });
  };

  return (
    <Wrapper>
      <ChatHeader>
        <h2>#Chat</h2>
      </ChatHeader>
      <Body>{msg}</Body>
      <InputWrapper>
        <Form onSubmit={action}>
          <Label>
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={"Msg"}
            />
          </Label>
          <Button>Send</Button>
        </Form>
      </InputWrapper>
    </Wrapper>
  );
};

export default Chat;
