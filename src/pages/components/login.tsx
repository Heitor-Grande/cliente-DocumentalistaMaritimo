import { Button, TextField } from '@mui/material';
import Card from "@mui/material/Card"
import logo from "../../images/Sem nome (1000 x 1000 px).jpg"
import Avatar from "@mui/material/Avatar"
import navioImg from "../../images/ship-4490852_960_720.jpg"
import CadUsuario from './cadUsuario';
import { useState } from 'react';
import ModalLoading from './components/loading';
import axios from 'axios';
import ModalMessage from './components/modalMessage';
import { useNavigate } from 'react-router-dom';

function Login() {

    const navigate = useNavigate()

    //controlando modal de cadastrar usuario
    const [showModalCadUsuario, setShowModalCadUsuario] = useState(false)
    function setShowModalCadUsuarioClick() {
        setShowModalCadUsuario(!showModalCadUsuario)
    }

    //controlando modal loading
    const [showModalLoading, setShowModalLoading] = useState(false)

    //faz login
    function login(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        setShowModalLoading(true)
        axios.post(process.env.REACT_APP_API_URL + 'usuario/login/aquaviario', {
            email, senha
        }).then(function (resposta) {


            sessionStorage.setItem("token", resposta.data.tokenjwt)

            setShowModalLoading(false)
            if (resposta.data.isadmin == true) {

                sessionStorage.setItem("isadmin", resposta.data.isadmin)
                sessionStorage.setItem("usuarioID_admin", resposta.data.usuarioID)
                sessionStorage.setItem("email_admin", resposta.data.email)

                navigate("/menu/admin")
            }
            else {

                sessionStorage.setItem("usuarioID", resposta.data.usuarioID)
                sessionStorage.setItem("email", resposta.data.email)

                navigate("/menu")
            }
        }).catch(function (erro) {

            setShowModalLoading(false)
            setShowModalMessageClick(erro.response.data.message || "Erro ao tentar fazer login.")
        })
    }

    //controlando modal message
    const [modalMessage, setModalMessage] = useState({
        mensagem: "",
        show: false,
        menssagemBtn: "Ok"
    })
    function setShowModalMessageClick(mensagem?: string) {
        setModalMessage({
            ...modalMessage,
            mensagem: mensagem ? mensagem : "",
            show: !modalMessage.show
        })
    }

    //dados de login
    const [email, setEmail] = useState("")
    const [senha, setSenha] = useState("")

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-sm col-lg-9 col-md-10 mx-auto">
                    <Card>
                        <div className="container">
                            <div className="row pt-3">
                                <div className="d-flex justify-content-center">
                                    <Avatar sx={{ width: 70, height: 70 }} src={logo} />
                                </div>
                            </div>
                            <div className='row mt-4'>
                                <div className='col-sm col-md-12 col-lg-6 p-0'>
                                    <img style={{ width: "100%" }} src={navioImg} alt="" />
                                </div>
                                <div className='col-sm col-md-7 col-lg-6 mx-auto mt-2'>
                                    <form onSubmit={login}>
                                        <p className='text-center border-bottom border-3'>Login</p>
                                        <div className='fieldEmailLogin m-auto'>
                                            <TextField fullWidth value={email} onChange={function (e) { setEmail(e.target.value) }} id="emailLogin" label="E-mail" variant="outlined" size="small" />
                                            <p className='mt-1 text-secondary'><small><strong>*Nunca compartilhe essas informações.</strong></small></p>
                                        </div>
                                        <div className='fieldSenhaLogin mx-auto mt-3'>
                                            <TextField fullWidth value={senha} onChange={function (e) { setSenha(e.target.value) }} id="senhaLogin" label="Senha" type="password" variant="outlined" size="small" />
                                        </div>
                                        <div className='fieldSenhaLogin mx-auto mt-3'>
                                            <Button type="submit" fullWidth variant="contained" color="primary"> Entrar</Button>
                                        </div>
                                    </form>

                                    <div className="text-center mt-2">
                                        <button type="button" className="text-secondary link btn text-center border-0"><strong><u>Esqueci minha senha</u></strong></button>
                                    </div>
                                    <div className="text-center mt-4">
                                        <button onClick={setShowModalCadUsuarioClick} type="button" className="text-primary link btn text-center border-0"><strong><u>Ainda não tem uma conta? Clique aqui para criar!</u></strong></button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
            <CadUsuario show={showModalCadUsuario} onOpenClose={setShowModalCadUsuarioClick} />
            <ModalLoading show={showModalLoading} />
            <ModalMessage show={modalMessage.show} mensagem={modalMessage.mensagem} mensagemBtn={modalMessage.menssagemBtn} openClose={setShowModalMessageClick} />
        </div>
    )
}

export default Login