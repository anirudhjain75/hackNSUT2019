import React from 'react';
import { View, StyleSheet, Text, ListView } from 'react-native';
import { Theme } from 'theme';
import { Subheading, Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';
import { callNumber } from 'utils/libraryFunctions';

// const SectionHeader = ({ title }) => (
//   <View style={styles.sectionHeaderContainer}>
//     <Text style={styles.sectionHeaderText}>{title}</Text>
//   </View>
// );

// const SectionContent = props => (
//   <View style={styles.sectionContentContainer}>{props.children}</View>
// );

export default class DataCard extends React.Component {
  render() {
    const { data, navigation } = this.props;
    // const dateTime = `${data.Date} ${data.Time} `;

    // let avatar;
    // if(data.patientImage !== undefined && data.patientImage.length>10){
    //   avatar = <Avatar.Image {...props} source={require(data.patientImage)} />
    // }
    // else{
    //   avatar = <Avatar.Text {...props} label={data.initials} />
    // }

    return (
      <View style={styles.container}>
        <Card
          elevation={2}
          onPress={() => {
            navigation.navigate('Details', { data });
          }
          }
          style={{
            borderBottomWidth: 1,
            borderBottomColor: '#AAA',
            backgroundColor: Theme.background
          }}
        >
          <Card.Title
            title={data.patientName}
            subtitle={data.ago}
            left={props => <Avatar.Text {...props} label={data.initials} />}
          />
          <Card.Content style={{
          }}
          >
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Subheading style={{ color: Theme.darkText, fontSize: 12 }}>
                {data.age !== undefined ? `${data.age} yrs • ` : ''}
                {data.gender !== undefined ? `${data.gender} • ` : ''}
                {data.weight !== undefined ? `${data.weight} Kgs • ` : ''}
                {data.bodyTemperature !== undefined ? `${data.bodyTemperature} F • ` : ''}
                {data.bloodPressure !== undefined ? `BP ${data.bloodPressure} • ` : ''}
                {data.normalOrEmergency !== undefined ? `${data.normalOrEmergency}` : ''}
              </Subheading>
              <Subheading style={{ fontSize: 12 }}>
                {data.fees !== undefined ? `Rs ${data.fees}` : ''}
              </Subheading>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Subheading
                numberOfLines={5}
                // ellipsizeMode="tail"
                style={{ color: Theme.darkText, fontSize: 12, paddingRight: 60 }}
              >

                {data.email !== undefined ? `${data.email} • ` : ''}
              </Subheading>
              <Subheading
                numberOfLines={1}
                style={{ fontSize: 12 }}
              >
                <Text
                  onPress={() => callNumber(`tel:${data.mobile}`)}
                  style={[
                    styles.value,
                    {
                      marginLeft: 5,
                      textDecorationLine: 'underline'
                    }]}
                >
                  {`${data.mobile}`}
                </Text>
                {/* {data.mobile !== undefined ? `${data.mobile} ` : ''} */}
              </Subheading>
              {/* <Subheading style={{ fontSize: 12 }}>
              </Subheading> */}
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Subheading
                numberOfLines={5}
                style={{ color: Theme.darkText, fontSize: 12, paddingRight: 60 }}
              >
                {data.address !== undefined ? `Address: ${data.address}` : ''}
              </Subheading>
              <Subheading
                numberOfLines={1}
                style={{ color: Theme.darkText, fontSize: 12, paddingRight: 60 }}
              />
            </View>

            <Paragraph
              numberOfLines={this.state.isSelected ? 6 : 3}
              ellipsizeMode="tail"
              style={{ color: Theme.text, fontSize: 14, paddingRight: 60 }}
            >
              {data.patientDiagnosis !== undefined ? `Diagnosis: ${data.patientDiagnosis}` : ''}
            </Paragraph>
            <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>

              <Subheading style={{ fontSize: 10 }}>
                {data.time}
                {' '}
                {data.date}
              </Subheading>
            </View>
          </Card.Content>
          <Card.Actions style={{ justifyContent: 'space-between', marginBottom: 0 }}>
            <Button>Edit</Button>
          </Card.Actions>
        </Card>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 6,
  },
  listcontainer: {
    alignContent: 'center',
    flexWrap: 'wrap'
  },
  monoText: {
    fontSize: 14,
    color: Theme.infoText,
    fontFamily: 'space-mono'
  },
  sectionHeaderContainer: {
    flexDirection: 'row'
  },
  sectionHeaderText: {
    flexDirection: 'row',
    color: Theme.text
  },
  sectionContentContainer: {},
  sectionContentText: {
    color: Theme.secondary
  }
});
// ISSUES -- Back button
