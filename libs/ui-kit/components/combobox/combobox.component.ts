import {ChangeDetectionStrategy, Component, ContentChild, ElementRef, Input, TemplateRef} from '@angular/core';
import {NgDocListHost} from '@ng-doc/ui-kit/classes';
import {NgDocDataDirective} from '@ng-doc/ui-kit/directives/data';
import {NgDocContextWithImplicit} from '@ng-doc/ui-kit/interfaces';
import {NgDocContent} from '@ng-doc/ui-kit/types';
import {FL_CONTROL_HOST, FlControlHost} from 'flex-controls';

@Component({
	selector: 'ng-doc-combobox',
	templateUrl: './combobox.component.html',
	styleUrls: ['./combobox.component.scss'],
	providers: [
		{
			provide: FL_CONTROL_HOST,
			useExisting: NgDocComboboxComponent,
		},
		{
			provide: NgDocListHost,
			useExisting: NgDocComboboxComponent,
		},
	],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NgDocComboboxComponent<T> extends FlControlHost<T> implements NgDocListHost {
	@Input()
	readonly: boolean = false;

	@Input()
	valueContent: NgDocContent<NgDocContextWithImplicit<T>> = '';

	@ContentChild(NgDocDataDirective, {read: TemplateRef})
	data: TemplateRef<never> | null = null;

	constructor(private readonly elementRef: ElementRef<HTMLElement>) {
		super();
	}

	get listHostOrigin(): HTMLElement {
		return this.elementRef.nativeElement;
	}
}
