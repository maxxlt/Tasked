import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { TextField, Button } from "react-native-ui-lib";
import Colors from "../assets/color";
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
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    FirestoreQueryAllComments(props.task, setComments, setLoading);
    return () => console.log("useEffect completed");
  }, []);
  if (loading) {
    return <ActivityIndicator />;
  }
  return (
    <View>
      <View style={styles.list_container}>
        <FlatList
          listKey={props.listKey}
          data={comments}
          renderItem={renderItem}
          keyExtractor={(item, index) => item.comment_id}
        />
      </View>
      <View style={styles.field_container}>
        <TextField
          value={comment_body}
          style={styles.inputBox}
          onChangeText={(text) => setCommentBody(text)}
          placeholder="Add comment here"
          hideUnderline
        />
        <Button
          label={"Add comment"}
          style={styles.button}
          color={Colors.black}
          onPress={() => {
            FirestoreAddComment(
              props.task,
              comment_body,
              uid,
              username,
              setComments
            );
            setCommentBody("");
          }}
          backgroundColor={Colors.logoorange}
        />
      </View>
    </View>
  );
};

export default Comments;

const styles = StyleSheet.create({
  list_container: {
    marginLeft: 16,
    marginVertical: 20,
  },
  field_container: {},
  inputBox: {
    fontSize: 16,
    marginHorizontal: 20,
  },
  button: {
    marginLeft: 16,
    height: 40,
    width: 145,
    borderColor: Colors.pumpkinOrange,
  },
});
