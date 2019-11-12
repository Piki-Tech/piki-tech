import defaultFirebaseConfig from './defaultFirebaseConfig.js';

class Firebase {
  constructor(firebaseConfig) {
    const {
      apps,
      initializeApp,
      firestore
    } = firebase;
    if (apps.length === 0) {
      initializeApp(firebaseConfig || defaultFirebaseConfig);
    }
    this.db = firestore();
  }
  async saveContactMessage(contactMessage) {
    let success = true;
    let data = null;
    let message = '';
    await this.db
      .collection('contactMessages')
      .add(contactMessage)
      .then(documentRef => {
        data = documentRef;
      })
      .catch(error => {
        success = false;
        message = error.message;
      });
    return {
      success,
      data,
      message
    };
  }
}

export default Firebase;
