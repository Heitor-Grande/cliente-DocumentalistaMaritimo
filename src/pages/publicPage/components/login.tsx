import AnchorIcon from '@mui/icons-material/Anchor';
import { TextField } from '@mui/material';
function Login() {
    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-sm col-lg-9 col-md-10 mx-auto">
                    <div className="card">
                        <div className="card-body">
                            <div className="container">
                                <div className="row">
                                    <div className="text-center">
                                        <AnchorIcon color="primary" fontSize="large" />
                                    </div>
                                </div>
                                <div className='row mt-5'>
                                    <div className="col-sm col-md-12 col-lg-12">
                                        <p className='text-center border-bottom border-3'>Login</p>
                                    </div>
                                    <div className='col-sm col-md-7 col-lg-6 m-auto'>
                                        <div className='fieldEmailLogin m-auto'>
                                            <TextField fullWidth id="emailLogin" label="E-mail" variant="outlined" />
                                            <small id="emailHelp" className="form-text"><strong>Nunca compartilhe essas informações.</strong></small>
                                        </div>
                                        <div className='fieldSenhaLogin mx-auto mt-3'>
                                            <TextField fullWidth id="senhaLogin" label="Senha" type="password" variant="outlined" />
                                        </div>
                                        <div className="text-center mt-2">
                                            <button type="button" className="text-danger link btn text-center border-0"><strong><u>Esqueci minha senha</u></strong></button>
                                        </div>
                                        <div className="text-center mt-4">
                                            <button type="button" className="text-primary link btn text-center border-0"><strong><u>Ainda não tem uma conta? Clique aqui para criar!</u></strong></button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login