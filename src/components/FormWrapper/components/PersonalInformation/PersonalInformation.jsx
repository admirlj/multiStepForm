import { Box } from '@mui/material'
import Generator from '../Generator/Generator'

export default function PersonalInformation({defaultValues}) {
  return (
    <Box>
        <Generator defaultValues={defaultValues} activeStep={0} />
    </Box>
  )
}
