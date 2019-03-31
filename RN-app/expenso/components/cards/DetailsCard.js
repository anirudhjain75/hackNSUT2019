import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { Theme } from 'theme';

const DetailsCard = details => (
  <View style={styles.titleContainer}>
    <View style={styles.titleIconContainer}>
      <Image source={details.image} />
    </View>
    <View style={styles.titleSubContainer}>
      <Text style={styles.titleHeader} numberOfLines={1}>
        {details.title}
      </Text>
      <Text style={styles.descriptionText}>{details.description}</Text>
      <Text style={styles.detailsText}>{details.details}</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  titleContainer: {
    borderWidth: 2,
    borderRadius: 12,
    borderColor: Theme.grey,
    padding: 12,
    marginBottom: 40
  },
  titleSubContainer: {
    flex: 1,
    alignContent: 'center'
  },
  titleIconContainer: {
    alignSelf: 'center',
    marginRight: 25,
    paddingTop: 2
  },
  titleHeader: {
    margin: 20,
    alignSelf: 'center',
    fontSize: 28,
    color: Theme.primary
  },
  descriptionText: {
    fontSize: 14,
    marginTop: 6,
    color: Theme.secondary
  },
  detailsText: {
    fontSize: 14,
    marginTop: 6,
    color: Theme.dark
  }
});

export default DetailsCard;
