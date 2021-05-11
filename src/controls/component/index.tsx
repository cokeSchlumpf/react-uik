import React, { useState } from 'react';
import produce, { Draft } from 'immer';

export interface ComponentState<T> {
    state: T,
    setState: (newState: T) => void,
    produceState: (recipe: (draft: Draft<T>) => void) => void,
    setValue: (field: keyof Draft<T>) => (value: any) => void
}

export function Component<T>({ initialState, children }: { initialState: T, children: (helper: ComponentState<T>) => React.ReactNode }) {
    const [state, setState] = useState(initialState);

    const produceState = (recipe: (draft: Draft<T>) => void) => {
        setState(produce(recipe, state));
    }

    const setValue = (field: keyof Draft<T>) => (value: any) => {
        setState(produce((draft: Draft<T>) => {
            draft[field] = value;
        }, state));
    }

    return <>
        {  children({ state, setState, produceState, setValue }) }
    </>
}

export default Component;