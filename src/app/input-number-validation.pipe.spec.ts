import { InputNumberValidationPipe } from './input-number-validation.pipe';

describe('InputNumberValidationPipe', () => {
  it('create an instance', () => {
    const pipe = new InputNumberValidationPipe();
    expect(pipe).toBeTruthy();
  });
});
