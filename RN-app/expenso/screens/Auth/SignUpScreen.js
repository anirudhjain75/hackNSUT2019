/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import { View, Text } from 'react-native';
import { styles, Theme } from 'theme';
import { Formik } from 'formik';
import { object as yupObject, string as yupString } from 'yup';
import { signupFire, verifyEmail } from 'components/auth/authUsingEmail';
import SignUpForm from 'components/forms/SignUpForm';
// import { TopBar } from 'components';

class SignUpScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

   handleError = (err) => {
     if (err.code === 'auth/email-already-in-use') {
       //  console.log(JSON.stringify(err));
       const info = 'Email is already in use. Login to Continue.';
       this.props.navigation.navigate('Providers', { info });
     }
   };

  state = {
    errorMessage: null
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={[styles.formikContainer, { paddingTop: 10 }]}>
          <Text style={[styles.errorText, { alignSelf: 'center' }]}>
            {this.state.errorMessage && this.state.errorMessage}
          </Text>
          <Formik
            initialValues={{ email: '', password: '' }}
            validationSchema={yupObject().shape({
              // name: yupString()
              //   .min(2, 'Too Short!')
              //   .max(50, 'Too Long!')
              //   .required('Required'),
              email: yupString()
                .email('Email is invalid')
                .required('Required'),
              password: yupString()
                // .min(8, 'Minimum length should be greater than 8')
                .required('Required')
            })}
            onSubmit={(values, { setSubmitting }) => {
              setSubmitting(true);
              signupFire(values.email, values.password)
                .then((res) => {
                  const { emailVerified } = res.user;
                  if (!emailVerified) {
                    verifyEmail();
                    // this.props.navigation.navigate('EmailConfirm');
                    this.props.navigation.navigate('Loading');
                  } else {
                    this.props.navigation.navigate('Loading');
                  }
                }).catch((err) => {
                  this.setState({ errorMessage: err.message });
                  this.handleError(err);
                });
            }}
            render={form => SignUpForm(form)}
          />
        </View>
      </View>
    );
  }
}

export default SignUpScreen;
