import { Card } from '@mui/material';
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
import { useState } from 'react';

function VisaoGeral() {

    //controlando modal loading
    const [showModalLoading, setShowModalLoading] = useState(false)

    //lista de usuarios
    const [listaDeUsuarios, setListaDeUsuarios] = useState([])

    //carrega usuarios
    function carregaUsuarios(){

        setShowModalLoading(true)
        
    }
    return (
        <Card className='mt-2'>
            <ModalLoading show={showModalLoading} />
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
                            {listaDeUsuarios.map((row: any) => (
                                <TableRow
                                    key={row.id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        {row.nome}
                                    </TableCell>
                                    <TableCell align="center" component="th" scope="row">
                                        {row.cpf}
                                    </TableCell>
                                    <TableCell align="center" component="th" scope="row">
                                        desativar conta / ativar conta
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </Card>
    )
}