import * as History from 'history';
const history = History.createBrowserHistory({
  basename: process.env.PUBLIC_URL
})
export default history;