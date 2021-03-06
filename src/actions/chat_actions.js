'use strict';

const ActionTypes = require('../constants').ActionTypes;
const Dispatcher = require('../dispatcher');
const PersistenceUtils = require('../utils/persistence_utils');

const ONE_HOUR = 60 * 60 * 1000;

class ChatActions {
  constructor() {
    this.persistence = new PersistenceUtils(
      'messages',
      ActionTypes.CHAT_MESSAGE_RECEIVED,
      'message'
    );
  }

  fetchRecentMessages() {
    this.persistence.query().once('value', (snapshot) => {
      Dispatcher.dispatch({
        actionType: ActionTypes.CHAT_MESSAGES_RECEIVED,
        messages: snapshot.val()
      });
    });
  }

  submitMessage(message) {
    message.set('createdAt', +Date.now());

    this.persistence.query().push(message.toJS())

    Dispatcher.dispatch({
      actionType: ActionTypes.CHAT_MESSAGE_SUBMITTED,
      message: message,
    });
  }
};

module.exports = new ChatActions();
