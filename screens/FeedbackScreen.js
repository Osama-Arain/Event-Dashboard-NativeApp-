import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  Alert,
  StyleSheet,
  FlatList,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Rating } from 'react-native-ratings';
import { useTheme } from '../themes/ThemeContext'; // Assuming you're using a theme context

const FeedbackScreen = ({ navigation }) => {
  const { theme } = useTheme(); // Get theme from the context
  const [name, setName] = useState('');
  const [id, setId] = useState('');
  const [feedback, setFeedback] = useState('');
  const [rating, setRating] = useState(0);
  const [storedData, setStoredData] = useState([]); // For storing all registered users
  const [allFeedback, setAllFeedback] = useState([]); // To store all feedback for the event

  // Fetch registered data and feedback for the event
  useEffect(() => {
    const loadRegisteredUsers = async () => {
      try {
        const data = await AsyncStorage.getItem('registeredEvents');
        if (data) {
          setStoredData(JSON.parse(data));
        }
      } catch (error) {
        console.error('Error loading registered users:', error);
      }
    };
  
    loadRegisteredUsers();
  }, []);
  

  const handleFeedbackSubmit = async () => {
    if (!name.trim() || !id.trim() || !feedback.trim() || rating === 0) {
      Alert.alert('Error', 'Please fill all fields and provide a rating.');
      return;
    }
  
    // Check if the user is registered
    const registeredUser = storedData.find(
      (user) => user.name === name && user.id === id
    );
  
    if (!registeredUser) {
      Alert.alert('Error', 'You are not registered for the event.');
      return;
    }
  
    try {
      const feedbackData = {
        name,
        id,
        feedback,
        rating,
        eventName: registeredUser.eventName,
        timestamp: new Date().toISOString(),
      };
  
      // Fetch existing feedback
      const existingFeedback = await AsyncStorage.getItem('feedbackData');
      const feedbackArray = existingFeedback ? JSON.parse(existingFeedback) : [];
  
      // Add the new feedback
      const updatedFeedbackArray = [feedbackData, ...feedbackArray];
      await AsyncStorage.setItem('feedbackData', JSON.stringify(updatedFeedbackArray));
  
      // Update the feedback list in state
      setAllFeedback(updatedFeedbackArray);
      // console.log(updatedFeedbackArray)
      Alert.alert('Success', 'Your feedback has been submitted.');
  
      // Clear the input fields
      setName('');
      setId('');
      setFeedback('');
      setRating(0);
    } catch (error) {
      console.error('Error submitting feedback:', error);
      Alert.alert('Error', 'An error occurred while submitting your feedback.');
    }
  };
   
  const registerUser = async (newUser) => {
    try {
      const updatedStoredData = [...storedData, newUser];
      await AsyncStorage.setItem('registeredEvents', JSON.stringify(updatedStoredData));
      setStoredData(updatedStoredData);
    } catch (error) {
      console.error('Error registering user:', error);
    }
  };
  
  
  

  return (
    <View style={[styles.container, { backgroundColor: theme.backgroundColor }]}>
      <View style={styles.feedbackForm}>
        <Text style={[styles.title, { color: theme.textColor }]}>
          We Value Your Feedback! Submit Your Thoughts Below.
        </Text>
        <TextInput
          style={[styles.input, { backgroundColor: theme.inputBackgroundColor, color: theme.textColor }]}
          placeholder="Enter your name"
          placeholderTextColor={theme.isDarkMode ? '#fff' : '#000'}
          value={name}
          onChangeText={setName}
        />
        <TextInput
          style={[styles.input, { backgroundColor: theme.inputBackgroundColor, color: theme.textColor }]}
          placeholder="Enter your ID"
          placeholderTextColor={theme.isDarkMode ? '#fff' : '#000'}
          value={id}
          onChangeText={setId}
          keyboardType="numeric"
        />
        <TextInput
          style={[styles.input, { backgroundColor: theme.inputBackgroundColor, color: theme.textColor }]}
          placeholder="Enter your feedback"
          placeholderTextColor={theme.isDarkMode ? '#fff' : '#000'}
          value={feedback}
          onChangeText={setFeedback}
          multiline
        />
        <Text style={[styles.ratingLabel, { color: theme.textColor }]}>
          Rate the Event:
        </Text>
        <Rating
          type="star"
          
          ratingCount={5}
          imageSize={30}
          startingValue={rating}
          onFinishRating={setRating}
          style={{ marginBottom: 20 }}
        />
        <Button
          title="Submit Feedback"
          onPress={handleFeedbackSubmit}
          color={theme.isDarkMode ? '#17202a' : '#17202a'}
        />
      </View>

      <FlatList
  data={allFeedback}
  keyExtractor={(item, index) => index.toString()}
  renderItem={({ item }) => (
    <View style={styles.feedbackItem}>
      <Text style={[styles.feedbackText, { color: theme.textColor }]}>
        <Text style={styles.boldText}>{item.name}:</Text> {item.feedback}
      </Text>
      <Text style={[styles.feedbackText, { color: theme.textColor }]}>
        Rating: {item.rating} ★ | Event: {item.eventName}
      </Text>
      <Text style={[styles.feedbackText, { color: theme.textColor }]}>
        {new Date(item.timestamp).toLocaleString()}
      </Text>
    </View>
  )}
  ListEmptyComponent={
    <Text style={[styles.noFeedback, { color: theme.textColor }]}>
      No feedback yet for this event.
    </Text>
  }
/>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  feedbackForm: {
    width: '100%',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
    fontSize: 16,
  },
  ratingLabel: {
    fontSize: 16,
    marginBottom: 10,
  },
  feedbackItem: {
    marginBottom: 10,
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  feedbackText: {
    fontSize: 16,
  },
  noFeedback: {
    fontSize: 16,
    textAlign: 'center',
  },
  boldText: {
    fontWeight: 'bold',
  },
});

export default FeedbackScreen;
