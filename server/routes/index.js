module.exports = [
  {
    method: 'GET',
    path: '/',
    handler: 'myController.index',
    config: {
      policies: [],
    },
  },
  {
    method: 'GET',
    path: '/get-log-details',
    handler: 'myController.getAllActivityLogs',
    config: {
      policies: [],
      auth : false
    },
  },
  {
    method: 'POST',
    path: '/view-log-details',
    handler: 'myController.viewActivityLogs',
    config: {
      policies: [],
      auth : false
    },
  },
  {
    method: 'POST',
    path: '/get-search-details',
    handler: 'myController.getSearchData',
    config: {
      policies: [],
      auth : false
    },
  },
];
