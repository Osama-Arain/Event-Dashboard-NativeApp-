import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TextInput, Text } from 'react-native';
import axios from 'axios';
import EventList from '../components/EventList';
import { useTheme } from '../themes/ThemeContext';

const EventDashboard = ({ navigation }) => {
  const { theme } = useTheme();
  const [events, setEvents] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await axios.get('http://172.20.10.6:3000/events');
      setEvents(response.data);
    } catch (error) {
      console.error('API Error:', error.message);
      alert(`API Error: ${error.message}`);
    }
  };

  const handleRegister = (event) => {
    navigation.navigate('RegisterEvent', { event });
  };

  const handleFeedback = (event) => {
    navigation.navigate('FeedbackScreen', { event });
  };

  const filteredEvents = events.filter((event) =>
    event.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.backgroundColor }]}>
      <TextInput
        style={[
          styles.searchBar,
          {
            backgroundColor: theme.searchBarBackgroundColor,
            color: theme.textColor,
            borderColor: theme.borderColor,
          },
        ]}
        placeholder="Search events..."
        value={searchQuery}
        onChangeText={setSearchQuery}
        placeholderTextColor={theme.placeholderColor}
      />

      <EventList
        events={filteredEvents}
        onRegister={handleRegister}
        onFeedback={handleFeedback}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
  },
  searchBar: {
    height: 50,
    borderRadius: 8,
    borderWidth: 1,
    paddingHorizontal: 15,
    marginBottom: 10,
  },
});

export default EventDashboard;
