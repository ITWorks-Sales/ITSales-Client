export default function isEditing(record: any, editingKey: number) {
  return record.key === editingKey;
}
