import { k8sCreate, K8sResourceKind, useActiveNamespace } from '@openshift-console/dynamic-plugin-sdk';
import { ActionGroup, Alert, AlertVariant, Button, Dropdown, DropdownItem, Form, FormGroup, InputGroup, MenuToggle, MenuToggleElement, Spinner, TextInput } from '@patternfly/react-core';
import * as React from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom-v5-compat';
import { dropdownAccessModes, dropdownCapacityUnits, setAccessMode, setCapacityUnit, setCapacityValue, setError, setName, setPath, setProgress, setServer, unsetProgress } from '../../consts';
import '../../global.css';
import { useCreateNfsPvcState } from '../../hooks/useCreateNfsPvcState';
import { Nfspvc } from '../../types/nfspvc';
import Section from '../nfsPvcPage/Section';
import NfsFormTextInput from './NfsFormTextInput';

export const CreateNfsPvc: React.FC = () => {
  const [namespace] = useActiveNamespace();
  const navigate = useNavigate();

  const {
    state,
    dispatch,
    isAccessModeOpen,
    setIsAccessModeOpen,
    isStorageUnitOpen,
    setIsStorageUnitOpen,
  } = useCreateNfsPvcState(namespace);

  const setErrors = () => {
    dispatch({ type: setProgress });
    dispatch({ type: setName, name: state.name });
    dispatch({ type: setPath, path: state.path });
    dispatch({ type: setServer, server: state.server });
  }

  const save = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors();

    try {
      const resource = await k8sCreate({ model: Nfspvc, ns: namespace, data: state.payload });
      dispatch({ type: unsetProgress });
      const { apiGroup, apiVersion, kind } = Nfspvc;
      navigate(`/k8s/ns/${namespace}/${apiGroup}~${apiVersion}~${kind}/${(resource as K8sResourceKind).metadata.name}`);
    } catch (err) {
      dispatch({ type: setError, message: err.message });
      dispatch({ type: unsetProgress });
    }
  };

  const toggleRef = React.useRef<MenuToggleElement>(null);

  return (
    <div className="co-m-pane__body co-m-pane__form">
      <Helmet>
        <title>Create NFS PVC</title>
      </Helmet>
      <h1 className="co-m-pane__heading co-m-pane__heading--baseline">
        <div className="co-m-pane__name">Create NFS PVC</div>
      </h1>

      <Form onSubmit={save}>
        <Section label="PVC Name">
          <NfsFormTextInput
            field="pvcnfs-name"
            label="Name"
            onChange={(value) => dispatch({ type: setName, name: value })}
            onError={() => dispatch({ type: setError, message: state.nameError })}
            placeholder="my-storage"
            value={state.name}
            hint='Choose a name for your NFS PVC storage'
            error={state.nameError} />
        </Section>
        <div className="co-form-section__separator m-0 p-0" />
        <Section label="NFS Details">

          <NfsFormTextInput
            field="path"
            label="Path"
            onChange={(value) => dispatch({ type: setPath, path: value })}
            onError={() => dispatch({ type: setError, message: state.pathError })}
            placeholder="/volume/my_volume"
            value={state.path}
            hint='The Path has to begin with "/"'
            error={state.pathError} />

          <FormGroup label="Capacity" style={{ margin: "0 0 20px 0", width: '30%' }}
            isRequired fieldId="capacity">
            <InputGroup>
              <TextInput
                isRequired
                type="number"
                id="capacityValue"
                name="capacityValue"
                value={state.capacityValue}
                onChange={(value) => dispatch({ type: setCapacityValue, capacity: value })}
                placeholder="Size"
                style={{ flexGrow: 1, minWidth: '100%' }}
              />
              <Dropdown
                className='custom-dropdown'
                toggle={
                  <MenuToggle
                    onClick={() => setIsStorageUnitOpen(!isStorageUnitOpen)}
                    id="capacity-unit"
                    ref={toggleRef}
                  >
                    {dropdownCapacityUnits[state.capacityUnit] || "Select Unit"}
                  </MenuToggle>

                }
                isOpen={isStorageUnitOpen}
                children={Object.keys(dropdownCapacityUnits).map((key) => (
                  <DropdownItem
                    key={key}
                    onClick={() => {
                      dispatch({ type: setCapacityUnit, capacityUnits: key });
                      setIsStorageUnitOpen(false);
                    }}
                  >
                    {dropdownCapacityUnits[key]}
                  </DropdownItem>
                ))}
                style={{ flexGrow: 0, minWidth: 'max-content' }}
              />
            </InputGroup>
          </FormGroup>

          <FormGroup label="Access Mode" style={{ margin: "0 0 20px 0" }}
            isRequired fieldId="access-mode">
            <Dropdown
              className='custom-dropdown'
              toggle={(
                <MenuToggle
                  onClick={() => setIsAccessModeOpen(!isAccessModeOpen)}
                  id="access-mode"
                  ref={toggleRef}
                >
                  {state.AccessMode || 'Select Access Mode'}
                </MenuToggle>
              )}
              isOpen={isAccessModeOpen}
              children={dropdownAccessModes.map((mode) => (
                <DropdownItem
                  key={mode}
                  onClick={() => {
                    dispatch({ type: setAccessMode, AccessMode: mode });
                    setIsAccessModeOpen(false);
                  }}
                >
                  {mode}
                </DropdownItem>
              ))}
            />

          </FormGroup>

          <NfsFormTextInput
            field="server"
            label="Server"
            onChange={(value) => dispatch({ type: setServer, server: value })}
            onError={() => dispatch({ type: setError, message: state.serverError })}
            placeholder='vs-nas-omer'
            value={state.server}
            hint='The hostname or IP address of the NFS server'
            error={state.serverError} />

          <Alert
            variant={AlertVariant.info}
            isInline
            title="Important"
            className="pf-u-mt-md"
          >
            For the PVC to work, you have to ask the provider (the team that
            supplied you with the volume) to export it to the cluster segment!
          </Alert>
        </Section>

        {state.error && (
          <Alert variant={AlertVariant.danger} isInline title="Error">
            {state.error}
          </Alert>
        )}

        <ActionGroup className="pf-c-form">
          <Button type="submit" variant="primary" isDisabled={state.progress}>
            {state.progress && <Spinner size="md" />} Create
          </Button>
          <Button onClick={() => navigate(-1)} type="button" variant="secondary">
            Cancel
          </Button>
        </ActionGroup>
      </Form>
    </div>
  );
};

export default CreateNfsPvc;
