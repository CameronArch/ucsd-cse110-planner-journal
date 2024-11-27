import React from "react";

interface AccountContextType {
    isLoggedIn: boolean;
    setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
    username: string | null;
    setUsername: React.Dispatch<React.SetStateAction<string | null>>;
    password: string | null;
    setPassword: React.Dispatch<React.SetStateAction<string | null>>;
    credentials: Map<string, string>;
    setCredentials: React.Dispatch<React.SetStateAction<Map<string, string>>>;
}

const initialAccount: AccountContextType = {
    isLoggedIn: false,
    setIsLoggedIn: () => {},
    username: null,
    setUsername: () => {},
    password: null,
    setPassword: () => {},
    credentials: new Map<string, string>(),
    setCredentials: () => {},
};

export const AccountContext = React.createContext<AccountContextType>(initialAccount);

export const AccountContextProvider = (props: any) => {
    const [isLoggedIn, setIsLoggedIn] = React.useState<boolean>(false);
    const [username, setUsername] = React.useState<string | null>(null);
    const [password, setPassword] = React.useState<string | null>(null);
    const [credentials, setCredentials] = React.useState<Map<string, string>>(new Map());

    return (
        <AccountContext.Provider
            value={{
                isLoggedIn,
                setIsLoggedIn,
                username,
                setUsername,
                password,
                setPassword,
                credentials,
                setCredentials,
            }}
        >
            {props.children}
        </AccountContext.Provider>
    );
}