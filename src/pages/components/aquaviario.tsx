import { Card, Button } from '@mui/material';
import { TextField, MenuItem } from '@mui/material';
import nacionalidades from '../../config/nacionalidades';
import estados from '../../config/estados';
import categorias from '../../config/categoriasNavais';
import { useEffect, useState } from 'react';
import aquaviarioType from '../../interfaces/aquaviarioType';
import axios from 'axios';
import ModalMessage from './components/modalMessage';
import ModalLoading from './components/loading';

function Aquaviario() {

    //objeto Aquáviário
    const [aquaviario, setAquaviario] = useState<aquaviarioType>()

    //carregar informações do usuario
    function carregarInfoUsuarioLogado() {
        setShowModalLoading(true)
        axios.post(process.env.REACT_APP_API_URL + `usuario/carregar/dados/usuario/${sessionStorage.getItem("usuarioID")}`, {
            email: sessionStorage.getItem("email") || "",
            usuarioID: sessionStorage.getItem("usuarioID") || ""
        }, {
            headers: {
                token: sessionStorage.getItem("token") || ""
            }
        }).then(function (resposta) {

            const aquaviario: aquaviarioType = {
                id: resposta.data.id?.toString(),
                nome: resposta.data.nome,
                inscricaoAtual: resposta.data.ninscricao,
                inscricaoAntiga: resposta.data.ninscricao_antigo,
                situacao: resposta.data.situacao,
                dataInscricao: resposta.data.datainscricao,
                cpf: resposta.data.cpf,
                identidade: resposta.data.identidade,
                nacionalidade: resposta.data.nacionalidade,
                naturalidade: resposta.data.naturalidade,
                dataNascimento: resposta.data.data_nascimento,
                sexo: resposta.data.sexo,
                altura: resposta.data.altura?.toString(),
                corDosOlhos: resposta.data.cor_olhos,
                competencia: resposta.data.categoria,
                dataCategoria: resposta.data.data_categoria,
                DataDaValidade: resposta.data.data_validade_categoria,
                email: resposta.data.email,
                senha: "",
                confirmarSenha: "" // Caso tenha um campo para confirmar senha, pode ser tratado de outra forma.
            };

            setAquaviario(aquaviario)

            setShowModalLoading(false)
        }).catch(function (erro) {

            setShowModalLoading(false)
            setShowModalMessageClick(erro.response.data.message || "Ocorreu um erro ao tentar carregar Usuário.")
        })
    }

    //função para alterar valor do aquaviario
    type aquaviarioCampos = keyof aquaviarioType
    function setValuesAquaviario(evento: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, propriedade: aquaviarioCampos) {

        let newValue = evento.target.value
        setAquaviario({
            ...aquaviario,
            [propriedade]: newValue
        })
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

    function onSubmit(e: React.FormEvent<HTMLFormElement>) {

        e.preventDefault()

        setShowModalLoading(true)

        axios.put(process.env.REACT_APP_API_URL + `usuario/atualizar/cadastro/usuario/${sessionStorage.getItem("usuarioID")}`, aquaviario, {
            headers: {
                token: sessionStorage.getItem("token") || "",
                email: sessionStorage.getItem("email"),
                usuarioid: sessionStorage.getItem("usuarioID")
            }
        }).then(function (resposta) {
            setShowModalLoading(false)
            setShowModalMessageClick("Usuario atualizado com sucesso.")
        }).catch(function (erro) {

            setShowModalLoading(false)
            setShowModalMessageClick(erro.response.data.message || "Ocorreu um erro ao tentar atualizar Usuário.")
        })
    }

    useEffect(function () {

        setForcaSenha(verificarForcaSenha(aquaviario?.senha))
    }, [aquaviario?.senha])

    useEffect(function () {

        carregarInfoUsuarioLogado()
    }, [])


    return (
        <Card className='mt-2'>
            <form onSubmit={onSubmit}>
                <div className="container-fluid pt-2 pb-2">
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
                                value={aquaviario?.situacao || ""}
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
                                value={aquaviario?.nacionalidade || ""}
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
                                value={aquaviario?.naturalidade || ""}
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
                                value={aquaviario?.sexo || ''}
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
                                value={aquaviario?.corDosOlhos || ""} onChange={(e) => setValuesAquaviario(e, 'corDosOlhos')}
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
                                value={aquaviario?.competencia || ""} onChange={(e) => setValuesAquaviario(e, 'competencia')}
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
                            {
                                !sessionStorage.getItem("isadmin") &&
                                <Button type="submit" disabled={aquaviario?.senha === aquaviario?.confirmarSenha && aquaviario?.senha !== undefined && aquaviario.senha !== "" && aquaviario?.confirmarSenha !== undefined && aquaviario.confirmarSenha !== "" && forcaSenha === true ? false : true} fullWidth variant="contained" color="primary">
                                    Atualizar Cadastro
                                </Button>
                            }

                        </div>
                    </div>
                </div>
            </form>
            <ModalLoading show={showModalLoading} />
            <ModalMessage show={modalMessage.show} mensagem={modalMessage.mensagem} mensagemBtn={modalMessage.menssagemBtn} openClose={setShowModalMessageClick} />
        </Card>
    )
}

export default Aquaviario