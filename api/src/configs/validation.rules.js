const user = {
  body: {
    FirstName: {
      isRequired: true,
      parameterType: 'name',
      maxLength: 127,
      minLength: 2,
    },
    LastName: {
      isRequired: true,
      parameterType: 'name',
      maxLength: 128,
      minLength: 2,
    },
    Email: {
      isRequired: true,
      parameterType: 'email',
      isUnique: {
        tableName: 'Users',
        tableId: 'UserID',
      },
    },
    Phone: {
      parameterType: 'phone',
    },
    UniversityID: {
      parameterType: 'number',
    },
    Avatar: {
      maxLength: 254,
      regex: /\b(https?|ftp|file):\/\/[a-z-A-Z\d+&@#/%?=~_|!:,.;-A-Z]*/,
    },
  },
};

const avatar = {
  body: {
    Avatar: {
      maxLength: 254,
      regex: /\b(https?|ftp|file):\/\/[a-z-A-Z\d+&@#/%?=~_|!:,.;-A-Z]*/,
    },
  },
};

const article = {
  body: {
    Text: {
      isRequired: true,
      maxLength: 500,
      minLength: 5,
    },
    AccessLevelID: {
      isRequired: true,
      parameterType: 'number',
    },
    Title: {
      isRequired: true,
      maxLength: 100,
      minLength: 5,
    },
    File: {
      maxLength: 254,
    },
  },
};

const comment = {
  body: {
    ArticleID: {
      parameterType: 'number',
    },
    Text: {
      isRequired: true,
      maxLength: 254,
    },
    ReplyToCommentID: {
      parameterType: 'number',
    },
  },
};

export default {
  user,
  avatar,
  article,
  comment,
};
