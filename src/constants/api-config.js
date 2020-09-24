// https://daveceddia.com/multiple-environments-with-react/
let backendHost

const hostname = window && window.location && window.location.hostname;


if (hostname === "shopping-list-mern-app-1.herokuapp.com") {
  backendHost = "https://shopping-list-mern-app-1.herokuapp.com/api/items";
} else if (/^qa/.test(hostname)) {
  backendHost = `https://api.${hostname}`;
} else {
  backendHost =
    process.env.REACT_APP_BACKEND_HOST || "http://localhost:5000/api/items";
}

export default backendHost;