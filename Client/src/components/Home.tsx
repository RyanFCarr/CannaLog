import { Box, Divider, Typography } from "@mui/material";
import { useEffectOnce } from "../hooks/useEffectOnce";
import { useAppContext } from "./App";

const Layout: React.FC = () => {
    return <Home />;
};

const Home: React.FC = () => {
    const { setPageTitle, setFooter } = useAppContext();

    useEffectOnce(() => {
        setPageTitle("Welcome User");
    }, []);

    return <>Home</>;
};

const Welcome: React.FC = () => {
    return <>Onboarding Screen</>;
};

export default Layout;
