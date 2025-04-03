import Card from "@mui/material/Card";
import { Button, TextField } from '@mui/material';
import { useEffect, useState } from "react";
import axios from "axios";
import ModalLoading from "../components/components/loading";
import { useNavigate } from "react-router-dom";

function RecSenhaUser() {

    const navigate = useNavigate()

    const [email, setEmail] = useState("")
    const [codigo, setCodigo] = useState("")
    const [novaSenha, setNovaSenha] = useState("")

    //controlando modal loading
    const [showModalLoading, setShowModalLoading] = useState(false)

    const [forcaSenha, setForcaSenha] = useState(false)
    function verificarForcaSenha(senha: string | undefined): boolean {
        if (senha !== undefined) {
            const temMaiuscula = /[A-Z]/.test(senha)
            const temNumero = /\d/.test(senha)
            const tamanhoMinimo = senha.length >= 5

            return temMaiuscula && temNumero && tamanhoMinimo
        }
        else {
            return false
        }
    }


    useEffect(function () {

        setForcaSenha(verificarForcaSenha(novaSenha))
    }, [novaSenha])

    const [etapa, setEtapa] = useState(0)

    function enviarEmailRecSenha() {

        setShowModalLoading(true)
        axios.post(process.env.REACT_APP_API_URL + "usuario/enviar/rec/senha/user", {
            email: email
        }).then(function (resposta) {

            setEtapa(1)

            setShowModalLoading(false)
            sessionStorage.setItem("codigoRecSenha", resposta.data.codigo)
        }).catch(function (erro) {

            setShowModalLoading(false)
            alert(erro.response.data.message || "Erro ao tentar enviar e-mail de rec.")
        })
    }

    //validar codigo recebido
    function validarCodigo() {
        if (codigo == sessionStorage.getItem("codigoRecSenha")) {
            setEtapa(2)
        }
        else {
            alert("O Código não confere.")
        }
    }

    //atualizar senha do usuario
    function atualizarSenhaUsuario() {

        setShowModalLoading(true)
        axios.post(process.env.REACT_APP_API_URL + "usuario/atualizar/senha/user", {
            email: email,
            senha: novaSenha
        }).then(function (resposta) {

            alert(resposta.data)
            navigate("/")
            setShowModalLoading(false)
        }).catch(function (erro) {

            setShowModalLoading(false)
            alert(erro.response.data.message || "Erro ao atualizar senha.")
        })
    }

    return (
        <div className="container-fluid">
            <div className="row m-auto w-75">
                <div className="col mt-5">
                    <p className="border-bottom"><strong>Recuperação de Senha</strong></p>
                    <Card>
                        <div className="container" hidden={etapa == 0 ? false : true}>
                            <div className="row">
                                <div className="col-sm col-md-8 col-lg-8 p-2">
                                    <div className='fieldEmailLogin m-auto'>
                                        <TextField fullWidth value={email} onChange={function (e) { setEmail(e.target.value) }} id="emailLogin" label="E-mail" variant="outlined" size="small" />
                                        <p className='mt-1 text-secondary'><small><strong>*Nunca compartilhe essas informações.</strong></small></p>
                                    </div>
                                </div>
                                <div className="col-sm col-md-4 col-lg-4 p-2">
                                    <Button onClick={enviarEmailRecSenha} type="button" fullWidth variant="contained" color="primary">Contiuar</Button>
                                </div>
                            </div>
                        </div>
                        <div className="container" hidden={etapa == 1 ? false : true}>
                            <div className="row">
                                <div className="col-sm col-md-8 col-lg-8 p-2">
                                    <div className='fieldEmailLogin m-auto'>
                                        <TextField fullWidth value={codigo} onChange={function (e) { setCodigo(e.target.value) }} id="codigoLogin" label="Código" variant="outlined" size="small" />
                                    </div>
                                </div>
                                <div className="col-sm col-md-4 col-lg-4 p-2">
                                    <Button type="button" onClick={validarCodigo} fullWidth variant="contained" color="primary">Contiuar</Button>
                                </div>
                            </div>
                        </div>
                        <div className="container" hidden={etapa == 2 ? false : true}>
                            <div className="row">
                                <div className="col-sm col-md-8 col-lg-8 p-2">
                                    <div className='fieldEmailLogin m-auto'>
                                        <TextField error={forcaSenha === true ? false : true} helperText={forcaSenha === true ? '' : '* Senha muito Fraca'} required fullWidth value={novaSenha} onChange={(e) => setNovaSenha(e.target.value)} type="password" id="senhaLogin" label="Senha" variant="outlined" size="small" />
                                    </div>
                                </div>
                                <div className="col-sm col-md-4 col-lg-4 p-2">
                                    <Button onClick={atualizarSenhaUsuario} type="button" fullWidth variant="contained" color="primary">Finalizar</Button>
                                </div>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
            <ModalLoading show={showModalLoading} />
        </div>
    )
}

export default RecSenhaUser