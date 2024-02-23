class ForbiddenException extends Error {
  constructor(message) {
    super(message);
    this.name = 'ForbiddenException';
  }
}

export default ForbiddenException;
