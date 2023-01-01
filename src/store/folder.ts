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
  ActionType,
  Files,
} from "@/types/Folder";

const setFolders = (folders: Folder[]) => {
  localStorage.setItem("folders", JSON.stringify(folders));
};

const setExpandedFolderIds = (expandedFolderIds: string[]) => {
  localStorage.setItem("expandedFolderIds", JSON.stringify(expandedFolderIds));
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
      actionType: null,
      renameActionType: null,
      title: "",
      renameTitle: "",
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
      return state.folders.find(({ id }) => id === state.selectedId);
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
      let folder = state.folders.find(({ id, files }) =>
        state.actionType
          ? id === state.selectedId
          : files.findIndex((file) => file.id === state.renameId) !== -1
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
          : this.title,
      };
      let index = this.folders.findIndex(({ id }) => id === this.selectedId);
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
      this.selectedId = selectedFile.id;
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
    setSelectedId(id: string) {
      this.selectedId = id;
    },
    toggleAddIcon(actionType: ActionType = null) {
      this.actionType = actionType;
      if (!actionType) {
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
      this.folders = folders;
      setFolders(this.folders);
    },
    setExpandedFolderIds(folderIds: string[]) {
      this.expandedFolderIds = folderIds;
      setExpandedFolderIds(this.expandedFolderIds);
    },
    setRenameId(
      actionType: ActionType,
      folderId: string | null,
      fileId?: string | null
    ) {
      let renameId = folderId;
      let title: string;
      let selectedFolder = this.folders.find(({ id }) => id === folderId);
      if (!selectedFolder) return;
      title = selectedFolder.title;
      if (actionType === "file" && fileId) {
        let selectedFile = selectedFolder.files.find(({ id }) => id === fileId);
        if (!selectedFile) return;
        renameId = fileId;
        title = selectedFile.title;
      }
      this.renameTitle = title;
      this.renameActionType = actionType;
      this.renameId = renameId;
    },
    createFolderOrFile() {
      this.validateTitle();
      if (this.error !== null || this.actionType === null) return;
      if (this.actionType === "folder") {
        this.createFolder();
      } else {
        this.createFile();
      }
    },
    renameFolderOrFile(folderId: string, fileId?: string) {
      this.validateTitle();
      if (this.error !== null || this.renameActionType === null) return;
      if (this.renameActionType === "folder") {
        this.renameFolder(folderId);
      } else {
        if (!fileId) return;
        this.renameFile(folderId, fileId);
      }
    },
    validateTitle() {
      if (this.actionType === null && this.renameActionType === null) return;
      let error: string | null = null;
      let title = this.actionType ? this.title : this.renameTitle;
      if (title.length === 0) {
        error = `A ${
          this.actionType === "file" ? "File" : "Folder"
        } name must be provided`;
      } else {
        if (title === ".") {
          error = `The name <b>.</b> is not a valid as a file or folder name. So please choose different name.`;
        } else {
          let isExist =
            this.actionType === "file" || this.renameActionType === "file"
              ? this.existingFiles.includes(title.toLocaleLowerCase())
              : this.existingFolders.includes(title.toLocaleLowerCase());
          if (isExist) {
            error = `A ${
              this.actionType === "file" ? "File" : "Folder"
            } <b>${title}</b> already exists at this location. Please choose a different name`;
          } else {
            error = null;
          }
        }
      }
      this.error = error;
    },
    clearRename() {
      this.renameActionType = null;
      this.renameId = null;
      this.renameTitle = "";
    },
  },
});
