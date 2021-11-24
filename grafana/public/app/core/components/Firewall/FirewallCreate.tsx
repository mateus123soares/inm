import React, { PureComponent, useState, ChangeEvent } from 'react';
import { css } from '@emotion/css';

import {
  Button,
  Field,
  FieldSet,
  Form,
  Icon,
  Label,
  Input,
  Select,
  stylesFactory,
  Tooltip,
} from '@grafana/ui';
import { SelectableValue } from '@grafana/data';

import { PreferencesService } from 'app/core/services/PreferencesService';
import api from '../../services/api';

const options = [
  { value: 'accept', label: 'Allow' },
  { value: 'drop', label: 'Drop' },
  { value: 'reject', label: 'Reject' }
]

const optionsRule = [
  { value: 'interface', label: 'Interface Rules' },
  { value: 'range', label: 'Range Rules' },
  { value: 'port', label: 'Port Rules' },
  { value: 'ip', label: 'IP Rules' },
  { value: 'mac', label: 'MAC Rules' },
]


export interface Props { }

export interface State {
  typeRule: string;
  dest: string;
  rule: string;
  paramRule: string;
}

export class FirewallCreate extends PureComponent<Props, State> {
  service: PreferencesService;

  constructor(props: Props) {
    super(props);
    this.state = {
      typeRule: '',
      rule: '',
      dest: '',
      paramRule: ''
    };
  }

  async componentDidMount() {

    this.setState({
      typeRule: '',
      dest: '',
      rule: '',
      paramRule: ''
    });
  }

  onSubmitForm = async () => {
    const { typeRule, rule, dest, paramRule } = this.state;
    let body;
    switch (rule) {
      case 'mac':
        body = { mac: dest };
        break;
      case 'port':
        body = { port: dest };
        break;
      case 'interface':
        body = {
          interface: paramRule,
          ip: dest
        };
        break; 
      case 'range':
        body = {
          ip: dest,
          port: paramRule
        }
        break;
      default:
        body = { ip: dest };
        break;
    }
    const headers = {
      'Authorization': 'Bearer my-token',
    };
    console.log(body);
    api.post(`firewall/${typeRule}/${rule}`, body)
      .then(response => console.log(response));
  };

  onInputTypeRuleChanged = (typeRule: string) => {
    this.setState({ typeRule: typeRule });
  };

  onInputRuleChanged = (rule: string) => {
    this.setState({ rule: rule });
  };

  onHomeInputChanged = (input: string) => {
    this.setState({ dest: input });
  };

  onHomeParamChanged = (input: string) => {
    this.setState({ paramRule: input });
  };

  render() {
    const styles = getStyles();

    return (
      <Form onSubmit={this.onSubmitForm}>
        {() => {
          return (
            <FieldSet label="Create a new rules to Firewall">
              <Field
                label={
                  <Label htmlFor="typerule-firewall-select">
                    <span className={styles.labelText}>Rule Type</span>
                    <Tooltip content="Not finding the rule you want? Send e-mail to administrator">
                      <Icon name="info-circle" />
                    </Tooltip>
                  </Label>
                }
                aria-label="User preferences rules dashboard drop down"
              >
                <Select
                  value={'0'}
                  getOptionValue={(i) => i.id}
                  onChange={(typeRule: SelectableValue) =>
                    this.onInputTypeRuleChanged(typeRule.value)
                  }
                  placeholder="Choose rule type to firewall"
                  inputId="typerule-dashboard-select"
                  options={options}
                />
              </Field>
              <Field
                label={
                  <Label htmlFor="rule-firewall-select">
                    <span className={styles.labelText}>Rule</span>
                    <Tooltip content="Not finding the rule you want? Send e-mail to administrator">
                      <Icon name="info-circle" />
                    </Tooltip>
                  </Label>
                }
                aria-label="User preferences rules dashboard drop down"
              >
                <Select
                  value={'0'}
                  getOptionValue={(i) => i.id}
                  onChange={(rule: SelectableValue) =>
                    this.onInputRuleChanged(rule.value)
                  }
                  placeholder="Choose rule to firewall"
                  inputId="rule-dashboard-select"
                  options={optionsRule}
                />
              </Field>
              <Field label="IP/PORT" error="IP is required">
                <Input
                  onChange={(input: ChangeEvent<HTMLInputElement>) =>
                    this.onHomeInputChanged(input.target.value)
                  }
                  id="new-ip-firewall-rules"
                  placeholder="10.0.0.5"
                  defaultValue=''
                />
              </Field>
              {this.state.rule == 'interface' ?
                <Field label="Interface" error="Interface is required"
                  id='field-rules'>
                  <Input
                    onChange={(input: ChangeEvent<HTMLInputElement>) =>
                      this.onHomeParamChanged(input.target.value)
                    }
                    id="field-ip-firewall-rules"
                    placeholder="0.0.0.0"
                    defaultValue=''
                  />
                </Field>
                : ''}
              {this.state.rule == 'range' ?
                <Field label="Port" error="Port is required"
                  id='field-rules'>
                  <Input
                    onChange={(input: ChangeEvent<HTMLInputElement>) =>
                      this.onHomeParamChanged(input.target.value)
                    }
                    id="field-ip-firewall-rules"
                    placeholder="0.0.0.0"
                    defaultValue=''
                  />
                </Field>
                : ''}
              <div className="gf-form-button-row">
                <Button variant="primary" aria-label="User preferences save button">
                  Create
                </Button>
              </div>
            </FieldSet>
          );
        }}
      </Form>
    );
  }
}

export default FirewallCreate;

const getStyles = stylesFactory(() => {
  return {
    labelText: css`
      margin-right: 6px;
    `,
  };
});