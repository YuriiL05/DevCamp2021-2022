class BadRequestException extends Error {
  constructor(message) {
    super(message);
    this.name = 'BadRequestException';
  }
}

export default BadRequestException;
