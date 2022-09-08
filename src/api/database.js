import axios from 'axios';

export async function registerUser(newUser) {
  const response = await axios.post('api/register', { user: newUser });
  const data = await response.data;
  return data;
}

export async function loginUser(userData) {
  const response = await axios.post('api/login', { user: userData });
  const data = await response.data;
  return data;
}

export async function getUsers() {
  const response = await axios.get('api/getUsers');
  const data = await response.data;
  return data;
}

export async function getUser(id) {
  const response = await axios.get('api/getUser', { params: { id: id } });
  return response.data;
}

export async function updateUser(userData) {
  const response = await axios.put('api/updateUser', { user: userData });
  return response.data;
}

export async function deleteUser(email) {
  const response = await axios.delete('api/deleteUser', {
    data: { email: email },
  });
  return response.data;
}

export async function addStory(data) {
  const response = await axios.post('api/addStory', data);
  return response.data;
}

export async function getStories() {
  const response = await axios.get('api/getStories');
  return response.data;
}

export async function updateStory(storyData) {
  const response = await axios.put('api/updateStory', {
    storyData: storyData,
  });
  return response.data;
}

export async function deleteStory({ id, userId }) {
  const response = await axios.delete('api/deleteStory', {
    data: { id: id, userId: userId },
  });
  return response.data;
}

export async function checkRole(id) {
  const response = await axios.get('api/checkRole', { params: { id: id } });
  return response.data;
}
export async function getSchoolMates(id) {
  const response = await axios.get('api/getSchoolMates', {
    params: { id: id },
  });
  return response.data;
}

export async function searchUsers(searched) {
  const response = await axios.get('api/searchUsers', {
    params: { searchby: searched.searchby, value: searched.value },
  });

  return response.data;
}

export async function searchStories(searched) {
  const response = await axios.get('api/searchStories', {
    params: { searchby: searched.searchby, value: searched.value },
  });

  return response.data;
}

export async function bookingArrival(data) {
  const response = await axios.put('api/bookingArrival', {
    userId: data.userId,
    arrival: data.arrival,
    dinner: data.dinner,
  });

  return response.data;
}
