import { type ClientSchema, a, defineData } from '@aws-amplify/backend';

const schema = a.schema({
  Note: a
    .model({
      name: a.string(),
      description: a.string(),
      image: a.string(),
    })
    .authorization((allow) => [allow.owner()]),

    Task: a
    .model({
        id: a.float().required(),
        name: a.string().required(),
        start: a.string().required(), // for datetime string
        end: a.string().required(), // for datetime string
        reminderTime: a.float().required(),
        isReminder: a.boolean().required(),
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
