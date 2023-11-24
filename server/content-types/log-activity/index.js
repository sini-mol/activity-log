'use strict';

module.exports = {
  kind: 'collectionType',
  collectionName: 'log-activity',
  info: {
    name: 'log-activity',
    singularName: 'log-activity',
    pluralName: 'log-activities',
    displayName: 'Log Activity',
  },
  pluginOptions: {
    'content-manager': {
      visible: false,
    },
    'content-type-builder': {
      visible: false,
    },
  },
  options: {
    draftAndPublish: false,
    comment: '',
  },
  "attributes": {
    "user": {
      "type": "string"
    },
    "before_data": {
      "type": "json"
    },
    "after_data": {
      "type": "json"
    },
    "difference_data": {
      "type": "json"
    },
    "type": {
      "type": "string"
    },
    "created_by": {
      "type": "string"
    },
    "updated_by": {
      "type": "string"
    },
    "action": {
      "type": "string"
    },
    "target_id": {
      "type": "string"
    },
    "model": {
      "type": "string"
    }
  }
};
