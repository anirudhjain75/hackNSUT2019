import React from 'react';

import { View, Text } from 'react-native';

import { Theme } from 'theme';

import { Formik } from 'formik';
import { object as yupObject, string as yupString } from 'yup';

import { loginFireWithEmail } from 'components/auth/authUsingEmail';
import LoginForm from 'components/forms/LoginForm';

class LogIn extends React.Component {
  static navigationOptions = {
    title: 'Log In'
  };

  state = {
    errorMessage: null
  };

  render() {
    const { navigation } = this.props;

    return (
      <View>
        {this.state.errorMessage && (
          <View>
            <Text style={{ color: Theme.red }}>
              {this.state.errorMessage.message}
            </Text>
          </View>
        )}
        <Formik
          initialValues={{ email: '', password: '' }}
          validationSchema={yupObject().shape({
            email: yupString()
              .email('Email is invalid')
              .required('Required'),
            password: yupString()
              .required('Required')
          })}
          onSubmit={(values, { setSubmitting }) => {
            setSubmitting(true);
            loginFireWithEmail(values.email, values.password)
              .then((res) => {
                if (res === 'emailUnverified') {
                  navigation.navigate('Loading');
                } else if (res === 'success') {
                  navigation.navigate('Loading');
                }
              })
              .catch((err) => {
                this.setState({ errorMessage: err });
              });
          }}
          render={form => LoginForm({ ...form, navigation })}
        />
      </View>
    );
  }
}

export default LogIn;
