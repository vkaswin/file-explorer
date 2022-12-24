import { defineStore } from "pinia";

type Files = {
  id: string;
  title: string;
  path: string;
};

type Folder = {
  id: string;
  title: string;
  path: string;
  files: Files[];
  subFolders?: Folder[];
};

type State = {
  folders: Folder[];
};

declare global {
  interface Crypto {
    randomUUID: () => string;
  }
}

const addSubFolder = (folder: Folder, rootFolder: Folder): void => {
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

const getRootFolder = (
  path: string,
  rootFolders: Folder[]
): Folder | undefined => {
  let folder = rootFolders.find(
    (folder) => folder.path.substring(1) === path.substring(1).split("/")[0]
  );
  return folder;
};

const groupFoldersByPath = (folders: Folder[]): Folder[] => {
  let rootFolders: Folder[] = [];
  let subFolders: Folder[] = [];

  for (const folder of folders) {
    folder.path.substring(1).includes("/")
      ? subFolders.push(folder)
      : rootFolders.push(folder);
  }

  rootFolders = rootFolders.sort((a, b) =>
    a.title.toLocaleLowerCase().localeCompare(b.title.toLocaleLowerCase())
  );

  subFolders = subFolders.sort((a, b) =>
    a.path.split("/").length > b.path.split("/").length ? 1 : -1
  );

  for (let folder of subFolders) {
    let rootFolder = getRootFolder(folder.path, rootFolders);
    if (!rootFolder) continue;
    addSubFolder(folder, rootFolder);
  }

  return rootFolders;
};

export const useStore = defineStore("store", {
  state: (): State => {
    return {
      folders: [
        {
          id: crypto.randomUUID(),
          title: "src",
          path: "/src",
          files: [
            {
              id: crypto.randomUUID(),
              title: "index.js",
              path: "/src/index.js",
            },
          ],
        },
        {
          id: crypto.randomUUID(),
          title: "public",
          path: "/public",
          files: [
            {
              id: crypto.randomUUID(),
              title: "index.html",
              path: "/public/index.html",
            },
            {
              id: crypto.randomUUID(),
              title: "favicon.ico",
              path: "/public/favicon.ico",
            },
          ],
        },
        {
          id: crypto.randomUUID(),
          title: "assets",
          path: "/public/assets",
          files: [
            {
              id: crypto.randomUUID(),
              title: "index.html",
              path: "/public/index.html",
            },
            {
              id: crypto.randomUUID(),
              title: "favicon.ico",
              path: "/public/favicon.ico",
            },
          ],
        },
        {
          id: crypto.randomUUID(),
          title: "images",
          path: "/public/assets/images",
          files: [
            {
              id: crypto.randomUUID(),
              title: "index.html",
              path: "/public/index.html",
            },
            {
              id: crypto.randomUUID(),
              title: "favicon.ico",
              path: "/public/favicon.ico",
            },
          ],
        },
        {
          id: crypto.randomUUID(),
          title: "js",
          path: "/public/assets/js",
          files: [
            {
              id: crypto.randomUUID(),
              title: "index.html",
              path: "/public/index.html",
            },
            {
              id: crypto.randomUUID(),
              title: "favicon.ico",
              path: "/public/favicon.ico",
            },
          ],
        },
        {
          id: crypto.randomUUID(),
          title: "html",
          path: "/public/html",
          files: [
            {
              id: crypto.randomUUID(),
              title: "index.html",
              path: "/public/index.html",
            },
            {
              id: crypto.randomUUID(),
              title: "favicon.ico",
              path: "/public/favicon.ico",
            },
          ],
        },
        {
          id: crypto.randomUUID(),
          title: "Hello",
          path: "/src/Test/Demo/Hello",
          files: [
            {
              id: crypto.randomUUID(),
              title: "hello.js",
              path: "/src/Test/Demo/Hello/hello.js",
            },
            {
              id: crypto.randomUUID(),
              title: "index.js",
              path: "/src/Test/Demo/Hello/index.js",
            },
          ],
        },
        {
          id: crypto.randomUUID(),
          title: "World",
          path: "/src/World",
          files: [
            {
              id: crypto.randomUUID(),
              title: "hello.js",
              path: "/src/World/Demo/hello.js",
            },
            {
              id: crypto.randomUUID(),
              title: "index.js",
              path: "/src/World/Demo/index.js",
            },
          ],
        },
        {
          id: crypto.randomUUID(),
          title: "Hello",
          path: "/src/Test/Demo/Hello/Bye",
          files: [
            {
              id: crypto.randomUUID(),
              title: "hello.js",
              path: "/src/World/Demo/hello.js",
            },
            {
              id: crypto.randomUUID(),
              title: "index.js",
              path: "/src/World/Demo/index.js",
            },
          ],
        },
        {
          id: crypto.randomUUID(),
          title: "Hello",
          path: "/src/Test/Demo/World",
          files: [
            {
              id: crypto.randomUUID(),
              title: "hello.js",
              path: "/src/World/Demo/hello.js",
            },
            {
              id: crypto.randomUUID(),
              title: "index.js",
              path: "/src/World/Demo/index.js",
            },
          ],
        },
        {
          id: crypto.randomUUID(),
          title: "Hello",
          path: "/src/World/Demo",
          files: [
            {
              id: crypto.randomUUID(),
              title: "hello.js",
              path: "/src/World/Demo/hello.js",
            },
            {
              id: crypto.randomUUID(),
              title: "index.js",
              path: "/src/World/Demo/index.js",
            },
          ],
        },
        {
          id: crypto.randomUUID(),
          title: "Test",
          path: "/src/Test",
          files: [
            {
              id: crypto.randomUUID(),
              title: "test.js",
              path: "/src/Test/test.js",
            },
          ],
        },
        {
          id: crypto.randomUUID(),
          title: "Helper",
          path: "/src/Helper",
          files: [
            {
              id: crypto.randomUUID(),
              title: "util.js",
              path: "/src/Helper/util.js",
            },
            {
              id: crypto.randomUUID(),
              title: "demo.js",
              path: "/src/Helper/demo.js",
            },
            {
              id: crypto.randomUUID(),
              title: "service.js",
              path: "/src/Helper/service.js",
            },
          ],
        },
        {
          id: crypto.randomUUID(),
          title: "Demo",
          path: "/src/Test/Demo",
          files: [
            {
              id: crypto.randomUUID(),
              title: "demo.js",
              path: "/src/Test/Demo/demo.js",
            },
            {
              id: crypto.randomUUID(),
              title: "index.js",
              path: "/src/Test/Demo/index.js",
            },
          ],
        },
        {
          id: crypto.randomUUID(),
          title: "utils",
          path: "/utils",
          files: [
            {
              id: crypto.randomUUID(),
              title: "index.js",
              path: "/utils/index.js",
            },
          ],
        },
        {
          id: crypto.randomUUID(),
          title: "Cookies",
          path: "/utils/Cookies",
          files: [
            {
              id: crypto.randomUUID(),
              title: "index.js",
              path: "/utils/Cookies/index.js",
            },
          ],
        },
      ],
    };
  },
  getters: {
    foldersList: ({ folders }) => {
      return groupFoldersByPath(folders);
    },
  },
  actions: {},
});
