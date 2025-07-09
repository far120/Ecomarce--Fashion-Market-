import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface Toast {
  id: string;
  message: string;
  type: 'success' | 'error' | 'warning' | 'info';
  duration?: number;
  autoClose?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  private toasts = new BehaviorSubject<Toast[]>([]);
  public toasts$ = this.toasts.asObservable();

  constructor() { }

  private generateId(): string {
    return Math.random().toString(36).substr(2, 9);
  }

  showSuccess(message: string, duration: number = 5000): void {
    this.showToast({
      message,
      type: 'success',
      duration,
      autoClose: true
    });
  }

  showError(message: string, duration: number = 7000): void {
    this.showToast({
      message,
      type: 'error',
      duration,
      autoClose: true
    });
  }

  showWarning(message: string, duration: number = 6000): void {
    this.showToast({
      message,
      type: 'warning',
      duration,
      autoClose: true
    });
  }

  showInfo(message: string, duration: number = 5000): void {
    this.showToast({
      message,
      type: 'info',
      duration,
      autoClose: true
    });
  }

  private showToast(toast: Omit<Toast, 'id'>): void {
    const newToast: Toast = {
      ...toast,
      id: this.generateId()
    };

    const currentToasts = this.toasts.value;
    this.toasts.next([...currentToasts, newToast]);

    if (toast.autoClose && toast.duration) {
      setTimeout(() => {
        this.removeToast(newToast.id);
      }, toast.duration);
    }
  }

  removeToast(id: string): void {
    const currentToasts = this.toasts.value;
    const filteredToasts = currentToasts.filter(toast => toast.id !== id);
    this.toasts.next(filteredToasts);
  }

  clearAll(): void {
    this.toasts.next([]);
  }
}
