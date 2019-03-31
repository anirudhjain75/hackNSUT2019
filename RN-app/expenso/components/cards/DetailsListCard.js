import React from 'react';
import { SectionList, Text, StyleSheet, View } from 'react-native';
import { Theme } from 'theme';
import DetailsCard from './DetailsCard';
import LogoutCard from './LogoutCard';

const SectionHeader = ({ title }) => (
  <View style={styles.sectionHeaderContainer}>
    <Text style={styles.sectionHeaderText}>{title}</Text>
  </View>
);

const SectionContent = props => (
  <View style={styles.sectionContentContainer}>{props.children}</View>
);

export default class DetailsList extends React.Component {
  renderSectionHeader = ({ section }) => (
    <SectionHeader title={section.title} />
  );

  renderItem = ({ item }) => (
    <SectionContent>
      <Text style={styles.sectionContentText}>{item.value}</Text>
    </SectionContent>
  );

  // let props contains this.props.profileDetails
  render() {
    const sections = [
      // { data: [{ value: this.props.profileDetails.name }], title: "Name" },
      {
        data: [{ value: this.props.profileDetails.email }],
        title: 'Contact email'
      }
    ];
    return (
      <View style={styles.container}>
        <SectionList
          style={styles.container}
          renderItem={this.renderItem}
          renderSectionHeader={this.renderSectionHeader}
          stickySectionHeadersEnabled
          keyExtractor={(item, index) => index}
          ListHeaderComponent={DetailsCard(this.props.details)}
          sections={sections}
        />
        <LogoutCard />
      </View>
    );
  }
}

// TODO: Refactor this to styles
const styles = StyleSheet.create({
  container: {
    backgroundColor: Theme.background,
    alignContent: 'center',
    padding: 6
  },
  sectionHeaderContainer: {
    backgroundColor: Theme.grey,
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: Theme.grey
  },

  sectionHeaderText: {
    fontSize: 14
  },
  sectionContentContainer: {
    paddingTop: 8,
    paddingBottom: 12,
    paddingHorizontal: 15
  },
  sectionContentText: {
    color: Theme.secondary,
    fontSize: 14
  }
});
