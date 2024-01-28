import { useReducer } from 'react';

export interface SearchState {
  telehealth: boolean;
  office: string | null;
  insuranceProvider: string | null;
  after: string | null;
  before: string | null;
}

type ToggleTelehealthAction = {
  type: 'toggle_telehealth'
}

type SetOfficeAction = {
  type: 'set_office',
  payload: string
}

type SetInsuranceProviderAction = {
  type: 'set_insurance_provider',
  payload: string
}

type SetAfterAction = {
  type: 'set_after',
  payload: string
}

type SetBeforeAction = {
  type: 'set_before',
  payload: string 
}

type SearchActions =
  ToggleTelehealthAction | SetOfficeAction | SetInsuranceProviderAction | SetAfterAction | SetBeforeAction;

function therapistSearchReducer(state: SearchState, action: SearchActions) {
  if (action.type === 'toggle_telehealth') {
    return { ...state, telehealth: !state.telehealth, before: null, after: null };
  }

  if (action.type === 'set_office') {
    return { ...state, office: action.payload, before: null, after: null };
  }

  if (action.type === 'set_insurance_provider') {
    return { ...state, insuranceProvider: action.payload, before: null, after: null };
  }

  if (action.type === 'set_after') {
    return { ...state, after: action.payload, before: null }; 
  }

  if (action.type === 'set_before') {
    return { ...state, before: action.payload, after: null };
  }

  throw Error('Unknown action: ' + action.type);
}

export default therapistSearchReducer
