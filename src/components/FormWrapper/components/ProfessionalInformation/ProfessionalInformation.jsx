import { Box, TextField } from '@mui/material'
import Generator from '../Generator/Generator'

export default function ProfessionalInformation({defaultValues}) {
  return (
    <Box>
        <Generator activeStep={1} defaultValues={defaultValues} />
    </Box>
  )
}
