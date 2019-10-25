import { formatMessage } from '../../translation/utils';
import { newMoment } from '../../time/utils';
import {
  SUPPORTED_START_BIRTHDAY,
  DEFAULT_DATE_FORMAT,
} from '../../time/constants';

/**
 * validateRequire()
 * Check if field is required.
 * @param value
 * @param customMessage
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const validateRequire = (value?: any, customMessage?: string) => {
  if (!value) {
    return customMessage || formatMessage('validation.general.required');
  }
};

/** validateBirthDay()
 * Validate user input child birthday.
 * This app only target recently born child, so we support child which born after 2019 only.
 * Input time which come from future is not accepted
 * @param value Input value.
 */
const validateBirthDay = (value?: string | number) => {
  if (!value) {
    return formatMessage('validation.general.required');
  }

  const inputMoment = newMoment(value, DEFAULT_DATE_FORMAT);
  const nowMoment = newMoment();

  if (!inputMoment.isValid()) {
    return formatMessage('validation.date.invalidFormat');
  }

  const supportedStart = newMoment(SUPPORTED_START_BIRTHDAY);

  if (inputMoment < supportedStart || inputMoment > nowMoment) {
    return formatMessage('validation.date.unSupported');
  }
};

/**
 * validateEqual()
 * Usually to check if user is located in supported area.
 * Can be used widely to check in many different case.
 * @param value Input value
 * @param comparedValue Value to compare
 * @param errorMessage Error message when not match
 */
const validateEqual = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  value: any,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  comparedValue: any,
  errorMessage: string
) => {
  if (!value) {
    return formatMessage('validation.general.required');
  }

  if (value !== comparedValue) {
    return errorMessage;
  }
};

export { validateBirthDay, validateEqual, validateRequire };