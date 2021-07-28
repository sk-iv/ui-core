import React from 'react'
import List, {
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  ListItemIcon,
} from '@sivasifr/ui-core/List'
import IconSvg from '@sivasifr/icons/IconSvg'
import IconButton from '@sivasifr/ui-core/IconButton'

export default () => (
  <List dense={false}>
    {
      [0, 1, 2].map((value) => (
        <ListItem
          button
          selected={value === 2}
        >
          <ListItemIcon>
            <IconSvg name="funnel" />
          </ListItemIcon>
          <ListItemText
            primary={`${value}Single-line item`}
            secondary="Secondary text"
          />
          <ListItemSecondaryAction>
            <IconButton edge="end" aria-label="delete">
              <IconSvg name="times" />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
      ))
    }

  </List>
)
