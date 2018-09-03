# Next onIdle example

### Rehydrating with server data

Be aware that data that was used on the server (and provided via `getInitialProps`) will be stringified in order to rehydrate the client with it. That means, if you create a store that is, say, an `ObservableMap` and give it as prop to a page, then the server will render appropriately. But stringifying it for the client will turn the `ObservableMap` to an ordinary JavaScript object (which does not have `Map`-style methods and is not an observable). So it is better to create the store as a normal object and turn it into a `Observable` in the `render()` method. This way both sides have an `Observable` to work with.

## The idea behind the example

Render the react app on Idle
