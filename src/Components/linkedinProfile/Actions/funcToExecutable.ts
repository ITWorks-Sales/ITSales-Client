export default function funcToExecutable(fn: Function, ...args: any) {
  const entire = fn.toString();

  const functionName = entire.slice(
    entire.indexOf('function') + 8,
    entire.indexOf('(')
  );

  const functionArgsAsStrings = args.map(JSON.stringify).join(',') || '';

  return `${entire}; \n${functionName}(${functionArgsAsStrings});`;
}
