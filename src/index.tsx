import React from 'react';
import ReactDOM from 'react-dom';
import DocumentMeta from 'react-document-meta';
import { App } from './App';
import * as serviceWorker from './serviceWorker';
import { Translations } from './Services/Translations';

const meta = {
  title: "mreysei | Michael Reyes Seiffert",
  description: Translations().shared.pageDescription,
  meta: {
    charset: 'utf-8',
    name: {
      keywords: 'react,tdd,bdd,testing,test,clean code,terminal,console,consola,javascript,typescript,lean mind,leanmind,carlosble,carlos ble'
    }
  }
}

ReactDOM.render(
  <React.StrictMode>
    <DocumentMeta {...meta}>
      <App />
    </DocumentMeta>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
