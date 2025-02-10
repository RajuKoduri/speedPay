import { InputMaxlengthValidationPipe } from './input-maxlength-validation.pipe';

describe('InputMaxlengthValidationPipe', () => {
  it('create an instance', () => {
    const pipe = new InputMaxlengthValidationPipe();
    expect(pipe).toBeTruthy();
  });
});
