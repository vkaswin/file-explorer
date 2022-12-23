import { defineStore } from "pinia";

type Files = {
  id: string;
  title: string;
  path: string;
};

type Directories = {
  id: string;
  title: string;
  path: string;
  type: "directory" | "file";
  files?: Files[];
};

type State = {
  files: Directories[];
};

export const useFile = defineStore("file", {
  state: (): State => {
    return {
      files: [
        {
          id: "cc4e5162-7c73-4d08-8c11-bfa7f960ccf0",
          title: "src",
          path: "/src",
          type: "directory",
          files: [
            {
              id: "4d561505-795a-4c70-b57a-081f51143484",
              title: "index.js",
              path: "/src/index.js",
            },
          ],
        },
        {
          id: "b7c643f5-be65-45b7-bdcb-f1144b0d27ec",
          title: "public",
          path: "/public",
          type: "directory",
          files: [
            {
              id: "ad6dc18a-8649-457d-921e-89fd753a159c",
              title: "index.html",
              path: "/public/index.html",
            },
            {
              id: "48f7e9bd-8ac5-4a51-a1d4-9d8598201d1b",
              title: "favicon.ico",
              path: "/public/favicon.ico",
            },
          ],
        },
        {
          id: "4b499f84-6679-4d6c-b415-6e0dbeacc49b",
          title: "Hello",
          path: "/src/Test/Demo/Hello",
          type: "directory",
          files: [
            {
              id: "9cea8be6-05a5-450c-81f4-ece795e85620",
              title: "hello.js",
              path: "/src/Test/Demo/Hello/hello.js",
            },
            {
              id: "f604937a-ca53-4f45-b429-3f0fee2bca59",
              title: "index.js",
              path: "/src/Test/Demo/Hello/index.js",
            },
          ],
        },
        {
          id: "4b499f84-6679-4d6c-b415-6e0dbeacc49b",
          title: "Hello",
          path: "/src/World/Demo/Test/Blog/Detail",
          type: "directory",
          files: [
            {
              id: "9cea8be6-05a5-450c-81f4-ece795e85620",
              title: "hello.js",
              path: "/src/World/Demo/Test/Blog/Detail/hello.js",
            },
            {
              id: "f604937a-ca53-4f45-b429-3f0fee2bca59",
              title: "index.js",
              path: "/src/World/Demo/Test/Blog/Detail/index.js",
            },
          ],
        },
        {
          id: "e3d45bf2-a7da-4824-8993-273e530edfaf",
          title: "Test",
          path: "/src/Test",
          type: "directory",
          files: [
            {
              id: "784ddff3-21a7-4296-b1d3-8085784cfa47",
              title: "test.js",
              path: "/src/Test/test.js",
            },
          ],
        },
        {
          id: "e3d45bf2-a7da-4824-8993-273e530edfaf",
          title: "Helper",
          path: "/src/Helper",
          type: "directory",
          files: [
            {
              id: "2f4cb895-fd7c-4751-aa9c-6ae69db2de62",
              title: "util.js",
              path: "/src/Helper/util.js",
            },
            {
              id: "cb003984-7e58-4fed-bb7c-52a0979934c6",
              title: "demo.js",
              path: "/src/Helper/demo.js",
            },
            {
              id: "2f4cb895-fd7c-4751-aa9c-6ae69db2de62",
              title: "service.js",
              path: "/src/Helper/service.js",
            },
          ],
        },
        {
          id: "172ee440-1edb-4ee3-ac88-5c833fd0fc1c",
          title: "Demo",
          path: "/src/Test/Demo",
          type: "directory",
          files: [
            {
              id: "cb003984-7e58-4fed-bb7c-52a0979934c6",
              title: "demo.js",
              path: "/src/Test/Demo/demo.js",
            },
            {
              id: "2f4cb895-fd7c-4751-aa9c-6ae69db2de62",
              title: "index.js",
              path: "/src/Test/Demo/index.js",
            },
          ],
        },
        {
          id: "2b5b18f8-8897-40a6-a41e-9af1fe50a00e",
          title: "utils",
          path: "/utils",
          type: "directory",
          files: [
            {
              id: "68c04d2d-a703-483b-8cb6-89723d4dca0f",
              title: "index.js",
              path: "/utils/index.js",
            },
          ],
        },
        {
          id: "cb307e4d-4fa0-4278-b9f6-ad6ce277ba95",
          title: "app.js",
          path: "/",
          type: "file",
        },
      ],
    };
  },
  getters: {
    filesByModule: (state) => {
      console.log(state.files);
    },
  },
  actions: {},
});
