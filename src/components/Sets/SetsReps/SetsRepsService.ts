import firebase from '../../../config/firebase';
import isEmpty from 'lodash/isEmpty';
import {ISetBasicModel, ISetBasicUpdateModel, ISetModelWithoutUid, ISetUpdateModel} from '../../../models/ISetModel';
import {FirebaseCollectionNames, getNowTimestamp, getSetsRepsExerciseErrorObject} from '../../../config/FirebaseUtils';
import {Versions} from '../../../models/IBaseModel';
import {ISetsRepsModel, ISetsRepsModelWithoutUid} from '../../../models/ISetsRepsModel';

export const deleteSet = async (setUid: string): Promise<void> => {
  return await firebase.firestore()
    .collection(FirebaseCollectionNames.FIRESTORE_COLLECTION_SETS)
    .doc(setUid)
    .delete();
};

export const getSetDocument = (setUid: string): firebase.firestore.DocumentReference => {
  return firebase.firestore()
    .collection(FirebaseCollectionNames.FIRESTORE_COLLECTION_SETS)
    .doc(setUid);
};

export const updateSetsRepsExercise = async (setUid: string, setData: ISetBasicUpdateModel) => {
  const data: ISetUpdateModel = {
    amountInKg: setData.amountInKg,
    reps: setData.reps,
    updatedTimestamp: getNowTimestamp()
  };
  return await firebase.firestore()
    .collection(FirebaseCollectionNames.FIRESTORE_COLLECTION_SETS)
    .doc(setUid)
    .update(data);
};

export const addNewSetAndGetUid = async (setData: ISetBasicModel, ownerUid: string): Promise<string> => {
  const data: ISetModelWithoutUid = {
    index: setData.index,
    amountInKg: setData.amountInKg,
    reps: setData.reps,
    ownerUid,
    createdTimestamp: getNowTimestamp(),
    version: Versions.v1
  };
  const setDocRef = await firebase.firestore()
    .collection(FirebaseCollectionNames.FIRESTORE_COLLECTION_SETS)
    .add(data);
  return setDocRef.id;
};

export const addSetToSetsRepsExerciseArray = async (setUid: string, exerciseUid: string): Promise<void> => {
  return await firebase.firestore()
    .collection(FirebaseCollectionNames.FIRESTORE_COLLECTION_EXERCISE_TYPE_SETS_REPS)
    .doc(exerciseUid)
    .update({sets: firebase.firestore.FieldValue.arrayUnion(setUid)});
};

export const addNewSetsRepsExerciseAndGetUid = async (ownerUid: string): Promise<string> => {
  const setsRepsData: ISetsRepsModelWithoutUid = {
    sets: [],
    ownerUid,
    createdTimestamp: getNowTimestamp(),
    version: Versions.v1
  };
  const exerciseSetsRepsDocRef = await firebase.firestore()
    .collection(FirebaseCollectionNames.FIRESTORE_COLLECTION_EXERCISE_TYPE_SETS_REPS)
    .add(setsRepsData);
  return exerciseSetsRepsDocRef.id;
};

export const getSetsRepsExercise = async (exerciseUid: string): Promise<ISetsRepsModel> => {
  const querySnapshot = await firebase.firestore()
    .collection(FirebaseCollectionNames.FIRESTORE_COLLECTION_EXERCISE_TYPE_SETS_REPS)
    .doc(exerciseUid)
    .get();
  if (querySnapshot.exists && !isEmpty(querySnapshot.data())) {
    const exerciseData = querySnapshot.data()!;
    return {
      sets: exerciseData.sets,
      uid: querySnapshot.id,
      ownerUid: exerciseData.ownerUid,
      createdTimestamp: exerciseData.createdTimestamp,
      version: exerciseData.version
    };
  } else {
    throw getSetsRepsExerciseErrorObject(exerciseUid);
  }
};

export const deleteSetsRepsExercise = async (setsRepsUid: string): Promise<void> => {
  return await getSetsRepsExerciseDocument(setsRepsUid).delete();
};

export const getSetsRepsExerciseDocument = (setsRepsUid: string): firebase.firestore.DocumentReference => {
  return firebase.firestore()
    .collection(FirebaseCollectionNames.FIRESTORE_COLLECTION_EXERCISE_TYPE_SETS_REPS)
    .doc(setsRepsUid);
};