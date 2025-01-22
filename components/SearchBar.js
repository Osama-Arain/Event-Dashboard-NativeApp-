import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

const SearchBar = ({ searchTerm, onSearch }) => {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Search by name or venue"
        value={searchTerm}
        onChangeText={onSearch}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
  },
});

export default SearchBar;
