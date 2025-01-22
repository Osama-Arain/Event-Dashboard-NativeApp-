import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, ActivityIndicator } from 'react-native';

const FeedbackForm = ({ route, navigation }) => {
  const { event } = route.params; // Get the event passed through navigation
  const [feedback, setFeedback] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = () => {
    if (!feedback.trim()) {
      Alert.alert('Error', 'Feedback cannot be empty');
      return;
    }

    setLoading(true);

    // Simulate feedback submission
    setTimeout(() => {
      setLoading(false);
      Alert.alert('Success', `Feedback submitted for: ${event.name}`);
      navigation.goBack(); // Navigate back to the previous screen
    }, 2000);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Feedback for {event.name}</Text>
      <TextInput
        style={styles.input}
        placeholder="Write your feedback here..."
        value={feedback}
        onChangeText={setFeedback}
        multiline
      />
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <Button title="Submit Feedback" onPress={handleSubmit} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    height: 100,
    marginBottom: 20,
  },
});

export default FeedbackForm;
