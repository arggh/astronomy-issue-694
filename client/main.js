import { Template } from 'meteor/templating';
import { Doc } from '../lib/models';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';

Template.body.helpers({
  doc() {
    // Find the only document in DB.
    return Doc.findOne();
  },
});

Template.body.events({
  'click button'(event, instance) {
    // Get the id of person we're about to edit
    const id = event.currentTarget.dataset.id;

    // Intentionally only fetch document with the field we are changing
    const doc = Doc.findOne({ _id: id }, { fields: { birthdate: 1 } });

    // Update birthdate and save ONLY THAT FIELD. WE DON'T TOUCH NAME.
    doc.birthdate = new Date();
    doc.save({ fields: ['birthdate']}, (err) => {
      if (err) {
        alert(err);
      } else {
        alert('Saved succesfully!');
      }
    });
  },
});
