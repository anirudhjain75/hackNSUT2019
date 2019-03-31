const functions = require('firebase-functions');
const { dialogflow, Permission, Suggestions } = require('actions-on-google');

const app = dialogflow()

app.intent('Default Welcome Intent', (conv) => {
  conv.ask(new Permission({
    context: 'Hi there, to get to know you better',
    permissions: 'NAME'
  }));
  if (conv.data.userName) {
    conv.ask(`Hey ${conv.data.userName}, I am Expenso. Your personal finance companion, What can I do for you ?`)
    conv.ask(new Suggestions('add', 'deduct', 'summary'));
  } else {
    conv.ask(`Hey , I am Expenso. Your personal finance companion, What can I do for you ?`)
    conv.ask(new Suggestions('add', 'deduct', 'summary'));
  }
})

app.intent('actions_intent_PERMISSION', (conv, params, permissionGranted) => {
  if (!permissionGranted) {
    conv.ask(`You have to authorize this application to work properly`);
  } else {
    conv.data.userName = conv.user.name.display;
    conv.ask(`Thanks, ${conv.data.userName}. What would you like to do ?`);
    conv.ask(new Suggestions('add', 'deduct', 'summary'));
  }
});

app.intent('add to account', (conv, {unitCurrency, note}) => {
  if (!conv.data.expenses) 
  {conv.data.expenses = []}
  conv.ask(`${unitCurrency.amount} rupees have been added to your account`);
  conv.ask(new Suggestions('add', 'deduct', 'summary'));
  conv.data.expenses.push({
    amount: unitCurrency.amount,
    currency: unitCurrency.currency,
    note
  })
  if(!conv.data.total) {conv.data.total = 0} else {
    conv.data.total += unitCurrency.amount
  }
});

app.intent('current account balance', (conv) => {
  if (conv.data.total){
    conv.ask(`You have ${conv.data.total} rupees in your account`);
    conv.ask(new Suggestions('add', 'deduct', 'summary'));
  } else {
    conv.ask('You dont have any money right now... Wanna add some ?')
    conv.ask(new Suggestions('add'));
  }
});

app.intent('expense', (conv, {unitCurrency, note}) => {
  conv.data.expenses.push({
    amount: -1 * unitCurrency.amount,
    currency: unitCurrency.currency,
    note
  })
  conv.ask(`${unitCurrency.amount} rupees have been deducted, is there anything else I can do for you ?`)
  conv.ask(new Suggestions('add', 'deduct', 'summary'));
});

app.intent('summary', (conv) => {
  if (!conv.data.expenses){
    conv.ask('You dont have any transaction history')
  } else {
    let received = 0, spent = 0
    conv.data.expenses.map((item) => {
      if(item.amount < 0){
        spent += item.amount
      } else {
        received += item.amount
      }
    })
    conv.ask(`You have received ${received} rupees and have spent ${-1 * spent}. Your current balance is ${received + spent}`)
    conv.ask(new Suggestions('add', 'deduct'));
  }
});


exports.dialogflowFirebaseFulfillment = functions.https.onRequest(app);
