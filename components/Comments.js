import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import { TextField, Button } from "react-native-ui-lib";
import colors from "../assets/color";
import FirestoreAddComment from "../backend/FirestoreAddComment";
import { useSelector } from "react-redux";
import FirestoreQueryAllComments from "../backend/FirestoreQueryAllComments";

const Item = (item) => {
  return (
    <View>
      <Text>
        {item.item.username} : {item.item.comment_body}
      </Text>
    </View>
  );
};

const Comments = (props) => {
  const renderItem = ({ item }) => <Item item={item} />;
  const uid = useSelector((state) => state.firebase.auth.uid);
  const username = useSelector((state) => state.firebase.auth.displayName);
  const [comment_body, setCommentBody] = useState("");
  const [comments, setComments] = useState([]);
  useEffect(() => {
    const subscriber = FirestoreQueryAllComments(props.task, setComments);
    // Unsubscribe from events when no longer in use
    return () => subscriber();
  }, []);
  return (
    <View>
      <View style={styles.list_container}>
        <FlatList
          data={comments}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      </View>
      <View style={styles.field_container}>
        <TextField
          style={styles.inputBox}
          onChangeText={(text) => setCommentBody(text)}
          placeholder="Add comment here"
          hideUnderline
        />
        <Button
          label={"Add comment"}
          style={styles.button}
          onPress={() => {
            FirestoreAddComment(props.task, comment_body, uid, username);
          }}
          backgroundColor={colors.logoorange}
        />
        <Button
          label={"Check comment array"}
          style={styles.button}
          onPress={() => console.log(comments)}
          backgroundColor={colors.logoorange}
        />
      </View>
    </View>
  );
};

export default Comments;

const styles = StyleSheet.create({
  list_container: {
    marginLeft: 20,
    marginVertical: 20,
  },
  field_container: {},
  inputBox: {
    fontSize: 16,
    marginHorizontal: 20,
  },
  button: {
    marginLeft: 20,
    height: 40,
    width: 145,
    borderColor: "#F6820D",
  },
});
