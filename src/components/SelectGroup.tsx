import * as React from 'react';
import {MenuItem, Select, Stack, Typography} from "@mui/material";
import { uiSlice} from "../store/uiSlice";
import {useDispatch} from "react-redux";

export const SelectGroup = () => {
  const countSelectArr: number[] = [4, 5, 6];
  const maxValArr: number[] = [2, 4, 8, 16];

  const [tilePerRow, setTilePerRow] = React.useState<number>(countSelectArr[0]);
  const [maxValue, setMaxValue] = React.useState<number>(maxValArr[1]);
  const dispatch = useDispatch();

  const handleCountSelectChange = (e: any) => {
    setTilePerRow(e.target.value);
    dispatch(uiSlice.actions.changeTileCount(e.target.value));
  };

  const handleMaxValSelectChange = (e: any) => {
    setMaxValue(e.target.value);
    dispatch(uiSlice.actions.changeMaxGeneratedValue(e.target.value));
  }

  return (
    <Stack direction={'row'} spacing={5}>
      <Stack direction={'row'} alignItems={'center'} spacing={2}>
        <Typography variant={'h5'}>
          {'Tiles per row:'}
        </Typography>
        <Select
          value={tilePerRow}
          variant={'standard'}
          autoFocus={false}
          sx={{width: 70,
            "&:before": { borderWidth: 3 },
            "&:hover:not(.Mui-disabled):before": { borderWidth: 5 }}}
          onChange={handleCountSelectChange}
        >
          {countSelectArr.map((item) => (
            <MenuItem key={item} value={item}>
              <Typography variant={'h5'}>
                {item}
              </Typography>
            </MenuItem>
          ))}
        </Select>
      </Stack>
      <Stack direction={'row'} alignItems={'center'} spacing={2}>
        <Typography variant={'h5'}>
          {'Max value:'}
        </Typography>
        <Select
          value={maxValue}
          variant={'standard'}
          autoFocus={false}
          sx={{width: 70,
            "&:before": { borderWidth: 3 },
            "&:hover:not(.Mui-disabled):before": { borderWidth: 5 }}}
          onChange={handleMaxValSelectChange}
        >
          {maxValArr.map((item) => (
            <MenuItem key={item} value={item}>
              <Typography variant={'h5'}>
                {item}
              </Typography>
            </MenuItem>
          ))}
        </Select>
      </Stack>
    </Stack>
  );
}
