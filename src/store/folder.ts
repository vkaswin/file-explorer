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
  Icon,
  Files,
} from "@/types/Folder";

const initialValue: Folder[] = [
  {
    id: "37375e14-e00f-4af0-9cb0-4caa5858a084",
    title: "src",
    path: "/src",
    files: [],
  },
  {
    id: "1723237d-4f5c-4417-bbdc-7ddf94dad885",
    title: "node_modules",
    path: "/node_modules",
    files: [],
  },
  {
    id: "42e69ea4-de9f-4ce7-ab36-4223a343733f",
    title: "store",
    path: "/store",
    files: [],
  },
  {
    id: "e2bc9c56-ba65-4ad7-bd52-1b3c2e50ed97",
    title: "components",
    path: "/src/components",
    files: [
      {
        id: "7153eec6-c1c9-40ac-8044-5a1c6f217b9a",
        title: "index.js",
        path: "/src/components/index.js",
      },
    ],
  },
  {
    id: "7c7f8484-01cc-410a-84c9-02e69deda4a4",
    title: "public",
    path: "/public",
    files: [
      {
        id: "21c1cfba-0938-44cb-b131-30d997a0da9b",
        title: "favicon.ico",
        path: "/public/favicon.ico",
      },
      {
        id: "ecf20273-8f16-4032-8c2a-1f89a1c2b548",
        title: "index.html",
        path: "/public/index.html",
      },
    ],
  },
  {
    id: "81926f68-5600-478b-89a6-e5072345ce73",
    title: "assets",
    path: "/src/assets",
    files: [],
  },
  {
    id: "b65e6490-3748-47ae-9616-d17da63eeff6",
    title: "scss",
    path: "/src/assets/scss",
    files: [
      {
        id: "bb987d93-173c-439f-b2bf-e421bbcc4e53",
        title: "index.html",
        path: "/src/assets/scss/index.scss",
      },
    ],
  },
  {
    id: "c9c0319b-f1c5-4684-9366-ae4207fdd01b",
    title: "images",
    path: "/public/assets/images",
    files: [
      {
        id: "bc08fe7c-531c-4850-a060-fd8f61432a2c",
        title: "logo.png",
        path: "/public/assets/images/logo.png",
      },
    ],
  },
  {
    files: [
      {
        id: "e4b120ff-5136-4d1f-a5cb-44b4ce32892c",
        title: "favicon.ico",
        path: "/dist/favicon.ico",
      },
      {
        id: "fc26a324-dbdd-4a57-9e5a-eda4c7d19fb5",
        title: "index.html",
        path: "/dist/index.html",
      },
    ],
    id: "9b170b3e-3588-4d09-be0c-1fa392652e89",
    title: "dist",
    path: "/dist",
  },
  {
    files: [],
    id: "d8cc68b6-de8e-433f-be26-33fbaa6c8cd7",
    title: "css",
    path: "/dist/css",
  },
  {
    files: [],
    id: "f0763a01-b47d-4129-bcf8-ec1a7992c9e3",
    title: "js",
    path: "/dist/js",
  },
  {
    files: [],
    id: "89c917ae-9c7a-41ee-9952-8c9965421947",
    title: "img",
    path: "/dist/img",
  },
  {
    files: [],
    id: "2532043f-71ae-4a1c-ae04-bff3361b7946",
    title: "fonts",
    path: "/dist/fonts",
  },
  {
    id: "706c8792-6e41-4785-930e-50d9b678edb3",
    path: "/",
    title: "",
    files: [
      {
        id: "9496cc8a-43e5-40c4-8c25-2d75b0cd7b04",
        path: "/README.md",
        title: "README.md",
      },
      {
        id: "39f1657c-c48e-490e-8c29-1c80ddd2042c",
        path: "/package.json",
        title: "package.json",
      },
      {
        id: "a25e7ab8-b402-416e-b7da-9c0f66342f92",
        path: "/package-lock.json",
        title: "package-lock.json",
      },
      {
        id: "5bf9c145-3d8a-4c31-853d-9eed9a25667a",
        path: "/.gitignore",
        title: ".gitignore",
      },
    ],
  },
];

const setFolders = (folders: Folder[]) => {
  localStorage.setItem("folders", JSON.stringify(folders));
};

const setExpandedFolderIds = (expandedFolderIds: string[]) => {
  localStorage.setItem("expandedFolderIds", JSON.stringify(expandedFolderIds));
};

const setSelectedId = (id: string) => {
  localStorage.setItem("selectedId", id);
};

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

