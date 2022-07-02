import {Overlay} from '@angular/cdk/overlay';
import {Injectable} from '@angular/core';
import {notificationCloseAnimation, notificationOpenAnimation} from '@ng-doc/ui-kit/animations';
import {NgDocOverlayRef} from '@ng-doc/ui-kit/classes';
import {NgDocOverlayContainerComponent} from '@ng-doc/ui-kit/components/overlay-container';
import {NgDocOverlayService} from '@ng-doc/ui-kit/services/overlay';
import {UntilDestroy, untilDestroyed} from '@ngneat/until-destroy';
import {PolymorpheusContent} from '@tinkoff/ng-polymorpheus';
import {Subject, timer} from 'rxjs';
import {switchMap, tap} from 'rxjs/operators';

@Injectable({
	providedIn: 'root',
})
@UntilDestroy()
export class NgDocNotifyService {
	private overlayRef?: NgDocOverlayRef;
	private readonly notify$: Subject<PolymorpheusContent> = new Subject<PolymorpheusContent>();

	constructor(private readonly overlayService: NgDocOverlayService, private readonly overlay: Overlay) {
		this.notify$
			.pipe(
				tap(() => this.overlayRef?.close()),
				tap((content: PolymorpheusContent) => this.openOverlay(content)),
				switchMap(() => timer(2000)),
				untilDestroyed(this),
			)
			.subscribe(() => this.overlayRef?.close());
	}

	notify(content: PolymorpheusContent): void {
		this.notify$.next(content);
	}

	private openOverlay(content: PolymorpheusContent): void {
		this.overlayRef = this.overlayService.open(content, {
			overlayContainer: NgDocOverlayContainerComponent,
			panelClass: 'ng-doc-notify',
			positionStrategy: this.overlay.position().global().bottom('10px').centerHorizontally(),
			openAnimation: notificationOpenAnimation,
			closeAnimation: notificationCloseAnimation,
		});
	}
}
