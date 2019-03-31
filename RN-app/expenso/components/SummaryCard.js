import * as React from 'react';
import { List, Chip } from 'react-native-paper';
import { getSummaryData } from 'utils/getSummaryData';

export default class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    this.updateSummaryAsync();
  }

  state = {
    summary: ''
  };

  updateSummaryAsync = async () => {
    console.log('TEST');
    const summary = await getSummaryData();
    this.setState({ summary });
  }

  render() {
    return (
      <List.Section>
        {/* <List.Subheader>Summary</List.Subheader> */}
        <List.Section style={{ width: '100%', flexWrap: 'wrap', justifyContent: 'center', flexDirection: 'row' }}>
          <Chip
            icon="error"
            style={{ marginBottom: 10, marginRight: 10 }}
            onPress={() => {
            }}
          >
         Expenses :
            {' '}
            {this.state.summary.Expense}
          </Chip>
          <Chip
            icon="add"
            style={{ marginBottom: 10, marginRight: 10 }}
            onPress={() => {
            }}
          >
          Income :
            {' '}
            {this.state.summary.Income}
          </Chip>
          <Chip
            icon="done"
            style={{ marginBottom: 10, marginRight: 10 }}
            onPress={() => {
            }}
          >
          Balance :
            {' '}
            {this.state.summary.Balance}
          </Chip>
        </List.Section>
      </List.Section>
    );
  }
}
