'use strict';

const Dispatcher = require('../dispatcher');
const Firebase = require('firebase');

const FIREBASE_URL = 'https://pletcher.firebaseio.com/landline';

class PersistenceUtils {
  constructor(ref, actionType, key) {
    this.base = new Firebase(FIREBASE_URL);
    this.ref = new Firebase(FIREBASE_URL + ref);

    this.ref.on('child_added', (snapshot) => {
      let obj = snapshot.val();
      let action = {
        actionType: actionType
      };

      action[key] = obj;

      Dispatcher.dispatch(action);
    });
  }

  base() {
    return this.base;
  }

  push(obj) {
    this.ref.push(obj);
  }

  query() {
    return this.ref;
  }
}

module.exports = PersistenceUtils;