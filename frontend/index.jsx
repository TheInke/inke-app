// Will contain all exports for pages to have one entry point:
/* Example:
    export { default as FirstPage } from './FirstPage';
    export { default as SecondPage } from './SecondPage'; 

   This way, we can simply do:
    import { FirstPage, SecondPage } from './pages';
    in App.jsx
*/


export { default as EditProfileScreen } from './src/components/LoginPage/EditProfileScreen';
export { default as LoginScreen } from './src/components/LoginPage/LoginScreen';
export { default as AuthStatusScreen } from './src/components/LoginPage/AuthStatusScreen';