class UnauthorizedException extends Error {
  constructor(message) {
    super(message);
    this.name = 'UnauthorizedException';
  }
}

export default UnauthorizedException;
