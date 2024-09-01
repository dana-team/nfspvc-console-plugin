import { Action } from "src/types/action";
import { State } from "src/types/state";
import { ReadWriteMany, setAccessMode, setCapacityUnit, setCapacityValue, setError, setName, setPath, setPayload, setProgress, setServer, unsetProgress } from "../consts";

export const defaultState: State = {
  name: '',
  server: '',
  capacityValue: '0',
  capacityUnit: 'Gi',
  path: '',
  AccessMode: ReadWriteMany,
  progress: false,
  error: '',
  payload: {},
};

export const commonReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case setPath: {
      const isValidPath = action.path.startsWith('/');
      return {
        ...state,
        path: action.path,
        pathError: isValidPath ? '' : 'Path must start with "/"',
      };
    }
    case setName: {
      const isValidName = /^[a-z0-9]([-a-z0-9]*[a-z0-9])?$/.test(action.name) && action.name.length <= 63;
      return {
        ...state,
        name: action.name,
        nameError: isValidName
          ? ''
          : 'Name must consist of lowercase letters, numbers, and dashes. It must not start or end with a dash, and it cannot be longer than 63 characters.',
      };
    }
    case setServer: {
      const isValidServer = action.server.trim() !== '';
      return {
        ...state,
        server: action.server,
        serverError: isValidServer ? '' : 'Server must not be empty.',
      };
    }
    case setAccessMode:
      return {
        ...state,
        AccessMode: action.AccessMode,
      };
    case setProgress:
      return {
        ...state,
        progress: true,
      };
    case unsetProgress:
      return {
        ...state,
        progress: false,
      };
    case setError:
      return {
        ...state,
        error: action.message,
      };
    case setCapacityUnit:
      return {
        ...state,
        capacityUnit: action.capacityUnits,
      };
    case setCapacityValue:
      return {
        ...state,
        capacityValue: action.capacity,
      };
    case setPayload:
      return {
        ...state,
        payload: action.payload,
      };
    default:
      return state; // Return the current state if the action is not recognized
  }
};
