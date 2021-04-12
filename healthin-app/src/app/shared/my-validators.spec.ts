import { MyValidators } from './my-validators';
import { FormControl } from '@angular/forms';

describe('MyValidators', () => {
  it('should cpf be valid by without dots and dashes multiplier', () => {
    const errors = MyValidators.cpf({ value: '87050602060' } as FormControl);
    expect(errors).toBeNull();
  });
  it('should cpf be valid by with dots and dashes multiplier', () => {
    const errors = MyValidators.cpf({ value: '870.506.020-60' } as FormControl);
    expect(errors).toBeNull();
  });
  it('should cnpj be valid by without dots and dashes multiplier', () => {
    const errors = MyValidators.cnpj({ value: '20458214000113' } as FormControl);
    expect(errors).toBeNull();
  });
  it('should cnpj be valid by with dots and dashes multiplier', () => {
    const errors = MyValidators.cnpj({ value: '11.444.777/0001-61' } as FormControl);
    expect(errors).toBeNull();
  });
});
