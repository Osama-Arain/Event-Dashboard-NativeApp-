import React from 'react';
import { View, Text, StyleSheet, Button, FlatList, useColorScheme } from 'react-native';

const EventList = ({ events, onRegister }) => {
  const scheme = useColorScheme(); // Detecting the current theme (light or dark)

  // Check if the current theme is dark
  const isDarkMode = scheme === 'dark'; 

  return (
    <FlatList
      data={events}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <View
          style={[
            styles.eventContainer,
            { backgroundColor: isDarkMode ? '#333' : '#fff' }, // Dark background for dark mode, light for light mode
          ]}
        >
          <Text
            style={[
              styles.eventName,
              { color: isDarkMode ? '#fff' : '#000' }, // Dark text for dark mode, light for light mode
            ]}
          >
            {item.name}
          </Text>
          <Text
            style={[
              styles.eventDetails,
              { color: isDarkMode ? '#bbb' : '#666' }, // Lighter color for details in dark mode
            ]}
          >
            {item.date} | {item.venue}
          </Text>
          <Text
            style={[
              styles.eventDescription,
              { color: isDarkMode ? '#ccc' : '#999' }, // Lighter color for description in dark mode
            ]}
          >
            {item.description}
          </Text>
          <Button
            title="Register"
            onPress={() => onRegister(item)}
            color={isDarkMode ? '#17202a' : '#17202a'} // Consistent button color across modes
          />
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  eventContainer: {
    marginBottom: 15,
    padding: 15,
    borderRadius: 8,
    borderWidth: 1, // Border width for event container
    borderColor: '#17202a', // Yellow border color to highlight events
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  eventName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  eventDetails: {
    fontSize: 14,
    marginBottom: 5,
  },
  eventDescription: {
    fontSize: 12,
    marginBottom: 10,
  },
});

export default EventList;
