import React, { useState } from 'react';
import {
  Container,
  Row,
  Col,
  Box,
  Card,
  FormField,
  Input,
  Dropdown,
} from 'wix-style-react';
import s from './App.scss';

export default () => {
  const [firstCharCount, setFirstCharCount] = useState(0);
  const [secondCharCount, setSecondCharCount] = useState(0);
  const [inputValue, setInputValue] = useState('');
  const [dropdownSelectedId, setDropdownSelectId] = useState(0);

  return (
    <Container>
      <Row>
        <Col>
          <Box className={s.textBox}>I am a full row</Box>
        </Col>
      </Row>
      <Row>
        <Col span={6}>
          <Box className={s.textBox}>I take half of the size</Box>
        </Col>
        <Col span={6}>
          <Box className={s.textBox}>me too</Box>
        </Col>
      </Row>
      <Row>
        <Col span={4}>
          <Box className={s.textBox}>1 / 3</Box>
        </Col>
        <Col span={4}>
          <Box className={s.textBox}>1 / 3</Box>
        </Col>
        <Col span={4}>
          <Box className={s.textBox}>1 / 3</Box>
        </Col>
      </Row>
      <Row>
        <Col span={4}>
          <Box className={s.textBox}>1 / 3</Box>
        </Col>
        <Col span={8}>
          <Box className={s.textBox}>2 / 3</Box>
        </Col>
      </Row>
      <Row>
        <Col span={6}>
          <Row>
            <Col span={6}>
              <Box className={s.textBox}>I take half of the size</Box>
            </Col>
            <Col span={6}>
              <Box className={s.textBox}>me too</Box>
            </Col>
          </Row>
        </Col>
      </Row>
      <Row stretchViewsVertically>
        <Col span={6}>
          <Card stretchVertically>
            <Card.Header title="my first card" />
            <Card.Divider />
            <Card.Content>some content</Card.Content>
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Card.Header title="What is Lorem Ipsum?" />
            <Card.Divider />
            <Card.Content>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of
              Lorem Ipsum.
            </Card.Content>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col span={4}>
          <Card>
            <Card.Header title="my first card" />
            <Card.Divider />
            <Card.Content>some content</Card.Content>
          </Card>
        </Col>
        <Col span={4}>
          <Card>
            <Card.Header title="my first card" subtitle="nice" />
            <Card.Divider />
            <Card.Content>some more content</Card.Content>
          </Card>
        </Col>
        <Col span={4}>
          <Card>
            <Card.Header title="my first card" subtitle="cool" />
            <Card.Divider />
            <Card.Content>some more content again</Card.Content>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col span={6}>
          <Card>
            <Card.Header title="first card" />
            <Card.Divider />
            <Card.Content>
              <Row>
                <Col span={4}>first part</Col>
                <Col span={4}>second part</Col>
                <Col span={4}>third part</Col>
              </Row>
            </Card.Content>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col>
          <Card>
            <Card.Header title="Forms" />
            <Card.Divider />
            <Card.Content>
              <Row>
                <Col span={2}>
                  <form>
                    <Box marginBottom={3}>
                      <FormField
                        label="An input field"
                        required
                        infoContent="Help me fill the field"
                        charCount={5 - firstCharCount}
                      >
                        <Input
                          onChange={(event) =>
                            setFirstCharCount(event.target.value.length)
                          }
                        />
                      </FormField>
                    </Box>
                    <Box marginBottom={3}>
                      <FormField
                        label="An input field"
                        required
                        infoContent="Help me fill the field"
                        charCount={5 - secondCharCount}
                      >
                        <Input
                          onChange={(event) =>
                            setSecondCharCount(event.target.value.length)
                          }
                        />
                      </FormField>
                    </Box>
                  </form>
                </Col>
              </Row>
            </Card.Content>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col>
          <Card>
            <Card.Header title="Inputs and Selection" />
            <Card.Content>
              <Container fluid>
                <Row>
                  <Col span={8}>
                    <FormField
                      label="<Input/> - A simple Input"
                      infoContent="Use this for regular text input"
                    >
                      <Input
                        status="error"
                        statusMessage="Validation error"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                      />
                    </FormField>
                  </Col>
                </Row>
                <Row>
                  <Col span={8}>
                    <FormField
                      label="<Dropdown/> - A simple select component"
                      infoContent="Use this to pick a value from a set"
                    >
                      <Dropdown
                        selectedId={dropdownSelectedId}
                        onSelect={(option) =>
                          setDropdownSelectId(Number(option.id))
                        }
                        options={[
                          {
                            id: 0,
                            value: 'first option',
                          },
                          {
                            id: 1,
                            value: 'second option',
                          },
                          {
                            id: 2,
                            value: 'third option',
                          },
                        ]}
                      />
                    </FormField>
                  </Col>
                </Row>
              </Container>
            </Card.Content>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};
