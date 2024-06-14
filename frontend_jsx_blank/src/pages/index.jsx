// Will contain all exports for pages to have one entry point:
/* Example:
    export { default as FirstPage } from './FirstPage';
    export { default as SecondPage } from './SecondPage'; 

   This way, we can simply do:
    import { FirstPage, SecondPage } from './pages';
    in App.jsx
*/

export { default as HomePage } from './HomePage';
export { default as ExamplePage } from './ExamplePage';