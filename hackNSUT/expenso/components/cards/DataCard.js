import React from 'react';
import { View, StyleSheet, Text, ListView, Linking } from 'react-native';
import { Theme } from 'theme/index';
import { Subheading, Avatar, Button, Card, Paragraph, Menu, Divider, Title, Portal, Modal, IconButton } from 'react-native-paper';
import { Icon } from 'react-native-elements';
import { updateDataInFirebase } from 'api/user';

export default class DataCard extends React.Component {
  state = {
    visible: false
  }

  _openMenu = () => this.setState({ visible: true });

  _closeMenu = () => this.setState({ visible: false });

  render() {
    const { data, navigation } = this.props;
    return (
      <View style={styles.container}>
        <Card
          elevation={2}
          style={{
            borderBottomWidth: 1,
            borderBottomColor: '#ccc',
            backgroundColor: data.type === 'Expenses' ? Theme.red : '#fff'
          }}
        >
          <Card.Title
            title={data.name}
            subtitle={data.ago}
            right={() => (
              <Text style={{ fontSize: 12, paddingRight: 20 }}>
                {data.amount ? `₹ ${data.amount}` : ''}
              </Text>
            )}
          >
          </Card.Title>
          {data.others
              && (
              <Paragraph
                ellipsizeMode="tail"
                style={{ color: Theme.text, fontSize: 14, paddingRight: 60 }}
              >
                {data.others}
              </Paragraph>
              )}
          {/* <Subheading style={{ fontSize: 10 }}>
            {data.time}
            {'  '}
            {data.date}
          </Subheading> */}
          <Card.Actions style={{ justifyContent: 'flex-end', marginBottom: 0 }}>
            <IconButton icon="more-vert" onPress={this._openMenu} />
            <Menu
              visible={this.state.visible}
              onDismiss={this._closeMenu}
              style={{ justifyContent: 'flex-end' }}
            >
              <Menu.Item
                onPress={() => {
                  const attended = !data.attended;
                  updateDataInFirebase({ ...data, attended });
                }}
                title="Edit"
              />
              <Menu.Item
                onPress={() => {
                  this.props.navigation.navigate('Appointment', { data });
                }}
                title="Archive"
              />
              <Divider />
            </Menu>
          </Card.Actions>
        </Card>
      </View>
    );
  }
}

class MyModal extends React.Component {
  state = {
    visible: false,
  };

  _showModal = () => this.setState({ visible: true });

  _hideModal = () => this.setState({ visible: false });

  render() {
    const { visible } = this.state;
    return (
      <Modal visible={visible} onDismiss={this._hideModal}>
        <Text>Example Modal</Text>
      </Modal>
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
