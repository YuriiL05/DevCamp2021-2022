const parameterTypes = {
  name: {
    pattern: /^[a-zA-Z_ ]+$/,
    message: 'format is not acceptable for name',
  },
  email: {
    pattern:
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    message: 'incorrect format of Email',
  },
  phone: {
    pattern: /^\+380\d{9}$/,
    message: 'incorrect format of Phone (+380xxxxxxxxx)',
  },
  number: {
    pattern: /^\d+$/,
    message: 'is not a number',
  },
};

export default {
  parameterTypes,
};
