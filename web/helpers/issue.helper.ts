import differenceInCalendarDays from "date-fns/differenceInCalendarDays";
import { v4 as uuidv4 } from "uuid";
// types
import { TIssue, TIssueLayouts, TIssueParams, TStateGroups } from "@plane/types";
import { IGanttBlock } from "@/components/gantt-chart";
// constants
import { ISSUE_DISPLAY_FILTERS_BY_LAYOUT } from "@/constants/issue";
import { STATE_GROUPS } from "@/constants/state";
// helpers
import { getDate } from "@/helpers/date-time.helper";

export const handleIssueQueryParamsByLayout = (
  layout: TIssueLayouts | undefined,
  viewType: "my_issues" | "issues" | "profile_issues" | "archived_issues" | "draft_issues"
): TIssueParams[] | null => {
  const queryParams: TIssueParams[] = [];

  if (!layout) return null;

  const layoutOptions = ISSUE_DISPLAY_FILTERS_BY_LAYOUT[viewType][layout];

  // add filters query params
  layoutOptions.filters.forEach((option) => {
    queryParams.push(option);
  });

  // add display filters query params
  Object.keys(layoutOptions.display_filters).forEach((option) => {
    queryParams.push(option as TIssueParams);
  });

  // add extra options query params
  if (layoutOptions.extra_options.access) {
    layoutOptions.extra_options.values.forEach((option) => {
      queryParams.push(option);
    });
  }

  return queryParams;
};

/**
 *
 * @description create a full issue payload with some default values. This function also parse the form field
 * like assignees, labels, etc. and add them to the payload
 * @param projectId project id to be added in the issue payload
 * @param formData partial issue data from the form. This will override the default values
 * @returns full issue payload with some default values
 */
export const createIssuePayload: (projectId: string, formData: Partial<TIssue>) => TIssue = (
  projectId: string,
  formData: Partial<TIssue>
) => {
  const payload: TIssue = {
    id: uuidv4(),
    project_id: projectId,
    priority: "none",
    // tempId is used for optimistic updates. It is not a part of the API response.
    tempId: uuidv4(),
    // to be overridden by the form data
    ...formData,
  } as TIssue;

  return payload;
};

/**
 * @description check if the issue due date should be highlighted
 * @param date
 * @param stateGroup
 * @returns boolean
 */
export const shouldHighlightIssueDueDate = (
  date: string | Date | null,
  stateGroup: TStateGroups | undefined
): boolean => {
  if (!date || !stateGroup) return false;
  // if the issue is completed or cancelled, don't highlight the due date
  if ([STATE_GROUPS.completed.key, STATE_GROUPS.cancelled.key].includes(stateGroup)) return false;

  const parsedDate = getDate(date);
  if (!parsedDate) return false;

  const targetDateDistance = differenceInCalendarDays(parsedDate, new Date());

  // if the issue is overdue, highlight the due date
  return targetDateDistance <= 0;
};

export const renderIssueBlocksStructure = (blocks: TIssue[]): IGanttBlock[] =>
  blocks?.map((block) => ({
    data: block,
    id: block.id,
    sort_order: block.sort_order,
    start_date: getDate(block.start_date),
    target_date: getDate(block.target_date),
  }));

export function getChangedIssuefields(formData: Partial<TIssue>, dirtyFields: { [key: string]: boolean | undefined }) {
  const changedFields: Partial<TIssue> = {};

  const dirtyFieldKeys = Object.keys(dirtyFields) as (keyof TIssue)[];
  for (const dirtyField of dirtyFieldKeys) {
    if (!!dirtyFields[dirtyField]) {
      changedFields[dirtyField] = formData[dirtyField];
    }
  }

  return changedFields;
}

export const formatTextList = (TextArray: string[]): string => {
  const count = TextArray.length;
  switch (count) {
    case 0:
      return "";
    case 1:
      return TextArray[0];
    case 2:
      return `${TextArray[0]} and ${TextArray[1]}`;
    case 3:
      return `${TextArray.slice(0, 2).join(", ")}, and ${TextArray[2]}`;
    case 4:
      return `${TextArray.slice(0, 3).join(", ")}, and ${TextArray[3]}`;
    default:
      return `${TextArray.slice(0, 3).join(", ")}, and +${count - 3} more`;
  }
};

export const getDescriptionPlaceholder = (isFocused: boolean, description: string | undefined): string => {
  const isDescriptionEmpty = !description || description === "<p></p>" || description.trim() === "";
  if (!isDescriptionEmpty || isFocused) return "Press '/' for commands...";
  else return "Click to add description";
};
