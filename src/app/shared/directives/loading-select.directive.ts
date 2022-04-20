import { ComponentRef, Directive, Input, OnChanges, Renderer2, SimpleChanges, ViewContainerRef } from "@angular/core";
import { MatProgressBar } from "@angular/material/progress-bar";
import { MatSelect } from "@angular/material/select";

@Directive({
    selector: `mat-select[loading-select],
              `
})
export class LoadingSelectDirective implements OnChanges {
    @Input()
    isLoading!: boolean;
    @Input()
    disabled!: boolean;

    private progressBar!: ComponentRef<MatProgressBar> | null;

    constructor(private matSelect: MatSelect,
        private viewContainerRef: ViewContainerRef,
        private renderer: Renderer2) {
    }

    get nativeElement(): HTMLElement {
        return this.matSelect._elementRef.nativeElement;
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (!changes["isLoading"]) {
            return;
        }

        if (changes["isLoading"].currentValue) {
            this.matSelect._elementRef.nativeElement.classList.add('mat-loading');
            this.matSelect.disabled = true;
            this.createSpinner();
        } else if (!changes["isLoading"].firstChange) {
            this.matSelect._elementRef.nativeElement.classList.remove('mat-loading');
            this.matSelect.disabled = this.disabled;
            this.destroySpinner();
        }
    }

    private createSpinner(): void {
        if (!this.progressBar) {
            this.progressBar = this.viewContainerRef.createComponent<MatProgressBar>(MatProgressBar);
            this.progressBar.instance.mode = 'indeterminate';
            this.renderer.appendChild(this.matSelect._elementRef.nativeElement, this.progressBar.instance._elementRef.nativeElement);
        }
    }

    private destroySpinner(): void {
        if (this.progressBar) {
            this.progressBar.destroy();
            this.progressBar = null;
        }
    }
}