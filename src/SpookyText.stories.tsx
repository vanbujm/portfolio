import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0';

import { SpookyText } from './SpookyText';

export default {
  title: 'Example/Spooky Text',
  component: SpookyText,
  argTypes: {},
} as Meta;

const Template: Story<{}> = (args) => (
  <SpookyText {...args}>Spooky Text</SpookyText>
);

export const Primary = Template.bind({});
