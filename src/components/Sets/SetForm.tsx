import React, {FunctionComponent} from 'react';
import {Formik, FormikHelpers} from 'formik';
import {ISetModel} from '../../models/ISetModel';
// @ts-ignore
import {Form} from 'react-formik-ui';
import FormikField from '../Formik/FormikField';
import {useTranslation} from 'react-i18next';
import {Button, ButtonGroup, Col, Row} from 'reactstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {setsValidation} from './SetsHelpers';
import {ExerciseTypesEnum} from '../../enums/ExerciseTypesEnum';

const SetForm: FunctionComponent<ISetFormProps> = ({hideFormCb, exerciseType, currentData, onSubmit, extraButtonGroups}) => {
  const { t } = useTranslation();

  return <Formik
    initialValues={currentData}
    onSubmit={onSubmit}
    validate={(values: any) => {
      return setsValidation(values, t);
    }}
    render={({errors, isSubmitting}) => (
      <>
        {isSubmitting && <Row><Col className="text-center"><FontAwesomeIcon icon="spinner" spin/></Col></Row>}
        {!isSubmitting && <Form>
          <div className="form-row pt-1">
            <Col xs={2}>{currentData.index}</Col>
            <Col xs={5}>
              <FormikField name="amountInKg" labelText={t("Amount in KG")} type="number" labelHidden inputProps={{min: 0, autoFocus: true}} addedClassNames="h-75"/>
            </Col>
            {exerciseType === ExerciseTypesEnum.EXERCISE_TYPE_SETS_REPS && <Col xs={5}><FormikField name="reps" labelText={t("Repetitions")} type="number" labelHidden inputProps={{min: 0}} addedClassNames="h-75"/></Col>}
            {exerciseType === ExerciseTypesEnum.EXERCISE_TYPE_SETS_SECONDS && <Col xs={5}><FormikField name="seconds" labelText={t("Seconds")} type="number" labelHidden inputProps={{min: 0}} addedClassNames="h-75"/></Col>}
          </div>
          <Row>
            <ButtonGroup className="w-100">
              <Button type="submit" color="primary" disabled={isSubmitting || !errors}>{t("Save set")}</Button>
              <Button color="danger" onClick={() => hideFormCb()}>{t("Discard set")}</Button>
              {extraButtonGroups}
            </ButtonGroup>
          </Row>
        </Form>}
      </>
    )}
  />;
};

interface ISetFormProps {
  hideFormCb: (() => void)
  exerciseType: ExerciseTypesEnum
  currentData: ISetModel
  onSubmit: ((values: ISetModel, actions: FormikHelpers<ISetModel>) => void)
  extraButtonGroups?: any
}

export default SetForm;