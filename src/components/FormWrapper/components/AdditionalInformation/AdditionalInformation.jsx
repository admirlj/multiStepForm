import { Box, TextField } from '@mui/material'

export default function AdditionalInformation({defaultValues}) {
  return (
    <Box>
        <TextField defaultValue={defaultValues.additional} label="Additional Info" id='additional' name='additional' variant='standard' />
    </Box>
  )
}
