import { Connection } from 'react-flow-renderer';

export const isValidConnection = (connection: Connection) => {
  const { source, target, sourceHandle, targetHandle } = connection;
  if (!source || !target || !sourceHandle || !targetHandle) return false;
  if (source === target) return false;
  const isSourceInput = sourceHandle.toLowerCase().includes('input');
  const isTargetInput = targetHandle.toLowerCase().includes('input');
  if (isSourceInput && isTargetInput) return false;
  if (!isSourceInput && !isTargetInput) return false;
  return true;
};
