import {Box, Card, Tree, TreeItem, useRootTheme} from '@sanity/ui'

export default function ColorStory() {
  const {theme} = useRootTheme()

  if (!theme.color) {
    return null
  }

  return (
    <Box padding={[4, 5, 6]}>
      <Tree space={1}>
        {Object.entries(theme.color)
          // .filter((v) => v[0] !== 'dark')
          .map(([key, value]) => (
            <ColorGroup key={key} name={key} value={value as any} />
          ))}
      </Tree>
    </Box>
  )
}

function ColorGroup({name, value}: {name: string; value: Record<string, unknown>}) {
  const entries = Object.entries(value)

  return (
    <TreeItem fontSize={1} padding={2} text={name}>
      {entries.map(([key, value]) => {
        if (value && typeof value === 'object') {
          return <ColorGroup key={key} name={key} value={value as Record<string, unknown>} />
        }

        if (typeof value !== 'string') {
          return null
        }

        return <ColorPreview key={key} name={key} value={value} />
      })}
    </TreeItem>
  )
}

function ColorPreview({name, value}: {name: string; value: string}) {
  const text = (
    <>
      <Card
        radius={2}
        style={{
          backgroundColor: value,
          boxShadow: 'inset 0 0 0 1px var(--card-shadow-outline-color)',
          display: 'inline-block',
          height: 17,
          width: 25,
          margin: '0 8px -6px 0',
          verticalAlign: 'top',
        }}
        tone="inherit"
      />
      {name} <code>{value}</code>
    </>
  )

  return <TreeItem fontSize={1} padding={2} text={text} />
}
