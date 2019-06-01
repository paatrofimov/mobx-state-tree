import React from "react"
import {Provider} from "mobx-react"
import {render} from "react-dom"
import "todomvc-app-css/index.css"
import App from "./components/App"
import {initialState, StoreFactory} from "./components/DataStore"
import {enableLogging} from "mobx-logger";
import {unprotect} from "mobx-state-tree";

let store

function createTodoStore() {
    store = StoreFactory.create(initialState)

    // https://mobx-state-tree.gitbook.io/docs/concepts/actions#disabling-protected-mode
    unprotect(store);

    console.log(store);

    return store
}

function renderApp(App, store) {
    render(<Provider store={store}><App/></Provider>, document.getElementById("root"))
}

// enableLogging();

// Initial render
renderApp(App, createTodoStore(initialState))


// Connect HMR
if (module.hot) {
    module.hot.accept(["./components/App"], () => {
        // Componenent definition changed, re-render app
        renderApp(App, store)
    })
}