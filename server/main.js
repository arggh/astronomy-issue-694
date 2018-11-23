import { Meteor } from 'meteor/meteor';
import { Doc } from '../lib/models';

Meteor.startup(() => {
  if (!Doc.findOne()) {
    const doc = new Doc();
    doc.name = 'John';
    doc.birthdate = new Date();
    doc.save();
  }
});
