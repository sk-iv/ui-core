import React from 'react'
import Paper from '@sivasifr/ui-core/Paper'
import { Buttress } from '@sivasifr/ui-core/Buttress'
import { Typography, Vignette } from '@sivasifr/ui-core/Typography'

export default () => (
  <Paper style={{ width: 400 }}>
    <Buttress
      aspectRatio={16 / 9}
      background="center / cover no-repeat url('https://www.belanta.vet/vet-blog/wp-content/uploads/2020/01/1-13.jpg')"
    >
      <Typography
        component="h2"
        size="sm"
        outline
      >
        Образование Образование Образование
        <br />
        <Vignette name="wave" />
      </Typography>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Et harum illum modi nam
      numquam porro quam tempora temporibus unde veritatis.
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Et harum illum modi nam
    </Buttress>
  </Paper>
)
