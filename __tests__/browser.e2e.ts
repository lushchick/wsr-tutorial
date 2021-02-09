import {
  ButtonTestkit,
  InputTestkit,
  DropdownTestkit,
  CheckboxTestkit,
  InputAreaTestkit,
  CardHeaderTestkit,
} from 'wix-style-react/dist/testkit/puppeteer';
import DataHooks from '../src/components/App/DataHooks';

describe('React application', () => {
  let submitButtonTestkit: any;
  let nameInputTestkit: any;
  let colorDropdownTestkit: any;
  let termsCheckboxTestkit: any;
  let factInputAreaTestkit: any;
  let submittedInfoCardHeaderTestkit: any;

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
