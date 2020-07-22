import React from "react";
import Form from "react-bootstrap/Form";
import { useForm } from "react-hook-form";
import styled from "@emotion/styled";

import { ModalBody, ModalHeader, Modal } from "../components/Modal";
import { useModalStore, useMusicsContext } from "../store";

type FormData = {
  playlist: string;
};

const theme = {
  colors: {
    primary: "#E6DEDE",
    primaryLight: "#EDE7E7",
    primaryDark: "#DBC9C9",
    active: "#DDADAD",
    highlight: "#1300FF",
    white: "#FFFFFF",
    black: "#121212",
  },
  fonts: {
    futura: "Futura",
    avenir: "Avenir",
  },
};

const Title = styled.h3`
  font-family: ${theme.fonts.futura};
  font-weight: bold;
  color: ${theme.colors.primary};
`;

const CloseButton = styled.button`
  position: absolute;
  top: 35px;
  right: 40px;
  border: none;
  text-indent: -99999px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: url(/assets/close-icon-blue.png) no-repeat 50% 60%;
  background-size: 25px 25px;
  background-color: ${theme.colors.primary};
  box-shadow: 0px 4px 5px 0px rgba(0, 0, 0, 0.2);

  &:focus {
    outline: none;
  }
`;

const StyledModal = styled(Modal)`
  background-color: rgba(0, 0, 0, 0.35);
`;

const StyledModalHeader = styled(ModalHeader)`
  padding: 40px;
  padding-bottom: 20px;
  background-color: ${theme.colors.highlight};
  border-radius: 30px 30px 0 0;
  border-bottom: none;
`;

const StyledModalBody = styled(ModalBody)`
  padding: 30px 40px 60px;
  background-color: ${theme.colors.highlight};
  border-radius: 0 0 30px 30px;
`;

const Input = styled.input`
  border: none;
  border-radius: 10px;
  background-color: ${theme.colors.primary};
  color: ${theme.colors.highlight};
  padding: 5px 10px 5px 20px;
  margin-right: 10px;
  width: 60%;
  ::placeholder {
    color: ${theme.colors.highlight};
    opacity: 1;
  }

  &:focus {
    outline: none;
  }
`;

const Button = styled.button`
  color: ${theme.colors.primary};
  border: none;
  background: none;
  font-size: 16px;
  font-family: ${theme.fonts.avenir}, sans-serif;
`;

export default () => {
  const { closeModal } = useModalStore();
  const { state, ...actions } = useMusicsContext();
  const { register, handleSubmit } = useForm<FormData>();

  function handleClose() {
    closeModal();
  }

  const onSubmit = handleSubmit(({ playlist }) => {
    actions.createPlaylist(playlist);
    closeModal();
  });

  return (
    <StyledModal>
      <StyledModalHeader>
        <Title>Create new playlist</Title>
      </StyledModalHeader>
      <StyledModalBody>
        <Form onSubmit={onSubmit}>
          <Input
            type="text"
            placeholder="new playlist"
            name="playlist"
            ref={register({ required: true })}
          />
          <Button type="submit">Save It</Button>
        </Form>
      </StyledModalBody>
      <CloseButton onClick={handleClose}>닫기</CloseButton>
    </StyledModal>
  );
};
