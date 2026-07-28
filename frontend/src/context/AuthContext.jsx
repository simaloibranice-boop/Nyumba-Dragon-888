import {
    createContext,
    useState
} from "react";


export const AuthContext = createContext();



export function AuthProvider({children}){


const [token,setToken] = useState(
    localStorage.getItem("token")
);



const [user,setUser] = useState(
    JSON.parse(
        localStorage.getItem("user")
    )
);



const [loading,setLoading] = useState(false);



function login(token,user){


    localStorage.setItem(
        "token",
        token
    );


    localStorage.setItem(
        "user",
        JSON.stringify(user)
    );


    setToken(token);

    setUser(user);

}



function logout(){


    localStorage.removeItem(
        "token"
    );


    localStorage.removeItem(
        "user"
    );


    setToken(null);

    setUser(null);

}



return (

<AuthContext.Provider

value={{

token,

user,

loading,

setLoading,

login,

logout

}}

>

{children}

</AuthContext.Provider>

)


}
