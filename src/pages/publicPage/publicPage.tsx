import * as React from 'react';
import { extendTheme } from '@mui/material/styles';
import { AppProvider, Navigation, Router } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import LoginIcon from '@mui/icons-material/Login';
import AnchorIcon from '@mui/icons-material/Anchor';
import Login from './components/login';

const NAVIGATION: Navigation = [
    /*{
        kind: 'header',
        title: 'Menu',
    },*/
    {
        segment: "login",
        title: 'Login',
        icon: <LoginIcon />,
    },
    {
        kind: 'divider',
    }
    /*{
        segment: 'reports',
        title: 'Reports',
        icon: <BarChartIcon />,
        children: [
            {
                segment: 'sales',
                title: 'Sales',
                icon: <DescriptionIcon />,
            },
            {
                segment: 'traffic',
                title: 'Traffic',
                icon: <DescriptionIcon />,
            },
        ],
    },*/
]
//controle das cores e algumas propriedades da navbar
const demoTheme = extendTheme({


});

function useDemoRouter(initialPath: string): Router {
    const [pathname, setPathname] = React.useState(initialPath);

    const router = React.useMemo(() => {
        return {
            pathname,
            searchParams: new URLSearchParams(),
            navigate: (path: string | URL) => setPathname(String(path)),
        };
    }, [pathname]);

    return router;
}

//mapeamento das páginas
const PAGES: Record<string, React.ReactNode> = {
    login: <Login />
}

//função para renderizar as paginas, pegando de PAGES
function RenderPageContent({ pathname }: { pathname: string }) {
    return <div className='container-fluid'>
        {PAGES[pathname.replace("/", "")]}
    </div>
}
export default function PublicPage() {

    const router = useDemoRouter("/login")
    return (
        <AppProvider
            navigation={NAVIGATION}
            router={router}
            theme={demoTheme}
            branding={
                {
                    title: "Documentalista Marítimo",
                    logo: <AnchorIcon color="primary" />,
                    homeUrl: "/login"
                }
            }
        >
            <DashboardLayout hideNavigation>
                <RenderPageContent pathname={router.pathname.replace("/", "")} />
            </DashboardLayout>
        </AppProvider>
    );
}
