import * as React from 'react';
import { AppProvider, Navigation, Router } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import Avatar from "@mui/material/Avatar"
import logo from "../../images/Sem nome (1000 x 1000 px).jpg"
import theme from '../../config/theme';
import Aquaviario from '../components/aquaviario';
import { useNavigate } from 'react-router-dom';
import ModalLoading from '../components/components/loading';
import axios from 'axios';
import { useState, useEffect } from 'react';
import DocumentsAquaviario from '../components/documentsAquaviaro';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';

function MenuAdministrativoPage() {

    //controlando modal de loading
    const [showModalLoading, setShowModalLoading] = useState(false)

    const navigate = useNavigate()
    const NAVIGATION: Navigation = [
        {
            kind: 'header',
            title: 'Menu Administrativo',

        },
        {
            segment: "visaogeral",
            title: "Visão Geral",
            icon: < ManageAccountsIcon />,
        },
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
        aquaviario: <Aquaviario />,
        documentsAquaviario: <DocumentsAquaviario />
    }

    //função para verificar JWT do usuario
    function validarJWTusuario() {

        setShowModalLoading(true)
        if (sessionStorage.getItem("isadmin") == 'true') {
            axios.post(process.env.REACT_APP_API_URL + 'usuario/validar/usuario/login', {

                email: sessionStorage.getItem("email") || "",
                usuarioID: sessionStorage.getItem("usuarioID") || ""


            },
                {
                    headers: {
                        token: sessionStorage.getItem("token") || ""
                    }
                }).then(function (resposta) {

                    setShowModalLoading(false)
                }).catch(function (erro) {
                    setShowModalLoading(false)
                    navigate("/")
                })
        }
        else {
            navigate("/")
        }
    }

    //função para renderizar as paginas, pegando de PAGES
    const [pathMonitor, setPathMonitor] = useState("")
    function RenderPageContent({ pathname }: { pathname: string }) {

        setPathMonitor(pathname.replace("/", ""))

        return <div className='container-fluid'>
            {PAGES[pathname.replace("/", "")]}
        </div>
    }

    const router = useDemoRouter("/visaogeral")

    useEffect(function () {


        if (pathMonitor !== "") {

            validarJWTusuario()
        }

    }, [pathMonitor])

    return (
        <AppProvider
            navigation={NAVIGATION}
            router={router}
            theme={theme}
            branding={
                {
                    title: "Documentalista Marítimo",
                    logo: <Avatar src={logo} />,
                    homeUrl: "/visaogeral"
                }
            }
        >
            <DashboardLayout>
                <ModalLoading show={showModalLoading} />
                <RenderPageContent pathname={router.pathname.replace("/", "")} />
            </DashboardLayout>
        </AppProvider>
    )
}

export default MenuAdministrativoPage