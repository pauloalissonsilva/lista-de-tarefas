export function uuidV4(): string {

  const array = new Uint32Array(5);
  crypto.getRandomValues(array);

  let uuid = '';

  for (let i = 0; i < array.length; i++) {
    uuid += array[i] + (i === (array.length -1)? "": "-");
  }
  return uuid.trim()
}

