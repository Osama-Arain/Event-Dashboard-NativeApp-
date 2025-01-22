import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';




const EventDetail = ({ event, onRegister, onFeedback }) => {
  return (
    <View style={styles.container}>
    <Text style={styles.eventName}>{event.name}</Text>
    <Text>{event.date}</Text>
    <Text>{event.venue}</Text>
    <Text>{event.description}</Text>
    <Button title="Register" onPress={onRegister} />
    {onFeedback && <Button title="Give Feedback" onPress={onFeedback} />}
    </View>
  );
};

  

const styles = StyleSheet.create({
    container: {
      padding: 10,
      borderWidth: 1,
      borderColor: '#ccc',
      marginBottom: 10,
      borderRadius: 5,
    },
    eventName: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 5,
    },
  });
  
  export default EventDetail;