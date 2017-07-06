import { Notification } from './notification';
import { Utilities } from './utilities';
import { NotifyType, Constants } from './const';
import { FormGroup, FormControl } from '@angular/forms';

export class Common {
    public static getRandomNumber(min: number, max: number) {
        let num = Math.random() * (max - min) + min;
        return Math.round(num);
    }

    public static setNavMenuTitle(string) {
        $('#navMenuTitle').text(string);
        document.title = string.replace(/\./g, '_');
    }

    public static throwErrorOrBadRequest(error) {
        Notification.errorNotify(error);
    }

    public static getApiData(res: any) {
        return res.json()['data'] || res.json()['Result'] || res.json();
    }

    public static numFormat(value, forInput = true, decimalnumber = 2) {
        if (value === null || value === undefined) {
            return '';
        }
        let intlValue;
        if (decimalnumber) {
            intlValue = Intl.NumberFormat('it-IT', { minimumFractionDigits: decimalnumber }).format(value);
        }
        return forInput ? intlValue.replace(/\./, '') : intlValue;
    }

    public static cleanObject(obj: any) {
        let cloneObj = {};
        Object.keys(obj).forEach(prop => {
            if (obj[prop] !== null && obj[prop] !== undefined) {
                cloneObj[prop] = obj[prop];
            }
        });
        return cloneObj;
    }
}