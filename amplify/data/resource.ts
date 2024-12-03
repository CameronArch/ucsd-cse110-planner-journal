import { type ClientSchema, a, defineData } from '@aws-amplify/backend';

const schema = a.schema({
  JournalEntry: a
    .model({
      color: a.string(),
      name: a.string(),
      entry: a.string(),
      date: a.string(),
    })
    .authorization((allow) => [allow.owner()]),
  Task: a
    .model({
      name: a.string(),
      startTime: a.string(),
      endTime: a.string(),
      reminder: a.boolean(),
      reminderTime: a.integer(),
      idNumber: a.integer(),
      date: a.string(),
    })
    .authorization((allow) => [allow.owner()]),
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: 'userPool',
  },
});
