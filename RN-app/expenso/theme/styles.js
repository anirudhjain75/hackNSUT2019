import { StyleSheet } from 'react-native';
import { Theme, statusbarMargin } from './constants';

const ROUNDNESS = 6;

const styles = StyleSheet.create({
  statusBar: {
    backgroundColor: Theme.statusbar,
    height: statusbarMargin
  },
  container: {
    flex: 1,
    backgroundColor: Theme.background
  },
  rootContainer: {
    backgroundColor: Theme.background
  },
  headerStyle: {
    backgroundColor: Theme.statusbar,
    // height: 30,
    // paddingBottom: 30,
    // borderBottomWidth: 0,
    borderColor: Theme.statusbar,
    shadowColor: 'transparent',
    elevation: 1,
    // TODO: ADD a Fix
    marginTop: -20,
    borderBottomWidth: 0,
    height: 60,
  },
  containerStyle: {
    paddingTop: 0,
    // marginTop: 0,
    // marginLeft: 10,
    // marginRight: 10,
    margin: 4,
    height: 46,
    backgroundColor: Theme.statusbar,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: Theme.statusbar
  },
  topBarStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'absolute',
    zIndex: 1,
    flex: 1,
    alignItems: 'center',
    alignContent: 'center',
    paddingLeft: 30,
    width: '100%',
    backgroundColor: Theme.statusbar
  },
  topheaderStyle: {
    paddingTop: 0,
    // marginTop: 0,
    // marginLeft: 10,
    // marginRight: 10,
    margin: 4,
    height: 46,
    backgroundColor: Theme.grey,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: Theme.grey
  },
  bottomTab: {
    backgroundColor: Theme.background,
    color: Theme.text,
    borderColor: Theme.tintColor
  },
  tintColor: {
    color: Theme.background
  },
  formikContainer: {
    flex: 1,
    paddingTop: 24,
    paddingBottom: 24,
    paddingLeft: 16,
    paddingRight: 16,
    backgroundColor: Theme.background
  },
  text: {
    fontSize: 14,
    marginTop: 6,
    color: Theme.text
  },
  errorText: {
    fontSize: 14,
    margin: 6,
    alignSelf: 'flex-end',
    color: Theme.red
  },
  textInput: {
    color: Theme.tintColor,
    height: 36,
    width: '100%',
    borderColor: Theme.tintColor,
    borderWidth: 1,
    marginTop: 10,
    paddingTop: 4,
    paddingBottom: 4,
    paddingLeft: 12,
    paddingRight: 12,
    borderRadius: ROUNDNESS
  },
  touchableButton: {
    shadowOpacity: 0.1,
    flexDirection: 'row',
    justifyContent: 'center',
    shadowRadius: 1.5,
    shadowOffset: { width: 0, height: 1 },
    overflow: 'visible',
    shadowColor: 'black',
    alignItems: 'center',
    backgroundColor: Theme.blue,
    borderRadius: ROUNDNESS,
    marginTop: 20
  },
  contentContainer: {
    paddingTop: 30
  },
  image: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 60,
    width: 60
  },
  icon: {
    width: 60,
    height: 60
  },
  imageContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10
  },
  baseContainer: {
    alignItems: 'flex-start',
    marginHorizontal: 30
  },
  highlightText: {
    color: Theme.highlightedText
  },
  headingText: {
    fontSize: 17,
    color: Theme.headingtext,
    lineHeight: 24,
    textAlign: 'left'
  },
  infoContainer: {
    backgroundColor: Theme.warningBackground,
    alignItems: 'center',
    padding: 10,
    marginTop: 20
  },
  tabBarInfoText: {
    fontSize: 17,
    color: Theme.infoText,
    textAlign: 'center'
  },
  monoText: {
    fontSize: 17,
    color: Theme.infoText,
    textAlign: 'center',
    fontFamily: 'space-mono'
  },
  navigationFilename: {
    marginTop: 5
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center'
  },
  linkLoginSignup: {
    color: Theme.white,
    alignItems: 'center',
    backgroundColor: Theme.grey,
    padding: 12,
    width: '100%'
  },
  linkText: {
    fontSize: 14,
    color: Theme.link
  },
  optionsTitleText: {
    fontSize: 16,
    marginLeft: 15,
    marginTop: 9,
    marginBottom: 12
  },
  optionIconContainer: {
    marginRight: 9
  },
  option: {
    backgroundColor: Theme.grey,
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: Theme.black
  },
  optionText: {
    fontSize: 15,
    marginTop: 1
  },
  content: {
    padding: 16
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    backgroundColor: Theme.blue,
    bottom: 0,
  },
});

export default styles;
