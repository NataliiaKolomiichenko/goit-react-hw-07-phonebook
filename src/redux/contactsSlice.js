import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { fetchContacts, addContact, deleteContact } from "./operations";

const contactsInitialState = {
    items: [],
    isLoading: false,
    error: null,
};

const actions = [fetchContacts, addContact, deleteContact];

const handleFetchContacts = (state, action) => { 
    state.isLoading = false;
    state.error = null;
    state.items = action.payload;
}

const handleAddContact = (state, action) => {
    state.items.push(action.payload);
}

const handleDeleteContact = (state, action) => {
    const index = state.items.findIndex(contact => contact.id === action.payload);
    state.items.splice(index, 1);
}

const contactsSlice = createSlice({
    name: "contacts",
    initialState: contactsInitialState,
    extraReducers: builder => 
        builder
            .addCase(fetchContacts.fulfilled, handleFetchContacts)
            .addCase(addContact.fulfilled, handleAddContact)
            .addCase(deleteContact.fulfilled, handleDeleteContact)
            .addMatcher(
            isAnyOf(...actions.map(action => action.fulfilled)),
                state => {
                state.isLoading = false;
                state.error = null;
                }
            )
            .addMatcher(isAnyOf(...actions.map(action => action.pending)), state => {
                state.isLoading = true;
            })
            .addMatcher(
                isAnyOf(...actions.map(action => action.rejected)),
                (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
                }),
});

export const contactsReducer = contactsSlice.reducer;