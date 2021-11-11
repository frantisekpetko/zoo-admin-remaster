import React from 'react';
import { Action, createStore, createTypedHooks, Thunk, action, thunk } from 'easy-peasy';
import Ajax from 'src/tools/Ajax';

interface Trait {
    id: number;
    name: string;
    createdAt: string,
    updatedAt: string
};
  
interface TraitRequest {
    name: string;
}
  
export interface TraitModel {
    traits: Trait[];
    getTraits: Thunk<TraitModel>;
    setTraits: Action<TraitModel, Trait[]>
    addTrait: Action<TraitModel, Trait>;
    saveTrait: Thunk<TraitModel, any>;
    loading: boolean,
    setLoading: Action<TraitModel, boolean>,
    error: unknown,
    setError: Action<TraitModel, unknown>
  
}

const trait: TraitModel = {
    traits: [],
    getTraits: thunk(async (actions) => {
      const { data } = await Ajax.get('/traits');
      actions.setTraits(data);
    }),
    setTraits: action((state, payload) => {
      state.traits = [...payload];
    }), 
    addTrait: action((state, payload) => {
      console.log('payload', payload, 'xxxxxxxxxxxxxxxxxxxxxx');
      state.traits = [...state.traits, payload];
    }),
    saveTrait: thunk(async (actions, payload) => {
      try {
        actions.setLoading(true);
        const { data } = await Ajax.post('/traits/data', payload);
        console.log('data', data);
        actions.addTrait(data);
        actions.setLoading(false);
      }
      catch(e){
        console.log('error', e);
        actions.setError(e);
      }
    }),
    loading: false,
    setLoading: action((state, payload) => {
      state.loading = payload;
    }), 
    error: '',
    setError:  action((state, payload) => {
      state.error = payload;
    }), 
}

export default trait;