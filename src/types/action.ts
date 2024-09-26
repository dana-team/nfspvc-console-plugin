export type Action =
    | { type: 'setPath'; path: string }
    | { type: 'setName'; name: string }
    | { type: 'setServer'; server: string }
    | { type: 'setCapacityValue'; capacity: string }
    | { type: 'setCapacityUnit'; capacityUnits: string }
    | { type: 'setProgress' }
    | { type: 'unsetProgress' }
    | { type: 'setError'; message: string }
    | { type: 'setPayload'; payload: {} }
    | { type: 'setAccessMode'; AccessMode: string }
    | { type: 'checkError' };
