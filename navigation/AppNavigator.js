import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useTheme } from '../themes/ThemeContext';

// Screens
import EventDashboard from '../screens/EventDashboard';
import FeedbackScreen from '../screens/FeedbackScreen';
import RegisterEvent from '../screens/RegisterEvent';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// Stack Navigator for Events
const EventsStack = () => {
  const { theme } = useTheme();

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: theme.backgroundColor },
        headerTintColor: theme.textColor,
        headerTitleStyle: { fontWeight: 'bold' },
      }}
    >
      <Stack.Screen name="EventDashboard" component={EventDashboard} />
      <Stack.Screen name="RegisterEvent" component={RegisterEvent} />
    </Stack.Navigator>
  );
};

// Main Navigator with Tabs
const AppNavigator = () => {
  const { theme, toggleTheme } = useTheme();
  const [showSplash, setShowSplash] = useState(true);
  const fadeAnim = new Animated.Value(1); // Initial opacity
  const translateY = new Animated.Value(0); // Initial position for movement

  // Hide splash after 2 seconds with fade-out and upward movement
  useEffect(() => {
    // First, show splash screen and start fade-out + upward movement after 2 seconds
    setTimeout(() => {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(translateY, {
          toValue: -100, // Move splash screen upwards
          duration: 2000,
          useNativeDriver: true,
        }),
      ]).start();

      setTimeout(() => setShowSplash(false), 2000); // After animation, hide splash screen
    }, 2000);
  }, []);

  return (
    <NavigationContainer>
      {showSplash ? (
        // Splash Screen with Animation
        <Animated.View
          style={[
            styles.splashContainer,
            {
              backgroundColor: "rgba(235, 184, 101, 1)",
              opacity: fadeAnim, // Apply fade animation
              transform: [{ translateY: translateY }], // Apply upward movement
            },
          ]}
        >
          {/* Calendar icon placed in the background */}
          <Icon
            name="calendar-outline" // Calendar icon for event-related theme
            size={150}
            color={theme.textColor}
            style={styles.splashIcon} // Positioning icon
          />
          {/* Text on top of the background */}
          <Text style={[styles.splashText, { color: theme.textColor }]}>Event Management System</Text>
        </Animated.View>
      ) : (
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ color, size }) => {
              let iconName;
              if (route.name === 'Events') {
                iconName = 'calendar-outline'; // Calendar icon for events tab
              } else if (route.name === 'Feedback') {
                iconName = 'chatbox-ellipses-outline';
              }
              return <Icon name={iconName} size={size} color={color} />;
            },
            tabBarStyle: { backgroundColor: theme.backgroundColor },
            tabBarActiveTintColor: theme.buttonColor,
            tabBarInactiveTintColor: 'black',
            tabBarLabelStyle: { fontWeight: 'bold' },
          })}
        >
          <Tab.Screen
            name="Events"
            component={EventsStack}
            options={{
              headerShown: false,
            }}
          />
          <Tab.Screen
            name="Feedback"
            component={FeedbackScreen}
            options={{
              headerShown: true,
              headerStyle: { backgroundColor: theme.backgroundColor },
              headerTintColor: theme.textColor,
              headerTitleStyle: { fontWeight: 'bold' },
            }}
          />
        </Tab.Navigator>
      )}

      {/* Moon icon shown only after splash screen */}
      {!showSplash && (
        <Icon
          name="moon-outline"
          size={33}
          color={theme.buttonColor}
          onPress={toggleTheme}
          style={{ position: 'absolute', top: 55, right: 20 }}
        />
      )}
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  splashContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative', // Needed for positioning the icon
  },
  splashText: {
    fontSize: 34,
    fontWeight: 'bold',
    marginTop: 20,
    fontFamily: 'Montserrat-Regular',
  },
  splashIcon: {
    position: 'absolute',
    top: 300, // Adjust the icon position to your preference
    left: 0,
    right: 0,
    bottom: 0,
    textAlign: 'center',
    opacity: 0.3, // To make the icon lightly visible behind the text
  },
});

export default AppNavigator;
