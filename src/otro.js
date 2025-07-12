
  import { html, css, LitElement } from 'https://unpkg.com/lit@2.0.0/index.js?module';

  class HolaLit extends LitElement {
    render() {
      return html`<p>Hola Lit!</p>
            <h1>Hola H1</h1>`;
    }
  }

customElements.define('hola-lit', HolaLit);
<hola-lit></hola-lit>

