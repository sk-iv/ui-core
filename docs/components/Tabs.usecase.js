import React, { useState, useCallback } from 'react'
import Tabs, { Tab } from '@sivasifr/ui-core/Tabs'

const nucleotides = {
  adenine: 'Аденин',
  guanine: 'Гуанин',
  thymine: 'Тимин',
  cytosine: 'Цитозин',
}

export default () => {
  const [selectedNucleotid, setSelectedNucleotid] = useState(Object.keys(nucleotides)[0])
  const handleChange = useCallback((e) => {
    setSelectedNucleotid(e.target.value);
  }, [])
  return (
    <>
      <Tabs
        value={selectedNucleotid}
        onChange={handleChange}
      >
        {Object.entries(nucleotides).map(([key, val]) => (
          <Tab key={key} value={key} aria-controls={`tabpanel-${key}`}>{val}</Tab>
        ))}
      </Tabs>
      {Object.entries(nucleotides).map(([key, nucleotide]) => (
        <div
          key={key}
          id={`tabpanel-${key}`}
          role="tabpanel"
          hidden={selectedNucleotid !== key}
        >
          {nucleotide}
        </div>
      ))}
    </>
  )
}
