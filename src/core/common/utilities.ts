import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Injectable()
export class Utilities {
    constructor(private title: Title) {
    }
}

export class DateTimeUtil {
    public static daysInMonth(args = {
        year: new Date().getFullYear(),
        month: new Date().getMonth()
    }) {
        return new Date(args.year, args.month + 1, 0).getDate();
    }
}

