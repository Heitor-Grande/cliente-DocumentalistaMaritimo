import { Button, Card, Link } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { TextField } from '@mui/material';
import ModalLoading from './components/loading';
import axios from 'axios';
import ModalMessage from './components/modalMessage';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function VisaoGeral() {

    const navigate = useNavigate()

    //controlando modal loading
    const [showModalLoading, setShowModalLoading] = useState(false)


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

    //lista de usuarios
    const [listaDeUsuarios, setListaDeUsuarios] = useState([])

    //carrega usuarios
    function carregaUsuarios() {

        setShowModalLoading(true)
        axios.get(process.env.REACT_APP_API_URL + `usuario/carregar/lista/usuarios/admin/${sessionStorage.getItem("usuarioID_admin")}`, {
            headers: {
                email: sessionStorage.getItem("email_admin") || "",
                usuarioID: sessionStorage.getItem("usuarioID_admin") || ""
            }
        }).then(function (resposta) {

            setShowModalLoading(false)
            setListaDeUsuarios(resposta.data)
        }).catch(function (erro) {

            setShowModalLoading(false)
            setShowModalMessageClick(erro.response.data.message || "Ocorreu um erro ao tentar carregar listagem de usuários.")
        })
    }

    useEffect(function () {

        carregaUsuarios()
    }, [])

    function ativarDesativarUsuario(id_usuario: string, statusAtual: boolean) {

        setShowModalLoading(true)
        axios.put(process.env.REACT_APP_API_URL + `usuario/desativa/ativa/contaativa/${id_usuario}`, {
            statusAtual: statusAtual
        }, {
            headers: {
                email: sessionStorage.getItem("email_admin") || "",
                usuarioID: sessionStorage.getItem("usuarioID_admin") || ""
            }
        }).then(function (resposta) {

            setShowModalLoading(false)
            carregaUsuarios()
        }).catch(function (erro) {

            setShowModalLoading(false)
            setShowModalMessageClick(erro.response.data.message || "Ocorreu um erro ao tentar atualizar usuario.")
        })
    }

    //procurar por nome
    const [busca, setBusca] = useState("")

    useEffect(function () {
        if (busca != "") {

            const novaListaUsuario = listaDeUsuarios.filter(function (usuario: any) {

                return usuario.nome.toLowerCase().includes(busca.toLowerCase())
            })

            setListaDeUsuarios(novaListaUsuario)
        }
        else {

            carregaUsuarios()
        }
    }, [busca])

    return (
        <Card className='mt-2'>
            <ModalLoading show={showModalLoading} />
            <div className="container-fluid pt-2 pb-2">
                <div className='row p-2'>
                    <TextField value={busca} onChange={(e) => { setBusca(e.target.value.toUpperCase()) }} fullWidth id="nomeAquav" label="Procurar por nome..." variant="outlined" size="small" />
                </div>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Nome</TableCell>
                                <TableCell align="center">CPF</TableCell>
                                <TableCell align="center">Ações</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {listaDeUsuarios.map((row: any) => (
                                <TableRow
                                    key={row.id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        <Button variant="text" onClick={function () {
                                            sessionStorage.setItem("usuarioID", row.id)
                                            sessionStorage.setItem("email", row.email)
                                            navigate("/menu")
                                        }}>{row.nome}</Button>
                                    </TableCell>
                                    <TableCell align="center" component="th" scope="row">
                                        {row.cpf}
                                    </TableCell>
                                    <TableCell align="center" component="th" scope="row">

                                        <Button onClick={() => ativarDesativarUsuario(row.id, row.contaativa)} color={row.contaativa == true ? 'error' : 'primary'} variant="contained" size="small">
                                            {row.contaativa == true ? 'Desativar Usuário' : 'Ativar Usuário'}
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
            <ModalMessage show={modalMessage.show} mensagem={modalMessage.mensagem} mensagemBtn={modalMessage.menssagemBtn} openClose={setShowModalMessageClick} />
        </Card>
    )
}

export default VisaoGeral