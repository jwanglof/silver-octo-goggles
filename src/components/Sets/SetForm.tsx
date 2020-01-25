import React, {FunctionComponent} from 'react';
import {Formik, FormikHelpers, Form} from 'formik';
import {ISetModel} from '../../models/ISetModel';
import FormikField from '../Formik/FormikField';
import {useTranslation} from 'react-i18next';
import {Button, ButtonGroup, Col, Row} from 'reactstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {setsValidation} from './SetsHelpers';
import {ExerciseTypesEnum} from '../../enums/ExerciseTypesEnum';
import {InputType} from 'reactstrap/lib/Input';

const SetForm: FunctionComponent<ISetFormProps> = ({hideFormCb, exerciseType, currentData, onSubmit, extraButtonGroups}) => {
  const { t } = useTranslation();

  return <Formik
    initialValues={currentData}
    onSubmit={onSubmit}
    validate={(values: any) => {
      return setsValidation(values, t);
    }}>
    {(props) => {
      const {errors, isSubmitting, values} = props;
      let amountInKgString = values.amountInKg.toString();
      console.log(values, parseInt(amountInKgString), parseFloat(amountInKgString), parseFloat(amountInKgString) === parseInt(amountInKgString));
      let amountInKgType: InputType = 'number';
      let amountInKgInputProps = {min: 0, autoFocus: true};
      if (parseFloat(amountInKgString) !== parseInt(amountInKgString)) {
        amountInKgType = 'text';
        // delete amountInKgInputProps.min;
        // delete amountInKgInputProps.autoFocus;
      }
      console.log('type::', amountInKgType, amountInKgInputProps);
      return (
        <>
          {isSubmitting && <Row><Col className="text-center"><FontAwesomeIcon icon="spinner" spin/></Col></Row>}
          {!isSubmitting && <Form>
            <div className="row pt-1 pb-1">
              <Col className="pt-1" xs={2}>{currentData.index}</Col>
              <Col xs={5}>
                <FormikField name="amountInKg" labelText={t('Amount in KG')} type={amountInKgType} labelHidden
                             inputProps={amountInKgInputProps}/>
              </Col>
              {exerciseType === ExerciseTypesEnum.EXERCISE_TYPE_SETS_REPS &&
              <Col xs={5}><FormikField name="reps" labelText={t('Repetitions')} type="number" labelHidden
                                       inputProps={{min: 0}}/></Col>}
              {exerciseType === ExerciseTypesEnum.EXERCISE_TYPE_SETS_SECONDS &&
              <Col xs={5}><FormikField name="seconds" labelText={t('Seconds')} type="number" labelHidden
                                       inputProps={{min: 0}}/></Col>}
            </div>
            <Row>
              <ButtonGroup className="w-100" vertical>
                <Button type="submit" color="primary" disabled={isSubmitting || !errors}>{t('Save set')}</Button>
                <Button color="danger" onClick={() => hideFormCb()}>{t('Discard set')}</Button>
                {extraButtonGroups}
              </ButtonGroup>
            </Row>
          </Form>}
        </>
      );
    }}
  </Formik>;
};

interface ISetFormProps {
  hideFormCb: (() => void)
  exerciseType: ExerciseTypesEnum
  currentData: ISetModel
  onSubmit: ((values: ISetModel, actions: FormikHelpers<ISetModel>) => void)
  extraButtonGroups?: any
}

export default SetForm;