const groupFoldersByPath: GroupFoldersByPath = (folders) => {
  let rootFolders: Folder[] = [];
  let subFolders: Folder[] = [];
  let rootFiles: Folder | undefined;

  for (const folder of folders) {
    if (folder.title.length === 0 && folder.path === "/") {
      folder.files.sort(sortFunction);
      rootFiles = folder;
    } else {
      folder.path.substring(1).includes("/")
        ? subFolders.push(folder)
        : rootFolders.push(folder);
    }
  }

  subFolders.sort((a, b) =>
    a.path.split("/").length > b.path.split("/").length ? 1 : -1
  );

  for (let folder of subFolders) {
    let rootFolder = getRootFolder(folder.path, rootFolders);
    if (!rootFolder) continue;
    addSubFolder(folder, rootFolder);
  }

  rootFolders.sort(sortFunction);

  for (let folder of rootFolders) {
    folder.files.sort(sortFunction);
  }

  for (let i = 0; i < rootFolders.length; i++) {
    let rootFolder = rootFolders[i];
    rootFolders[i] = sortSubFoldersAndFiles(rootFolder);
  }

  rootFiles && rootFolders.push(rootFiles);

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

  rootFolder.subFolders.sort(sortFunction);

  for (let i = 0; i < rootFolder.subFolders.length; i++) {
    let subFolders = rootFolder.subFolders[i];
    subFolders.files.sort(sortFunction);
    rootFolder.subFolders[i] = sortSubFoldersAndFiles(subFolders);
  }

  return rootFolder;
};

const generateRandomId = (folders: Folder[]): string => {
  let uuid = crypto.randomUUID();
  let isExist = false;
  for (let { id, files } of folders) {
    if (id === uuid || files.findIndex(({ id }) => id === uuid) !== -1) {
      isExist = true;
      break;
    }
  }
  return isExist ? generateRandomId(folders) : uuid;
};

