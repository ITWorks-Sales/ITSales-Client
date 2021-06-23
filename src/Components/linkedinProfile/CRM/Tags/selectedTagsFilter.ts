export default function selectedTagsFilter(
  input: string,
  { children: tagContent }: any
) {
  if (tagContent.includes(input)) return true;
  return false;
}
