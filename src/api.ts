export const BASE_URL = 'http://localhost:3111/users/'

export const getAllUsers = () => {
  return fetch(BASE_URL).then(res=>res.json());
}

export const addUser = (userData: UserData) => {
  return fetch(BASE_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      id: Number(new Date()),
      name: userData.name,
      username: userData.userName,
      email: userData.email,
      address: {
        city: userData.city,
      },
      phone: userData.phone,
    }) // body data type must match "Content-Type" header
  }).then(async (res) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    return res.json();
  });
}
