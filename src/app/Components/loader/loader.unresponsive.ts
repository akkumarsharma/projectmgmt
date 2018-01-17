import { OnDestroy, Directive, ElementRef,Renderer2 } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { LoaderService } from './loader.service';
import { LoaderState } from './loader';

@Directive({
    selector: '[loaderUnresponse]'
})
export class LoaderUnresponsive {
    show = false;
    private subscription: Subscription;

    constructor(el: ElementRef, private loaderService: LoaderService,private renderer: Renderer2) {
        this.subscription = this.loaderService.loaderState
            .subscribe((state: LoaderState) => {
                this.show = state.show;
                if (this.show == true) {
                    // el.nativeElement.style.opacity='0.5';
                    this.renderer.addClass(el.nativeElement, 'unresponse');
                }
                else
                { 
                    this.renderer.removeClass(el.nativeElement, 'unresponse');
                }
            });
    }


    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}