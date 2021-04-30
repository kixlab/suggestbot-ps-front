# Crowdsourcing Task Frontend for Collecting Annotations on Psychological Safety

This repository contains a frontend interface for crowdsourcing annotations on the utterances that would affect the psychological safety of the group. This interface should be used with the [backend](https://github.com/kixlab/suggestbot-ps-backend).

The specific explanation of the task could be found in the interface by accessing ```/Tutorial``` after running the dev server.

## Project setup

### 1) Install the dependencies

```bash
npm install
```

### 2) Set up API server address

Create an .env.local file with VUE_APP_API_URL variable holding the address of the API server.

### 3) Compile
  
Use the appropriate command for compiling.

#### Compiles and hot-reloads for development

```bash
npm run serve
```

#### Compiles and minifies for production

```bash
npm run build
```

### 4) Start the task

The task could be started by accessing ```/start/{dataset_id}/{timestamp_start}```, where ```dataset_id``` is the name of the dataset set up in the backend server and ```timestamp_start``` is the timestamp where the annotation would be started.

For random assignments, ```/begin/{datasets}``` endpoint could be used, where ```datasets``` is the name of the set of the datasets declared in ```views/Login.vue```.

## Customization

To re-purpose the task to collect other types of annotation on conversation logs, you need to edit the following files:

- MomentBox.vue
  - It contains the actual prompt for the crowd workers, as well as the AJAX calls to the backend.
- Scenario.vue
  - It contains the instructions for the workers.

Other pages and components may need appropriate edits to change the purpose of the task.
