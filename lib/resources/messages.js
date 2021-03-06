'use strict';

var merge = require('../utils/merge');
var messageResponse = require('../responses/message');

function getMessagesApiPath(channel) {
  return '/channels/' + channel + '/messages';
}

function createMessageResource(apiClient) {
  return {
    list: function(params, options) {
      if (!params || !params.channel) {
        throw new Error('Missing channel to list persisted messages of.');
      }

      var channel = params.channel;
      var path = getMessagesApiPath(channel);
      delete params.channel;

      return apiClient
        .get(merge(options, {path: path, params: params}))
        .then(function(messageList) {
          messageList.items = messageList.items.map(function(message) {
            return messageResponse.fromPersistence({
              channel: channel,
              content: message.content,
              createdAt: message.createdAt
            });
          });

          return messageList;
        });
    }
  };
}

module.exports = createMessageResource;
