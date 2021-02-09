import React from 'react';
import { render } from '@testing-library/react';
import { I18nextProvider } from 'react-i18next';
import App from './App';
import i18n from '../__mocks__/i18n';

import {
  buttonTestkitFactory,
  inputTestkitFactory,
  dropdownTestkitFactory,
  checkboxTestkitFactory,
  inputAreaTestkitFactory,
  headerTestkitFactory,
} from 'wix-style-react/dist/testkit';
import DataHooks from './DataHooks';

describe('App', () => {
  it('should submit the form', async () => {
    const { baseElement } = render(
      <I18nextProvider i18n={i18n}>
        <App />
      </I18nextProvider>,
    );

    const nameInputTestkit = inputTestkitFactory({
      wrapper: baseElement,
      dataHook: DataHooks.NAME,
    });

    const colorDropdownTestkit = dropdownTestkitFactory({
      wrapper: baseElement,
      dataHook: DataHooks.FAVORITE_COLOR,
    });

    const termsCheckboxTestkit = checkboxTestkitFactory({
      wrapper: baseElement,
      dataHook: DataHooks.TERMS,
    });

    const factInputAreaTestkit = inputAreaTestkitFactory({
      wrapper: baseElement,
      dataHook: DataHooks.FUN_FACT,
    });

    const submitButtonTestkit = buttonTestkitFactory({
      wrapper: baseElement,
      dataHook: DataHooks.SUBMIT_BUTTON,
    });

    await nameInputTestkit.enterText('Joe Biden');

    await colorDropdownTestkit.driver.selectOptionById(1);
    await termsCheckboxTestkit.click();
    await factInputAreaTestkit.enterText('I ran for president three times');

    await submitButtonTestkit.click();
    const submittedInfoCardHeaderTestkit = headerTestkitFactory({
      wrapper: baseElement,
      dataHook: DataHooks.SUBMITTED_INFO,
    });
    expect(await submittedInfoCardHeaderTestkit.title()).toEqual(
      'Submitted Info',
    );
  });
});
