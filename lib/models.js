import { Class } from 'meteor/jagi:astronomy';

export const Docs = new Mongo.Collection('docs');

export const Doc = Class.create({
  name: 'Doc',
  collection: Docs,
  secured: false,
  events: {
    beforeUpdate: [
      function preventNameChangesFromClient (e) {
        if (!e.trusted) {
          const doc = e.currentTarget;
          if (doc.isModified('name')) {
            throw new Meteor.Error(
              'not-allowed',
              'Name changes not allowed from client.'
            );
          }
        }
      }
    ]
  },
  fields: {
    name: {
      type: String,
      optional: true
    },
    birthdate: {
      type: Date,
      optional: true
    }
  }
});
