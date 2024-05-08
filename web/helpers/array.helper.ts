import { IIssueLabel, IIssueLabelTree } from "@plane/types";

export const orderArrayBy = (orgArray: any[], key: string, ordering: "ascending" | "descending" = "ascending") => {
  if (!orgArray || !Array.isArray(orgArray) || orgArray.length === 0) return [];

  const array = [...orgArray];

  if (key[0] === "-") {
    ordering = "descending";
    key = key.slice(1);
  }

  const innerKey = key.split("."); // split the key by dot

  return array.sort((a, b) => {
    const keyA = innerKey.reduce((obj, i) => obj[i], a); // get the value of the inner key
    const keyB = innerKey.reduce((obj, i) => obj[i], b); // get the value of the inner key
    if (keyA < keyB) {
      return ordering === "ascending" ? -1 : 1;
    }
    if (keyA > keyB) {
      return ordering === "ascending" ? 1 : -1;
    }
    return 0;
  });
};

export const checkDuplicates = (array: any[]) => new Set(array).size !== array.length;

export const findStringWithMostCharacters = (strings: string[]): string => {
  if (!strings || strings.length === 0) return "";

  return strings.reduce((longestString, currentString) =>
    currentString.length > longestString.length ? currentString : longestString
  );
};

export const sortByField = (array: any[], field: string): any[] =>
  array.sort((a, b) => (a[field] < b[field] ? -1 : a[field] > b[field] ? 1 : 0));

export const buildTree = (array: IIssueLabel[], parent = null) => {
  const tree: IIssueLabelTree[] = [];

  array.forEach((item: any) => {
    if (item.parent === parent) {
      const children = buildTree(array, item.id);
      item.children = children;
      tree.push(item);
    }
  });

  return tree;
};
