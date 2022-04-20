import { ComponentRef, Directive, Input, OnChanges, Renderer2, SimpleChanges, ViewContainerRef } from "@angular/core";
import { MatButton } from "@angular/material/button";
import { MatProgressSpinner } from "@angular/material/progress-spinner";

@Directive({
    selector: `button[mat-button][loading-button],
               button[mat-raised-button][loading-button],
               button[mat-icon-button][loading-button],
               button[mat-fab][loading-button],
               button[mat-mini-fab][loading-button],
               button[mat-stroked-button][loading-button],
               button[mat-flat-button][loading-button]`
})
export class LoadingButtonDirective implements OnChanges {
    @Input()
    isLoading!: boolean;
    @Input()
    disabled!: boolean;

    private spinner!: ComponentRef<MatProgressSpinner> | null;

    constructor(private matButton: MatButton,
        private viewContainerRef: ViewContainerRef,
        private renderer: Renderer2) {
    }

    get nativeElement(): HTMLElement {
        return this.matButton._elementRef.nativeElement;
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (!changes["isLoading"]) {
            return;
        }

        if (changes["isLoading"].currentValue) {
            this.matButton._elementRef.nativeElement.classList.add('mat-loading');
            this.matButton.disabled = true;
            this.createSpinner();
        } else if (!changes["isLoading"].firstChange) {
            this.matButton._elementRef.nativeElement.classList.remove('mat-loading');
            this.matButton.disabled = this.disabled;
            this.destroySpinner();
        }
    }

    private createSpinner(): void {
        if (!this.spinner) {
            this.spinner = this.viewContainerRef.createComponent<MatProgressSpinner>(MatProgressSpinner);
            this.spinner.instance.diameter = 20;
            this.spinner.instance.mode = 'indeterminate';
            this.renderer.appendChild(this.matButton._elementRef.nativeElement, this.spinner.instance._elementRef.nativeElement);
        }
    }

    private destroySpinner(): void {
        if (this.spinner) {
            this.spinner.destroy();
            this.spinner = null;
        }
    }
}