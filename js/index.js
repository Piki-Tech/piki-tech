import Firebase from './firebase/index.js';
async function saveContactMessage(contactMessage) {
  const fb = new Firebase();
  return await fb
    .saveContactMessage(contactMessage)
    .then(function(result) {
      const {
        success,
        message
      } = result;
      if (success) {
        alert(`Thank you, we will be in contact soon.`);
      } else {
        alert(`Whoops, something went wrong... '${message}'`);
      }
      return success;
    })
    .catch(function(error) {
      alert(`Error: ${error.message}`);
      return false;
    });
}
async function handleSubmitContact(e) {
  e.preventDefault();
  e.stopPropagation();
  const btnSubmit = $('#btnSubmit');
  const nameInput = $('#Name');
  const emailInput = $('#Email');
  const messageInput = $('#Message');
  const name = nameInput.val();
  const email = emailInput.val();
  const message = messageInput.val();
  const {
    currentTarget: form
  } = e;
  const isFormValid = form.checkValidity();
  if (isFormValid) {
    const contactMessage = {
      name,
      email,
      message
    };
    btnSubmit.prop('disabled', true);
    if (await saveContactMessage(contactMessage)) {
      nameInput.val('');
      emailInput.val('');
      messageInput.val('');
    }
    btnSubmit.prop('disabled', false);
  } else {
    nameInput.focus();
    if (!name || !email || !message) {
      alert('Name, Email, and Message are required fields.');
    } else if (!email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)) {
      emailInput.focus();
      alert(`${email} is not a valid Email.`);
    } else {
      alert('Unknown error.');
    }
  }
  return false;
}
$(document).ready(function() {
  $('#ContactForm').submit(handleSubmitContact);
});