export const useFolder = defineStore("folder", {
  state: (): FolderState => {
    return {
      folders: [],
      expandedFolderIds: [],
      selectedId: null,
      renameId: null,
      addType: null,
      renameType: null,
      title: "",
      renameTitle: "",
      hover: false,
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
    };
  },
  getters: {
    foldersList: (state): Folder[] => {
      let folders = JSON.parse(JSON.stringify(state.folders));
      return groupFoldersByPath(folders);
    },
    selectedFolder: (state): Folder | undefined => {
      if (!state.selectedId) return;
      return state.folders.find(
        ({ id, files }) =>
          id === state.selectedId ||
          files.findIndex((file) => file.id === state.selectedId) !== -1
      );
    },
    existingFolders: (state): string[] => {
      if (!state.selectedId && !state.renameId) return [];
      let folder = state.folders.find(
        ({ id }) => id === (state.renameId || state.selectedId)
      );
      if (!folder) return [];
      let folderPath: string;
      folderPath = folder.path;
      if (state.renameId) {
        let keys = folder.path.split("/");
        keys.pop();
        folderPath = keys.join("/");
      }
      return state.folders
        .filter(
          ({ path }) =>
            path !== folderPath &&
            path !== folder!.path &&
            path.startsWith(folderPath) &&
            !path.substring(folderPath.length + 1).includes("/")
        )
        .map(({ title }) => title.toLocaleLowerCase());
    },
    existingFiles: (state): string[] => {
      let folder = state.folders.find(
        ({ files }) =>
          files.findIndex(
            (file) =>
              file.id === (state.addType ? state.selectedId : state.renameId)
          ) !== -1
      );
      if (!folder) return [];
      return folder.files
        .map(({ id, title }) =>
          id === state.renameId ? "" : title.toLocaleLowerCase()
        )
        .filter(Boolean);
    },
  },
  actions: {
    createFolder() {
      let folder: Folder = {
        files: [],
        id: generateRandomId(this.folders),
        title: this.title,
        path: this.selectedFolder
          ? `${this.selectedFolder.path}/${this.title}`
          : `/${this.title}`,
      };
      this.folders.push(folder);
      this.toggleAddIcon();
      setFolders(this.folders);
    },
    createFile() {
      let file: Files = {
        id: generateRandomId(this.folders),
        title: this.title,
        path: this.selectedFolder
          ? `${this.selectedFolder.path}/${this.title}`
          : `/${this.title}`,
      };
      let index = this.folders.findIndex(({ id, path }) =>
        this.selectedFolder ? id === this.selectedFolder.id : path === "/"
      );
      if (index === -1) return;
      this.folders[index].files.push(file);
      this.toggleAddIcon();
      setFolders(this.folders);
    },
    renameFolder(folderId: string) {
      let selectedFolder = this.folders.find(({ id }) => id === folderId);
      if (!selectedFolder) return;
      for (let folder of this.folders) {
        if (folder.path.startsWith(selectedFolder.path)) {
          let path = selectedFolder.path.split("/");
          let title = this.renameTitle;
          path.splice(path.length - 1, 1, title);
          folder.path = path.join("/");
          folder.title = title;
          folder.files.forEach((file) => {
            let filePath = file.path.split("/");
            filePath.splice(filePath.length - 2, 1, title);
            file.path = filePath.join("/");
          });
        }
      }
      this.clearRename();
      setFolders(this.folders);
    },
    renameFile(folderId: string, fileId: string) {
      let selectedFolder = this.folders.find(({ id }) => id === folderId);
      if (!selectedFolder) return;
      let selectedFile = selectedFolder.files.find(({ id }) => id === fileId);
      if (!selectedFile) return;
      let keys = selectedFile.path.split("/");
      keys.pop();
      selectedFile.path = `${keys.join("/")}/${this.renameTitle}`;
      selectedFile.title = this.renameTitle;
      this.setSelectedId(selectedFile.id);
      this.clearRename();
      setFolders(this.folders);
    },
    deleteFolder(folderId: string) {
      let folder = this.folders.find(({ id }) => id === folderId);
      if (!folder) return;
      let folders = this.folders.filter(
        ({ path }) => !path.startsWith(folder!.path)
      );
      this.folders = folders;
      setFolders(this.folders);
    },
    deleteFile(folderId: string, fileId: string) {
      let index = this.folders.findIndex(({ id }) => id === folderId);
      if (index === -1) return;
      let files = this.folders[index].files;
      let fileIndex = files.findIndex(({ id }) => id === fileId);
      if (fileIndex === -1) return;
      files.splice(fileIndex, 1);
      setFolders(this.folders);
    },
    setSelectedId(id: string | null) {
      this.selectedId = id;
      setSelectedId(id ?? "");
    },
    toggleAddIcon(addType: Icon = null) {
      this.addType = addType;
      if (!addType) {
        this.title = "";
        this.error = null;
      } else {
        if (!this.selectedId) return;
        this.expandFolder(this.selectedId);
      }
    },
    toggleFolder(id: string) {
      let index = this.expandedFolderIds.indexOf(id);
      if (index === -1) {
        this.expandedFolderIds.push(id);
      } else {
        this.expandedFolderIds.splice(index, 1);
      }
      setExpandedFolderIds(this.expandedFolderIds);
    },
    expandFolder(id: string) {
      let isExist = this.expandedFolderIds.includes(id);
      if (!isExist) {
        this.expandedFolderIds.push(id);
        setExpandedFolderIds(this.expandedFolderIds);
      }
    },
    setDragSource(source: DragSource) {
      this.drag.source = source;
    },
    setDragDestination(destination: DragDestination) {
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
      this.resetDrag();
      setFolders(this.folders);
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
    setFolders(folders: Folder[]) {
      this.folders =
        Array.isArray(folders) && folders.length > 0 ? folders : initialValue;
      setFolders(this.folders);
    },
    setExpandedFolderIds(folderIds: string[]) {
      this.expandedFolderIds = folderIds;
      setExpandedFolderIds(this.expandedFolderIds);
    },
    setRenameId(
      renameType: Icon,
      folderId: string | null,
      fileId?: string | null
    ) {
      let renameId = folderId;
      let title: string;
      let selectedFolder = this.folders.find(({ id }) => id === folderId);
      if (!selectedFolder) return;
      title = selectedFolder.title;
      if (renameType === "file" && fileId) {
        let selectedFile = selectedFolder.files.find(({ id }) => id === fileId);
        if (!selectedFile) return;
        renameId = fileId;
        title = selectedFile.title;
      }
      this.renameTitle = title;
      this.renameType = renameType;
      this.renameId = renameId;
    },
    createFolderOrFile() {
      this.validateTitle();
      if (this.error !== null || this.addType === null) return;
      if (this.addType === "folder") {
        this.createFolder();
      } else {
        this.createFile();
      }
    },
    renameFolderOrFile(folderId: string, fileId?: string) {
      this.validateTitle();
      if (this.error !== null || this.renameType === null) return;
      if (this.renameType === "folder") {
        this.renameFolder(folderId);
      } else {
        if (!fileId) return;
        this.renameFile(folderId, fileId);
      }
    },
    validateTitle() {
      if (this.addType === null && this.renameType === null) return;
      let error: string | null = null;
      let type = this.addType ? this.addType : this.renameType;
      let title = this.addType ? this.title : this.renameTitle;
      if (title.length === 0) {
        error = `A ${
          type === "file" ? "File" : "Folder"
        } name must be provided`;
      } else {
        if (title === ".") {
          error = `The name <b>.</b> is not a valid as a file or folder name. So please choose different name.`;
        } else {
          let isExist =
            type === "file"
              ? this.existingFiles.includes(title.toLocaleLowerCase())
              : this.existingFolders.includes(title.toLocaleLowerCase());
          if (isExist) {
            error = `A ${
              type === "file" ? "File" : "Folder"
            } <b>${title}</b> already exists at this location. Please choose a different name`;
          } else {
            error = null;
          }
        }
      }
      this.error = error;
    },
    clearRename() {
      this.renameType = null;
      this.renameId = null;
      this.renameTitle = "";
    },
    setHover(value: boolean) {
      this.hover = value;
    },
  },
});
