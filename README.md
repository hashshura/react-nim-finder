# react-nim-finder

*__Author__: Asif Hummam Rais, 13517099*<br>
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app)

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
- There is a single state, however, which will be persisted and manipulated globally: `token`. As such, `App.js` will hold the state and its setter and getter are passed to children components via `props`. Persisting `token` is done by putting the data into `localStorage`.
- Three main components are `LoginForm`, `RegisterForm`, and `Searcher`, where each component extends `React.Component` and acts as a page for a specific route (routed via `react-route`). Small component that is used together (i.e. `MadeWithLove`) extends `React.PureComponent` as it will render the same for identical `props` and `state`.
- As states other than `token` are only being utilized locally (by the components), they are kept as React states. Each state will be manipulated by its specific handler, and some of the state changes will call a callback function (e.g. `handleInputChange` with `setState` will have an `actionSearch` callback) as setting state is done asynchronously.
- Main functionality: in `Searcher`, every change on `TextField` will trigger an `onChangeDebounced` action with 300 ms onbounce delay. This will trigger a state change on `payload` to "Searching...", then call the API (`byname` if `isNan()`, as `isNan()` will return true for non-numeric strings and false for numeric strings, `byid` otherwise).

### Token State Behavior, URLs...
- `/` (or any undefined route) will return search page if `token` state is set, or redirect to `/login` otherwise.
- `/login` will redirect to `/` if `token` state is set, or return login page otherwise.
- `/register` will redirect to `/` if `token` state is set, or return register page otherwise.
- Successful login will set the `token` state.
- Unsuccessful API call with wrong `token` code or clicking logout will unset the `token`.

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

As the author's time is not unlimited, implementation of forms might not be the very best. `RegisterForm` and `LoginForm` are similar, they should be extending (or included by) a parent wrapper `Form`-like component.

`@todo (Asif): I don't know, deadlines are near...`

### Backend API Comments
- No return `code` documentation.
- Return `code` is not standardized: on `/login`, `-2` stands for both wrong username/password combination, and on `/byname` and `/byid`, the `code` value itself means _returned payload count_.
- No _result count_-like return data to be used in making the pagination, even though `page` param exists.
- `page` should start from 1, not 0, to avoid confusion.

## Screenshots
![Login Page](https://user-images.githubusercontent.com/34375104/59910325-dd66e480-943b-11e9-8921-9b02c31cb196.png)
![Register Page](https://user-images.githubusercontent.com/34375104/59910326-dd66e480-943b-11e9-80fc-19b4a97a71d1.png)
![Error Prompt](https://user-images.githubusercontent.com/34375104/59910327-ddff7b00-943b-11e9-8241-7acbf77a8573.png)
![Search Page](https://user-images.githubusercontent.com/34375104/59916253-d8f4f880-9448-11e9-8b0d-fa7e9031fcb8.png)
![Mobile Search Page](https://user-images.githubusercontent.com/34375104/59916255-d98d8f00-9448-11e9-898d-6e4ba9b1dda9.png)
![Mobile Login Page](https://user-images.githubusercontent.com/34375104/59910331-de981180-943b-11e9-9158-4d81a0ad616b.png)
