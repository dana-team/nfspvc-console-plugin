# OpenShift Console Plugin for nfsPVC Resources

This project is an OpenShift Console dynamic plugin that extends the OpenShift UI with features to manage [`nfspvc.dana.io` resources](https://github.com/dana-team/nfspvc-operator). The plugin introduces a new section in the UI called `Storage Automations`, where users can view a list of existing `NFSPVCs` and create new ones via a form.

## Features

- New dashboard section: Adds a new section in the dashboard called `Storage Automations`.
- `nfsPVC` list view: Displays a list of existing `nfsPVC` resources with details such as `name`, `namespace`, `size`, `server`, `creation timestamp`, and `phases` (`pvPhase` and `pvcPhase`).
- `nfsPVC` creation form: Provides a form to create new `nfsPVC` resources.
- Sorting and searching: Ability to sort `nfsPVCs` by different columns and search by name.

### Development

You can run the plugin using a local development environment or build an image to deploy it to a cluster.

#### Option 1: Local Development

In one terminal window, run:

1. `yarn install`
2. `yarn run start`

In another terminal window, run:

1. `oc login` (requires [oc CLI](https://console.redhat.com/openshift/downloads) and access to an [OpenShift cluster](https://console.redhat.com/openshift/create))
2. `yarn run start-console` (requires [Docker](https://www.docker.com) or [Podman 3.2.0+](https://podman.io))

This will run the OpenShift console in a container connected to the cluster you've logged into. The plugin HTTP server runs on port 9001 with CORS enabled. Navigate to <http://localhost:9000/k8s/ns/default/nfspvc.dana.io~v1alpha1~NfsPvc> to see the running plugin.

#### Option 2: Docker + VSCode Remote Container

You can use Docker Compose with VSCode Remote Containers for easy development. Set up the environment variables in a `.dev.env` file:

```bash
OC_PLUGIN_NAME=nfspvc-plugin
OC_URL=https://api.example.com:6443
OC_USER=kubeadmin
OC_PASS=<password>
```

Open the folder in a remote container (`Ctrl+Shift+P` -> `Remote Containers: Open Folder in Container...`) and run:

```bash
yarn run start
```

Then navigate to <http://localhost:9000/k8s/ns/default/nfspvc.dana.io~v1alpha1~NfsPvc>.

## Plugin Deployment

### Build the Plugin Image

To deploy the plugin to an OpenShift cluster, build and push the Docker image to an image registry.

1. Build the image:

   ```sh
   docker build -t ghcr.io/dana-team/nfspvc-plugin:latest .
   ```

2. Push the image to the registry:

   ```sh
   docker push ghcr.io/dana-team/nfspvc-plugin:latest
   ```

### Deploy on OpenShift

A [Helm](https://helm.sh) chart is available to deploy the plugin to an OpenShift environment. The following Helm parameters are required:

- `plugin.image`: The location of the image containing the plugin.

Install the chart:

```bash
helm upgrade -i nfspvc-plugin charts/openshift-console-plugin -n nfspvc-plugin --create-namespace --set plugin.image=ghcr.io/dana-team/nfspvc-plugin:latest
```

Uninstall the chart:
```bash
helm uninstall nfspvc-plugin -n nfspvc-plugin
```

If deploying on OpenShift 4.10, add `--set plugin.securityContext.enabled=false` to omit Pod Security settings.

## Linting and Formatting

This project uses `prettier`, `eslint`, and `stylelint` for linting and formatting. To run linting checks:

```bash
yarn run lint
```

## References

- [OpenShift Console Plugin SDK](https://github.com/openshift/console/tree/master/frontend/packages/console-dynamic-plugin-sdk)
- [Dynamic Plugin Proposal](https://github.com/openshift/enhancements/blob/master/enhancements/console/dynamic-plugins.md)
