import firebase from '../../config/firebase';
import {isEmpty} from 'lodash';
import {ISetBasicModel, ISetModel, ISetModelWithoutUid} from '../../models/ISetModel';
import {
  FirebaseCollectionNames,
  getNowTimestamp,
  getSetErrorObject,
  getSetsRepsExerciseErrorObject
} from '../../config/FirebaseUtils';
import {Versions} from '../../models/IBaseModel';
import {ISetsRepsModel, ISetsRepsModelWithoutUid} from '../../models/ISetsRepsModel';

export const deleteSet = async (setUid: string): Promise<void> => {
  return await firebase.firestore()
    .collection(FirebaseCollectionNames.FIRESTORE_COLLECTION_SETS)
    .doc(setUid)
    .delete();
};

export const getSet = async (setUid: string): Promise<ISetModel> => {
  return await firebase.firestore()
    .collection(FirebaseCollectionNames.FIRESTORE_COLLECTION_SETS)
    .doc(setUid)
    .get()
    .then((querySnapshot: any) => {
      if (querySnapshot.exists && !isEmpty(querySnapshot.data())) {
        const data = querySnapshot.data();
        return {
          uid: data.id,
          ownerUid: data.ownerUid,
          createdTimestamp: data.createdTimestamp,
          index: data.index,
          amountInKg: data.amountInKg,
          reps: data.reps,
          version: data.version
        };
      } else {
        throw getSetErrorObject(setUid);
      }
    });
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

export const deleteSetsRepsExercise = async (exerciseUid: string): Promise<void> => {
  return await firebase.firestore()
    .collection(FirebaseCollectionNames.FIRESTORE_COLLECTION_EXERCISE_TYPE_SETS_REPS)
    .doc(exerciseUid)
    .delete();
};