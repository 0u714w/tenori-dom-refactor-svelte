export default function createInitialState() {
  const notes = [
    { 
      note: 'c2',
      frequency: 65.41
    },
    {
      note: 'd2',
      frequency: 73.42,
    },
    {
      note: 'e2',
      frequency: 82.41,
    },
    {
      note: 'f2',
      frequency: 87.31,
    },
    {
      note: 'g2',
      frequency: 98.00,
    },
    {
      note: 'a2',
      frequency: 110.00,
    },
    {
      note: 'b2',
      frequency: 123.47,
    },
    {
      note: 'c3',
      frequency: 130.81,
    },
    {
      note: 'd3',
      frequency: 146.83,
    },
    {
      note: 'e3',
      frequency: 164.81,
    },
    {
      note: 'f3',
      frequency: 174.61,
    },
    {
      note: 'g3',
      frequency: 196.00,
    },
    {
      note: 'a3',
      frequency: 220.00,
    },
    {
      note: 'b3',
      frequency: 246.94,
    },
    {
      note: 'c4',
      frequency: 261.63,
    },
    {
      note: 'd4',
      frequency: 293.66,
    },
  ]
  
  const initialValues = {
    reverb: true,
    play: false,
    release: 1.5,
    octave: 4,
    volume: 0.3,
    wave: 0,
    notes: [],
  }
    
  return notes.reduce((obj, { note, frequency }) => {
    const steps = Array.from({ length: 16 })
    .reduce((arr) => {
      return [...arr, { status: false} ]
    }, [])
    return {
      ...obj,
      notes: [
        ...obj.notes,
        {
          note,
          frequency,
          steps,
        },
      ]
    }
  }, initialValues)
}