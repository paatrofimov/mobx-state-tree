import React from "react"
import { Provider } from "mobx-react"
import { render } from "react-dom"
import "todomvc-app-css/index.css"
import App from "./components/App"
import { MyStore, initialState } from "./components/MyStore"

let store

function createTodoStore() {
    store = new MyStore()
    store.Data = initialState;
    return store
}

function renderApp(App, store) {
    render(<Provider store={store}><App/></Provider>, document.getElementById("root"))
}

// Initial render
renderApp(App, createTodoStore(initialState))


// Connect HMR
if (module.hot) {
    module.hot.accept(["./components/App"], () => {
        // Componenent definition changed, re-render app
        renderApp(App, store)
    })
}

export function devLogVerbose(Component) {
    const oldRender = Component.prototype.render
    Component.prototype.render = function() {
        console.log(`${new Date().toISOString()} - render ${Component.name}`)
        return oldRender.apply(this)
    }

    const oldWillReceiveProps = Component.prototype.componentWillReceiveProps
    if (oldWillReceiveProps)
        Component.prototype.componentWillReceiveProps = function(nextProps) {
            console.groupCollapsed(`${new Date().toISOString()} - componentWillReceiveProps ${Component.name}`)
            console.group("current props")
            console.log(this.props)
            console.groupEnd()
            console.group("next props")
            console.log(nextProps)
            console.groupEnd()
            return oldWillReceiveProps.apply(this)
        }

    const oldForceUpdate = Component.prototype.forceUpdate
    Component.prototype.forceUpdate = function() {
        console.log(`${new Date().toISOString()} - forceUpdate ${Component.name}`)
        return oldForceUpdate.apply(this)
    }
}