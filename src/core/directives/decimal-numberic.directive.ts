import { NgModel } from '@angular/forms';
import { Directive, OnInit, ElementRef, Input } from '@angular/core';
import { Common } from '../common/index';
import 'rxjs/Rx';

@Directive({
  selector: '[numdecimal][ngModel]',
  providers: [NgModel]
})
export class DecimalNumbericDirective implements OnInit {
  @Input() round: number;
  constructor(
    private elemRef: ElementRef,
    private ngModel: NgModel
  ) { }

  ngOnInit() {
    let $elem = $(this.elemRef.nativeElement);
    if (this.tryFloatParse($elem[0].value)) {
      if (this.round >= 0) {
        $elem.val(Common.numFormat($elem[0].value, true, this.round));
      } else {
        $elem.val(Common.numFormat($elem[0].value, true));
      }
    }
    this.ngModel.valueChanges
      .debounceTime(2000)
      .subscribe(res => {
        let $elem = $(this.elemRef.nativeElement);
        if (this.tryFloatParse(res)) {
          if (this.round >= 0) {
            $elem.val(Common.numFormat($elem[0].value, true, this.round));
          }
          $elem.val(Common.numFormat($elem[0].value, true));
        }
      });
  }

  tryFloatParse(value) {
    let outRs = null;
    if (Number(value)) {
      return true;
    }
    if (value !== null && value !== undefined) {
      if (value.length > 0) {
        if (!isNaN(value)) {
          outRs = parseFloat(value);
        }
      }
    }
    return outRs !== null;
  }
}
