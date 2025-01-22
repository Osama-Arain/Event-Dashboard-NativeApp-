import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ScrollView } from 'react-native';

const RegisterEvent = ({ navigation }) => {
  const [name, setName] = useState('');
  const [id, setId] = useState('');
  const [events, setEvents] = useState([]); // State to store fetched events
  const [selectedEvent, setSelectedEvent] = useState(''); // Initially empty
  const [loading, setLoading] = useState(false); // Loading state for fetch request
  const [showEventList, setShowEventList] = useState(false); // For toggling event list visibility

  // Fetch events from the API
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true); // Set loading state to true when starting fetch
        const response = await fetch('http://172.20.10.6/events'); // API URL
        if (!response.ok) {
          throw new Error(`Failed to fetch: ${response.status}`);
        }
        const data = await response.json();

        // Log the fetched data to verify the response format
        // console.log('Fetched Events:', data); // Debugging log

        if (Array.isArray(data) && data.length > 0) {
          const eventNames = data.map(event => event.name); // Extract event names
          setEvents(eventNames); // Update state with the event names
        } else {
          Alert.alert('Error', 'No events available.');
        }
      } catch (error) {
        console.error('Error fetching events:', error); // Error log for debugging
        Alert.alert('Error', 'Failed to load events. Please try again.');
      } finally {
        setLoading(false); // Set loading state to false after fetch
      }
    };

    fetchEvents(); // Call the fetch function
  }, []);

  // Handle registration
  const handleRegistration = async () => {
    if (!name || !id || !selectedEvent) {
      Alert.alert('Error', 'Please fill all fields and select an event.');
      return;
    }

    try {
      const registrationData = { id, name, eventName: selectedEvent };
      
      // Fetch previously registered events from AsyncStorage
      const storedData = await AsyncStorage.getItem('registeredEvents');
      const registeredEvents = storedData ? JSON.parse(storedData) : [];

      // Check if the user has already registered for this event
      const existingRegistration = registeredEvents.find(event => event.id === id && event.name === name);
      if (existingRegistration) {
        Alert.alert('Error', 'You have already registered for this event.');
        return;
      }

      // Add the new registration
      registeredEvents.push(registrationData);

      // Save updated registration data to AsyncStorage
      await AsyncStorage.setItem('registeredEvents', JSON.stringify(registeredEvents));

      console.log('Registered Data:', registrationData);
      Alert.alert('Success', `Thank you for registering for ${selectedEvent}, ${name} :)`);
      navigation.goBack();
    } catch (error) {
      console.error('Registration Error:', error);
      Alert.alert('Error', 'An error occurred during registration. Please try again.');
    }
  };

  // Handle event selection from the list
  const handleEventSelect = (eventName) => {
    setSelectedEvent(eventName);
    setShowEventList(false); // Close the event list after selection
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register for an Event</Text>

      {/* Event Selection */}
      <TouchableOpacity style={styles.eventSelection} onPress={() => setShowEventList(!showEventList)}>
        <Text style={styles.eventText}>{selectedEvent || 'Select an Event'}</Text>
      </TouchableOpacity>

      {/* Show Event List if clicked */}
      {showEventList && (
  <View style={styles.eventList}>
     <ScrollView>
              {events.length > 0 ? (
                events.map((eventName, index) => (
                  <TouchableOpacity
                    key={index}
                    style={styles.eventItem}
                    onPress={() => handleEventSelect(eventName)}
                  >
                    <Text style={styles.eventItemText}>{eventName}</Text>
                  </TouchableOpacity>
                ))
              ) : (
                <Text style={styles.noEventText}>No events available</Text>
              )}
            </ScrollView>
  </View>
)}

      {/* Name Input */}
      <TextInput
        style={styles.input}
        placeholder="Enter your name"
        value={name}
        onChangeText={setName}
        placeholderTextColor="#aaa"
      />

      {/* ID Input */}
      <TextInput
        style={styles.input}
        placeholder="Enter your ID"
        value={id}
        onChangeText={setId}
        placeholderTextColor="#aaa"
        keyboardType="numeric"
      />

      {/* Registration Button */}
      <Button title="Confirm Registration" onPress={handleRegistration} disabled={loading} 
       titleStyle={{
        color: '#17202a', // Change the text color to yellow
      }}/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  eventSelection: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 20,
    justifyContent: 'center',
    paddingHorizontal: 15,
    backgroundColor: '#ffff',
  },
  eventText: {
    color: '#888',
  },
  eventList: {
    backgroundColor: '#fff',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    maxHeight: 150,
    marginBottom: 20,
    padding: 5,
  },
  eventItem: {
    padding: 10,
  },
  eventItemText: {
    fontSize: 16,
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
    marginBottom: 20,
  },
  noEventsContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#333', // Dark background for error message
    borderRadius: 10,
    marginTop: 20,
  },
  
  noEventsText: {
    color: '#f8f8f8', // Light text color
    fontSize: 16,
    fontWeight: 'bold',
  },
  
});

export default RegisterEvent;
