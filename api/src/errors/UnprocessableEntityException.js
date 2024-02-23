class UnprocessableEntityException extends Error {
  constructor(message) {
    super(message);
    this.name = 'UnprocessableEntityException';
    this.message = message;
  }
}

export default UnprocessableEntityException;
