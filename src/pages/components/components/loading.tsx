import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';

interface ModalLoading {
    show: boolean

    openClose: () => void
}

function ModalLoading({
    show,
    openClose
}: ModalLoading) {
    return (
        <Modal
            open={show}
            onClose={openClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            sx={{ overflow: "auto" }}
        >
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100vh' // Ocupa a altura da tela inteira
                }}
            >
                <CircularProgress />
            </Box>
        </Modal>
    )
}

export default ModalLoading