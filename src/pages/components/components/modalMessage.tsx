import { Card, Button } from '@mui/material';
import Modal from '@mui/material/Modal';

interface ModalMessageType {
    show: boolean

    mensagem: string

    openClose: () => void

    mensagemBtn: string
}

function ModalMessage({
    show,
    mensagem,
    openClose,
    mensagemBtn,
}: ModalMessageType) {

    //style do Card do modal
    const style = {
        margin: "auto",
        marginTop: "15%",
        width: "60%",
        bgcolor: 'background.paper',
        p: 3
    }

    return (
        <Modal
            open={show}
            onClose={openClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            sx={{ overflow: "auto" }}
        >
            <Card style={style}>
                <div className='container-fluid'>
                    <div className='row mt-3'>

                    </div>
                    <div className='row mt-3'>
                        <p className='text-center'>
                            {mensagem}
                        </p>
                    </div>
                    <div className='row px-2 pb-2 mt-3'>
                        <Button onClick={openClose} type="button" fullWidth variant="contained" color="primary">
                            {mensagemBtn}
                        </Button>
                    </div>
                </div>
            </Card>
        </Modal>
    )
}

export default ModalMessage