// import React from "react";
// import { Auth0Provider } from "@auth0/auth0-react";
// import { useNavigate } from "react-router-dom";
// import { useAuth0 } from "@auth0/auth0-react";

// export const domain = process.env.REACT_APP_AUTH0_DOMAIN;
// export const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID;

// export const Auth0ProviderWithNavigate = ({ children }) => {
//   const navigate = useNavigate();
//   const redirectUri = process.env.REACT_APP_AUTH0_CALLBACK_URL;

//   const onRedirectCallback = (appState) => {
//     navigate(appState?.returnTo || window.location.pathname);
//   };

//   if (!(domain && clientId && redirectUri)) {
//     return null;
//   };

//   return (
//     <Auth0Provider
//       domain={domain}
//       clientId={clientId}
//       authorizationParams={{
//         redirect_uri: redirectUri,
//       }}
//       onRedirectCallback={onRedirectCallback}
//     >
//       {children}
//     </Auth0Provider>
//   );
// };

// export const LoginButton = () => {
//   const { loginWithRedirect } = useAuth0();

//   const handleLogin = async () => {
//     await loginWithRedirect({
//       appState: {
//         returnTo: "/main",
//       },
//     });
//   };

//   return (
//     <button className="button__login" onClick={handleLogin}>
//       Log In
//     </button>
//   );
// };

// export const LogoutButton = () => {
//   const { logout } = useAuth0();

//   const handleLogout = () => {
//     logout({
//       logoutParams: {
//         returnTo: window.location.origin,
//       },
//     });
//   };

//   return (
//     <button className="button__logout" onClick={handleLogout}>
//       Log Out
//     </button>
//   );
// };

// export const NavBarButtons = () => {
//   const [isLoading] = useState(false);
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   return (
//     <div className="nav-bar__buttons">
//       {!isAuthenticated && (
//         <>
//           <LoginButton />
//         </>
//       )}
//       {isAuthenticated && (
//         <>
//           <LogoutButton />
//         </>
//       )}
//     </div>
//   );
// };