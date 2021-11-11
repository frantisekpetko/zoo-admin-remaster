import { Action, createStore, createTypedHooks, Thunk } from 'easy-peasy';
import { action, thunk } from 'easy-peasy';
import trait from './models/trait';
import user from './models/user';
import animal from './models/animal';
import { TraitModel } from 'src/store/models/trait';
import { UserModel } from 'src/store/models/user';
import { AnimalModel } from './models/animal';

interface StoreModel {
    trait: TraitModel;
    user: UserModel;
    animal: AnimalModel;
}

const model: StoreModel = {
    trait,
    user,
    animal,
};

const store = createStore(model);

const typedHooks = createTypedHooks<StoreModel>();

export const useStoreActions = typedHooks.useStoreActions;
export const useStoreDispatch = typedHooks.useStoreDispatch;
export const useStoreState = typedHooks.useStoreState;

export default store;
