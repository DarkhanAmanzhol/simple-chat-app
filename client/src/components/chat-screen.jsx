import MessageCard from "./message-card.component";
import {
  Box,
  Stack,
  AppBar,
  Toolbar,
  Avatar,
  Typography,
  TextField,
} from "@mui/material";
import { useParams } from "react-router-dom";
import { useQuery, useMutation, useSubscription } from "@apollo/client";
import { useState } from "react";
import { GET_MESSAGES_BY_USER } from "../graphql/queries";
import Loading from "./loading.component";
import SendIcon from "@mui/icons-material/Send";
import { MESSAGE_SUBSCRIPTION, SEND_MESSAGE } from "../graphql/mutations";

const ChatScreen = () => {
  const { id, fullName } = useParams();
  const [text, setText] = useState("");
  const [messages, setMessages] = useState([]);

  const { data, loading, error } = useQuery(GET_MESSAGES_BY_USER, {
    variables: {
      receiverId: +id,
    },
    onCompleted(data) {
      setMessages(data.messagesByUser);
    },
  });

  const [sendMessage] = useMutation(SEND_MESSAGE, {
    // onCompleted(data) {
    //   setMessages((prevMessages) => [...prevMessages, data.createMessage]);
    // },
  });

  const { data: subData } = useSubscription(MESSAGE_SUBSCRIPTION, {
    onData({ data: { data } }) {
      setMessages((prevMessages) => [...prevMessages, data.messageAdded]);
    },
  });

  if (subData) console.log(subData);

  return (
    <Box flexGrow={1}>
      <AppBar position='static'>
        <Toolbar>
          <Avatar
            src={`https://avatars.dicebear.com/api/initials/${fullName}.svg`}
            sx={{ width: "32px", height: "32px", mr: 2 }}
          />
          <Typography variant='h6'>{fullName}</Typography>
        </Toolbar>
      </AppBar>
      <Box
        backgroundColor='#f5f5f5'
        height='80vh'
        padding='10px'
        sx={{ overflowY: "auto" }}
      >
        {loading ? (
          <Loading />
        ) : (
          messages.map((msg) => {
            return (
              <MessageCard
                key={msg.createdAt}
                text={msg.text}
                date={msg.createdAt}
                direction={msg.receiverId == +id ? "end" : "start"}
              />
            );
          })
        )}
      </Box>
      <Stack direction='row'>
        <TextField
          placeholder='Enter a message'
          variant='standard'
          fullWidth
          multiline
          rows={2}
          value={text}
          onChange={(e) => setText(e.target.value)}
        ></TextField>
        <SendIcon
          fontSize='large'
          onClick={() => {
            sendMessage({
              variables: {
                receiverId: +id,
                text: text,
              },
            });
          }}
        />
      </Stack>
    </Box>
  );
};

export default ChatScreen;
