import React, {FunctionComponent, useState} from 'react';
import {useTranslation} from 'react-i18next';
import ErrorAlert from '../ErrorAlert/ErrorAlert';
import {ITimeDistanceBasicModel, ITimeDistanceModel} from '../../models/ITimeDistanceModel';
import {Formik, FormikActions} from 'formik';
import {Button, ButtonGroup} from 'reactstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import FieldFormGroup from '../shared/formik/FieldFormGroup';
// @ts-ignore
import {Form} from 'react-formik-ui';
import DurationFormGroup from '../shared/formik/DurationFormGroup';
import {updateTimeDistanceExercise} from './TimeDistanceService';

const TimeDistanceForm: FunctionComponent<ITimeDistanceFormProps> = ({currentExerciseData, setEditVisible}) => {
  const { t } = useTranslation();

  const [submitErrorMessage, setSubmitErrorMessage] = useState<string | undefined>(undefined);

  if (submitErrorMessage) {
    return <ErrorAlert errorText={submitErrorMessage} componentName="TimeDistanceForm"/>;
  }

  const onSubmit = async (values: ITimeDistanceBasicModel, actions: FormikActions<ITimeDistanceBasicModel>) => {
    actions.setSubmitting(true);
    setSubmitErrorMessage(undefined);
    try {
      await updateTimeDistanceExercise(currentExerciseData.uid, values);
      // Hide this form
      setEditVisible(false)
    } catch (e) {
      console.error(e);
      setSubmitErrorMessage(e.message);
    }
    actions.setSubmitting(false);
  };

  return (
    <Formik
      initialValues={currentExerciseData}
      onSubmit={onSubmit}
      // validate={validate}
      render={({errors, isSubmitting}) => (
        <>
          {isSubmitting && <div className="text-center"><FontAwesomeIcon icon="spinner" spin/></div>}
          {!isSubmitting && <Form>
            <DurationFormGroup name="totalTimeSeconds" labelText={t("Total exercise time (HH MM SS)")}/>
            <DurationFormGroup name="totalWarmupSeconds" labelText={t("Total warm-up time (HH MM SS)")}/>
            <FieldFormGroup type="number" name="totalDistanceMeter" labelText={t("Total distance (meters)")}/>
            <FieldFormGroup type="number" name="totalKcal" labelText={t("Total kcal")}/>
            <FieldFormGroup type="number" name="speedMin" labelText={t("Speed min")}/>
            <FieldFormGroup type="number" name="speedMax" labelText={t("Speed max")}/>
            <FieldFormGroup type="number" name="inclineMin" labelText={t("Incline min")}/>
            <FieldFormGroup type="number" name="inclineMax" labelText={t("Incline max")}/>
            <ButtonGroup className="w-100 m-0 p-0">
              <Button type="submit" color="primary" disabled={isSubmitting || !errors}>{t("Save")}</Button>
              <Button color="danger" onClick={() => setEditVisible(false)}>{t("Discard")}</Button>
            </ButtonGroup>
          </Form>}
        </>
      )}
    />
  );
};

interface ITimeDistanceFormProps {
  currentExerciseData: ITimeDistanceModel,
  setEditVisible: ((visible: boolean) => void)
}

export default TimeDistanceForm;