export default class InvalidField extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'InvalidField';
    this.stack = '401';
  }
}
