/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import {
  View,
  ScrollView,
  ActivityIndicator,
  Text,
  Slider,
  Switch,
  TouchableOpacity,
  StyleSheet,
  Platform,
  Picker,
  KeyboardAvoidingView
} from 'react-native';
import {
  RadioButton,
  TouchableRipple,
  Button
} from 'react-native-paper';
import { styles, Theme } from 'theme';
import { Formik, RadioInput } from 'formik';
import {
  object as yupObject,
  string as yupString,
  boolean as yupBoolean,
  number as yupNumber
} from 'yup';
import { storePatientsInFire } from 'api/user';
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
  }

  handleResponse = () => {
    // handleResponse
    this.props.navigation.state.params.onNavigateBack();
    this.props.navigation.navigate('Patients List');
  };

  handleUpdate = (payload) => {
    console.log(`payload${JSON.stringify(payload, null, 2)}`);
    // const { data } = this.props.navigation.getParam('data', '');
    if (payload.action.params.data) {
      const { data } = payload.action.params;
      this.setState({ data });
      this.forceUpdate();
    } else {
      this.setState({ data: null });
    }
    console.log(`asdsad${JSON.stringify(this.state.data)}`);
  }

  render() {
    const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
    return (
      <View>
        <TopHeader
          title={
            this.state.data ? 'Update the appointment'
              : 'Set the appointment'}
          navigation={this.props.navigation}
        />
        <Text>{JSON.stringify(this.state.data)}</Text>
        <NavigationEvents
          onWillFocus={payload => this.handleUpdate(payload)}
        // onDidFocus={payload => console.log('did focus', payload)}
        // onWillBlur={payload => console.log('will blur', payload)}
        // onDidBlur={payload => console.log('did blur', payload)}
        />
        <KeyboardAvoidingView
          behavior="padding"
          keyboardVerticalOffset={30} // Bug Due to headerBar
        >
          <Formik
            initialValues={
              this.state.data ? {
                email: this.state.data.email
              }
                : { email: '', gender: 'Male', group: 'Normal', attended: 'false' }
            }
            validationSchema={yupObject().shape({
              patientName: yupString()
                .min(2, 'Too Short!')
                .max(50, 'Too Long!')
                .required('Required'),
              patientDiagnosis: yupString().required('Required'),
              fees: yupNumber()
                .required('Required')
                .positive()
                .integer(),
              age: yupNumber()
                .positive()
                .max(120),
              email: yupString().email('Email is invalid'),
              mobile: yupString()
                .matches(phoneRegExp, 'Mobile number is not valid')
                .required('Required')
            })}
            onSubmit={(values, { setSubmitting }) => {
              setSubmitting(true);
              storePatientsInFire(values)
                .then((response) => {
                  this.handleResponse(response);
                })
                .catch(() => {
                  // handle
                });
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
                    console.log(`Uploaded Image URI :: ${image}`);
                    setFieldValue('patientImage', image);
                  }}
                />
                <TextInputWithIcon
                  icon="md-person"
                  onChangeText={
                      value => setFieldValue('patientName', value)
                    }
                  value={values.patientName}
                  label="Patient Name"
                  onBlur={() => setFieldTouched('patientName')}
                  placeholder="Patient Name"
                  error={
                      touched.patientName && errors.patientName
                        ? errors.patientName
                        : undefined
                    }
                />
                <TextInputWithIcon
                  icon="medicinebox"
                  iconType="antdesign"
                  onChangeText={(value) => {
                    setFieldValue('patientDiagnosis', value);
                  }}
                  value={values.patientDiagnosis}
                  label="Patient Diagnosis"
                  onBlur={() => setFieldTouched('patientDiagnosis')}
                  placeholder="Patient Diagnosis"
                  numberOfLines={
                      values.patientDiagnosis && (values.patientDiagnosis.length > 10 ? 6 : 1)}
                  multiline
                  error={
                      touched.patientDiagnosis && errors.patientDiagnosis
                        ? errors.patientDiagnosis
                        : undefined
                    }
                />
                <TextInputWithIcon
                  icon="rupee"
                  iconType="font-awesome"
                  onChangeText={value => setFieldValue('fees', value)}
                  value={values.fees}
                  label="Fees"
                  onBlur={() => setFieldTouched('fees')}
                  placeholder="Fees"
                  keyboardType="number-pad"
                  error={
                      touched.fees && errors.fees ? errors.fees : undefined
                    }
                />
                <TextInputWithIcon
                  icon="birthday-cake"
                  iconType="font-awesome"
                  onChangeText={value => setFieldValue('age', value)}
                  value={values.age}
                  label="Age"
                  onBlur={() => setFieldTouched('age')}
                  placeholder="Age"
                  keyboardType="number-pad"
                  error={
                      touched.age && errors.age ? errors.age : undefined
                    }
                />

                {/* <RadioButton
                      value="first"
                      // status={checked === 'first' ? 'checked' : 'unchecked'}
                      onPress={() => { this.setState({ checked: 'first' }); }}
                    />
                    <RadioInput
                      value="second"
                      // status={checked === 'second' ? 'checked' : 'unchecked'}
                      onPress={() => { this.setState({ checked: 'second' }); }}
                    /> */}
                {/* <RadioInput
                        id="blue"
                        value={values.color}
                        name="color"
                        checked={values.color === 'blue'}
                        label="Blue"
                        onBlur={handleBlur}
                        onChange={() => {
                          setFieldValue('color', 'blue')
                        }}
                      />

                      <RadioInput
                        id="red"
                        value={values.color}
                        name="color"
                        checked={values.color === 'red'}
                        label="Red"
                        onBlur={handleBlur}
                        onChange={() => {
                          setFieldValue('color', 'red')
                        }}
                      /> */}
                {/* <TextInputWithIcon
                    style={localStyles.rightTextInputs}
                    value={values.gender}
                    disabled
                    label="Gender"
                    error={
                          touched.gender && errors.gender
                            ? errors.gender
                            : undefined
                        }
                  /> */}
                <WithIcon
                  title="Gender"
                >
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingBottom: 20 }}>

                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <Icon
                        name="gender-male"
                        type="material-community"
                        size={14}
                        color={Theme.secondary}
                        iconStyle={localStyles.leftIcons}
                      />
                      <Text>Male</Text>
                      <RadioButton
                        value={values.gender}
                        status={values.gender === 'Male' ? 'checked' : 'unchecked'}
                        onPress={() => setFieldValue('gender', 'Male')}
                      />
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <Icon
                        name="gender-female"
                        type="material-community"
                        size={14}
                        color={Theme.secondary}
                        iconStyle={localStyles.leftIcons}
                      />
                      <Text>Female</Text>
                      <RadioButton
                        value={values.gender}
                        status={values.gender === 'Female' ? 'checked' : 'unchecked'}
                        onPress={() => setFieldValue('gender', 'Female')}
                      />
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <Icon
                        name="gender-transgender"
                        type="material-community"
                        size={14}
                        color={Theme.secondary}
                        iconStyle={localStyles.leftIcons}
                      />
                      <Text>Other</Text>
                      <RadioButton
                        value={values.gender}
                        status={values.gender === 'Other' ? 'checked' : 'unchecked'}
                        onPress={() => setFieldValue('gender', 'Other')}
                      />
                    </View>
                  </View>
                </WithIcon>
                <TextInputWithIcon
                  icon="ios-call"
                  style={localStyles.rightTextInputs}
                  onChangeText={value => setFieldValue('mobile', value)}
                  value={values.mobile}
                  label="Mobile"
                  onBlur={() => setFieldTouched('mobile')}
                  placeholder="Mobile"
                  keyboardType="phone-pad"
                  error={
                      touched.mobile && errors.mobile
                        ? errors.mobile
                        : undefined
                    }
                />

                <TextInputWithIcon
                  icon="ios-mail"
                  style={localStyles.rightTextInputs}
                  onChangeText={value => setFieldValue('email', value)}
                  value={values.email}
                  label="Email"
                  onBlur={() => setFieldTouched('email')}
                  placeholder="Email"
                  autoCapitalize="none"
                  error={
                      touched.email && errors.email
                        ? errors.email
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
                  numberOfLines={values.address && (values.address.length > 10 ? 6 : 1)}
                  multiline
                  error={
                      touched.name && errors.name ? errors.name : undefined
                    }
                />

                <TextInputWithIcon
                  icon="location-city"
                  iconType="materialIcons"
                  style={localStyles.rightTextInputs}
                  onChangeText={value => setFieldValue('city', value)}
                  value={values.city}
                  label="City"
                  onBlur={() => setFieldTouched('city')}
                  placeholder="City"
                  error={
                      touched.city && errors.city ? errors.city : undefined
                    }
                />


                <TextInputWithIcon
                  icon="weight"
                  iconType="material-community"
                  style={localStyles.rightTextInputs}
                  onChangeText={value => setFieldValue('weight', value)}
                  value={values.weight}
                  label="Weight"
                  onBlur={() => setFieldTouched('weight')}
                  placeholder="Weight"
                  error={
                      touched.weight && errors.weight
                        ? errors.weight
                        : undefined
                    }
                />

                <TextInputWithIcon
                  icon="thermometer"
                  iconType="entypo"
                  style={localStyles.rightTextInputs}
                  onChangeText={value => setFieldValue('bodyTemperature', value)
                    }
                  value={values.bodyTemperature}
                  label="Body Temperature"
                  onBlur={() => setFieldTouched('bodyTemperature')}
                  placeholder="Body Temperature"
                  error={
                      touched.bodyTemperature && errors.bodyTemperature
                        ? errors.bodyTemperature
                        : undefined
                    }
                />

                <TextInputWithIcon
                  icon="compress"
                  iconType="font-awesome"
                  style={localStyles.rightTextInputs}
                  onChangeText={value => setFieldValue('bloodPressure', value)
                    }
                  value={values.bloodPressure}
                  label="Blood Pressure"
                  onBlur={() => setFieldTouched('bloodPressure')}
                  placeholder="Blood Pressure"
                  error={
                      touched.bloodPressure && errors.bloodPressure
                        ? errors.bloodPressure
                        : undefined
                    }
                />

                {/* <TextInputWithIcon
                    icon="ios-warning"
                    style={localStyles.rightTextInputs}
                    onChangeText={value => setFieldValue('normalOrEmergency', value)
                        }
                    value={values.bloodPressure}
                    label="Normal Or Emergency?"
                    onBlur={() => setFieldTouched('normalOrEmergency')}
                    placeholder="Normal Or Emergency?"
                    error={
                          touched.normalOrEmergency && errors.normalOrEmergency
                            ? errors.normalOrEmergency
                            : undefined
                        }
                  /> */}
                <WithIcon
                  title="Type"
                >
                  <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    paddingBottom: 20
                  }}
                  >

                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <Icon
                        name="ios-person"
                        type="ionicon"
                        size={14}
                        color={Theme.secondary}
                        iconStyle={localStyles.leftIcons}
                      />
                      <Text>Normal</Text>
                      <RadioButton
                        value={values.group}
                        status={values.group === 'Normal' ? 'checked' : 'unchecked'}
                        onPress={() => setFieldValue('group', 'Normal')}
                      />
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <Icon
                        name="ios-warning"
                        type="ionicon"
                        size={14}
                        color={Theme.secondary}
                        iconStyle={localStyles.leftIcons}
                      />
                      <Text>Emergency</Text>
                      <RadioButton
                        value={values.group}
                        status={values.group === 'Emergency' ? 'checked' : 'unchecked'}
                        onPress={() => setFieldValue('group', 'Emergency')}
                      />
                    </View>
                  </View>
                </WithIcon>
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
                <Text>
                  {
                      JSON.stringify(values, null, 4)
                    }
                </Text>
                <TouchableOpacity
                  onPress={async () => {
                    await handleSubmit();
                  }}
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
                      marginBottom: 400
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
