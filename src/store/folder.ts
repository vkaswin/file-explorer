import { defineStore } from "pinia";
import {
  AddSubFolder,
  Folder,
  FolderState,
  GetRootFolder,
  GroupFoldersByPath,
  SortFunction,
  DragSource,
  DragDestination,
  AddType,
  Files,
} from "@/types/Folder";

export const useFolder = defineStore("folder", {
  state: (): FolderState => {
    return {
      selectedId: null,
      addType: null,
      title: "",
      error: null,
      drag: {
        source: {
          folderId: null,
          type: null,
          fileId: null,
        },
        destination: {
          folderId: null,
        },
      },
      expandedFolders: [
        // "e0424902-6937-4741-aff9-02fffae995aa",
        // "fc5c2979-b629-4498-bf00-91e4087080ef",
        // "b3c4da9e-7283-464f-9eda-f864aa46f9a5",
        // "6154f081-fadd-465f-8d15-83fad5375761",
        // "653e7dd0-bd0c-4fc7-8f9c-696cd2c896c0",
        // "af36c726-6ace-4fd9-b06c-1ce6fcba4d71",
        // "213eacc6-6d95-48fb-85eb-01d400a58824",
      ],
      folders: [
        {
          id: "b3c4da9e-7283-464f-9eda-f864aa46f9a5",
          title: "src",
          path: "/src",
          files: [
            {
              id: "3073d697-6817-44fc-95e7-d66af0f73cb8",
              title: "index.js",
              path: "/src/index.js",
            },
          ],
        },
        {
          id: "61f32cf3-a1af-4988-88f2-822b2d64ca84",
          title: "node_modules",
          path: "/node_modules",
          files: [],
        },
        {
          id: "25c360ae-31ff-448b-9db0-534987479620",
          title: "store",
          path: "/store",
          files: [],
        },
        {
          id: "7d00ece0-b901-49cc-8f41-65155dba8e32",
          title: "helper",
          path: "/helper",
          files: [],
        },
        {
          id: "27e16e88-2a39-44a6-99af-8716c93d73c7",
          title: "components",
          path: "/components",
          files: [],
        },
        {
          id: "276ba48f-376d-4297-8072-78260b2374c4",
          title: "dist",
          path: "/dist",
          files: [],
        },
        {
          id: "83fa358d-e095-4e1a-959c-6cf66f9275ee",
          title: "types",
          path: "/types",
          files: [],
        },
        {
          id: "e0424902-6937-4741-aff9-02fffae995aa",
          title: "public",
          path: "/public",
          files: [
            {
              id: "c463b87d-41f1-4a77-b3df-b912ae611728",
              title: "index.html",
              path: "/public/index.html",
            },
            {
              id: "452d6baa-6f82-4b61-ba0a-6aa01c9ca6b6",
              title: "favicon.ico",
              path: "/public/favicon.ico",
            },
          ],
        },
        {
          id: "fc5c2979-b629-4498-bf00-91e4087080ef",
          title: "assets",
          path: "/public/assets",
          files: [
            {
              id: "eead45bb-7572-4f35-88b1-8463ba999dc3",
              title: "index.html",
              path: "/public/assets/index.html",
            },
            {
              id: "4818f99a-851c-4770-a113-8af8ddd24fca",
              title: "favicon.ico",
              path: "/public/assets/favicon.ico",
            },
          ],
        },
        {
          id: "473bcb03-4386-418d-b67f-52741ef4e091",
          title: "images",
          path: "/public/assets/images",
          files: [
            {
              id: "2ed78f6a-332f-48fb-bbba-6f14f8f365a6",
              title: "index.html",
              path: "/public/assets/images/index.html",
            },
            {
              id: "a56606d5-de15-4581-8d6d-fe787194b7f1",
              title: "favicon.ico",
              path: "/public/assets/images/favicon.ico",
            },
          ],
        },
        {
          id: "40c7cc9e-9726-40b4-a9b4-94f3ff45fcde",
          title: "js",
          path: "/public/assets/js",
          files: [
            {
              id: "c269b914-1f96-46d3-afb9-3bb3d254c55f",
              title: "index.html",
              path: "/public/assets/js/index.html",
            },
            {
              id: "3134f022-a0a5-4d6a-b449-b1268d49ef8d",
              title: "favicon.ico",
              path: "/public/assets/js/favicon.ico",
            },
          ],
        },
        {
          id: "6181c0b2-dfc7-4f32-9c10-e8643280a17d",
          title: "html",
          path: "/public/html",
          files: [
            {
              id: "bc58ced9-c769-4192-9f48-1c25eb6e0a51",
              title: "index.html",
              path: "/public/html/index.html",
            },
            {
              id: "81b0f8f8-1998-4d75-bed3-76df1c90e561",
              title: "favicon.ico",
              path: "/public/html/favicon.ico",
            },
          ],
        },
        {
          id: "653e7dd0-bd0c-4fc7-8f9c-696cd2c896c0",
          title: "Hello",
          path: "/src/Test/Demo/Hello",
          files: [
            {
              id: "ddba8c63-2f4c-44df-81be-ef5b4d99089c",
              title: "style.scss",
              path: "/src/Test/Demo/Hello/style.scss",
            },
            {
              id: "4e9e5378-f121-416c-90f2-a054f027732b",
              title: "hello.js",
              path: "/src/Test/Demo/Hello/hello.js",
            },
            {
              id: "fd0e5020-ad96-432d-a9be-350bcc09f5e1",
              title: "index.js",
              path: "/src/Test/Demo/Hello/index.js",
            },
          ],
        },
        {
          id: "591f6298-a01f-47c1-ab66-60452b3eb811",
          title: "World",
          path: "/src/World",
          files: [
            {
              id: "6efa36fb-6957-43a8-b01a-d0e1e92edfea",
              title: "hello.js",
              path: "/src/World/hello.js",
            },
            {
              id: "e08edf84-ffbf-4456-99d4-8b93791ed880",
              title: "index.js",
              path: "/src/World/index.js",
            },
          ],
        },
        {
          id: "0c670ad6-fa04-4497-8401-fa9a6e40a105",
          title: "Bye",
          path: "/src/Test/Demo/Hello/Bye",
          files: [
            {
              id: "7bb481d4-d5d9-4594-af92-58285e5c29c7",
              title: "hello.js",
              path: "/src/Test/Demo/Hello/hello.js",
            },
            {
              id: "05c451a5-d7c9-4064-aa40-d418db2bc3d8",
              title: "index.js",
              path: "/src/Test/Demo/Hello/index.js",
            },
          ],
        },
        {
          id: "fd1073d6-44ae-432e-b573-793a5d7d7e9b",
          title: "World",
          path: "/src/Test/Demo/World",
          files: [
            {
              id: "92a06beb-f645-4e3d-a51c-00dda5db4f15",
              title: "hello.js",
              path: "/src/Test/Demo/World/hello.js",
            },
            {
              id: "7858bd37-38ec-4991-ac3c-a951f9bb1fc1",
              title: "index.js",
              path: "/src/Test/Demo/World/index.js",
            },
          ],
        },
        {
          id: "ff9c5ab4-286f-49d8-a68d-c24e0a71afba",
          title: "Demo",
          path: "/src/World/Demo",
          files: [
            {
              id: "356f4af8-78f5-4c31-949c-7998d0ff5c99",
              title: "hello.js",
              path: "/src/World/Demo/hello.js",
            },
            {
              id: "cc8692a3-a495-42df-9215-c6e3bc257d13",
              title: "index.js",
              path: "/src/World/Demo/index.js",
            },
          ],
        },
        {
          id: "213eacc6-6d95-48fb-85eb-01d400a58824",
          title: "Test",
          path: "/src/Test",
          files: [
            {
              id: "ecad693a-2e2e-410a-84f6-f1dfab6fd498",
              title: "test.js",
              path: "/src/Test/test.js",
            },
          ],
        },
        {
          id: "af36c726-6ace-4fd9-b06c-1ce6fcba4d71",
          title: "Demo",
          path: "/src/Test/Demo",
          files: [
            {
              id: "a1d1f16f-2555-4a82-83b2-5b4244e6af11",
              title: "demo.js",
              path: "/src/Test/Demo/demo.js",
            },
            {
              id: "468accb5-8206-4370-b1be-1d6c04319094",
              title: "index.js",
              path: "/src/Test/Demo/index.js",
            },
          ],
        },
        {
          id: "a1047287-5234-4f66-946e-c5a228fd1b34",
          title: "utils",
          path: "/utils",
          files: [
            {
              id: "8671f632-5be6-4902-8358-8739b4aa2730",
              title: "index.js",
              path: "/utils/index.js",
            },
          ],
        },
        {
          id: "a50a417d-d32a-4978-83ce-e9aef61ee7c2",
          title: "cookies",
          path: "/utils/cookies",
          files: [
            {
              id: "688dda02-fd73-43f6-9f99-504af5b75b2f",
              title: "index.js",
              path: "/utils/cookies/index.js",
            },
          ],
        },
        {
          id: "6154f081-fadd-465f-8d15-83fad5375761",
          title: "helper",
          path: "/src/Helper",
          files: [
            {
              id: "7abccdc0-eb77-4efa-bde4-0440c2a9c11f",
              title: "util.js",
              path: "/src/helper/util.js",
            },
            {
              id: "88b56e18-31e7-441d-8356-7172f3271960",
              title: "demo.js",
              path: "/src/helper/demo.js",
            },
            {
              id: "bf1599dc-b36a-4e7d-9ebc-5d87581b1ac5",
              title: "service.js",
              path: "/src/helper/service.js",
            },
          ],
        },
      ],
    };
  },
  getters: {
    foldersList: (state): Folder[] => {
      let folders = JSON.parse(JSON.stringify(state.folders));
      return groupFoldersByPath(folders);
    },
    selectedFolder: (state): Folder | undefined => {
      if (!state.selectedId) return;
      return state.folders.find(({ id }) => id === state.selectedId);
    },
    existingFolders: (state): string[] => {
      if (!state.selectedId) return [];
      let folder = state.folders.find(({ id }) => id === state.selectedId);
      if (!folder) return [];
      return state.folders
        .filter(
          ({ path }) =>
            path !== folder!.path &&
            path.startsWith(folder!.path) &&
            !path.substring(folder!.path.length + 1).includes("/")
        )
        .map(({ title }) => title.toLocaleLowerCase());
    },
    existingFiles: (state): string[] => {
      if (!state.selectedId) return [];
      let folder = state.folders.find(({ id }) => id === state.selectedId);
      if (!folder) return [];
      return folder.files.map(({ title }) => title.toLocaleLowerCase());
    },
  },
  actions: {
    createFolder() {
      if (this.error !== null) return;
      let folder: Folder = {
        files: [],
        id: crypto.randomUUID(),
        title: this.title,
        path: this.selectedFolder
          ? `${this.selectedFolder.path}/${this.title}`
          : `/${this.title}`,
      };
      this.folders.push(folder);
      this.toggleAddIcon();
    },
    createFile() {
      if (this.error !== null) return;
      let file: Files = {
        id: crypto.randomUUID(),
        title: this.title,
        path: this.selectedFolder
          ? `${this.selectedFolder.path}/${this.title}`
          : this.title,
      };
      let index = this.folders.findIndex(({ id }) => id === this.selectedId);
      if (index === -1) return;
      this.folders[index].files.push(file);
      this.toggleAddIcon();
    },
    updateFolder(folderId: string, folder: Folder) {
      let folders = this.folders;
      let index = folders.findIndex(({ id }) => id === folderId);
      let subFolders = folders[index].subFolders;
      if (Array.isArray(subFolders)) {
        subFolders.push(folder);
      } else {
        subFolders = [folder];
      }
    },
    deleteFolder(folderId: string) {
      let folders = this.folders;
      let index = folders.findIndex(({ id }) => id === folderId);
      folders.splice(index, 1);
    },
    updateSelectedId(id: string) {
      this.selectedId = id;
    },
    toggleAddIcon(type: AddType = null) {
      this.addType = type;
      if (!type) {
        this.title = "";
        this.error = null;
      } else {
        if (!this.selectedId) return;
        this.addFolderId(this.selectedId);
      }
    },
    setError(value: string | null = null) {
      this.error = value;
    },
    toggleFolder(id: string) {
      let index = this.expandedFolders.indexOf(id);
      if (index === -1) {
        this.expandedFolders.push(id);
      } else {
        this.expandedFolders.splice(index, 1);
      }
    },
    addFolderId(id: string) {
      let isExist = this.expandedFolders.includes(id);
      if (!isExist) this.expandedFolders.push(id);
    },
    updateDragSource(source: DragSource) {
      this.drag.source = source;
    },
    updateDragDestination(destination: DragDestination) {
      this.drag.destination = destination;
    },
    handleDrop() {
      let { source, destination } = this.drag;
      let sourceFolder: Folder | undefined,
        destinationFoler: Folder | undefined;

      for (let folder of this.folders) {
        if (!sourceFolder && folder.id === source.folderId) {
          sourceFolder = folder;
        } else if (!destinationFoler && folder.id === destination.folderId) {
          destinationFoler = folder;
        } else if (sourceFolder && destinationFoler) break;
      }
      if (!sourceFolder || !destinationFoler) return;

      if (source.type === "file") {
        let index = sourceFolder.files.findIndex(
          ({ id }) => id === source.fileId
        );
        if (index === -1) return;
        let file = { ...sourceFolder.files[index] };
        file.path = `${destinationFoler.path}/${file.title}`;
        sourceFolder.files.splice(index, 1);
        destinationFoler.files.push(file);
      } else {
        let path = sourceFolder.path;
        let title = sourceFolder.title;
        for (let folder of this.folders) {
          if (folder.path.startsWith(path)) {
            folder.path = folder.path.replace(
              path,
              `${destinationFoler.path}/${title}`
            );
          }
        }
      }
      this.addFolderId(destinationFoler.id);
      this.resetDrag();
    },
    resetDrag() {
      this.drag = {
        source: {
          folderId: null,
          type: null,
          fileId: null,
        },
        destination: {
          folderId: null,
        },
      };
    },
  },
});

