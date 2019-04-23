import {
  IDayBasicModel,
  IDayBasicUpdateModel,
  IDayExercisesArray,
  IDayModel,
  IDayModelWithoutUid,
  IDayUpdateModel
} from '../../models/IDayModel';
import firebase, {getCurrentUsersUid} from '../../config/firebase';
import {deleteExercise} from '../Exercise/ExerciseService';
import isEmpty from 'lodash/isEmpty';
import {
  _getErrorObjectCustomMessage,
  FirebaseCollectionNames,
  getDayErrorObject,
  getNowTimestamp
} from '../../config/FirebaseUtils';
import getUnixTime from 'date-fns/getUnixTime';
import subDays from 'date-fns/subDays';
import {Versions} from '../../models/IBaseModel';

// "Cache"
interface IDayServiceCache {
  locations: Array<string>
}
const dayServiceCache: IDayServiceCache = {locations: []};

export const getDay = async (dayUid: string): Promise<IDayModel> => {
  return firebase
    .firestore()
    .collection(FirebaseCollectionNames.FIRESTORE_COLLECTION_DAYS)
    .doc(dayUid)
    .get()
    .then((querySnapshot: any) => {
      if (querySnapshot.exists && !isEmpty(querySnapshot.data())) {
        const data = querySnapshot.data()!;
        return {
          startTimestamp: data.startTimestamp,
          endTimestamp: data.endTimestamp,
          location: data.location,
          muscleGroups: data.muscleGroups,
          title: data.title,
          notes: data.notes,
          exercises: data.exercises,
          uid: querySnapshot.id,
          ownerUid: data.ownerUid,
          createdTimestamp: data.createdTimestamp,
          version: data.version
        };
      } else {
        throw getDayErrorObject(dayUid);
      }
    });
};

export const deleteDay = async (dayUid: string): Promise<void> => {
  const dayData = await getDay(dayUid);
  // Remove all exercises that exist on the day
  // TODO Side effect, should be removed and made from the caller!
  if (dayData.exercises.length) {
    await Promise.all(dayData.exercises.map(e => deleteExercise(e.exerciseUid)));
  }
  return await firebase.firestore()
    .collection(FirebaseCollectionNames.FIRESTORE_COLLECTION_DAYS)
    .doc(dayUid)
    .delete();
};

export const endDayNow = async (dayUid: string): Promise<void> => {
  return await firebase.firestore()
    .collection(FirebaseCollectionNames.FIRESTORE_COLLECTION_DAYS)
    .doc(dayUid)
    .update({
      endTimestamp: Math.ceil(Date.now() / 1000)  // TODO Can I use IDayModel somehow?
    });
};

export const addDay = async (dayData: IDayBasicModel, ownerUid: string): Promise<string> => {
  const data: IDayModelWithoutUid = {
    location: dayData.location,
    muscleGroups: dayData.muscleGroups,
    title: dayData.title,
    notes: dayData.notes,
    exercises: [],
    ownerUid,
    createdTimestamp: getNowTimestamp(),
    startTimestamp: dayData.startTimestamp,
    endTimestamp: null,
    version: Versions.v1
  };
  const dayDocRef = await firebase.firestore()
    .collection(FirebaseCollectionNames.FIRESTORE_COLLECTION_DAYS)
    .add(data);
  return dayDocRef.id;
};

export const getAllDays10DaysBackInTime = async (): Promise<Array<IDayModel>> => {
  const sub10DaysTimestamp = getUnixTime(subDays(new Date(), 100));  // TODO Lol
  const ownerUid = await getCurrentUsersUid();
  return firebase.firestore()
    .collection(FirebaseCollectionNames.FIRESTORE_COLLECTION_DAYS)
    .where("startTimestamp", ">=", sub10DaysTimestamp)
    .where("ownerUid", "==", ownerUid)
    .get()
    .then(querySnapshot => {
      const days: Array<IDayModel> = [];
      querySnapshot.forEach(a => {
        const data = a.data();
        days.push({
          endTimestamp: data.endTimestamp,
          startTimestamp: data.startTimestamp,
          exercises: data.exercises,
          location: data.location,
          muscleGroups: data.muscleGroups,
          title: data.title,
          notes: data.notes,
          createdTimestamp: data.createdTimestamp,
          ownerUid: data.ownerUid,
          uid: a.id,
          version: data.ownerUid
        });
      });
      return days;
    });
};

export const updateDay = async (dayUid: string, dayData: IDayBasicUpdateModel) => {
  const data: IDayUpdateModel = {
    endTimestamp: dayData.endTimestamp,
    location: dayData.location,
    muscleGroups: dayData.muscleGroups,
    startTimestamp: dayData.startTimestamp,
    title: dayData.title,
    updatedTimestamp: getNowTimestamp(),
    notes: dayData.notes
  };
  // Remove the entire endTimestamp field if it doesn't have a value
  if (!dayData.endTimestamp) {
    data.endTimestamp = firebase.firestore.FieldValue.delete();
  }
  return await firebase.firestore()
    .collection(FirebaseCollectionNames.FIRESTORE_COLLECTION_DAYS)
    .doc(dayUid)
    .update(data);
};

export const addExerciseToDayArray = async (exerciseUid: string, dayUid: string): Promise<void> => {
  const dayData = await getDay(dayUid);
  const exerciseData: IDayExercisesArray = {
    exerciseUid,
    index: dayData.exercises.length
  };
  return await firebase.firestore()
    .collection(FirebaseCollectionNames.FIRESTORE_COLLECTION_DAYS)
    .doc(dayUid)
    .update({exercises: firebase.firestore.FieldValue.arrayUnion(exerciseData)});
};

export const getAllLocations = async (): Promise<IDayServiceCache> => {
  if (dayServiceCache.locations.length > 0) {
    return dayServiceCache;
  }

  const ownerUid = await getCurrentUsersUid();

  const locations: Array<string> = [];

  await firebase.firestore()
    .collection(FirebaseCollectionNames.FIRESTORE_COLLECTION_DAYS)
    .orderBy("createdTimestamp", "desc")
    .where("ownerUid", "==", ownerUid)
    .limit(1)
    .get()
    .then(res => {
      let firstDayLocation = '';
      res.forEach((d: any) => {
        firstDayLocation = d.data().location;
      });
      locations.push(firstDayLocation);
      return firstDayLocation;
    });

  await firebase.firestore()
    .collection(FirebaseCollectionNames.FIRESTORE_COLLECTION_DAYS)
    .where("location", "<", locations[0])
    .where("ownerUid", "==", ownerUid)
    .limit(10)
    .get()
    .then(res => {
      res.forEach((d: any) => {
        if (locations.indexOf(d.data().location) === -1) {
          locations.push(d.data().location);
        }
      });
    });

  await firebase.firestore()
    .collection(FirebaseCollectionNames.FIRESTORE_COLLECTION_DAYS)
    .where("location", ">", locations[0])
    .where("ownerUid", "==", ownerUid)
    .limit(10)
    .get()
    .then(res => {
      res.forEach((d: any) => {
        if (locations.indexOf(d.data().location) === -1) {
          locations.push(d.data().location);
        }
      });
    });

  dayServiceCache.locations = locations;

  return dayServiceCache;
};

export const getDayDocument = (dayUid: string): any => {
  return firebase.firestore()
    .collection(FirebaseCollectionNames.FIRESTORE_COLLECTION_DAYS)
    .doc(dayUid);
};
