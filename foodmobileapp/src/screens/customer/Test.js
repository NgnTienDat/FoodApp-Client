import React, { useState } from 'react';
import {
  ScrollView,
  TextInput,
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
} from 'react-native';

const StickySearchBar = () => {
  const [searchText, setSearchText] = useState('');

  const items = Array.from({ length: 50 }, (_, i) => `Item ${i + 1}`);

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Header</Text>
      </View>

      {/* Image */}



      {/* ScrollView Content */}
      <ScrollView contentContainerStyle={styles.content}
        stickyHeaderIndices={[2]}
        showsVerticalScrollIndicator={false}
      >
        <Image
          source={{ uri: 'https://via.placeholder.com/400x200' }}
          style={styles.image}
          resizeMode="cover"
        />
        {/* Info View */}
        <View style={styles.infoContainer}>
          <Text style={styles.infoText}>Welcome to the app! Here’s some important information for you.</Text>
          <Text style={styles.infoText}>This section can be used to display announcements or updates.</Text>
        </View>

        {/* Sticky Search Bar */}
        <View style={styles.searchBarContainer}>
          <TextInput
            style={styles.searchBar}
            placeholder="Search..."
            value={searchText}
            onChangeText={setSearchText}
          />
        </View>

        {items.map((item, index) => (
          <View key={index} style={styles.item}>
            <Text>{item}</Text>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    height: 100,
    backgroundColor: '#6200ea',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  image: {
    width: '100%',
    height: 200,
  },
  infoContainer: {
    padding: 15,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  infoText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 8,
  },
  searchBarContainer: {
    backgroundColor: '#fff',
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  searchBar: {
    height: 40,
    backgroundColor: '#eee',
    borderRadius: 8,
    paddingHorizontal: 10,
  },
  content: {
    padding: 20,
  },
  item: {
    backgroundColor: '#fff',
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
  },
});

export default StickySearchBar;
