import styled from "styled-components";
import Spinner from "./Spinner";
import { useUser } from "../features/authentication/useUser";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
const FullPage = styled.div`
  height: 100vh;
  background-color: var(--color-grey-50);
  display: flex;
  align-items: center;
  justify-content: center;
`;

function ProtectedRoute({ children }) {
    const navigate=useNavigate();
  //1 load the auth user
  const { isAuthenticated, isLoading } = useUser();

  //2 if no user redirect to login
  useEffect(function(){
    if(!isAuthenticated && !isLoading) navigate("/login");
  },[isAuthenticated,isLoading,navigate])

    //3 show spinner when loading
  if (isLoading)
    return (
      <FullPage>
        <Spinner />
      </FullPage>
    );
  //4 if user render the app
  if(isAuthenticated) return children ;
}

export default ProtectedRoute;
