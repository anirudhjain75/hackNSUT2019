import firebase from 'utils/firebase';
import store from 'redux/store';

export const getSummaryData = async () => {
  const { data, user } = await store.getState();
  let Expense = 0;
  let Income = 0;
  let Balance = 0;
  console.log(JSON.stringify(data));
  data.forEach((item) => {
    if (item.type === 'Expense') {
      Expense += item.amount;
      Balance -= item.amount;
    } else if (item.type === 'Gain') {
      Income += item.amount;
      Balance += item.amount;
    }
  });

  return {
    Expense,
    Income,
    Balance,
  };
};
