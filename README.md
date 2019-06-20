# react-nim-finder

*__Author__: Asif Hummam Rais, 13517099*.<br>
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Installation and Running

Assuming that you have `yarn` already installed on your PC, in the project directory, run:

### `yarn install`

Installs all required dependencies for the project.

### `yarn start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

## How to Use

Once you get into the page, using the app is quite straightforward.<br>
Sign up for an account, log in, and type the name or ID of the person.

Screenshots are redundant (though the author might add them later), visit [ITB NIM Finder](https://hashshura.github.io/react-nim-finder) instead.

## Build Design

As NIM Finder is a small application, global state controller such as `redux` is going to be overkill.<br>
Instead, each state will be kept as React component state.
- There is a single state, however, which will be persisted and manipulated globally: `token`. As such, `App.js` will hold the state and its setter and getter are passed to the children components via `props`. Persisting `token` is done by putting the data into `localStorage`.
- Three main components are `LoginForm`, `RegisterForm`, and `Searcher`, where each component extends `React.Component` and acts as a page for a specific route (routed via `react-route`). Small component that is used together (i.e. `MadeWithLove`) extends `React.PureComponent` as it will render the same for identical `props` and `state`.
- As the states other than `token` are only being utilized locally (by the components), they are kept as React states. Each state will be manipulated by its specific handler, and some of the state changes will call a callback function (e.g. `handleInputChange` with `setState` will have an `actionSearch` callback) as setting state is done asynchronously.
- Main functionality: in `Searcher`, every change on the `TextField` will trigger an `onChangeDebounced` action with 300 ms onbounce delay. This will trigger a state change on `payload` to "Searching...", then call the API (`byname` if `isNan()`, as `isNan()` will return true for non-numeric strings and false for numeric strings).

### Token State Behavior, URLs...
- `/` (or any undefined route) will return search page if `token` state is set, or redirect to `/login` else.
- `/login` will redirect to `/` if `token` state is set, or return login page else.
- `/register` will redirect to `/` if `token` state is set, or return register page else.
- Successful login will set the `token` state.
- Unsuccessful API call with wrong `token` code and logout will unset the `token`.

## Dependencies

You can look into `package.json` or see below information:
- `"react": "^16.8.6"`
- `"react-dom": "^16.8.6"`
- `"react-router-dom": "^5.0.1"`
- `"react-scripts": "3.0.1"`
- Components from `@material-ui/core": "^4.1.1"`.
- Icons from `"@material-ui/icons": "^4.2.0"`.
- Github pages things from `"gh-pages": "^2.0.1"`.
- Importing debounce function from`"lodash": "^4.17.11"`.
- Pagination component from `"material-ui-flat-pagination": "^3.2.0"`.

All dependencies should be available via `yarn`.

## Appendix

As the author's time is not unlimited, the implementation of forms might not be the very best. `RegisterForm` and `LoginForm` are similar, they should be extending (or included by) a parent wrapper `Form`-like component.

`@todo (Asif): I don't know, deadlines are near...`