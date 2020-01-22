import { RegistrationFormValues } from '../../registration/types/RegistrationTypes';
import { newMoment } from '../../../common/time/utils';
import { HomeFormValues } from './types/HomeFormTypes';

/**
 * Convert FormValues fetched from state to initialValues used by formik
 * @param {RegistrationFormValues} stateFormValues Values from state.
 * @returns {HomeFormValues} initialValues used in form.
 */
export const convertFormValues = (
  stateFormValues: RegistrationFormValues
): HomeFormValues => {
  if (stateFormValues.children[0].birthdate) {
    const birthdateMoment = newMoment(stateFormValues.children[0].birthdate);
    return {
      child: {
        birthdate: {
          day: birthdateMoment.date(),
          month: birthdateMoment.month() + 1,
          year: birthdateMoment.year(),
        },
        homeCity: stateFormValues.children[0].homeCity,
      },
      verifyInformation: stateFormValues.verifyInformation,
    };
  }
  return {
    child: {
      birthdate: {
        day: '',
        month: '',
        year: '',
      },
      homeCity: '',
    },
    verifyInformation: false,
  };
};
