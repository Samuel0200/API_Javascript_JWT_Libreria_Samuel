import { createUserMongo, getUserMongo,getUsersMongo, updateUserMongo, deleteUserMongo } from '../actions/User';

export async function getUser(query) {
  try {
    const filters = { ...query, disabled: false };
    const user = await getUserMongo(filters);
    return user.toObject();
  } catch (e) {
    throw e;
  }
}

export async function getUsers(query) {
  try {
    const filteredUserResults = await getUsersMongo(query);
    return filteredUserResults;
  } catch (e) {
    throw e;
  }
}

export async function createUser(data) {
  try {
    const createdUser = await createUserMongo(data);
    return createdUser;
  } catch (e) {
    throw e;
  }
}

export async function patchUser(data) {
  try {
    const { _id, ...changes } = data;
    const updatedUser = await updateUserMongo(_id, changes);
    return updatedUser;
  } catch (e) {
    throw e;
  }
}

export async function deleteUser(id) {
  try {
    const deletedUser = await deleteUserMongo(id);
    return deletedUser;
  } catch (e) {
    throw e;
  }
}
