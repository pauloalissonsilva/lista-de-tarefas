interface ISessionData {
  id: string;
  username: string;
}


export function loadLocalStorage(dataKey: string): any[] {
  const data = localStorage.getItem(dataKey);
  const currentUsers = data ? JSON.parse(data) : [];

  return currentUsers
}

export function saveLocalStorage(obj: any, dataKey: string): any[] {
  const objs = loadLocalStorage(dataKey)

  const indexObj = objs.findIndex(objCurrent => objCurrent.id === obj.id)

  if (indexObj < 0) {
    const dataFormatted = [
      ...objs,
      obj
    ];

    localStorage.setItem(dataKey, JSON.stringify(dataFormatted));

    return dataFormatted;

  } else {
    objs.splice(indexObj, 1, obj)
    
    localStorage.setItem(dataKey, JSON.stringify(objs));

    return objs;
  }

}

export function deleteItem(id:string, dataKey:string): void {
  const objs = loadLocalStorage(dataKey)

  const indexObj = objs.findIndex(objCurrent => objCurrent.id === id)

  objs.splice(indexObj, 1);
  
  localStorage.setItem(dataKey, JSON.stringify(objs));
}


const dataKeySession = "CreedTech:User"

export function loadSessionStorage(): ISessionData {
  const data = sessionStorage.getItem(dataKeySession);
  const currentUser: ISessionData = data ? JSON.parse(data) : {};

  return currentUser
}

export function saveSessionStorage({ id, username }: ISessionData): void {

  const dataFormatted = {
    id,
    username
  }

  sessionStorage.setItem(dataKeySession, JSON.stringify(dataFormatted));
}


