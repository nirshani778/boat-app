const url = 'https://localhost:7280/api';

export const signInWithBoatAppBack = async (email, password) => {
  if (!email || !password) return 'email and password is required';

  return await fetch(url + '/Auth/login/' + email + '/' + password, {
    method: 'POST',
    body: JSON.stringify({
      email,
      password,
    }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  }).then((response) => response.json());
};

export const signUpWithBoatAppBack = async (email, password) => {
  if (!email || !password) return 'email and password is required';

  return await fetch(url + '/Auth/register/' + email + '/' + password, {
    method: 'POST',
    body: JSON.stringify({
      email,
      password,
    }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  }).then((response) => response.json());
};

export const getAllBoats = async () => {
  try {
    return await fetch(url + '/Boat').then((response) => response.json());
  } catch (error) {
    console.error('Failed to fetch status', error);
  }
};

export const addBoat = async (name, description, imageUrl) => {
  try {
    return await fetch(url + '/Boat/', {
      method: 'POST',
      body: JSON.stringify({
        name,
        description,
        imageUrl,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    }).then((response) => response.json());
  } catch (error) {
    return error;
  }
};

export const saveBoat = async (id, name, description, imageUrl) => {
  try {
    return await fetch(url + '/Boat/', {
      method: 'PUT',
      body: JSON.stringify({
        id,
        name,
        description,
        imageUrl,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    }).then((response) => response.json());
  } catch (error) {
    return error;
  }
};

export const deleteBoat = async (id) => {
  try {
    return await fetch(url + '/Boat/' + id, {
      method: 'DELETE',
      body: JSON.stringify({
        id,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    }).then((response) => response.json());
  } catch (error) {
    return error;
  }
};
