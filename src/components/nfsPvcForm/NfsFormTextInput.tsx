import { FormGroup, TextInput } from "@patternfly/react-core";
import * as React from "react";

type NfsFormTextInputProps = {
    field: string;
    label: string
    onChange: (event: React.FormEvent<HTMLInputElement>, value: string) => void;
    onError: React.ReactEventHandler<HTMLInputElement>;
    placeholder: string;
    hint?: string;
    value: string;
    error: string;
};

const NfsFormTextInput: React.FC<NfsFormTextInputProps> = ({ field, label, onChange, onError, placeholder, hint, value, error }) => {
  return (
    <FormGroup label={label} style={{ margin: "0 0 20px 0" }}
    isRequired fieldId={field}>
    <TextInput
      isRequired
      type="text"
      id={field}
      name={field}
      value={value}
      onChange={onChange}
      validated={error ? 'error' : 'default'}
      onError={onError}
      placeholder={placeholder}
    />
    {hint && (
        <div className="pf-c-form__helper-text">
            {hint}
        </div>
    )}
  </FormGroup>
  );
}

export default NfsFormTextInput;