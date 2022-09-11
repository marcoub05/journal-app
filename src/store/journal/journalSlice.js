import { createSlice } from "@reduxjs/toolkit";

export const journalSlice = createSlice({
    name:'journal',
    initialState:{
        isSaving:false,
        messageSaved:'',
        notes:[],
        active:null
    },
    reducers:{
        //funciones puras. síncronas

        savingNewNote:(state)=>{
            state.isSaving = true;
        },
        addNewEmptyNote:(state,{payload})=>{
            state.notes.push(payload);
            state.isSaving = false;
        },
        setActiveNote:(state,{payload})=>{
            state.active = payload;
            state.messageSaved = '';
        },
        setNotes:(state,{payload})=>{
            state.notes = payload;
        },
        setSaving:(state)=>{
            state.isSaving = true;
            state.messageSaved=''
        },
        updateNote:(state,{payload})=>{
            state.isSaving = false;
            state.notes =  state.notes.map(note=>{

                if(note.id === payload.id){
                    return payload;
                }
                return note;
            })

            state.messageSaved = `${payload.title}, actualizada correctamente`;
        },
        setPhotosToActiveNote:(state,{payload})=>{
            state.active.imageUrls = [...state.active.imageUrls,...payload];
            state.isSaving = false;
        },
        clearNotes:(state)=>{
            state.isSaving = false;
            state.messageSaved = '';
            state.notes = [];
            state.active = null;
        },
        deleteNote:(state,{payload})=>{
            state.isSaving = false;
            state.active = null;
            state.notes = state.notes.filter(note=>note.id !== payload);
        }
    }
})

export const {addNewEmptyNote, setActiveNote,setNotes,setSaving,updateNote,deleteNote,savingNewNote,setPhotosToActiveNote,clearNotes} = journalSlice.actions;

