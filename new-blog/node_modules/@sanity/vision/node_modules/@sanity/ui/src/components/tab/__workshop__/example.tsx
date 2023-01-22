import {OkHandIcon, RocketIcon, SunIcon} from '@sanity/icons'
import {Box, Card, Tab, TabList, TabPanel, Text} from '@sanity/ui'
import {useState} from 'react'

export default function ExampleStory() {
  const [tab, setTab] = useState('foo')

  return (
    <Box padding={[4, 5, 6]}>
      <TabList space={[1, 2, 3]}>
        <Tab
          aria-controls="example-panel-foo"
          icon={SunIcon}
          id="example-tab-foo"
          label="Foo"
          onClick={() => setTab('foo')}
          selected={tab === 'foo'}
        />
        <Tab
          aria-controls="example-panel-bar"
          icon={RocketIcon}
          id="example-tab-bar"
          label="Bar"
          onClick={() => setTab('bar')}
          selected={tab === 'bar'}
        />
        <Tab
          aria-controls="example-panel-baz"
          icon={OkHandIcon}
          id="example-tab-baz"
          label="Baz"
          onClick={() => setTab('baz')}
          selected={tab === 'baz'}
        />
      </TabList>
      <TabPanel
        aria-labelledby="example-panel-foo"
        hidden={tab !== 'foo'}
        id="example-panel-foo"
        marginTop={[3, 4, 5]}
      >
        <Card border padding={3}>
          <Text>
            This is the <strong>Foo</strong> panel
          </Text>
        </Card>
      </TabPanel>
      <TabPanel
        aria-labelledby="example-panel-bar"
        hidden={tab !== 'bar'}
        id="example-panel-bar"
        marginTop={[3, 4, 5]}
      >
        <Card border padding={3}>
          <Text>
            This is the <strong>Bar</strong> panel
          </Text>
        </Card>
      </TabPanel>
      <TabPanel
        aria-labelledby="example-panel-baz"
        hidden={tab !== 'baz'}
        id="example-panel-baz"
        marginTop={[3, 4, 5]}
      >
        <Card border padding={3}>
          <Text>
            This is the <strong>Baz</strong> panel
          </Text>
        </Card>
      </TabPanel>
    </Box>
  )
}
