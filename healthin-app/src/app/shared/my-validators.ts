import { FormControl, ValidationErrors } from '@angular/forms';

export class MyValidators {
    public static noWhitespace(control: FormControl): ValidationErrors | null {
        const isValid = (control.value || '').trim().length !== 0;
        return isValid ? null : { whitespace: true };
    }

    public static cpf(control: FormControl): ValidationErrors | null {
        const cpfText = (control.value || '').trim()
            .replaceAll('.', '')
            .replaceAll('-', '');
        if (cpfText.length !== 11) {
            return { cpf: true };
        }

        const firstCpfPrefix = cpfText.substr(0, 9);
        const firstValidatorDigit = MyValidators.calculateCpfValidatorDigit(firstCpfPrefix, 10);

        const secondCpfPrefix = cpfText.substr(0, 10);
        const secondValidatorDigit = MyValidators.calculateCpfValidatorDigit(secondCpfPrefix, 11);

        const actualValidatorDigit = firstValidatorDigit + secondValidatorDigit;
        const expectedValidatorDigit = cpfText.substr(9, 2);

        const isValid = actualValidatorDigit === expectedValidatorDigit;
        return isValid ? null : { cpf: true };
    }

    private static calculateCpfValidatorDigit(cpfPrefix: string, maxMultiplier: number): string {
        let index = 0;
        let total = 0;
        const maxIndex = maxMultiplier - 1;
        while (index < maxIndex) {
            const cpfNumber = Number(cpfPrefix[index]);
            total += (cpfNumber * (maxMultiplier - index));
            index++;
        }

        const rest = (total * 10) % 11;
        return String(rest > 9 ? 0 : rest);
    }

    public static cnpj(control: FormControl): ValidationErrors | null {
        const cnpjText = (control.value || '').trim()
            .replaceAll('.', '')
            .replaceAll('/', '')
            .replaceAll('-', '');
        if (cnpjText.length !== 14) {
            return { cnpj: false };
        }

        const firstCnpjPrefix = cnpjText.substr(0, 12);
        const firstValidatorDigit = MyValidators.calculateCnpjValidatorDigit(firstCnpjPrefix, 5);

        const secondCnpjPrefix = cnpjText.substr(0, 13);
        const secondValidatorDigit = MyValidators.calculateCnpjValidatorDigit(secondCnpjPrefix, 6);

        const actualValidatorDigit = firstValidatorDigit + secondValidatorDigit;
        const expectedValidatorDigit = cnpjText.substr(12, 2);

        const isValid = actualValidatorDigit === expectedValidatorDigit;
        return isValid ? null : { cnpj: true };
    }

    private static calculateCnpjValidatorDigit(cpfPrefix: string, maxMultiplier: number): string {
        let index = 0;
        let total = 0;
        const maxIndex = maxMultiplier + 7;
        const variation = maxMultiplier - 1;
        while (index < maxIndex) {
            let multiplyBy = (maxMultiplier - index);
            multiplyBy = multiplyBy < 2 ? (9 - index + variation) : multiplyBy;

            const cpfNumber = Number(cpfPrefix[index]);
            total += (cpfNumber * multiplyBy);

            index++;
        }

        const rest = total % 11;
        return String(rest < 2 ? 0 : 11 - rest);
    }
}
