export const getAllMethods = (obj): string[] => {
  let props = [];

  do {
    const l = Object.getOwnPropertyNames(obj)
      .concat(Object.getOwnPropertySymbols(obj).map(s => s.toString()))
      .sort()
      .filter(
        (p, i, arr) => typeof obj[p] === 'function' && p !== 'constructor' // only the methods //&&           //not the constructor
      );
    props = props.concat(l);
  } while (
    // tslint:disable-next-line: no-conditional-assignment
    (obj = Object.getPrototypeOf(obj)) && // walk-up the prototype chain
    Object.getPrototypeOf(obj) // not the the Object prototype methods (hasOwnProperty, etc...)
  );

  return props;
};
