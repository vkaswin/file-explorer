<script setup lang="ts">
import { useFile } from "@/store/useFile";
import { computed, onMounted, reactive } from "vue";
const { files, filesByModule } = useFile();

console.log(filesByModule);
</script>

<template>
  <div :class="styles.container"></div>
</template>

<style lang="scss" module="styles">
.container {
  background-color: black;
  height: 100%;
}
</style>

<!-- const directories = computed(() => {
    return files
      .filter(({ path }) => {
        return path.substring(1).split("/").length === 1;
      })
      .map((dir) => {
        let subDir = files.filter(({ path }) => {
          return path.startsWith(`${dir.path}/`);
        });
        let subDirectories = subDir
          .reduce((arr, sub) => {
            let index =
              sub.path.replace(`${dir.path}/`, "").split("/").length - 1;
            if (typeof arr[index] === "undefined") {
              arr[index] = [sub];
            } else {
              arr[index].push(sub);
            }
            return arr;
          }, [] as Directories[][])
          .map((dir) => {
            return dir
              .sort((a, b) => {
                return a.title.localeCompare(b.title);
              })
              .map((dir) => {
                return {
                  ...dir,
                  files: dir.files?.sort((a, b) => {
                    return a.title.localeCompare(b.title);
                  }),
                };
              });
          });
        return {
          ...dir,
          ...(dir.type !== "file" && { subDirectories }),
        };
      });
  }); -->
