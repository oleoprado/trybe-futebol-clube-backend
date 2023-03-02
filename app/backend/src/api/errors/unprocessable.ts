export default class UnprocessableError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'Unprocessabe';
    this.stack = '422';
  }
}
