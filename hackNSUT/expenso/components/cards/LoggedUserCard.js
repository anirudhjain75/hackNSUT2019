import React from 'react';
import { View, Text, ImageBackground } from 'react-native';
import { Theme } from 'theme/index';
import { connect } from 'react-redux';
import { Avatar, Card } from 'react-native-paper';

const LoggedUserCard = (props) => {
  const { user } = props;
  if (!user || user.providerData === undefined) return <View />;
  return (
    <ImageBackground
      source={require('assets/images/sideimage.jpg')}
      style={{
        width: '100%',
        height: 140,
        alignSelf: 'flex-start',
        marginTop: -24,
      }}
    >
      <Card.Title
        style={{ flex: 1 }}
        title={(
          <Text
            style={[{
              color: Theme.white,
              alignSelf: 'center',
              fontSize: 18,
              fontWeight: 'bold'
            }]}
            numberOfLines={1}
          >
            {user.providerData[0].displayName && user.providerData[0].displayName}
          </Text>
        )}
        // eslint-disable-next-line no-shadow
        left={(props) => {
          if (user.providerData[0].photoURL) {
            return <Avatar.Image {...props} source={{ uri: user.providerData[0].photoURL }} />;
          }
          return (
            <Avatar.Text
              {...props}
              label={user.providerData[0].displayName ? user.providerData[0].displayName.replace(/[^a-zA-Z- ]/g, '').match(/\b\w/g).join('') : ''}
            />
          );
        }
    }
        subtitle={(
          <Text
            style={[{
              color: Theme.white,
              alignSelf: 'center',
              fontSize: 16,
              fontWeight: 'normal'
            }]}
            numberOfLines={1}
          >
            {user.providerData[0].email && user.providerData[0].email}
            {user.providerData[0].phoneNumber && user.providerData[0].phoneNumber}
          </Text>
        )}
      />
    </ImageBackground>
  );
};


const mapStateToProps = state => ({
  user: state.user
});

export default connect(mapStateToProps)(LoggedUserCard);
