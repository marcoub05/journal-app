import { collection, deleteDoc, doc, setDoc } from "firebase/firestore/lite";
import { FirebaseDB } from "../../firebase/firebase-config";
import { fileUpload } from "../../helpers";
import { loadNotes } from "../../helpers/loadNotes";
import { addNewEmptyNote, deleteNote, savingNewNote, setActiveNote, setNotes, setPhotosToActiveNote, setSaving, updateNote } from "./journalSlice";

export const startNewNote = ()=>{
    return async(dispatch,getState)=>{

        dispatch(savingNewNote());
        const {uid} = getState().auth;

        const newNote={
            title:'',
            body:'',
            imageUrls:[],
            date:new Date().getTime()
        }

        const newDoc = doc(collection(FirebaseDB,`${uid}/journal/notes`));
        await setDoc(newDoc,newNote);

        newNote.id = newDoc.id;

        dispatch(addNewEmptyNote(newNote));
        dispatch(setActiveNote(newNote));

    }
}

export const startLoadingNotes = ()=>{
    return async(dispatch,getState)=>{
        const {uid} = getState().auth; 
        const notes = await loadNotes(uid);
        dispatch(setNotes(notes));
    }
}

export const startSaveNote = ()=>{
    return async(dispatch,getState)=>{

        dispatch(setSaving());
        const {uid} = getState().auth; 
        const {active} = getState().journal;

        const noteToFirestore = {...active};
        delete noteToFirestore.id; //eliminar una propiedad del objeto

        // if(!noteToFirestore.imageUrls){
        //     delete noteToFirestore.imageUrls
        // }

        const docRef = doc(FirebaseDB,`${uid}/journal/notes/${active.id}`);
        await setDoc(docRef,noteToFirestore,{merge:true});

        dispatch(updateNote(active));
    }
}

export const startUploadingFiles =(files=[])=>{

    return async(dispatch)=>{
        dispatch(setSaving());
        const fileUploadPromises = [];

        for (const file of files) {
            fileUploadPromises.push(fileUpload(file))
        }

        const photosUrls = await Promise.all(fileUploadPromises);

        dispatch(setPhotosToActiveNote(photosUrls));

    }
}

export const startDeletingNote = ()=>{
    return async(dispatch,getState)=>{
        const {uid} = getState().auth;
        const {active} = getState().journal;

        const docRef = doc(FirebaseDB,`${uid}/journal/notes/${active.id}`);
        const res = await deleteDoc(docRef);

        dispatch(deleteNote(active.id));
    }
}