import {BrowserRouter as Router, Route, Switch, NavLink} from 'react-router-dom'
import {gql,useQuery} from '@apollo/client'

const USERS = gql`
 query users{
   users{
     id
     username
     email
     password
   }
 }
`

interface UserData {
  id: string
  username: string
  email: string
  password: string
  __typename: string
}

function Home(){
  const {loading,data,error} = useQuery<UserData[]>(USERS)

  if(loading) return <h1>Loading</h1>
  if(error) return <h1>Error</h1>

  return (
    <div>
      {data!.map(({id,username,email,password}) => (
      <div key={id}>
        <p>{username}</p>
        <p>{email}</p>
        <p>{password}</p>
      </div>
    ))}
    </div>
  )

}

function Routes(){
  return (
    <Router>
      <nav>
        <ul style={{
          display: "flex",
          listStyle:"none",
        }}>
          <li><NavLink to="/">Home</NavLink></li>
          <li><NavLink to="/login">Login</NavLink></li>
          <li><NavLink to="/register">Register</NavLink></li>
        </ul>
      </nav>
      <Switch>
        <Route path="/" exact component={Home}/>
        <Route path="/login"  render={()=><h1>Login</h1>}/>
        <Route path="/register"  render={()=><h1>Register</h1>}/>
      </Switch>
    </Router>
  )
}

export default Routes