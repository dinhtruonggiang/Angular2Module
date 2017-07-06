import { FormControl } from '@angular/forms';

const mailFormat = (control: FormControl): Promise<any> => {

    const EMAIL_REGEXP = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;

    if (control.value !== '' && (control.value.length <= 5 || !EMAIL_REGEXP.test(control.value))) {
        return Promise.resolve({ 'incorrectMailFormat': true });
    }

    return Promise.resolve(null);
};

export { mailFormat };

interface ValidationResult {
    [key: string]: boolean;
};
