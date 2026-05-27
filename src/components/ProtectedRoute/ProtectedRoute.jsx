
export default function ProtectedRoute({ children }) {
  if (localStorage.getItem('access_token')) {
    return children ;
  }else{
    return children ;

  }

}
