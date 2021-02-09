import {
  ButtonTestkit,
  InputTestkit,
  DropdownTestkit,
  CheckboxTestkit,
  InputAreaTestkit,
  CardHeaderTestkit,
} from 'wix-style-react/dist/testkit/puppeteer';
import { ButtonUniDriver } from 'wix-style-react/dist/src/Button/Button.uni.driver';
import { InputUniDriver } from 'wix-style-react/dist/src/Input/Input.uni.driver';
import { DropdownUniDriver } from 'wix-style-react/dist/src/Dropdown/Dropdown.uni.driver';
import { CheckboxUniDriver } from 'wix-style-react/dist/src/Checkbox/Checkbox.uni.driver';
import { InputAreaUniDriver } from 'wix-style-react/dist/src/InputArea/InputArea.uni.driver';
import { HeaderUniDriver } from 'wix-style-react/dist/src/Card/Header/Header.uni.driver';

import DataHooks from '../src/components/App/DataHooks';

describe('React application', () => {
  let submitButtonTestkit: ButtonUniDriver;
  let nameInputTestkit: InputUniDriver;
  let colorDropdownTestkit: DropdownUniDriver;
  let termsCheckboxTestkit: CheckboxUniDriver;
  let factInputAreaTestkit: InputAreaUniDriver;
  let submittedInfoCardHeaderTestkit: HeaderUniDriver;

  beforeEach(async () => {
    await page.goto('http://localhost:3000/'); // Make sure the app runs first, run - `npm run start`

    submitButtonTestkit = await ButtonTestkit({
      dataHook: DataHooks.SUBMIT_BUTTON,
      page,
    });

    nameInputTestkit = await InputTestkit({
      dataHook: DataHooks.NAME,
      page,
    });

    colorDropdownTestkit = await DropdownTestkit({
      dataHook: DataHooks.FAVORITE_COLOR,
      page,
    });

    termsCheckboxTestkit = await CheckboxTestkit({
      dataHook: DataHooks.TERMS,
      page,
    });

    factInputAreaTestkit = await InputAreaTestkit({
      dataHook: DataHooks.FUN_FACT,
      page,
    });

    submittedInfoCardHeaderTestkit = await CardHeaderTestkit({
      dataHook: DataHooks.SUBMITTED_INFO,
      page,
    });
  });

  it('should submit the form', async () => {
    await nameInputTestkit.enterText('Joe Biden');
    await colorDropdownTestkit.driver.selectOptionById(1);
    await termsCheckboxTestkit.click();
    await factInputAreaTestkit.enterText('I ran for president three times');

    expect(await submittedInfoCardHeaderTestkit.exists()).toEqual(false);
    await submitButtonTestkit.click();
    expect(await submittedInfoCardHeaderTestkit.exists()).toEqual(true);
  });

  it('should not submit the form without required fields', async () => {
    await nameInputTestkit.enterText('Joe Biden');
    await colorDropdownTestkit.driver.selectOptionById(1);
    await factInputAreaTestkit.enterText('I ran for president three times');

    expect(await submittedInfoCardHeaderTestkit.exists()).toEqual(false);
    await submitButtonTestkit.click();
    expect(await submittedInfoCardHeaderTestkit.exists()).toEqual(false);
  });
});
