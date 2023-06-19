import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import contactsReducer from './contactsSlice';
import filterReducer from './filterSlice';

const contactsPersistConfig = {
    key: 'contacts',
    storage,
};

const filterPersistConfig = {
    key: 'filter',
    storage,
};

const persistedContactsReducer = persistReducer(contactsPersistConfig, contactsReducer);
const persistedFilterReducer = persistReducer(filterPersistConfig, filterReducer);

const store = configureStore({
    reducer: {
        contacts: persistedContactsReducer,
        filter: persistedFilterReducer,
    },
    middleware: getDefaultMiddleware({
        serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
export default store;
