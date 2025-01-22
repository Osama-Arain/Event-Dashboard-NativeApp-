import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTheme } from '../themes/ThemeContext'; // Assuming you're using a theme context

const FeedbackScreen = ({ navigation }) => {
  const { theme } = useTheme(); // Get theme from the context
  const [name, setName] = useState('');
  const [id, setId] = useState('');
  const [feedback, setFeedback] = useState('');
  const [storedData, setStoredData] = useState([]); // For storing all registered users
  const [allFeedback, setAllFeedback] = useState([]); // To store all feedback for the event

  useEffect(() => {
    const fetchData = async () => {
      try {
        const storedData = await AsyncStorage.getItem('registeredEvents');
        if (storedData) {
          const data = JSON.parse(storedData);
          setStoredData(data); // Set all registered users
        }

        // Fetch existing feedback for this event
        const existingFeedback = await AsyncStorage.getItem('feedbackData');
        if (existingFeedback) {
          const feedbackArray = JSON.parse(existingFeedback);
          setAllFeedback(feedbackArray);
        }
      } catch (error) {
        console.error('Error fetching registered data or feedback:', error);
      }
    };

    fetchData();
  }, []);

  const handleFeedbackSubmit = async () => {
    // Check if the user is registered or registering
    const registeredUser = storedData.find(
      (user) => user.name === name && user.id === id
    );
    if (!registeredUser) {
      // If not registered, add user to registered users
      const newUser = {
        name,
        id,
        eventName: 'Sample Event', // Replace with your event name logic
      };

      const updatedStoredData = [...storedData, newUser];
      await AsyncStorage.setItem('registeredEvents', JSON.stringify(updatedStoredData));
      Alert.alert(
        'Registration Successful',
        'You have been registered for the event and can now submit feedback.'
      );

      // Add the user to feedback list immediately
      const feedbackData = {
        name,
        id,
        feedback,
        eventName: newUser.eventName,
        timestamp: new Date().toISOString(),
      };

      const existingFeedback = await AsyncStorage.getItem('feedbackData');
      const allFeedback = existingFeedback ? JSON.parse(existingFeedback) : [];

      // Save the new feedback
      allFeedback.push(feedbackData);
      await AsyncStorage.setItem('feedbackData', JSON.stringify(allFeedback));

      // Update the local state to display the new feedback immediately
      setAllFeedback([...allFeedback, feedbackData]);

      setFeedback('');
      return;
    }

    if (!feedback.trim()) {
      Alert.alert('Error', 'Please enter your feedback.');
      return;
    }

    try {
      const feedbackData = {
        name,
        id,
        feedback,
        eventName: registeredUser.eventName,
        timestamp: new Date().toISOString(),
      };

      const existingFeedback = await AsyncStorage.getItem('feedbackData');
      const allFeedback = existingFeedback ? JSON.parse(existingFeedback) : [];

      // Save the new feedback
      allFeedback.push(feedbackData);
      await AsyncStorage.setItem('feedbackData', JSON.stringify(allFeedback));

      Alert.alert('Success', 'Your feedback has been submitted.');

      // Update the local state to display the new feedback immediately
      setAllFeedback([...allFeedback, feedbackData]);

      setFeedback('');
    } catch (error) {
      console.error('Error submitting feedback:', error);
      Alert.alert('Error', 'An error occurred while submitting your feedback.');
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
          placeholderTextColor={theme.isDarkMode ? '#17202a' : '#17202a'} // Dark theme white, Light theme black
          value={name}
          onChangeText={setName}
        />
        <TextInput
          style={[styles.input, { backgroundColor: theme.inputBackgroundColor, color: theme.textColor }]}
          placeholder="Enter your ID"
          placeholderTextColor={theme.isDarkMode ? '#17202a' : '#17202a'} // Dark theme white, Light theme black
          value={id}
          onChangeText={setId}
          keyboardType="numeric"
        />
        <TextInput
          style={[styles.input, { backgroundColor: theme.inputBackgroundColor, color: theme.textColor }]}
          placeholder="Enter your feedback"
          placeholderTextColor={theme.isDarkMode ? '#17202a' : '#17202a'} // Dark theme white, Light theme black
          value={feedback}
          onChangeText={setFeedback}
          multiline
        />
        <View style={styles.buttonContainer}>
          <Button
            title="Submit Feedback"
            onPress={handleFeedbackSubmit}
            color={theme.isDarkMode ? '#17202a' : '#17202a'} // Dark theme blue, Light theme yellow
          />
        </View>
      </View>

      <ScrollView style={styles.feedbackList}>
        <Text style={[styles.feedbackTitle, { color: theme.textColor }]}>Feedbacks :)</Text>
        {allFeedback.length > 0 ? (
          [...allFeedback]
            .reverse()
            .slice(0, 6)
            .map((fb, index) => (
              <View key={index} style={styles.feedbackItem}>
                <Text style={[styles.feedbackText, { color: theme.textColor }]}>
                  <Text style={styles.boldText}>{fb.name}:</Text> {fb.feedback}
                </Text>
                <Text style={[styles.feedbackText, { color: theme.textColor }]}>
                  <Text style={styles.italicText}>
                    Event: {fb.eventName}, {new Date(fb.timestamp).toLocaleString()}
                  </Text>
                </Text>
              </View>
            ))
        ) : (
          <Text style={[styles.noFeedback, { color: theme.textColor }]}>
            No feedback yet for this event.
          </Text>
        )}
      </ScrollView>
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
  buttonContainer: {
    marginTop: 10,
    color: '#17202a',
  },
  feedbackList: {
    marginTop: 30,
  },
  feedbackTitle: {
    fontSize: 18,
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
  italicText: {
    fontStyle: 'italic',
  },
});

export default FeedbackScreen;
