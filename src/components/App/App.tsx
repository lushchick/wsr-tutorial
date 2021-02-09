import React, { useState, useCallback } from 'react';
import {
  Page,
  Container,
  Row,
  Col,
  Card,
  Box,
  Input,
  InputArea,
  Dropdown,
  Checkbox,
  Button,
  FormField,
  Text,
} from 'wix-style-react';
import s from './App.scss';
import ActionsBar from './ActionsBar';
import DataHooks from './DataHooks';

export type SubmittedForm = {
  name: string;
  color: string | undefined;
  funFact: string;
};

export type Form = {
  name: string;
  colorId: string;
  agreeToTOC: boolean;
  funFact: string;
};

export const formInitialValues: Form = {
  name: '',
  colorId: '',
  agreeToTOC: false,
  funFact: '',
};

const colors = [
  { id: 0, value: 'Red' },
  { id: 1, value: 'Blue' },
  { id: 2, value: 'Green' },
  { id: 3, value: 'Yellow' },
  { id: 4, value: 'Pink' },
];

const getColorItemById = (id: number) =>
  colors.find((color) => color.id === id);

export default () => {
  const [form, setForm] = useState<Form>({ ...formInitialValues });

  const [submittedForm, setSubmittedForm] = useState<SubmittedForm | null>(
    null,
  );

  const clearForm = useCallback(() => setForm({ ...formInitialValues }), []);

  const isFormValid = useCallback(() => {
    return form.name && form.agreeToTOC;
  }, [form.name, form.agreeToTOC]);

  const submitForm = useCallback(() => {
    if (isFormValid()) {
      const colorItem = getColorItemById(Number(form.colorId));
      setSubmittedForm({
        name: form.name,
        color: colorItem && colors[colorItem.id].value,
        funFact: form.funFact,
      });
    }
  }, [form, isFormValid]);

  return (
    <Page height="100vh">
      <Page.Header
        title="WSR Form"
        actionsBar={
          <ActionsBar
            onClearClicked={clearForm}
            onSubmitClicked={submitForm}
            disabled={!isFormValid()}
          />
        }
      />
      <Page.Content>
        <Container>
          <Row>
            <Col span={8}>
              <Card>
                <Card.Header
                  title="WSR Form"
                  subtitle="Create your own page with wix-style-react"
                />
                <Card.Content>
                  <Row>
                    <Col span={6}>
                      <FormField label="Name" required>
                        <Input
                          dataHook={DataHooks.NAME}
                          placeholder="Enter a name"
                          value={form.name}
                          onChange={useCallback(
                            (e) => setForm({ ...form, name: e.target.value }),
                            [form],
                          )}
                        />
                      </FormField>
                    </Col>
                  </Row>

                  <Row>
                    <Col span={6}>
                      <FormField label="Favorite Color">
                        <Dropdown
                          dataHook={DataHooks.FAVORITE_COLOR}
                          placeholder="Enter a color"
                          options={colors}
                          selectedId={form.colorId}
                          onSelect={useCallback(
                            (option) =>
                              setForm({ ...form, colorId: option.id }),
                            [form],
                          )}
                        />
                      </FormField>
                    </Col>
                  </Row>
                  <Row>
                    <Col span={8}>
                      <Checkbox
                        dataHook={DataHooks.TERMS}
                        checked={form.agreeToTOC}
                        onChange={useCallback(
                          () =>
                            setForm({
                              ...form,
                              agreeToTOC: !form.agreeToTOC,
                            }),
                          [form],
                        )}
                      >
                        I agree for the terms of use
                      </Checkbox>
                    </Col>
                    <Col span={4}>
                      <Box align="right">
                        <ActionsBar
                          onClearClicked={clearForm}
                          onSubmitClicked={submitForm}
                          disabled={!isFormValid()}
                        />
                      </Box>
                    </Col>
                  </Row>
                </Card.Content>
              </Card>
            </Col>
            <Col span={4}>
              <Row>
                <Col>
                  <Card>
                    <Card.Header title="Extra" />
                    <Card.Content>
                      <Row>
                        <Col>
                          <FormField label="Fun Fact">
                            <InputArea
                              dataHook={DataHooks.FUN_FACT}
                              value={form.funFact}
                              onChange={useCallback(
                                (e) =>
                                  setForm({
                                    ...form,
                                    funFact: e.target.value,
                                  }),
                                [form],
                              )}
                              placeholder="Enter something interesting"
                              rows={4}
                            />
                          </FormField>
                        </Col>
                      </Row>
                    </Card.Content>
                  </Card>
                </Col>
              </Row>
              {submittedForm ? (
                <Row>
                  <Col>
                    <Card>
                      <Card.Header
                        dataHook={DataHooks.SUBMITTED_INFO}
                        title="Submitted Info"
                      />
                      <Card.Content>
                        {[
                          {
                            title: 'Name:',
                            value: submittedForm.name,
                          },
                          {
                            title: 'Favorite Color:',
                            value: submittedForm.color,
                          },
                          {
                            title: 'Fun Fact:',
                            value: submittedForm.funFact,
                          },
                        ].map((category) => (
                          <Row key={category.title}>
                            <Col span={6}>
                              <Text>{category.title}</Text>
                            </Col>
                            <Col span={6}>
                              <Text weight="normal">{category.value}</Text>
                            </Col>
                          </Row>
                        ))}
                      </Card.Content>
                    </Card>
                  </Col>
                </Row>
              ) : null}
            </Col>
          </Row>
        </Container>
      </Page.Content>
    </Page>
  );
};
