import { Card, Button } from '@mui/material';
import { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import ModalLoading from './components/loading';
import axios from 'axios';
import ModalMessage from './components/modalMessage';
import DeleteIcon from "@mui/icons-material/Delete";
import DownloadIcon from '@mui/icons-material/Download';
import { IconButton } from "@mui/material";

function DocumentsAquaviario() {
    //controlando modal loading
    const [showModalLoading, setShowModalLoading] = useState(false)

    const [listaDocumentos, setListaDocumentos] = useState([])


    //abiri input file
    function AbrirInputFile() {
        const inputAnexar = document.querySelector("#anexarArquivo") as HTMLInputElement
        inputAnexar.click()
    }

    const converterParaBase64 = (file: any) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
        });
    };

    async function fazerUpload(uploads: any) {
        setShowModalLoading(true)
        const arrayDeFiles = uploads.target.files
        const arquivosBase64 = []
        try {
            for (const file of arrayDeFiles) {
                const base64 = await converterParaBase64(file);
                arquivosBase64.push({
                    nome: file.name,
                    tipo: file.type,
                    base64: base64
                });
            }
            //console.log(arquivosBase64); // Array com os arquivos convertidos em base64

            //fazer o post dos arquivos
            axios.post(process.env.REACT_APP_API_URL + `usuario/upload/files/user/${sessionStorage.getItem("usuarioID")}`, {
                arquivosBase64
            }, {
                headers: {
                    token: sessionStorage.getItem("token"),
                    email: sessionStorage.getItem("email"),
                    usuarioid: sessionStorage.getItem("usuarioID")
                }
            }).then(function (resposta) {

                setShowModalLoading(false)
                carregarDocumentosUsuario()
            }).catch(function (erro) {


                setShowModalMessageClick(erro.response.data.message || "Ocorreu um erro ao tentar Fazer Upload.")
                setShowModalLoading(false)
            })

        } catch (error) {
            setShowModalLoading(false)
            console.error("Erro ao converter arquivos:", error);
        }
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

    function carregarDocumentosUsuario() {

        setShowModalLoading(true)
        axios.get(process.env.REACT_APP_API_URL + `usuario/carregar/uploads/usuario/${sessionStorage.getItem("usuarioID")}`, {
            headers: {
                token: sessionStorage.getItem("token"),
                email: sessionStorage.getItem("email"),
                usuarioid: sessionStorage.getItem("usuarioID")
            }
        }).then(function (resposta) {

            setShowModalLoading(false)
            setListaDocumentos(resposta.data)
        }).catch(function (erro) {

            setShowModalMessageClick(erro.response.data.message || "Ocorreu um erro ao carregar Uploads.")
            setShowModalLoading(false)
        })
    }

    useEffect(function () {
        carregarDocumentosUsuario()
    }, [])

    const downloadFile = (fileName: string, fileType: string, base64: string) => {
        const link = document.createElement("a");
        link.href = `data:${fileType};base64,${base64.split(",")[1]}`; // Remove o prefixo "data:..."
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    function excluirFiel(id_documento: string) {

        setShowModalLoading(true)
        axios.delete(process.env.REACT_APP_API_URL + `usuario/deletar/uploads/usuario/${sessionStorage.getItem("usuarioID")}/${id_documento}`, {
            headers: {
                token: sessionStorage.getItem("token"),
                email: sessionStorage.getItem("email"),
                usuarioid: sessionStorage.getItem("usuarioID")
            }
        }).then(function (resposta) {

            setShowModalLoading(false)
            carregarDocumentosUsuario()
        }).catch(function (erro) {

            setShowModalMessageClick(erro.response.data.message || "Ocorreu um erro ao excluir Uploads.")
            setShowModalLoading(false)
        })
    }

    return (
        <Card className='mt-2'>
            <ModalLoading show={showModalLoading} />
            <input onChange={fazerUpload} type="file" id="anexarArquivo" multiple accept=".pdf, .xls, .xlsx, .png, .jpeg, .jpg" hidden />
            <div className="container-fluid pt-2 pb-2">
                <Button type="button" onClick={AbrirInputFile} fullWidth variant="contained" color="primary">
                    Importar Novo Arquivo
                </Button>
            </div>
            <div className="container-fluid pt-2 pb-2">
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Arquivo</TableCell>
                                <TableCell align="center">Tipo</TableCell>
                                <TableCell align="center">Ações</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {listaDocumentos.map((row: any) => (
                                <TableRow
                                    key={row.id_documento}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        {row.nome_arquivo}
                                    </TableCell>
                                    <TableCell align="center" component="th" scope="row">
                                        {row.tipo_arquivo}
                                    </TableCell>
                                    <TableCell align="center">
                                        <IconButton
                                            color="primary"
                                            onClick={() => downloadFile(row.nome_arquivo, row.tipo_arquivo, row.file64)}
                                        >
                                            <DownloadIcon />
                                        </IconButton>
                                        <IconButton
                                            color="error"
                                            onClick={() => excluirFiel(row.id_documento)}
                                        >
                                            <DeleteIcon />
                                        </IconButton>
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
export default DocumentsAquaviario