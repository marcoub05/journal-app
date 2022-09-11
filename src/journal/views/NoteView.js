import { DeleteOutline, SaveOutlined, UploadOutlined } from '@mui/icons-material';
import { Button, Grid, IconButton, Input, TextField, Typography } from '@mui/material';
import { useEffect } from 'react';
import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from '../../hooks/useForm';
import { setActiveNote } from '../../store/journal/journalSlice';
import { startDeletingNote, startSaveNote, startUploadingFiles } from '../../store/journal/thunks';
import { ImageGallery } from '../components'
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css';
import { useRef } from 'react';

export const NoteView = () => {
    const { active, messageSaved, isSaving } = useSelector(state => state.journal);
    const { body, title, onInputChange, formState, date } = useForm(active);
    const dispatch = useDispatch();

    const dataString = useMemo(() => {
        const newDate = new Date(date);
        return newDate.toUTCString();
    }, [date])

    const fileInputRef = useRef();

    useEffect(() => {
        dispatch(setActiveNote(formState));
    }, [formState])

    useEffect(() => {
        if (messageSaved.length > 0) {
            Swal.fire('Nota actualizada', messageSaved, 'success');
        }
    }, [messageSaved])


    const handleSaveNote = () => {
        dispatch(startSaveNote());
    }

    const handleFileInputChange = ({ target }) => {
        if (target.files === 0) return

        dispatch(startUploadingFiles(target.files));
    }

    const handleDeleteNote = () => {
        dispatch(startDeletingNote());
    }

    return (
        <Grid
            container
            direction='row'
            justifyContent='space-between'
            alignItems='center'
            sx={{ mb: 1 }}
            className='animate__animated animate__fadeIn animate__faster'
        >
            <Grid item>
                <Typography fontSize={39} fontWeight='light' >{dataString}</Typography>
            </Grid>
            <Grid item>
                <input type='file' multiple onChange={handleFileInputChange} style={{ display: 'none' }} ref={fileInputRef} />
                <IconButton color='primary' disabled={isSaving} onClick={() => fileInputRef.current.click()}>
                    <UploadOutlined />
                </IconButton>
                <Button color="primary" sx={{ padding: 2 }} onClick={handleSaveNote} disabled={isSaving}>
                    <SaveOutlined sx={{ fontSize: 30, mr: 1 }} />
                    Guardar
                </Button>
            </Grid>

            <Grid container>
                <TextField
                    type="text"
                    variant="filled"
                    fullWidth
                    placeholder="Ingrese un título"
                    label="Título"
                    sx={{ border: 'none', mb: 1 }}
                    name="title"
                    value={title}
                    onChange={onInputChange}
                />

                <TextField
                    type="text"
                    variant="filled"
                    fullWidth
                    multiline
                    placeholder="¿Qué sucedió en el día de hoy?"
                    minRows={5}
                    name="body"
                    value={body}
                    onChange={onInputChange}
                />
            </Grid>
            <Grid container justifyContent="end">
                <Button onClick={handleDeleteNote} sx={{ mt: 2 }} color='error'>
                    Eliminar
                    <DeleteOutline />
                </Button>
            </Grid>

            {/* Image gallery */}
            <ImageGallery images={active.imageUrls} />

        </Grid>
    )
}
