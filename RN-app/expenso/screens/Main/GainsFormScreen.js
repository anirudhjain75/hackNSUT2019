/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import {
  View,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView
} from 'react-native';
import {
  Divider,
  Text, Chip
} from 'react-native-paper';
import { styles, Theme } from 'theme';
import { Formik, RadioInput } from 'formik';
import {
  object as yupObject,
  string as yupString,
  boolean as yupBoolean,
  number as yupNumber
} from 'yup';
import { storePatientsInFire, updateDataInFirebase } from 'api/user';
import { connect } from 'react-redux';
import TopHeader from 'components/bars/TopHeader';
import TextInputWithIcon from 'components/TextInputWithIcon';
import WithIcon from 'components/WithIcon';

import { Icon } from 'react-native-elements';
import { NavigationEvents } from 'react-navigation';
import UploadAvatar from '../../components/UploadAvatar';

class FormScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  state = {
    data: null,
    isUpdating: false,
    key: '',
    salary: false,
    savings: false,
    others: false,
  }

  handleResponse = () => {
    // handleResponse
    // this.props.navigation.state.params.onNavigateBack();
    this.props.navigation.goBack();
  };

  unselectOthers = (key) => {
    this.setState({
      salary: false,
      savings: false,
      others: false,
    });
    console.log(key);
    this.setState({ [key]: true });
  }

  handleUpdate = (payload) => {
    // const { data } = this.props.navigation.getParam('data', '');
    if (payload.action.params.data !== undefined) {
      const { data } = payload.action.params;
      this.setState({ data, isUpdating: true, key: data.key });
      this.forceUpdate();
    } else {
      this.setState({ data: null });
    }
    console.log(`asdsad${JSON.stringify(this.state.data)}`);
  }

  render() {
    return (
      <View style={{ backgroundColor: Theme.background }}>
        <TopHeader
          title={
            this.state.data ? 'Update The Gains'
              : 'Add Gains'}
          navigation={this.props.navigation}
        />

        <NavigationEvents
          onWillFocus={payload => this.handleUpdate(payload)}
        />
        <KeyboardAvoidingView
          keyboardVerticalOffset={30} // Bug Due to headerBar
          // style={styles.container}
          behavior="padding"
        >
          <Formik
            enableReinitialize
            initialValues={
              this.state.data ? {
                ...this.state.data
              }
                : {
                  refNo: '',
                  type: 'Gain',
                  category: '',
                  attended: false
                }
            }
            validationSchema={yupObject().shape({
              name: yupString()
                .min(2, 'Too Short!')
                .max(50, 'Too Long!'),
              amount: yupNumber()
                .required('Required')
                .positive()
                .integer(),
            })}
            onSubmit={(values, { setSubmitting }) => {
              setSubmitting(true);
              if (this.state.isUpdating) {
                updateDataInFirebase({ key: this.state.key, ...values })
                  .then(() => {
                    this.handleResponse();
                  }).catch((err) => {
                    // this.setState({err})
                  });
              } else {
                storePatientsInFire(values)
                  .then(() => {
                    this.handleResponse();
                  })
                  .catch(() => {
                    // handle
                  });
              }
            }}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting,
              setFieldValue,
              setFieldTouched,
              setTouched
              /* and other goodies */
            }) => (
              <ScrollView style={{
                padding: 20,
              }}
              >
                <UploadAvatar
                  getImage={(image) => {
                    console.log(`Uploaded URI :: ${image}`);
                    if (image) setFieldValue('imageURL', image);
                  }}
                />
                <Divider />
                <Text style={{ alignSelf: 'center', padding: 20 }}>
                    Add Data Manually
                </Text>
                <Divider />
                <TextInputWithIcon
                  icon="md-person"
                  onChangeText={
                      value => setFieldValue('name', value)
                    }
                  value={values.name}
                  label="Name"
                  onBlur={() => setFieldTouched('name')}
                  placeholder="Name"
                  autoCapitalize="words"
                  error={
                      touched.name && errors.name
                        ? errors.name
                        : undefined
                    }
                />
                <TextInputWithIcon
                  icon="rupee"
                  iconType="font-awesome"
                  onChangeText={value => setFieldValue('amount', value)}
                  value={values.amount}
                  label="Amount"
                  onBlur={() => setFieldTouched('amount')}
                  placeholder="Amount"
                  keyboardType="number-pad"
                  error={
                      touched.amount && errors.amount ? errors.amount : undefined
                    }
                />
                <Text>{JSON.stringify(this.state)}</Text>
                {/* <TextInputWithIcon
                  icon="birthday-cake"
                  iconType="font-awesome"
                  onChangeText={value => setFieldValue('type', value)}
                  value={values.type}
                  label="Type"
                  onBlur={() => setFieldTouched('type')}
                  placeholder="Type"
                  error={
                      touched.type && errors.type ? errors.type : undefined
                    }
                /> */}
                <WithIcon>
                  <Text style={{ paddingBottom: 20 }}> Chose a category</Text>
                  <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-evenly' }}>

                    <Chip
                      style={{ marginBottom: 10 }}
                      selected={this.state.salary}
                      onPress={() => {
                        setFieldValue('category', 'salary');
                        this.unselectOthers('salary');
                      }}
                    >
salary
                    </Chip>
                    <Chip
                      style={{ marginBottom: 10 }}
                      selected={this.state.savings}
                      onPress={() => {
                        setFieldValue('category', 'savings');
                        this.unselectOthers('savings');
                      }}
                    >
Savings

                    </Chip>
                    <Chip
                      selected={this.state.others}
                      style={{ marginBottom: 10 }}
                      onPress={() => {
                        setFieldValue('category', 'others');
                        this.unselectOthers('others');
                      }}
                    >
Others
                    </Chip>
                  </View>
                </WithIcon>
                <TextInputWithIcon
                  icon="ios-mail"
                  style={localStyles.rightTextInputs}
                  onChangeText={value => setFieldValue('refNo', value)}
                  value={values.refNo}
                  label="Reference Number"
                  onBlur={() => setFieldTouched('refNo')}
                  placeholder="Reference Number"
                  autoCapitalize="none"
                  error={
                      touched.refNo && errors.refNo
                        ? errors.refNo
                        : undefined
                    }
                />
                <TextInputWithIcon
                  icon="location"
                  iconType="entypo"
                  style={localStyles.rightTextInputs}
                  onChangeText={value => setFieldValue('address', value)}
                  value={values.address}
                  label="Address"
                  onBlur={() => setFieldTouched('address')}
                  placeholder="Address"
                  numberOfLines={(values.address && values.address.length > 10) ? 3 : 1}
                  multiline
                  error={
                      touched.name && errors.name ? errors.name : undefined
                    }
                />
                <TextInputWithIcon
                  icon="medicinebox"
                  iconType="antdesign"
                  onChangeText={(value) => {
                    setFieldValue('others', value);
                  }}
                  value={values.others}
                  label="Summary"
                  onBlur={() => setFieldTouched('others')}
                  placeholder="Summary"
                  numberOfLines={
                      (values.others && values.others.length > 10) ? 3 : 1}
                  multiline
                  error={
                      touched.others && errors.others
                        ? errors.others
                        : undefined
                    }
                />
                <Text
                  style={[styles.errorText, { alignSelf: 'flex-start' }]}
                >
                  {/* {JSON.stringify(touched)}
                    {JSON.stringify(errors)} */}
                  {/* {touched.problem && errors.problem ? errors.problem : undefined} */}
                  {Object.keys(errors).map(
                    (key, index) => `${key} : ${errors[key]}\n`
                  )}
                </Text>
                <TouchableOpacity
                  onPress={async () => {
                    await handleSubmit();
                  }}
                  disabled={isSubmitting}
                  activeOpacity={0.6}
                  style={[
                    styles.touchableButton,
                    {
                      width: '100%',
                      alignItems: 'center',
                      backgroundColor: Theme.red,
                      borderRadius: 4,
                      padding: 14,
                      marginTop: 10,
                      // marginBottom: 10,
                      marginBottom: 300
                    }
                  ]}
                >
                  <Text style={{ color: Theme.white, fontWeight: 'bold' }}>
                      Continue
                  </Text>
                </TouchableOpacity>
              </ScrollView>
            )}
          </Formik>
        </KeyboardAvoidingView>
      </View>
    );
  }
}

const localStyles = StyleSheet.create({
  TextInputContainer: {
    paddingBottom: 10,
    flexDirection: 'row'
  },
  searchIcon: {
    padding: 10
  },
  leftIcons: {
    flex: 1,
    padding: 4
  },
  rightTextInputs: {
    flex: 7
  }
});

const mapStateToProps = state => ({
  user: state.user
});

export default connect(mapStateToProps)(FormScreen);
