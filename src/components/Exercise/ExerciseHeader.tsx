import React, {FunctionComponent, useState} from 'react';
import {IExerciseHeaderModel, IExerciseModel} from '../../models/IExerciseModel';
import {useTranslation} from 'react-i18next';
import {updateExercise} from './ExerciseService';
import {Form, Formik, FormikActions} from 'formik';
import {Button, ButtonGroup} from 'reactstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import FormikField from '../Formik/FormikField';
import ErrorAlert from '../ErrorAlert/ErrorAlert';

const ExerciseHeader: FunctionComponent<IExerciseHeaderProps> = ({exerciseData}) => {
  const { t } = useTranslation();

  const [isCollapsed, setIsCollapsed] = useState<boolean>(true);
  const [submitErrorMessage, setSubmitErrorMessage] = useState<string | undefined>(undefined);

  const toggleEditForm = () => setIsCollapsed(!isCollapsed);

  const onSubmit = async (values: any, actions: FormikActions<IExerciseHeaderModel>) => {
    actions.setSubmitting(true);
    setSubmitErrorMessage(undefined);

    try {
      const updateData: IExerciseHeaderModel = {
        exerciseName: values.exerciseName
      };
      await updateExercise(exerciseData.uid, updateData);
      exerciseData.exerciseName = values.exerciseName;
      setIsCollapsed(true);
    } catch (e) {
      setSubmitErrorMessage(e.message);
    }

    actions.setSubmitting(false);
  };

  const validate = (values: IExerciseHeaderValidate): IExerciseHeaderValidate | {} => {
    const errors: IExerciseHeaderValidate = {};
    if (values.exerciseName === '') {
      errors.exerciseName = t("Exercise name can't be empty");  // TODO Rename to exercise name!
    }
    return errors;
  };

  return (
    <>
      {isCollapsed && <h1 className="exercise--title" onClick={toggleEditForm}>{exerciseData.exerciseName} <FontAwesomeIcon icon="edit" size="xs"/></h1>}
      {!isCollapsed &&
      <Formik
        initialValues={{exerciseName: exerciseData.exerciseName}}
        onSubmit={onSubmit}
        validate={validate}
        render={({errors, isSubmitting}) => (
          <>
            {submitErrorMessage && <ErrorAlert errorText={submitErrorMessage} componentName="ExerciseHeader"/>}
            {isSubmitting && <FontAwesomeIcon icon="spinner" spin/>}
            {!isSubmitting && <>
              <Form>
                <FormikField labelText="Exercise name" name="exerciseName" labelHidden/>
                <ButtonGroup className="w-100">
                  <Button type="submit" color="primary" disabled={isSubmitting || !errors}>{t("Save")}</Button>
                  <Button color="danger" onClick={toggleEditForm}>{t("Discard")}</Button>
                </ButtonGroup>
              </Form>
            </>}
          </>
        )}
      />}
    </>
  );

  // TODO Move this to another place!
  // {/*<Button color="warning" onClick={removeExercise}>{t("Delete")}</Button>*/}
  // const removeExercise = async () => {
  //   setSubmitErrorMessage(undefined);
  //
  //   try {
  //     await deleteExerciseAndRemoveFromDay(exerciseData.uid, dayUid);
  //   } catch (e) {
  //     setSubmitErrorMessage(e.message);
  //   }
  // };
};

interface IExerciseHeaderValidate {
  exerciseName?: string
}

interface IExerciseHeaderProps {
  exerciseData: IExerciseModel
}

export default ExerciseHeader;