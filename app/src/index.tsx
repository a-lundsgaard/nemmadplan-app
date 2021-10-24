import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import i18n from "I18n/i18n.config";
import { I18nextProvider } from "react-i18next";
import Root from "./core/root";
import store, { history } from "Redux/store/store";
/* import regeneratorRuntime from "regenerator-runtime"; //Declared globally in order to use async await, see this issue: https://github.com/babel/babel/issues/9849
import "core-js/stable";
import "regenerator-runtime/runtime"; */

window.store = store;

ReactDOM.render(
    <Suspense fallback="loading">
      <Root store={store} history={history}></Root>
    </Suspense>,
  document.getElementById("target")
);
