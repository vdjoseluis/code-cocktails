import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  imports: [],
  template: `
    <footer class="fixed bottom-0 left-0 w-full bg-gray-800 text-white text-center p-4 z-40 shadow">
      <p>&copy; 2025 Code & Cocktails. All rights reserved. By <a href="https://vdjoseluis.vercel.app/" target="_blank" class="text-primary hover:underline">José L. Vásquez D.</a></p>
    </footer>
  `
})
export class FooterComponent {

}
