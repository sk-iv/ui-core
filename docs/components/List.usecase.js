import React from 'react'
import List, {
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  ListItemIcon,
} from '@sivasifr/ui-core/List'
import IconSvg from '@sivasifr/icons/IconSvg'
import IconButton from '@sivasifr/ui-core/IconButton'
import Link from '@sivasifr/ui-core/Link'

export default () => (
  <List dense={false}>
    {
      [0, 1, 2].map((value) => (
        <ListItem
          key={value}
          button
          selected={value === 2}
          component={value === 1 && Link}
          to={value === 1 && '/'}
          disabled={value === 0}
        >
          <ListItemIcon>
            <IconSvg name="funnel" />
          </ListItemIcon>
          <ListItemText
            primary={`${value}Single-line item`}
            secondary="Secondary text"
          />
          {value === 0 && (
            <ListItemSecondaryAction>
              <IconButton edge="end" aria-label="delete">
                <IconSvg name="times" />
              </IconButton>
            </ListItemSecondaryAction>
          )}
        </ListItem>
      ))
    }

  </List>
)