const addSubFolder: AddSubFolder = (folder, rootFolder) => {
  let folderPath = folder.path.split("/");
  folderPath.pop();
  let path = folderPath.join("/");

  if (rootFolder.path === path) {
    if (rootFolder.subFolders) {
      rootFolder.subFolders.push(folder);
    } else {
      rootFolder.subFolders = [folder];
    }
    return;
  }

  if (!Array.isArray(rootFolder.subFolders)) return;

  let subFolder = rootFolder.subFolders.find((folder) => {
    return path.startsWith(folder.path);
  });

  if (!subFolder) return;

  addSubFolder(folder, subFolder);
};

const getRootFolder: GetRootFolder = (path, rootFolders) => {
  let folder = rootFolders.find(
    (folder) => folder.path.substring(1) === path.substring(1).split("/")[0]
  );
  return folder;
};

export const groupFoldersByPath: GroupFoldersByPath = (folders) => {
  let rootFolders: Folder[] = [];
  let subFolders: Folder[] = [];

  for (const folder of folders) {
    folder.path.substring(1).includes("/")
      ? subFolders.push(folder)
      : rootFolders.push(folder);
  }

  subFolders = subFolders.sort((a, b) =>
    a.path.split("/").length > b.path.split("/").length ? 1 : -1
  );

  for (let folder of subFolders) {
    let rootFolder = getRootFolder(folder.path, rootFolders);
    if (!rootFolder) continue;
    addSubFolder(folder, rootFolder);
  }

  rootFolders = rootFolders.sort(sortFunction);

  for (let folder of rootFolders) {
    folder.files = folder.files.sort(sortFunction);
  }

  for (let i = 0; i < rootFolders.length; i++) {
    let rootFolder = rootFolders[i];
    rootFolders[i] = sortSubFoldersAndFiles(rootFolder);
  }

  return rootFolders;
};

const sortFunction: SortFunction = (a, b) =>
  a.title.toLocaleLowerCase().localeCompare(b.title.toLocaleLowerCase());

const sortSubFoldersAndFiles = (rootFolder: Folder): Folder => {
  if (
    !Array.isArray(rootFolder.subFolders) ||
    rootFolder.subFolders.length === 0
  )
    return rootFolder;

  rootFolder.subFolders = rootFolder.subFolders.sort(sortFunction);

  for (let i = 0; i < rootFolder.subFolders.length; i++) {
    let subFolders = rootFolder.subFolders[i];
    subFolders.files = subFolders.files.sort(sortFunction);
    rootFolder.subFolders[i] = sortSubFoldersAndFiles(subFolders);
  }
  return rootFolder;
};
