import Modal from '@mui/material/Modal';
import { Card, Button } from '@mui/material';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { TextField, MenuItem } from '@mui/material';
import nacionalidades from '../../config/nacionalidades';
import estados from '../../config/estados';
import categorias from '../../config/categoriasNavais';
import { useEffect, useState } from 'react';
import aquaviarioType from '../../interfaces/aquaviarioType';
import axios from 'axios';
import ModalMessage from './components/modalMessage';
import ModalLoading from './components/loading';

interface CadUsuarioTypeModal {

    show: boolean
    onOpenClose: () => void
}

function CadUsuario({
    show,
    onOpenClose
}: CadUsuarioTypeModal) {

    //style do Card do modal
    const style = {
        margin: "auto",
        marginTop: "5%",
        width: "85%",
        bgcolor: 'background.paper',
        p: 3
    }

    //objeto Aquáviário
    const [aquaviario, setAquaviario] = useState<aquaviarioType>()

    //função para alterar valor do aquaviario
    type aquaviarioCampos = keyof aquaviarioType
    function setValuesAquaviario(evento: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, propriedade: aquaviarioCampos) {

        let newValue = evento.target.value
        setAquaviario({
            ...aquaviario,
            [propriedade]: newValue
        })
    }

    function onSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        
        setShowModalLoading(true)
        if (sessionStorage.getItem("codCriacao")) {
            //verifica código digitado
            if (codigo === sessionStorage.getItem("codCriacao")) {
                //cria o usuario
                //envia o e-mail com o código de confirmação
                axios.post(process.env.REACT_APP_API_URL + "usuario/criar/usuario/finalizar/cadastro", aquaviario)
                    .then(function (resposta) {
                        setShowModalLoading(false)
                        setShowModalConfirmarCodigoClick()
                        onOpenClose()
                    }).catch(function (erro) {
                        console.log("--- Erro ao finalizar cadastro ---")
                        console.error(erro)

                        setModalMensagem({
                            ...modalMensagem,
                            mensagem: erro.response.data.message || "Erro ao finalizar cadastro.",
                            mensagemBtn: "Ok"
                        })
                        setShowModalMenssagemClick()
                        setShowModalLoading(false)
                    })
            }
            else {
                setModalMensagem({
                    ...modalMensagem,
                    mensagem: "Código Inválido.",
                    mensagemBtn: "Ok"
                })

                setShowModalLoading(false)
                setShowModalMenssagemClick()
            }
        }
        else {
            //envia o e-mail com o código de confirmação
            axios.post(process.env.REACT_APP_API_URL + "usuario/enviar/email/criacao/conta", aquaviario)
                .then(function (resposta) {

                    sessionStorage.setItem("codCriacao", resposta.data.codigo)
                    setShowModalLoading(false)
                    console.log("passei")
                    setShowModalConfirmarCodigoClick()
                }).catch(function (erro) {
                    console.log("--- Erro ao enviar E-mail ---")
                    console.error(erro)
                    setModalMensagem({
                        ...modalMensagem,
                        mensagem: erro.response.data.message || "Erro ao enviar e-mail de cadastro.",
                        mensagemBtn: "Ok"
                    })
                    setShowModalMenssagemClick()
                    setShowModalLoading(false)
                })
        }
    }

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

        setForcaSenha(verificarForcaSenha(aquaviario?.senha))
    }, [aquaviario?.senha])

    //controlando modal da mensagem 
    const [showModalMensagem, setShowModalMenssagem] = useState(false)
    function setShowModalMenssagemClick() {

        setShowModalMenssagem(!showModalMensagem)
    }

    const [modalMensagem, setModalMensagem] = useState({
        show: false,
        mensagem: "",
        mensagemBtn: "",
    })

    //modal de confirmar código
    //style do Card do modal
    const styleCodigo = {
        margin: "auto",
        marginTop: "15%",
        width: "60%",
        bgcolor: 'background.paper',
        p: 3
    }
    const [showModalConfirmarCodigo, setShowModalConfirmarCodigo] = useState(false)
    function setShowModalConfirmarCodigoClick() {
        setShowModalConfirmarCodigo(!showModalConfirmarCodigo)
    }

    const [codigo, setCodigo] = useState("")

    //controlando modal de loading
    const [showModalLoading, setShowModalLoading] = useState(false)
    function setShowModalLoadingClick() {
        setShowModalLoading(!showModalLoading)
    }
    
    useEffect(function(){
        console.log(showModalLoading)
    }, [showModalLoading])

    return (
        <Modal
            open={show}
            onClose={onOpenClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            sx={{ overflow: "auto" }}
        >
            <Card sx={style}>
                <form onSubmit={onSubmit}>
                    <div className="container-fluid">
                        <div className='row'>
                            <p className='border-2 border-bottom'>
                                <PersonAddIcon fontSize="large" /> Novo Usuário
                            </p>
                        </div>
                        <div className='row'>
                            <p >
                                Informações Pessoais
                            </p>
                        </div>
                        <div className='row'>
                            <div className='col-sm col-md-12 col-lg-6 mt-2'>
                                <TextField value={aquaviario?.nome} onChange={(e) => setValuesAquaviario(e, 'nome')} required fullWidth id="nomeAquav" label="Nome do Aquaviário" variant="outlined" size="small" />
                            </div>
                            <div className='col-sm col-md-12 col-lg-3 mt-2'>
                                <TextField value={aquaviario?.inscricaoAtual} onChange={(e) => setValuesAquaviario(e, 'inscricaoAtual')} required fullWidth id="inscAquav" label="N° de Inscrição" variant="outlined" size="small" />
                            </div>
                            <div className='col-sm col-md-12 col-lg-3 mt-2'>
                                <TextField value={aquaviario?.inscricaoAntiga} onChange={(e) => setValuesAquaviario(e, 'inscricaoAntiga')} required fullWidth id="inscAntAquav" label="N° de Inscrição Antigo" variant="outlined" size="small" />
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col-sm col-md-12 col-lg-6 mt-2'>
                                <TextField
                                    fullWidth
                                    id="situacao"
                                    required
                                    select
                                    label="Situação"
                                    size="small"
                                    value={aquaviario?.situacao}
                                    onChange={(e) => setValuesAquaviario(e, 'situacao')}
                                >
                                    <MenuItem key={0} value={'Ativo'}>
                                        Ativo
                                    </MenuItem>
                                    <MenuItem key={1} value={'Inativo'}>
                                        Inativo
                                    </MenuItem>
                                </TextField>
                            </div>
                            <div className='col-sm col-md-12 col-lg-3 mt-2'>
                                <TextField slotProps={{
                                    inputLabel: {
                                        shrink: true,
                                    },
                                }} required fullWidth value={aquaviario?.dataInscricao} onChange={(e) => setValuesAquaviario(e, 'dataInscricao')} type="date" id="dataInsc" label="Data de Inscrição" variant="outlined" size="small" />
                            </div>
                            <div className='col-sm col-md-12 col-lg-3 mt-2'>
                                <TextField required fullWidth value={aquaviario?.cpf} onChange={(e) => setValuesAquaviario(e, 'cpf')} id="cpf" label="CPF" variant="outlined" size="small" />
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col-sm col-md-12 col-lg-3 mt-2'>
                                <TextField required fullWidth value={aquaviario?.identidade} onChange={(e) => setValuesAquaviario(e, 'identidade')} id="Identidade" label="N° Identidade" variant="outlined" size="small" />
                            </div>
                            <div className='col-sm col-md-12 col-lg-3 mt-2'>
                                <TextField
                                    fullWidth
                                    id="nacionalidade"
                                    required
                                    select
                                    label="Nacionalidade"
                                    size="small"
                                    value={aquaviario?.nacionalidade}
                                    onChange={(e) => setValuesAquaviario(e, 'nacionalidade')}
                                >
                                    {
                                        nacionalidades.map(function (nacionalidade, index) {
                                            return (
                                                <MenuItem key={index} value={nacionalidade}>
                                                    {nacionalidade}
                                                </MenuItem>
                                            )
                                        })
                                    }
                                </TextField>
                            </div>
                            <div className='col-sm col-md-12 col-lg-3 mt-2'>
                                <TextField
                                    fullWidth
                                    id="naturalidade"
                                    required
                                    select
                                    label="Naturalidade"
                                    size="small"
                                    value={aquaviario?.nacionalidade}
                                    onChange={(e) => setValuesAquaviario(e, 'naturalidade')}
                                >
                                    {
                                        estados.map(function (estado, index) {
                                            return (
                                                <MenuItem key={index} value={estado[1]}>
                                                    {estado[1]}
                                                </MenuItem>
                                            )
                                        })
                                    }
                                </TextField>
                            </div>
                            <div className='col-sm col-md-12 col-lg-3 mt-2'>
                                <TextField slotProps={{
                                    inputLabel: {
                                        shrink: true,
                                    },

                                }} required fullWidth value={aquaviario?.dataNascimento} onChange={(e) => setValuesAquaviario(e, 'dataNascimento')} type="date" id="dataNac" label="Data de Nascimento" variant="outlined" size="small" />
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col-sm col-md-12 col-lg-3 mt-2'>
                                <TextField
                                    fullWidth
                                    id="sexo"
                                    required
                                    select
                                    label="Sexo"
                                    size="small"
                                    value={aquaviario?.sexo}
                                    onChange={(e) => setValuesAquaviario(e, 'sexo')}
                                >
                                    <MenuItem key={0} value={'Masculino'}>
                                        Masculino
                                    </MenuItem>
                                    <MenuItem key={1} value={'Feminino'}>
                                        Feminino
                                    </MenuItem>
                                </TextField>
                            </div>
                            <div className='col-sm col-md-12 col-lg-3 mt-2'>
                                <TextField type="number" value={aquaviario?.altura} onChange={(e) => setValuesAquaviario(e, 'altura')} required fullWidth id="estatura" label="Altura em CM" variant="outlined" size="small" />
                            </div>
                            <div className='col-sm col-md-12 col-lg-3 mt-2'>
                                <TextField
                                    fullWidth
                                    id="cor-olhos"
                                    required
                                    select
                                    label="Cor dos Olhos"
                                    size="small"
                                    value={aquaviario?.corDosOlhos} onChange={(e) => setValuesAquaviario(e, 'corDosOlhos')}
                                >
                                    <MenuItem key={0} value="Azul">Azul</MenuItem>
                                    <MenuItem key={1} value="Verde">Verde</MenuItem>
                                    <MenuItem key={2} value="Castanho">Castanho</MenuItem>
                                    <MenuItem key={3} value="Mel">Mel</MenuItem>
                                    <MenuItem key={4} value="Preto">Preto</MenuItem>
                                    <MenuItem key={5} value="Cinza">Cinza</MenuItem>
                                </TextField>

                            </div>
                        </div>
                        <div className='row mt-3'>
                            <p >
                                Competência
                            </p>
                        </div>
                        <div className='row'>
                            <div className='col-sm col-md-12 col-lg-6  mt-2'>
                                <TextField
                                    fullWidth
                                    id="categoriaNaval"
                                    required
                                    select
                                    label="Categoria"
                                    size="small"
                                    value={aquaviario?.competencia} onChange={(e) => setValuesAquaviario(e, 'competencia')}
                                >
                                    {
                                        categorias.map(function (categoria, index) {
                                            return (
                                                <MenuItem key={index} value={categoria.value}>
                                                    {categoria.label}
                                                </MenuItem>
                                            )
                                        })
                                    }
                                </TextField>
                            </div>
                            <div className='col-sm col-md-12 col-lg-3  mt-2'>
                                <TextField slotProps={{
                                    inputLabel: {
                                        shrink: true,
                                    },
                                }} value={aquaviario?.dataCategoria} onChange={(e) => setValuesAquaviario(e, 'dataCategoria')} required fullWidth type="date" id="DatadaCategoria" label="Data da Categoria" variant="outlined" size="small" />
                            </div>
                            <div className='col-sm col-md-12 col-lg-3  mt-2'>
                                <TextField slotProps={{
                                    inputLabel: {
                                        shrink: true,
                                    },
                                }} required value={aquaviario?.DataDaValidade} onChange={(e) => setValuesAquaviario(e, 'DataDaValidade')} fullWidth type="date" id="DatadaCategoria" label="Data da Validade" variant="outlined" size="small" />
                            </div>
                        </div>
                        <div className='row mt-3'>
                            <p >
                                Informações Para Login
                            </p>
                        </div>
                        <div className='row'>
                            <div className='col-sm col-md-12 col-lg-6 mt-2'>
                                <TextField required fullWidth value={aquaviario?.email} onChange={(e) => setValuesAquaviario(e, 'email')} type="email" id="emailLogin" label="E-mail" variant="outlined" size="small" />
                            </div>
                            <div className='col-sm col-md-12 col-lg-3 mt-2'>
                                <TextField error={forcaSenha === true ? false : true} helperText={forcaSenha === true ? '' : '* Senha muito Fraca'} required fullWidth value={aquaviario?.senha} onChange={(e) => setValuesAquaviario(e, 'senha')} type="password" id="senhaLogin" label="Senha" variant="outlined" size="small" />
                            </div>
                            <div className='col-sm col-md-12 col-lg-3 mt-2'>
                                <TextField error={aquaviario?.senha !== aquaviario?.confirmarSenha ? true : false} helperText={aquaviario?.senha !== aquaviario?.confirmarSenha ? '* As senhas não são iguais' : ''} required fullWidth value={aquaviario?.confirmarSenha} onChange={(e) => setValuesAquaviario(e, 'confirmarSenha')} type="password" id="senhaCofirmLogin" label="Confirmar Senha" variant="outlined" size="small" />
                            </div>
                        </div>
                        <div className='row border-top border-2 mt-2'>
                            <div className='col-sm col-md-12 col-lg-12 mt-2'>
                                <Button type="submit" disabled={aquaviario?.senha === aquaviario?.confirmarSenha && aquaviario?.senha !== undefined && aquaviario.senha !== "" && aquaviario?.confirmarSenha !== undefined && aquaviario.confirmarSenha !== "" && forcaSenha === true ? false : true} fullWidth variant="contained" color="primary">
                                    Finalizar Novo Cadastro
                                </Button>
                            </div>
                        </div>
                    </div>
                </form>
                <ModalMessage show={showModalMensagem} mensagem={modalMensagem.mensagem} mensagemBtn={modalMensagem.mensagemBtn} openClose={setShowModalMenssagemClick} />
                <Modal
                    open={showModalConfirmarCodigo}
                    onClose={setShowModalConfirmarCodigoClick}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                    sx={{ overflow: "auto" }}
                >
                    <Card style={styleCodigo}>
                        <form onSubmit={onSubmit}>
                            <div className='container-fluid'>
                                <div className='row mt-3'>
                                    <p className='text-center'>
                                        Digite o código recebido no e-mail cadastrado. <strong>Não recarregue a página atual.</strong>
                                    </p>
                                </div>
                                <div className='row px-3 pb-2'>
                                    <div className='col-sm col-md-12 col-lg-8'>
                                        <TextField value={codigo} onChange={(e) => { setCodigo(e.target.value) }} required fullWidth label="Código" variant="outlined" size="small" />
                                    </div>
                                    <div className='col-sm col-md-12 col-lg-4'>
                                        <Button type="submit" fullWidth variant="contained" color="primary">
                                            Validar Código
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </Card>
                </Modal>
                <ModalLoading show={showModalLoading} openClose={setShowModalLoadingClick} />
            </Card>
        </Modal>
    )
}

export default CadUsuario